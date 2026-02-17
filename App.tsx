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
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
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
            
            <section id="fleet-section" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Our Fleet</span>
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mt-2 mb-4">Choose Your Ride</h2>
                <p className="text-stone-600 max-w-2xl mx-auto text-lg">
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

            <section id="about-us" className="bg-emerald-900 text-white py-20 px-4">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-orange-500 font-bold uppercase tracking-wider text-sm">About Us</span>
                  <h3 className="text-3xl font-bold mb-6 mt-2">Who We Are</h3>
                  <p className="text-lg text-emerald-100 leading-relaxed">
                    Founded in Santa Teresa in 2020, Bambirental is a family-owned company dedicated to making your vacation smooth and stress-free. We provide reliable transportation so you can explore the jungle, beaches, and hidden gems of the area with total freedom. More than a rental service, we're your local partner for unforgettable adventures.
                  </p>
                </div>
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1500759285222-a95c2a7b347a?auto=format&fit=crop&w=800" 
                    alt="Santa Teresa Jungle" 
                    className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center transform -rotate-6">
                 <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold text-emerald-950 tracking-tight">BambiRentals</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setCurrentView('home')} className="text-stone-600 hover:text-orange-600 font-medium transition-colors">Fleet</button>
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
                className="text-stone-600 hover:text-orange-600 font-medium transition-colors"
              >About Us</button>
              <a
                href="https://wa.me/50664132024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-orange-600 font-medium transition-colors flex items-center gap-1"
                title="WhatsApp"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:ofeynat2021@gmail.com"
                className="text-stone-600 hover:text-orange-600 font-medium transition-colors flex items-center gap-1"
                title="Email"
                aria-label="Send us an email"
              >
                <Mail size={20} />
              </a>
              <button
                onClick={() => setIsFAQOpen(!isFAQOpen)}
                className="text-stone-600 hover:text-orange-600 font-medium transition-colors"
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
                className="bg-emerald-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-emerald-950 p-2"
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
                  className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg"
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

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Column 1: Brand & Social */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                 <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-bold text-white">BambiRentals</span>
            </div>
            <p className="text-emerald-300/80 mb-6">
              Your gateway to the hidden gems of the Nicoya Peninsula. Reliable rides, local vibes.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/50664132024" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-orange-400 transition-colors flex items-center gap-2 font-semibold"
              >
                <MessageCircle size={24} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
          
          {/* Column 2: Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <a 
                  href="https://maps.google.com/?q=9.611115,-85.143463" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-orange-400 transition-colors"
                >
                  <MapPin className="text-orange-500 shrink-0 mt-1" size={20} />
                  <span>Santa Teresa, Costa Rica</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-orange-500 shrink-0" size={20} />
                <span>+506 6413 2024</span>
              </li>
              <li className="flex items-center gap-3">
                <Calendar className="text-orange-500 shrink-0" size={20} />
                <span>Daily: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-emerald-900 text-center text-emerald-400 text-sm">
          © {new Date().getFullYear()} BambiRentals. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;