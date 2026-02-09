import React, { useState } from 'react';
import { MessageCircle, X, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: "What do I need to rent an ATV?",
        answer: "A valid driver's license, a credit card for the deposit, and you must be at least 18 years old."
    },
    {
        question: "Do you deliver the ATV to my hotel?",
        answer: "Yes! We offer free delivery anywhere in Santa Teresa, Mal Pais, and Hermosa."
    },
    {
        question: "Is it legal to drive on the beach?",
        answer: "No. Driving on the beach sand is strictly prohibited by Costa Rican law."
    },
    {
        question: "What's included in the rental?",
        answer: "Helmet, basic liability insurance, a full tank of gas."
    },
    {
        question: "What's the difference between the Honda 450 and 520?",
        answer: "The 450 is lighter and more agile — great for solo riders on steep hills. The 520 is a 4x4 with power steering and automatic transmission — perfect for longer trips or rougher roads."
    },
    {
        question: "How do I book?",
        answer: "Use the booking form on our site and we'll confirm via email. For the fastest response, message us directly on WhatsApp."
    }
];

export const FAQAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 max-h-[600px] mb-4 flex flex-col border border-stone-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                     <div className="bg-emerald-900 p-4 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="bg-orange-500 p-1.5 rounded-full">
                                <HelpCircle size={16} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">FAQ</h3>
                                <p className="text-xs text-emerald-300">Common Questions</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-orange-400 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-4 space-y-3 bg-stone-50">
                        {FAQS.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                                <button 
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left p-4 flex justify-between items-center gap-3 hover:bg-stone-50 transition-colors"
                                >
                                    <span className="font-semibold text-emerald-950 text-sm">{faq.question}</span>
                                    {openIndex === index ? (
                                        <ChevronUp size={18} className="text-orange-500 shrink-0" />
                                    ) : (
                                        <ChevronDown size={18} className="text-stone-400 shrink-0" />
                                    )}
                                </button>
                                
                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <div className="p-4 pt-0 text-sm text-stone-600 leading-relaxed border-t border-stone-100 mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-emerald-900 hover:bg-emerald-800 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-2 group"
                >
                    <MessageCircle size={28} />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
                        Help / FAQ
                    </span>
                </button>
            )}
        </div>
    );
};