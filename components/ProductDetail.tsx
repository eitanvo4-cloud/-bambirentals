import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Map } from 'lucide-react';
import { ATV } from '../types';

interface ProductDetailProps {
    atv: ATV;
    onBack: () => void;
    onBook: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ atv, onBack, onBook }) => {
    const allImages = atv.images && atv.images.length > 0 ? atv.images : [atv.image];
    const [activeImage, setActiveImage] = useState(allImages[0]);

    const isUnavailable = atv.status === 'rented' || atv.status === 'maintenance';

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Nav Back - Sticky on mobile */}
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100 px-4 py-3 md:hidden">
                <button onClick={onBack} className="flex items-center text-gray-600 font-medium hover:text-gray-900 transition-colors">
                    <ArrowLeft size={20} className="mr-1" /> Back to Fleet
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
                <button onClick={onBack} className="hidden md:flex items-center text-gray-500 font-medium mb-8 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Fleet
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left: Image & Quick Specs */}
                    <div>
                        <div className="rounded-3xl overflow-hidden shadow-lg mb-4 border border-gray-100 bg-white">
                            <img src={activeImage} alt={atv.modelName} className="w-full h-auto object-cover aspect-[4/3]" />
                        </div>

                        {/* Thumbnail gallery */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
                                {allImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(img)}
                                        className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary shadow-[0_0_10px_rgba(255,87,34,0.4)]' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <img src={img} alt={`${atv.modelName} view ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {atv.specs.map((spec, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-center">
                                    <span className="font-semibold text-secondary font-display">{spec}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2 flex items-center gap-3">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm font-display">Best Choice For Adventure</span>
                            {atv.status === 'rented' && (
                                <span className="bg-amber-50 border border-amber-200 text-amber-600 font-bold py-0.5 px-3 rounded-full text-xs font-display uppercase tracking-wide">
                                    Rented / Sold Out
                                </span>
                            )}
                            {atv.status === 'maintenance' && (
                                <span className="bg-gray-100 border border-gray-200 text-gray-500 font-bold py-0.5 px-3 rounded-full text-xs font-display uppercase tracking-wide">
                                    Under Maintenance
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wide font-display">{atv.modelName}</h1>
                        <div className="flex items-end gap-2 mb-8">
                            <span className="text-4xl font-bold text-secondary font-display">${atv.dailyPrice}</span>
                            <span className="text-gray-500 pb-1 text-lg font-light">/ day</span>
                        </div>

                        <p className="text-lg text-gray-600 font-light mb-8 leading-relaxed">
                            {atv.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-3">
                                <Map className="text-secondary shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-gray-900 font-display">Free Offline Map</h4>
                                    <p className="text-sm text-gray-500 font-light">We load your phone with a custom map of trails and beaches.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
                            <h3 className="font-bold text-gray-900 mb-2 font-display">Rental Requirements</h3>
                            <ul className="space-y-2 text-sm text-gray-600 font-light">
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Valid Driver's License</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Credit Card for Deposit</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-secondary" /> Minimum Age: 18</li>
                            </ul>
                        </div>

                        {isUnavailable ? (
                            <button
                                disabled
                                className="w-full bg-gray-100 border border-gray-200 text-gray-400 text-xl font-bold py-5 rounded-xl cursor-not-allowed font-display"
                            >
                                {atv.status === 'rented' ? 'Rented / Sold Out' : 'Under Maintenance'}
                            </button>
                        ) : (
                            <button
                                onClick={onBook}
                                className="w-full bg-primary hover:bg-primary-hover text-white text-xl font-bold py-5 rounded-xl shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] transition-all transform hover:-translate-y-1 hover:scale-[1.02]"
                            >
                                Request Booking
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
