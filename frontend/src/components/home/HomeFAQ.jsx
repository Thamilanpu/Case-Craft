import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, Sparkles } from 'lucide-react';

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

 const faqs = [
  {
    question: "Can I put multiple pets or people on one phone case?",
    answer: "Absolutely! Our designers are collage experts. You can add up to 6 pets (or mix pets + people) on most cases. Just upload your photos — we’ll handle the rest and make it look stunning. Many customers do full family portraits!"
  },
  {
    question: "Do I get to see a proof before it prints?",
    answer: "Yes — always. Within 12–24 hours of ordering, you’ll receive a digital mockup of your exact case. You can move the photo, adjust brightness, crop, add text, or change anything until it’s 100% perfect. We don’t print until you reply “YES!”"
  },
  {
    question: "What case types do you offer?",
    answer: "All the best ones:\n• Tough Armor – maximum drop protection (our bestseller)\n• Clear Glow – anti-yellowing, shows off your design\n• Slim Matte – lightweight & sleek\n• MagSafe Compatible – strong magnets, works perfectly\n• Eco Bio Case – 100% biodegradable (plant-based)\n• Wallet & Flip Cases – with card slots"
  },
  {
    question: "How long will it take to get my case?",
    answer: "Production: 2–4 business days (handmade just for you)\nShipping: 3–7 days (free on orders $40+)\nMost customers receive their case in 7–10 days total.\nNeed it faster? Add Rush Production at checkout — ships in 24–48 hours!"
  },
  {
    question: "Can I order for different phone models at once?",
    answer: "Yes! Add as many cases as you want to your cart — each can have a different photo and phone model (iPhone, Samsung, Google Pixel, etc.). Perfect for gifting or matching with family members!"
  },
  {
    question: "Do you offer gift wrapping or messages?",
    answer: "Yes! At checkout, choose “Gift Option” — we’ll wrap it beautifully, include a handwritten card with your message, and hide the price. Many customers use this for birthdays, Christmas, and Rainbow Bridge memorials."
  }
];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#fe7245]/10 text-[#fe7245] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Common Questions
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-[#0a214f] leading-tight">
            Got Questions?<br />
            <span className="text-[#fe7245]">We’ve Got Answers</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className={`
                group rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 border-2
                ${openIndex === index 
                  ? 'bg-[#0a214f] text-white border-[#fe7245] shadow-2xl shadow-[#fe7245]/20' 
                  : 'bg-white border-transparent hover:border-[#0a214f]/20 hover:shadow-xl'
                }
              `}
            >
              {/* Question */}
              <div className="px-8 py-6 flex justify-between items-center">
                <h3 className={`font-bold text-xl md:text-2xl transition-colors ${
                  openIndex === index ? 'text-white' : 'text-[#0a214f] group-hover:text-[#fe7245]'
                }`}>
                  {faq.question}
                </h3>
                <div className={`
                  p-3 rounded-full transition-all duration-300
                  ${openIndex === index 
                    ? 'bg-[#fe7245] text-[#0a214f] rotate-180' 
                    : 'bg-[#0a214f]/10 text-[#0a214f] group-hover:bg-[#fe7245] group-hover:text-white'
                  }
                `}>
                  {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </div>

              {/* Answer */}
              <div className={`grid transition-all duration-500 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}>
                <div className="overflow-hidden">
                  <p className="px-8 pb-8 text-lg leading-relaxed text-white/90">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
  <p className="text-[#0a214f]/80 text-lg md:text-xl mb-6">
    Still unsure?
  </p>

  <button
    className="
      group inline-flex items-center gap-2
      bg-[#0a214f] text-white px-5 py-3 md:px-10 md:py-5 rounded-full text-base md:text-xl font-bold shadow-2xl
      hover:bg-[#fe7245] hover:text-[#0a214f] hover:scale-105 transition-all duration-300"
  >
    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
    Chat With Us — We Reply in Minutes
  </button>
</div>


      </div>
    </section>
  );
}