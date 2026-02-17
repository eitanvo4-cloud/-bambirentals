import React from 'react';
import { CheckCircle, Calendar, MapPin, Home, User, ShieldCheck, MessageCircle } from 'lucide-react';
import { ATV, BookingRequest } from '../types';

interface ConfirmationPageProps {
    booking: BookingRequest;
    atv: ATV;
    onHome: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ booking, atv, onHome }) => {
    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Construct WhatsApp message with booking details
    const waMessage = `Hi! I just submitted a booking for the ${atv.modelName} from ${formatDate(booking.startDate)} to ${formatDate(booking.endDate)}. Name: ${booking.firstName} ${booking.lastName}. Can you confirm availability?`;
    const waLink = `https://wa.me/50664132024?text=${encodeURIComponent(waMessage)}`;

    return (
        <div className="min-h-screen bg-accent py-12 px-4 flex items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
                {/* Header */}
                <div className="bg-secondary p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-4 animate-in zoom-in duration-500 delay-150">
                            <CheckCircle size={64} className="text-green-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide">Request Received!</h1>
                        <p className="text-green-200 text-lg">Your adventure awaits, {booking.firstName}.</p>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <p className="text-stone-600 text-lg leading-relaxed max-w-xl mx-auto">
                            Thank you for choosing BambiRentals. We have received your request for the <span className="font-bold text-secondary">{atv.modelName}</span>.
                            Our team will review availability and send a confirmation email to <span className="font-semibold text-secondary">{booking.email}</span> shortly.
                            <br/><br/>
                            <span className="font-medium text-secondary">Want a faster response? Message us directly on WhatsApp and we'll confirm your booking in minutes.</span>
                        </p>
                    </div>

                    {/* Ticket / Summary Card */}
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 md:p-8 mb-10 relative">
                        {/* Decorative jagged line or holes could go here visually */}
                        
                        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6">Reservation Summary</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-2 rounded-lg text-primary">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium">Dates</p>
                                        <p className="font-bold text-stone-900">{formatDate(booking.startDate)}</p>
                                        <p className="text-stone-400 text-sm">to</p>
                                        <p className="font-bold text-stone-900">{formatDate(booking.endDate)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-2 rounded-lg text-primary">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium">Location</p>
                                        <p className="font-bold text-stone-900">Santa Teresa, Costa Rica</p>
                                        <p className="text-sm text-stone-500">Free delivery to your hotel</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-2 rounded-lg text-primary">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium">Renter</p>
                                        <p className="font-bold text-stone-900">{booking.firstName} {booking.lastName}</p>
                                        <p className="text-sm text-stone-500">{booking.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-2 rounded-lg text-primary">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500 font-medium">Total Estimated</p>
                                        <p className="font-bold text-secondary text-xl">${booking.totalPrice}</p>
                                        <p className="text-xs text-stone-400">Paid upon delivery</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <a 
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full max-w-sm bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={24} />
                            Confirm via WhatsApp
                        </a>

                        <button 
                            onClick={onHome}
                            className="w-full max-w-sm bg-dark hover:bg-stone-800 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Home size={20} />
                            Return to Home
                        </button>
                        <p className="text-sm text-stone-400 text-center mt-2">
                             Prefer WhatsApp? It's the fastest way to confirm your booking ✓
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};