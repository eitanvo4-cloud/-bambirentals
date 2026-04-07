import React, { useState, useEffect } from 'react';
import { ATV, BookingRequest } from '../types';
import { TERMS_TEXT } from '../constants';
import { Calendar, User, Phone, Mail, X, Truck, Shield, Flame, Minus, Plus } from 'lucide-react';

interface BookingFormProps {
    atv: ATV;
    onCancel: () => void;
    onSubmit: (booking: BookingRequest) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ atv, onCancel, onSubmit }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const [startDate, setStartDate] = useState(tomorrow.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(dayAfter.toISOString().split('T')[0]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showTerms, setShowTerms] = useState(false);

    const [theftProtection, setTheftProtection] = useState(false);
    const [fullDamageProtection, setFullDamageProtection] = useState(false);
    const [refuelingQty, setRefuelingQty] = useState(0);

    // Derived pricing
    const [rentalDays, setRentalDays] = useState(0);
    const [basePrice, setBasePrice] = useState(0);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [theftCost, setTheftCost] = useState(0);
    const [fdpCost, setFdpCost] = useState(0);
    const [refuelingCost, setRefuelingCost] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end > start) {
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const base = days * atv.dailyPrice;

            let pct = 0;
            if (days > 30) pct = 20;
            else if (days > 7) pct = 10;

            const discount = parseFloat((base * pct / 100).toFixed(2));
            const theft = theftProtection ? 10 * days : 0;
            const fdp = fullDamageProtection ? 25 * days : 0;
            const refueling = refuelingQty * 60;
            const subtotal = base - discount + theft + fdp + refueling;
            const fee = parseFloat((subtotal * 0.10).toFixed(2));
            const taxAmt = parseFloat(((subtotal + fee) * 0.13).toFixed(2));
            const total = parseFloat((subtotal + fee + taxAmt).toFixed(2));

            setRentalDays(days);
            setBasePrice(base);
            setDiscountPercent(pct);
            setDiscountAmount(discount);
            setTheftCost(theft);
            setFdpCost(fdp);
            setRefuelingCost(refueling);
            setServiceFee(fee);
            setTax(taxAmt);
            setTotalPrice(total);
        } else {
            setRentalDays(0);
            setBasePrice(0);
            setDiscountPercent(0);
            setDiscountAmount(0);
            setTheftCost(0);
            setFdpCost(0);
            setRefuelingCost(0);
            setServiceFee(0);
            setTax(0);
            setTotalPrice(0);
        }
    }, [startDate, endDate, atv.dailyPrice, theftProtection, fullDamageProtection, refuelingQty]);

    const handleFdpChange = (checked: boolean) => {
        setFullDamageProtection(checked);
        if (checked) setTheftProtection(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreed) {
            alert("You must agree to the Terms & Conditions.");
            return;
        }

        if (totalPrice <= 0) {
            alert("Invalid date range selected.");
            return;
        }

        const booking: BookingRequest = {
            atvId: atv.id,
            startDate,
            endDate,
            firstName,
            lastName,
            whatsappNumber,
            email,
            theftProtection,
            fullDamageProtection,
            prepaidRefueling: refuelingQty,
            totalPrice,
            agreedToTerms: agreed,
        };

        onSubmit(booking);
    };

    const fmt = (n: number) => n.toFixed(2);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 animate-in fade-in duration-300 relative z-10 flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold font-display text-gray-900">Complete Reservation</h2>
                        <p className="text-secondary font-display">{atv.modelName}</p>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Date Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 font-display">
                            <Calendar size={20} className="text-primary" />
                            Dates
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1 font-light">Start Date</label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1 font-light">End Date</label>
                                <input
                                    type="date"
                                    required
                                    min={startDate}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Your Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 font-display">
                            <User size={20} className="text-primary" />
                            Your Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1 font-light">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1 font-light">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1 font-light">
                                <Phone size={14} /> WhatsApp Number
                            </label>
                            <input
                                type="tel"
                                required
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1 font-light">
                                <Mail size={14} /> Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Free Pickup & Drop-off */}
                    <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="mt-0.5 text-secondary">
                            <Truck size={22} />
                        </div>
                        <div>
                            <p className="text-gray-900 font-semibold font-display">Free Pickup &amp; Drop-off</p>
                            <p className="text-gray-500 text-sm font-light mt-0.5">We deliver and pick up the ATV directly at your hotel or accommodation in Santa Teresa at no extra charge.</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Protection Add-ons */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 font-display">
                            <Shield size={20} className="text-primary" />
                            Protection Add-ons
                        </h3>

                        {/* Theft Protection */}
                        <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${theftProtection ? 'border-primary/60 bg-primary/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'} ${fullDamageProtection ? 'opacity-40 cursor-not-allowed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={theftProtection}
                                disabled={fullDamageProtection}
                                onChange={(e) => setTheftProtection(e.target.checked)}
                                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="text-gray-900 font-semibold">Theft Protection</span>
                                    <span className="text-gray-500 text-sm font-light">$10/day{rentalDays > 0 ? ` × ${rentalDays} = $${10 * rentalDays}` : ''}</span>
                                </div>
                                <p className="text-gray-500 text-sm font-light mt-0.5">Covers theft of the vehicle during your rental period.</p>
                                {fullDamageProtection && <p className="text-xs text-secondary mt-1">Included in Full Damage Protection</p>}
                            </div>
                        </label>

                        {/* Full Damage Protection */}
                        <label className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${fullDamageProtection ? 'border-secondary/60 bg-secondary/5' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                            <input
                                type="checkbox"
                                checked={fullDamageProtection}
                                onChange={(e) => handleFdpChange(e.target.checked)}
                                className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="text-gray-900 font-semibold">Full Damage Protection</span>
                                    <span className="text-gray-500 text-sm font-light">$25/day{rentalDays > 0 ? ` × ${rentalDays} = $${25 * rentalDays}` : ''}</span>
                                </div>
                                <p className="text-gray-500 text-sm font-light mt-0.5">Complete coverage for all damages and theft. Our best protection plan.</p>
                            </div>
                        </label>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Pre-paid Refueling */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 font-display">
                            <Flame size={20} className="text-primary" />
                            Pre-paid Refueling
                        </h3>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-700 text-sm font-light">
                            ⚠ Vehicle must be returned with a full tank or a $60 fee will apply.
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <div>
                                <p className="text-gray-900 font-semibold">Tanks of fuel</p>
                                <p className="text-gray-500 text-sm font-light">$60 per full tank</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRefuelingQty(Math.max(0, refuelingQty - 1))}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors disabled:opacity-40"
                                    disabled={refuelingQty === 0}
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-gray-900 font-bold text-lg w-6 text-center">{refuelingQty}</span>
                                <button
                                    type="button"
                                    onClick={() => setRefuelingQty(Math.min(10, refuelingQty + 1))}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors disabled:opacity-40"
                                    disabled={refuelingQty === 10}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100"></div>

                    {/* Price Summary */}
                    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 font-display">Price Summary</h3>
                        </div>
                        <div className="px-6 py-4 space-y-2.5 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-light">ATV Base Price ({rentalDays} day{rentalDays !== 1 ? 's' : ''} × ${atv.dailyPrice})</span>
                                <span className="text-gray-900 font-medium">${fmt(basePrice)}</span>
                            </div>
                            {discountPercent > 0 && (
                                <div className="flex justify-between items-center text-green-600">
                                    <span className="font-light">Discount ({discountPercent}%)</span>
                                    <span className="font-medium">−${fmt(discountAmount)}</span>
                                </div>
                            )}
                            {theftProtection && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-light">Theft Protection ($10 × {rentalDays} day{rentalDays !== 1 ? 's' : ''})</span>
                                    <span className="text-gray-900 font-medium">${fmt(theftCost)}</span>
                                </div>
                            )}
                            {fullDamageProtection && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-light">Full Damage Protection ($25 × {rentalDays} day{rentalDays !== 1 ? 's' : ''})</span>
                                    <span className="text-gray-900 font-medium">${fmt(fdpCost)}</span>
                                </div>
                            )}
                            {refuelingQty > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-light">Pre-paid Refueling ({refuelingQty} tank{refuelingQty !== 1 ? 's' : ''} × $60)</span>
                                    <span className="text-gray-900 font-medium">${fmt(refuelingCost)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-light">Service Fee (10%)</span>
                                <span className="text-gray-900 font-medium">${fmt(serviceFee)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-light">Tax (13%)</span>
                                <span className="text-gray-900 font-medium">${fmt(tax)}</span>
                            </div>
                            <div className="flex justify-between items-center text-xl font-bold text-secondary font-display border-t border-gray-200 pt-3 mt-1">
                                <span>TOTAL</span>
                                <span>${fmt(totalPrice)}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-light text-right">Paid upon delivery</p>
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            required
                            className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600 font-light">
                            I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-primary underline font-medium hover:text-primary-hover">Terms & Conditions</button> of BambiRentals.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={totalPrice <= 0}
                        className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] transition-all transform hover:-translate-y-1"
                    >
                        Confirm Request
                    </button>
                </form>
            </div>

            {/* Terms Modal */}
            {showTerms && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
                    <div className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900 font-display">Terms & Conditions</h3>
                            <button onClick={() => setShowTerms(false)}><X className="text-gray-400 hover:text-gray-700 transition-colors" /></button>
                        </div>
                        <div className="p-6 overflow-y-auto whitespace-pre-line text-gray-600 font-light text-sm">
                            {TERMS_TEXT}
                        </div>
                        <div className="p-6 border-t border-gray-200">
                            <button
                                onClick={() => { setAgreed(true); setShowTerms(false); }}
                                className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(255,87,34,0.4)]"
                            >
                                I Agree
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
