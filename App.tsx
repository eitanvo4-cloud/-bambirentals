import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  Mail,
  ChevronRight
} from 'lucide-react';
import { ATV, BookingRequest, ViewState } from './types';
import { fetchFleet, createBooking } from './services/api';
import { ATVCard } from './components/ATVCard';
import { ProductDetail } from './components/ProductDetail';
import { BookingForm } from './components/BookingForm';
import { ConfirmationPage } from './components/ConfirmationPage';
import { FAQAssistant } from './components/GeminiAssistant';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedATV, setSelectedATV] = useState<ATV | null>(null);
  const [lastBooking, setLastBooking] = useState<BookingRequest | null>(null);
  const [fleet, setFleet] = useState<ATV[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  // Load Fleet Data on Mount
  useEffect(() => {
    const loadFleet = async () => {
      try {
        const data = await fetchFleet();
        setFleet(data);
      } catch (error) {
        console.error("Failed to load fleet", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadFleet();
  }, []);

  const handleViewDetails = (atv: ATV) => {
    setSelectedATV(atv);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartBooking = (atv: ATV) => {
    setSelectedATV(atv);
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = async (booking: BookingRequest) => {
    try {
      await createBooking(booking);
      setLastBooking(booking);
      setCurrentView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("There was an error processing your request. Please try again.");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary shadow-[0_0_15px_rgba(255,87,34,0.5)]"></div>
        </div>
      );
    }

    switch (currentView) {
      case 'detail':
        return selectedATV ? (
          <ProductDetail
            atv={selectedATV}
            onBack={() => setCurrentView('home')}
            onBook={() => handleStartBooking(selectedATV)}
          />
        ) : null;
      case 'booking':
        return selectedATV ? (
          <BookingForm
            atv={selectedATV}
            onCancel={() => setCurrentView('detail')}
            onSubmit={handleBookingSubmit}
          />
        ) : null;
      case 'confirmation':
        return (lastBooking && selectedATV) ? (
          <ConfirmationPage
            booking={lastBooking}
            atv={selectedATV}
            onHome={() => {
              setLastBooking(null);
              setSelectedATV(null);
              setCurrentView('home');
            }}
          />
        ) : (
          // Fallback if state is missing
          (() => { setCurrentView('home'); return null; })()
        );
      case 'home':
      default:
        return (
          <>
            <Hero onCtaClick={() => {
              const element = document.getElementById('fleet-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }} />

            <section id="fleet-section" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <span className="text-primary font-bold uppercase tracking-widest text-sm font-display">Our Fleet</span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 tracking-wide font-display">Choose Your Ride</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                  Maintained daily by our expert mechanics. Whether you want agility for the hills or comfort for the long haul to Hermosa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {fleet.map((atv) => (
                  <ATVCard
                    key={atv.id}
                    atv={atv}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </section>

            <section id="about-us" className="relative py-20 px-4 mt-12 bg-white border-y border-gray-100">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm font-display">About Us</span>
                  <h3 className="text-3xl font-bold mb-6 mt-2 tracking-wide font-display text-gray-900">Who We Are</h3>
                  <p className="text-lg text-gray-600 leading-relaxed font-light">
                    Founded in Santa Teresa in 2020, Bambirental is a family-owned company dedicated to making your vacation smooth and stress-free. We provide reliable transportation so you can explore the jungle, beaches, and hidden gems of the area with total freedom. More than a rental service, we're your local partner for unforgettable adventures.
                  </p>
                </div>
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/pictures/Buttom.JPG"
                    alt="Santa Teresa Beach Sunset"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900 relative overflow-hidden">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-10 h-10 bg-primary/20 backdrop-blur-md rounded-lg flex items-center justify-center transform -rotate-6 border border-primary/50 shadow-[0_0_15px_rgba(255,87,34,0.3)]">
                <span className="text-primary font-bold text-xl font-display">B</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight font-display">BambiRentals</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-primary font-medium transition-colors">Fleet</button>
              <button
                onClick={() => {
                  const element = document.getElementById('about-us');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >About Us</button>
              <a
                href="https://wa.me/50664132024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary font-medium transition-colors flex items-center gap-1"
                title="WhatsApp"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:ofeynat2021@gmail.com"
                className="text-gray-600 hover:text-primary font-medium transition-colors flex items-center gap-1"
                title="Email"
                aria-label="Send us an email"
              >
                <Mail size={20} />
              </a>
              <button
                onClick={() => setIsFAQOpen(!isFAQOpen)}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >Help & FAQ</button>
              <button
                onClick={() => {
                  const element = document.getElementById('fleet-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setCurrentView('home');
                  }
                }}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-[0_0_15px_rgba(255,87,34,0.4)] hover:shadow-[0_0_25px_rgba(255,87,34,0.6)] transform hover:-translate-y-0.5"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 p-2 hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 text-lg font-medium text-stone-600 border-b border-stone-100">Fleet</button>
              <button
                onClick={() => {
                  setCurrentView('home');
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="block w-full text-left py-3 text-lg font-medium text-stone-600 border-b border-stone-100"
              >About Us</button>
              <a
                href="https://wa.me/50664132024"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-lg font-medium text-stone-600 border-b border-stone-100"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:ofeynat2021@gmail.com"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-lg font-medium text-stone-600 border-b border-stone-100"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
              <button
                onClick={() => {
                  setIsFAQOpen(!isFAQOpen);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left py-3 text-lg font-medium text-stone-600 border-b border-stone-100"
              >Help & FAQ</button>
              <div className="pt-4">
                <button
                  onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg"
                >
                  Book Your ATV
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* FAQ Assistant */}
      <FAQAssistant isOpen={isFAQOpen} onToggle={setIsFAQOpen} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/50664132024"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
        aria-label="WhatsApp 24/7 Support"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-semibold hidden sm:block">24/7 Support</span>
      </a>

      {/* Footer */}
      <footer className="bg-[#0A0E17] border-t border-white/5 text-slate-300 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Column 1: Brand & Social */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary/20 backdrop-blur-md rounded flex items-center justify-center border border-primary/50 shadow-[0_0_10px_rgba(255,87,34,0.3)]">
                <span className="text-primary font-bold font-display">B</span>
              </div>
              <span className="text-xl font-bold text-white font-display">BambiRentals</span>
            </div>
            <p className="text-slate-400 mb-6 font-light">
              Your gateway to the hidden gems of the Nicoya Peninsula. Reliable rides, local vibes.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/50664132024"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-2 font-semibold"
              >
                <MessageCircle size={24} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4 font-light">
              <li className="flex items-start gap-3">
                <a
                  href="https://maps.app.goo.gl/XDJKBbcmnjrvpGPn6?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-primary transition-colors"
                >
                  <MapPin className="text-primary shrink-0 mt-1" size={20} />
                  <span>Santa Teresa, Costa Rica</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={20} />
                <span>+506 6413-2024</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="text-primary shrink-0" size={20} />
                <span>Daily: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-slate-500 text-sm font-light">
          © {new Date().getFullYear()} BambiRentals. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;