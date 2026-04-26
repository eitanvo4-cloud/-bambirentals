import { ATV, BookingRequest } from '../types';
import { ATV_FLEET } from '../constants';

/**
 * Simulates GET /api/fleet
 */
export const fetchFleet = async (): Promise<ATV[]> => {
    // Simulate network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ATV_FLEET);
        }, 800);
    });
};

/**
 * Sends booking data to email via FormSubmit AJAX API
 */
export const createBooking = async (booking: BookingRequest): Promise<{ success: boolean; message: string }> => {
    // 1. Validation
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    if (end <= start) {
        throw new Error("End date must be after start date");
    }

    // 2. Lookup ATV Model Name for the email subject
    const atv = ATV_FLEET.find(a => a.id === booking.atvId);
    const modelName = atv ? atv.modelName : "Unknown Model";

    // 3. Prepare FormSubmit Payload
    const payload = {
        _subject: `New Booking Request: ${modelName}`,
        _template: "table",
        "ATV Model": modelName,
        "First Name": booking.firstName,
        "Last Name": booking.lastName,
        "WhatsApp": booking.whatsappNumber,
        "Email": booking.email,
        "Start Date": booking.startDate,
        "End Date": booking.endDate,
        "Theft Protection": booking.theftProtection ? "Yes" : "No",
        "Full Damage Protection": booking.fullDamageProtection ? "Yes" : "No",
        "Pre-paid Refueling (tanks)": booking.prepaidRefueling,
        "Total Price": `$${booking.totalPrice}`,
        "Agreed To Terms": booking.agreedToTerms ? "Yes" : "No"
    };

    try {
        const response = await fetch("https://formsubmit.co/ajax/ofeynat2021@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        // FormSubmit returns the response data
        await response.json();

        // Send confirmation email to customer (non-blocking — failure must not surface to user)
        try {
            await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
        } catch (emailError) {
            console.warn('Confirmation email failed (non-critical):', emailError);
        }

        return { success: true, message: "Booking request sent successfully!" };

    } catch (error) {
        console.error("Booking Submission Error:", error);
        throw new Error("There was an error sending your booking request. Please try again or contact us on WhatsApp.");
    }
};