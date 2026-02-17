import React from 'react';
import { ArrowRight, Fuel, Cog } from 'lucide-react';
import { ATV } from '../types';

interface ATVCardProps {
    atv: ATV;
    onViewDetails: (atv: ATV) => void;
}

export const ATVCard: React.FC<ATVCardProps> = ({ atv, onViewDetails }) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-stone-100 flex flex-col">
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={atv.image} 
                    alt={atv.modelName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-dark font-bold py-1 px-3 rounded-full text-sm shadow-sm">
                    ${atv.dailyPrice} / day
                </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-dark mb-3">{atv.modelName}</h3>
                <p className="text-stone-600 mb-6 flex-grow line-clamp-2">{atv.description}</p>
                
                <div className="flex gap-4 mb-6 text-sm text-stone-500">
                    <div className="flex items-center gap-1">
                        <Fuel size={16} className="text-primary" />
                        <span>Gas</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Cog size={16} className="text-primary" />
                        <span>{atv.transmission}</span>
                    </div>
                </div>

                <button 
                    onClick={() => onViewDetails(atv)}
                    className="w-full py-4 rounded-xl bg-stone-100 hover:bg-secondary hover:text-white text-dark font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-secondary group-hover:text-white"
                >
                    View Details
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};