import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { MessageSquare, Phone, Mail, Calendar, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { siteSettings, socialLinks } = data;

  const whatsapp = socialLinks.find(s => s.id === 'whatsapp');

  return (
    <div className="fixed bottom-6 left-6 z-40 floating-contact">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 p-3 bg-[#121316]/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-md animate-slide-up w-56 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 px-1">
            <span className="text-xs font-semibold text-zinc-300">Quick Studio Reach</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-0.5 rounded"
              aria-label="Close contact drawer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {whatsapp && whatsapp.enabled && (
            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <span>WhatsApp Direct</span>
            </a>
          )}

          <a
            href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-bamboo-500/10 text-bamboo-400 border border-bamboo-500/20">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>Call Studio</span>
          </a>

          <a
            href={`mailto:${siteSettings.email}`}
            className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span>Send Email</span>
          </a>

          <button
            onClick={() => {
              navigate('/contacts');
              setIsOpen(false);
            }}
            className="hidden lg:flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-bamboo-400 hover:text-white hover:bg-bamboo-500/20 transition-colors text-left"
          >
            <div className="p-1.5 rounded-lg bg-bamboo-500/20 text-bamboo-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span>Book Shoot Date</span>
          </button>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Quick contact and shoot booking"
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-bamboo-500 to-emerald-600 text-white font-medium text-xs sm:text-sm shadow-xl hover:shadow-bamboo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-bamboo-400/40"
      >
        <MessageSquare className="w-4 h-4 animate-pulse-subtle" />
        <span className="lg:hidden">Quick Contact</span>
        <span className="hidden lg:inline">Inquire / Book</span>
      </button>
    </div>
  );
}
