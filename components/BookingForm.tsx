import React, { useState, useEffect } from 'react';
import { ATV, BookingRequest } from '../types';
import { TERMS_TEXT } from '../constants';
import { Calendar, User, Phone, Mail, X } from 'lucide-react';

interface BookingFormProps {
    atv: ATV;
    onCancel: () => void;
    onSubmit: (booking: BookingRequest) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ atv, onCancel, onSubmit }) => {
    // Set default dates (tomorrow and day after)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const [startDate, setStartDate] = useState(tomorrow.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(dayAfter.toISOString().split('T')[0]);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    // Effect to calculate price whenever dates change
    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (end > start) {
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Removed + 1 to fix off-by-one error
            setTotalPrice(diffDays * atv.dailyPrice);
        } else {
            setTotalPrice(0);
        }
    }, [startDate, endDate, atv.dailyPrice]);

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
            phone,
            email,
            totalPrice,
            agreedToTerms: agreed
        };

        onSubmit(booking);
    };

    return (
        <div className="min-h-screen bg-stone-100 py-12 px-4 animate-in fade-in duration-300">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-emerald-900 p-6 flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-2xl font-bold">Complete Reservation</h2>
                        <p className="text-emerald-200 opacity-80">{atv.modelName}</p>
                    </div>
                    <button onClick={onCancel} className="p-2 hover:bg-emerald-800 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Date Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                            <Calendar size={20} className="text-orange-500" /> 
                            Dates
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Start Date</label>
                                <input 
                                    type="date" 
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">End Date</label>
                                <input 
                                    type="date" 
                                    required
                                    min={startDate}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-stone-100 my-6"></div>

                    {/* User Details */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
                            <User size={20} className="text-orange-500" /> 
                            Your Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">First Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Last Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1 flex items-center gap-1"><Phone size={14}/> Phone Number</label>
                            <input 
                                type="tel" 
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-600 mb-1 flex items-center gap-1"><Mail size={14}/> Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="border-t border-stone-100 my-6"></div>

                    {/* Summary & Price */}
                    <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-stone-600">Daily Rate</span>
                            <span className="font-medium">${atv.dailyPrice}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-emerald-900 border-t border-stone-200 pt-2 mt-2">
                            <span>Total Estimated</span>
                            <span>${totalPrice}</span>
                        </div>
                        <div className="mt-4 flex items-start gap-3">
                            <input 
                                type="checkbox" 
                                id="price-accept"
                                required
                                className="mt-1 w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                            />
                            <label htmlFor="price-accept" className="text-sm text-stone-600">
                                I accept the rental rate of <span className="font-bold">${totalPrice}</span>.
                            </label>
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
                            className="mt-1 w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <label htmlFor="terms" className="text-sm text-stone-600">
                            I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-orange-600 underline font-medium">Terms & Conditions</button> of BambiRentals.
                        </label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={totalPrice <= 0}
                        className="w-full bg-emerald-900 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg transition-all"
                    >
                        Confirm Request
                    </button>
                </form>
            </div>

            {/* Terms Modal */}
            {showTerms && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl">
                        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-emerald-900">Terms & Conditions</h3>
                            <button onClick={() => setShowTerms(false)}><X className="text-stone-400 hover:text-stone-800" /></button>
                        </div>
                        <div className="p-6 overflow-y-auto whitespace-pre-line text-stone-600 text-sm">
                            {TERMS_TEXT}
                        </div>
                        <div className="p-6 border-t border-stone-100">
                            <button 
                                onClick={() => { setAgreed(true); setShowTerms(false); }}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl"
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