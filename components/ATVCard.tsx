import React from 'react';
import { ArrowRight, Fuel, Cog } from 'lucide-react';
import { ATV } from '../types';

interface ATVCardProps {
    atv: ATV;
    onViewDetails: (atv: ATV) => void;
}

export const ATVCard: React.FC<ATVCardProps> = ({ atv, onViewDetails }) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-gray-200 flex flex-col">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={atv.image}
                    alt={atv.modelName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/95 border border-gray-200 text-gray-900 font-bold py-1.5 px-4 rounded-full text-sm shadow-md font-display">
                    ${atv.dailyPrice} / day
                </div>
                {atv.status === 'rented' && (
                    <div className="absolute top-4 left-4 bg-amber-500/90 backdrop-blur-md text-white font-bold py-1.5 px-4 rounded-full text-xs shadow-md font-display uppercase tracking-wide">
                        Rented / Sold Out
                    </div>
                )}
                {atv.status === 'maintenance' && (
                    <div className="absolute top-4 left-4 bg-slate-500/90 backdrop-blur-md text-white font-bold py-1.5 px-4 rounded-full text-xs shadow-md font-display uppercase tracking-wide">
                        Under Maintenance
                    </div>
                )}
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{atv.modelName}</h3>
                <p className="text-gray-500 font-light mb-6 flex-grow line-clamp-2 leading-relaxed">{atv.description}</p>

                <div className="flex gap-4 mb-6 text-sm text-gray-500 font-light">
                    <div className="flex items-center gap-1">
                        <Fuel size={16} className="text-primary" />
                        <span>Gas</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Cog size={16} className="text-primary" />
                        <span>{atv.transmission}</span>
                    </div>
                </div>

                {atv.status === 'available' || !atv.status ? (
                    <button
                        onClick={() => onViewDetails(atv)}
                        className="w-full py-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-primary hover:border-primary text-gray-700 font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-primary group-hover:border-primary/80 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,87,34,0.4)]"
                    >
                        View Details
                        <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full py-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-400 font-bold flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                        {atv.status === 'rented' ? 'Rented / Sold Out' : 'Under Maintenance'}
                    </button>
                )}
            </div>
        </div>
    );
};
