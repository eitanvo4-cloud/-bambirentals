import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Map } from 'lucide-react';
import { ATV } from '../types';

interface ProductDetailProps {
    atv: ATV;
    onBack: () => void;
    onBook: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ atv, onBack, onBook }) => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Nav Back - Sticky on mobile */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur border-b border-stone-200 px-4 py-3 md:hidden">
                 <button onClick={onBack} className="flex items-center text-stone-600 font-medium">
                    <ArrowLeft size={20} className="mr-1" /> Back to Fleet
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                <button onClick={onBack} className="hidden md:flex items-center text-stone-600 font-medium mb-8 hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Fleet
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Image & Quick Specs */}
                    <div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 border border-stone-100 bg-stone-100">
                            <img src={atv.image} alt={atv.modelName} className="w-full h-auto object-cover aspect-[4/3]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {atv.specs.map((spec, i) => (
                                <div key={i} className="bg-stone-50 p-4 rounded-xl border border-stone-100 text-center">
                                    <span className="font-semibold text-secondary">{spec}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2">
                             <span className="text-primary font-bold uppercase tracking-wider text-sm">Best Choice For Adventure</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6 tracking-wide">{atv.modelName}</h1>
                        <div className="flex items-end gap-2 mb-8">
                            <span className="text-4xl font-bold text-secondary">${atv.dailyPrice}</span>
                            <span className="text-stone-500 pb-1 text-lg">/ day</span>
                        </div>

                        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                            {atv.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-3">
                                <ShieldCheck className="text-secondary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-secondary">Insurance Included</h4>
                                    <p className="text-sm text-stone-500">Basic liability coverage comes standard with every rental.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Map className="text-secondary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-secondary">Free Offline Map</h4>
                                    <p className="text-sm text-stone-500">We load your phone with a custom map of trails and beaches.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 mb-8">
                            <h3 className="font-bold text-dark mb-2">Rental Requirements</h3>
                            <ul className="space-y-2 text-sm text-stone-600">
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary"/> Valid Driver's License</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary"/> Credit Card for Deposit</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary"/> Minimum Age: 18</li>
                            </ul>
                        </div>

                        <button 
                            onClick={onBook}
                            className="w-full bg-primary hover:bg-primary-hover text-white text-xl font-bold py-5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Request Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};