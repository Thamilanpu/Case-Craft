import React, { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

export default function PetFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Can I put more than one pet on a product?",
      answer: "Absolutely! For the fleece blankets and pillows, we can easily fit 2-3 pets. For smaller items like the Pickleball Paddle or Tote, we recommend 1 pet for the best detail, but we can make a custom collage if you ask nicely!"
    },
    {
      question: "Do I get to see a preview before you print?",
      answer: "Yes! We want you to be obsessed with it. Within 24 hours of your order, our artists will email you a digital proof. We won't print a single thing until you give us the thumbs up."
    },
    {
      question: "Is the Pickleball Paddle regulation size?",
      answer: "You bet. Our paddles feature a honeycomb core and graphite face, adhering to standard dimensions (15.75\" x 7.8\"). It's built for actual gameplay, not just for looking cute on Instagram."
    },
    {
      question: "How long does shipping take?",
      answer: "Since every item is made-to-order, please allow 3-5 business days for production. Once shipped, it usually takes 3-7 days to arrive at your doorstep. Good things are worth the wait!"
    },
    {
      question: "What if my photo isn't high quality?",
      answer: "Don't worry! If your photo is too blurry or dark, our design team will reach out to you immediately to ask for a better one. We review every single image to ensure the final print looks crisp."
    }
  ];

  return (
    <section className="py-24 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#fe7245] font-bold tracking-wider uppercase text-sm">
            Common Questions
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Everything You Need to Know
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
              className={`
                group rounded-3xl transition-all duration-300 cursor-pointer border
                ${index === openIndex 
                  ? 'bg-white shadow-xl border-purple-100 scale-[1.02]' 
                  : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-200'}
              `}
            >
              {/* Question Header */}
              <div className="px-8 py-6 flex justify-between items-center">
                <h3 className={`font-bold text-lg md:text-xl transition-colors ${index === openIndex ? 'text-purple-600' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <div className={`
                  p-2 rounded-full transition-all duration-300
                  ${index === openIndex ? 'bg-purple-100 text-purple-600 rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-50'}
                `}>
                  {index === openIndex ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </div>

              {/* Answer Content (Animated Height) */}
              <div 
                className={`grid transition-all duration-300 ease-in-out ${index === openIndex ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-8 pb-8 text-gray-600 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors shadow-lg">
            <MessageCircle className="w-4 h-4" />
            Chat with Support
          </button>
        </div>

      </div>
    </section>
  );
}