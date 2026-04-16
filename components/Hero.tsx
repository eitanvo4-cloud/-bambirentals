import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
    onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, []);

    return (
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Video with Overlay */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#F4EFE4] via-black/50 to-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary font-bold tracking-widest uppercase mb-6 backdrop-blur-md font-display" style={{ fontSize: '1.05rem' }}>
                    Santa Teresa
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl tracking-tight font-display">
                    Explore Paradise <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_0_15px_rgba(212,98,30,0.5)]">on ATV</span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                    Rent premium Honda ATVs and discover the hidden waterfalls and secret beaches of the Nicoya Peninsula.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onCtaClick}
                        className="bg-primary hover:bg-primary-hover text-white text-lg font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(212,98,30,0.5)] hover:shadow-[0_0_35px_rgba(212,98,30,0.8)] transform hover:-translate-y-1 hover:scale-105"
                    >
                        Rent Your ATV
                    </button>
                    <button
                        onClick={() => window.open('https://maps.app.goo.gl/XDJKBbcmnjrvpGPn6?g_st=aw', '_blank', 'noopener,noreferrer')}
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white text-lg font-semibold py-4 px-10 rounded-xl transition-all hover:-translate-y-1 hover:border-white/40"
                    >
                        View Map
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400">
                <ArrowDown size={32} />
            </div>
        </section>
    );
};