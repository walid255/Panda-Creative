import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { HelpCircle, ChevronRight, X, Sparkles } from 'lucide-react';

export default function StickyHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { faqs } = data;

  return (
    <div className="fixed bottom-20 right-6 z-30 sticky-help">
      {isOpen && (
        <div className="mb-3 p-4 bg-[#121316]/95 text-white border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-md animate-slide-up w-72 sm:w-80">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-bamboo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Studio Help &amp; FAQs</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-0.5"
              aria-label="Close help"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 my-2.5">
            Quick answers regarding production, YouTube films, and shoot reservations:
          </p>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {faqs.slice(0, 3).map((faq, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs">
                <span className="font-semibold text-zinc-200 block mb-1">{faq.question}</span>
                <p className="text-[11px] text-zinc-400 line-clamp-2">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                navigate('/contacts');
                setIsOpen(false);
              }}
              className="text-xs text-bamboo-400 hover:text-bamboo-300 font-medium inline-flex items-center gap-1"
            >
              Ask our team directly <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Toggle studio help widget"
        className="p-3 rounded-full bg-[#18191d]/90 text-zinc-300 hover:text-white border border-zinc-700/60 shadow-lg backdrop-blur-md hover:bg-zinc-800 transition-all duration-200 active:scale-95 flex items-center justify-center"
      >
        <HelpCircle className="w-5 h-5 text-bamboo-400" />
      </button>
    </div>
  );
}
