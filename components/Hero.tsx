import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
    onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
    return (
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920" 
                    alt="Santa Teresa Beach ATV" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 font-bold tracking-widest uppercase mb-6 backdrop-blur-sm" style={{ fontSize: '1.05rem' }}>
                    Santa Teresa
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    Explore Paradise <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">on ATV</span>
                </h1>
                <p className="text-lg md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Rent premium Honda ATVs and discover the hidden waterfalls and secret beaches of the Nicoya Peninsula.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={onCtaClick}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] transform hover:-translate-y-1"
                    >
                        Rent Your ATV
                    </button>
                    <button
                        onClick={() => window.open('https://www.google.com/maps/search/BambiRentals', '_blank', 'noopener,noreferrer')}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-lg font-semibold py-4 px-10 rounded-full transition-all"
                    >
                        View Map
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <ArrowDown size={32} />
            </div>
        </section>
    );
};