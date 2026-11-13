import React, { useEffect, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { X, ChevronDown, Phone, Mail, Sun, Moon, Search } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, WhatsAppIcon } from './SocialIcons';

export default function MobileMenu({ isOpen, onClose }) {
  const { currentPath, navigate } = useRouter();
  const { data, darkMode, toggleDarkMode, openSearch } = useCMS();
  const { siteSettings, socialLinks } = data;
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);

  useEffect(() => {
    if (isOpen) setAboutSubmenuOpen(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNav = (path) => {
    setAboutSubmenuOpen(false);
    navigate(path);
    onClose();
  };

  const isActive = (path) => currentPath === path;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md animate-fade-in lg:hidden"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xs h-full bg-[#0c0d0f] text-white p-6 flex flex-col justify-between shadow-2xl border-l border-zinc-800 animate-slide-up overflow-y-auto"
        onClick={(event) => {
          event.stopPropagation();
          if (!event.target.closest('[data-about-toggle]')) {
            setAboutSubmenuOpen(false);
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <img
              src="/logo.svg"
              alt="Panda Creative Logo"
              className="h-9 w-auto"
              width="140"
              height="36"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Actions in Mobile Menu: Dark Mode & Search */}
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setAboutSubmenuOpen(false);
                  onClose();
                  openSearch();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white"
              >
                <Search className="w-3.5 h-3.5 text-bamboo-400" />
                <span>Search</span>
              </button>
              <button
                type="button"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={() => {
                  setAboutSubmenuOpen(false);
                  toggleDarkMode();
                  onClose();
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{darkMode ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1.5" aria-label="Mobile Navigation Links">
            <button
              onClick={() => handleNav('/')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/') ? 'bg-bamboo-500 text-white' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              Home
            </button>

            {/* About Us + Dropdown/Accordion for Portfolio */}
            <div data-about-menu className="rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/80">
              <button
                data-about-toggle
                onClick={() => setAboutSubmenuOpen(!aboutSubmenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-zinc-300 hover:text-white"
                aria-expanded={aboutSubmenuOpen}
              >
                <span>About Us</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${aboutSubmenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutSubmenuOpen && (
                <div className="px-3 pb-3 space-y-1">
                  <button
                    onClick={() => handleNav('/about')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive('/about') ? 'bg-bamboo-500/20 text-bamboo-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    • About the Studio &amp; Gear
                  </button>
                  <button
                    onClick={() => handleNav('/portfolio')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive('/portfolio') ? 'bg-bamboo-500/20 text-bamboo-400 font-bold' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    • Portfolio Showcase
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/services')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/services') ? 'bg-bamboo-500 text-white' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              Services
            </button>

            <button
              onClick={() => handleNav('/pricing')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/pricing') ? 'bg-bamboo-500 text-white' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              Pricing (USD &amp; TZS)
            </button>

            <button
              onClick={() => handleNav('/gallery')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/gallery') ? 'bg-bamboo-500 text-white' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              Gallery (Photos &amp; Videos)
            </button>

            <button
              onClick={() => handleNav('/contacts')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/contacts') ? 'bg-bamboo-500 text-white' : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              Contacts &amp; Booking
            </button>
          </nav>
          <button
            onClick={() => handleNav('/contacts')}
            className="w-full mt-4 btn-panda-primary text-sm uppercase tracking-wider font-bold"
          >
            Book Shoot
          </button>
        </div>

        {/* Bottom Contact & Social Links */}
        <div className="pt-6 border-t border-zinc-800/80">
          <div className="mb-4 space-y-1.5 text-xs text-zinc-400">
            <a href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-bamboo-400" />
              <span>{siteSettings.phone}</span>
            </a>
            <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-bamboo-400" />
              <span>{siteSettings.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.filter(s => s.enabled).slice(0, 5).map(social => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                {social.id === 'instagram' && <InstagramIcon className="w-4 h-4 text-pink-500" />}
                {social.id === 'youtube' && <YoutubeIcon className="w-4 h-4 text-red-500" />}
                {social.id === 'whatsapp' && <WhatsAppIcon className="w-4 h-4 text-emerald-400" />}
                {social.id !== 'instagram' && social.id !== 'youtube' && social.id !== 'whatsapp' && (
                  <span className="text-xs font-bold">{social.name[0]}</span>
                )}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
