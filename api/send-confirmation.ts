import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';

const ATV_NAMES: Record<string, string> = {
    'honda-425': 'Honda TRX 425',
    'honda-520': 'Honda Rubicon 520',
    'kymco-400': 'Kymco MXU 400',
    'kymco-mxu-400': 'Kymco MXU 400',
    'cfmoto-600': 'CF Moto CForce 600',
};

interface BookingRequest {
    email: string;
    firstName: string;
    lastName: string;
    atvId: string;
    startDate: string;
    endDate: string;
    whatsappNumber: string;
    theftProtection: boolean;
    fullDamageProtection: boolean;
    prepaidRefueling: number;
    totalPrice: number;
    agreedToTerms: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const booking: BookingRequest = req.body;
    if (!booking?.email) return res.status(400).json({ error: 'Missing booking data' });

    const modelName = ATV_NAMES[booking.atvId] ?? 'ATV';

    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Bambi Rentals" <${process.env.GMAIL_USER}>`,
            to: booking.email,
            replyTo: process.env.GMAIL_USER,
            subject: `Booking Request Received — ${modelName}`,
            html: buildEmailHtml(booking, modelName),
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Gmail SMTP error:', error);
        // Return 200 so the frontend booking flow is never broken by an email failure
        return res.status(200).json({ success: false, error: 'Email send failed' });
    }
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC', // prevent date-shifting in negative-UTC-offset runtimes
    });
}

function buildEmailHtml(booking: BookingRequest, modelName: string): string {
    const addOnRows: string[] = [];

    if (booking.theftProtection) {
        addOnRows.push(`
            <tr>
                <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Theft Protection</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: right;">Included</td>
            </tr>
        `);
    }

    if (booking.fullDamageProtection) {
        addOnRows.push(`
            <tr>
                <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Full Damage Protection</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: right;">Included</td>
            </tr>
        `);
    }

    if (booking.prepaidRefueling > 0) {
        addOnRows.push(`
            <tr>
                <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Pre-paid Refueling</td>
                <td style="padding: 8px 0; color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: right;">${booking.prepaidRefueling} tank${booking.prepaidRefueling !== 1 ? 's' : ''}</td>
            </tr>
        `);
    }

    const addOnsSection = addOnRows.length > 0 ? `
        <tr><td colspan="2" style="padding-top: 20px; padding-bottom: 6px;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Add-ons</p>
        </td></tr>
        ${addOnRows.join('')}
    ` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Booking Request Received — Bambi Rentals</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE8DF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #EDE8DF;">
    <tr>
        <td align="center" style="padding: 40px 16px;">

            <!-- Card -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.10);">

                <!-- Header -->
                <tr>
                    <td style="background-color: #D4621E; padding: 40px 40px 36px; text-align: center;">
                        <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 16px;">
                            <tr>
                                <td style="background-color: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.35); border-radius: 10px; padding: 10px 16px;">
                                    <span style="font-size: 22px; font-weight: 800; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; letter-spacing: -0.5px;">B</span>
                                </td>
                            </tr>
                        </table>
                        <h1 style="margin: 0 0 8px; font-size: 28px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Bambi Rentals</h1>
                        <p style="margin: 0; font-size: 15px; color: rgba(255,255,255,0.80); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Santa Teresa, Costa Rica</p>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding: 40px 40px 32px;">

                        <h2 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #1A1A1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Hi ${booking.firstName},</h2>
                        <p style="margin: 0 0 12px; font-size: 15px; line-height: 1.7; color: #555555; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            Thank you for submitting a booking request. We will contact you soon to let you know if everything is confirmed and good to go.
                        </p>
                        <p style="margin: 0 0 32px; font-size: 15px; line-height: 1.7; color: #555555; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            We will reach you via WhatsApp at <strong style="color: #1A1A1A;">+506 6413-2024</strong> — keep an eye on your messages!
                        </p>

                        <!-- Divider -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                            <tr><td style="border-top: 1px solid #EEEEEE;"></td></tr>
                        </table>

                        <p style="margin: 0 0 16px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Reservation Summary</p>

                        <!-- Summary card -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF7F2; border-radius: 12px; border: 1px solid #EDE8DF; margin-bottom: 32px;">
                            <tr>
                                <td style="padding: 24px 24px 20px;">

                                    <!-- ATV model highlight -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                                        <tr>
                                            <td style="background-color: #D4621E; border-radius: 8px; padding: 12px 16px;">
                                                <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.75); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">ATV Model</p>
                                                <p style="margin: 0; font-size: 18px; font-weight: 800; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${modelName}</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Details rows -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td colspan="2" style="padding-bottom: 6px;">
                                                <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Renter</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="padding-bottom: 16px; border-bottom: 1px solid #EDE8DF;">
                                                <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1A1A1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${booking.firstName} ${booking.lastName}</p>
                                            </td>
                                        </tr>

                                        <tr><td colspan="2" style="padding-top: 16px; padding-bottom: 6px;">
                                            <p style="margin: 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Rental Period</p>
                                        </td></tr>
                                        <tr>
                                            <td style="padding-bottom: 4px; color: #555555; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">From</td>
                                            <td style="padding-bottom: 4px; color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: right;">${formatDate(booking.startDate)}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-bottom: 16px; border-bottom: 1px solid #EDE8DF; color: #555555; font-size: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">To</td>
                                            <td style="padding-bottom: 16px; border-bottom: 1px solid #EDE8DF; color: #1A1A1A; font-size: 14px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: right;">${formatDate(booking.endDate)}</td>
                                        </tr>

                                        ${addOnsSection}

                                        <!-- Total -->
                                        <tr><td colspan="2" style="padding-top: 20px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td>
                                                        <p style="margin: 0 0 2px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Total Estimated</p>
                                                        <p style="margin: 0; font-size: 11px; color: #BBBBBB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Paid upon delivery</p>
                                                    </td>
                                                    <td style="text-align: right;">
                                                        <p style="margin: 0; font-size: 30px; font-weight: 800; color: #C4973C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">$${booking.totalPrice.toFixed(2)}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td></tr>
                                    </table>

                                </td>
                            </tr>
                        </table>

                        <!-- WhatsApp CTA -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 8px;">
                            <tr>
                                <td align="center">
                                    <a href="https://wa.me/50664132024" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                        Chat with Us on WhatsApp
                                    </a>
                                </td>
                            </tr>
                        </table>
                        <p style="margin: 8px 0 0; font-size: 12px; color: #BBBBBB; text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">+506 6413-2024 &nbsp;·&nbsp; Fastest way to reach us</p>

                    </td>
                </tr>

                <!-- Sign-off -->
                <tr>
                    <td style="padding: 0 40px 32px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr><td style="border-top: 1px solid #EEEEEE; padding-top: 24px;">
                                <p style="margin: 0 0 4px; font-size: 14px; color: #555555; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">See you on the trails,</p>
                                <p style="margin: 0; font-size: 16px; font-weight: 700; color: #D4621E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Bambi Rentals</p>
                            </td></tr>
                        </table>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="background-color: #16100A; padding: 28px 40px; border-radius: 0 0 16px 16px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td style="text-align: center;">
                                    <p style="margin: 0 0 6px; font-size: 13px; font-weight: 600; color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Bambi Rentals</p>
                                    <p style="margin: 0 0 6px; font-size: 12px; color: #888888; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Santa Teresa, Costa Rica &nbsp;·&nbsp; Daily 8:00 AM – 6:00 PM</p>
                                    <p style="margin: 0; font-size: 11px; color: #555555; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">This is an automated confirmation. Reply to this email to reach our team.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

            </table>
            <!-- /Card -->

        </td>
    </tr>
</table>

</body>
</html>`;
}
