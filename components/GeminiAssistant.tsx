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
        answer: "Helmet and a full tank of gas."
    },
    {
        question: "What's the difference between the Honda 425 and 520?",
        answer: "Both models feature automatic transmissions and 4x4 capabilities. The 425 is lighter and more agile — great for solo riders on steep hills. The 520 features power steering and extra comfort — perfect for longer trips or rougher roads."
    },
    {
        question: "How do I book?",
        answer: "Use the booking form on our site and we'll confirm via email. For the fastest response, message us directly on WhatsApp."
    }
];

interface FAQAssistantProps {
    isOpen?: boolean;
    onToggle?: (open: boolean) => void;
}

export const FAQAssistant: React.FC<FAQAssistantProps> = ({ isOpen: controlledIsOpen, onToggle }) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const setIsOpen = (open: boolean) => {
        if (onToggle) {
            onToggle(open);
        } else {
            setInternalIsOpen(open);
        }
    };

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start">
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl w-80 sm:w-96 max-h-[600px] mb-4 flex flex-col border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 border border-primary/30 p-1.5 rounded-full">
                                <HelpCircle size={16} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm font-display text-gray-900">FAQ</h3>
                                <p className="text-xs text-secondary font-light">Common Questions</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors text-gray-400">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-4 space-y-3 bg-white">
                        {FAQS.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden transition-all hover:bg-gray-100">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left p-4 flex justify-between items-center gap-3 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 text-sm font-display">{faq.question}</span>
                                    {openIndex === index ? (
                                        <ChevronUp size={18} className="text-primary shrink-0" />
                                    ) : (
                                        <ChevronDown size={18} className="text-gray-400 shrink-0" />
                                    )}
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-4 pt-0 text-sm text-gray-600 font-light leading-relaxed border-t border-gray-200 mt-2">
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
                    className="bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] border border-primary/50 transition-all transform hover:-translate-y-1 flex items-center gap-2 group"
                >
                    <MessageCircle size={28} />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold font-display">
                        Help / FAQ
                    </span>
                </button>
            )}
        </div>
    );
};