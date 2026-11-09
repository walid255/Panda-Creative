import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Sun, Moon, Search, Menu, ChevronDown, Sparkles, FolderKanban, Users } from 'lucide-react';

export default function Navbar({ onOpenMobileMenu }) {
  const { currentPath, navigate } = useRouter();
  const { darkMode, toggleDarkMode, openSearch } = useCMS();
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => currentPath === path;
  const isAboutActive = currentPath === '/about' || currentPath === '/portfolio';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel dark:glass-panel bg-white/80 dark:bg-[#0c0d0f]/85 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo in Image Form */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group text-left focus:outline-none"
          aria-label="Panda Creative Homepage"
        >
          <img
            src="/logo.svg"
            alt="Panda Creative Photo and Cinematography Studio Logo"
            className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            width="180"
            height="45"
            loading="eager"
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
              isActive('/')
                ? 'text-bamboo-600 dark:text-bamboo-400 font-semibold bg-bamboo-500/10'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Home
          </button>

          {/* About Us (With Dropdown containing Portfolio as requested) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              onMouseEnter={() => setAboutDropdownOpen(true)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                isAboutActive
                  ? 'text-bamboo-600 dark:text-bamboo-400 font-semibold bg-bamboo-500/10'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
              aria-expanded={aboutDropdownOpen}
              aria-haspopup="true"
            >
              <span>About Us</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {aboutDropdownOpen && (
              <div
                onMouseLeave={() => setAboutDropdownOpen(false)}
                className="absolute top-full left-0 mt-1.5 w-56 p-2 rounded-2xl bg-white dark:bg-[#121316] text-zinc-800 dark:text-zinc-200 shadow-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl animate-slide-up z-50"
              >
                <button
                  onClick={() => {
                    navigate('/about');
                    setAboutDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                    isActive('/about')
                      ? 'bg-bamboo-500/10 text-bamboo-500 font-semibold'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <Users className="w-4 h-4 text-bamboo-500" />
                  <div>
                    <span className="block font-semibold">About Studio</span>
                    <span className="text-[10px] text-zinc-400">Story, directors &amp; cinema gear</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    navigate('/portfolio');
                    setAboutDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors text-left mt-1 ${
                    isActive('/portfolio')
                      ? 'bg-bamboo-500/10 text-bamboo-500 font-semibold'
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <FolderKanban className="w-4 h-4 text-bamboo-500" />
                  <div>
                    <span className="block font-semibold">Portfolio</span>
                    <span className="text-[10px] text-zinc-400">Curated showcase &amp; films</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/services')}
            className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
              isActive('/services')
                ? 'text-bamboo-600 dark:text-bamboo-400 font-semibold bg-bamboo-500/10'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => navigate('/pricing')}
            className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
              isActive('/pricing')
                ? 'text-bamboo-600 dark:text-bamboo-400 font-semibold bg-bamboo-500/10'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => navigate('/gallery')}
            className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
              isActive('/gallery')
                ? 'text-bamboo-600 dark:text-bamboo-400 font-semibold bg-bamboo-500/10'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Gallery
          </button>

          <button
            onClick={() => navigate('/contacts')}
            className={`px-3 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
              isActive('/contacts')
                ? 'text-bamboo-600 dark:text-bamboo-400 font-semibold bg-bamboo-500/10'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Contacts
          </button>
        </nav>

        {/* Right Controls: Search, Theme Toggle, Book CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openSearch}
            type="button"
            aria-label="Search website"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all duration-200 border border-zinc-200 dark:border-zinc-700/50"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] px-1 py-0.2 bg-zinc-200 dark:bg-zinc-900 rounded text-zinc-500 dark:text-zinc-400 font-mono">⌘K</kbd>
          </button>

          <button
            onClick={toggleDarkMode}
            type="button"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="hidden md:inline-flex p-2.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-200 border border-zinc-200 dark:border-zinc-700/50"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          <button
            onClick={() => navigate('/contacts')}
            className="hidden md:inline-flex btn-panda-primary text-xs tracking-wider uppercase font-semibold"
          >
            Book Shoot
          </button>

          <button
            onClick={onOpenMobileMenu}
            type="button"
            aria-label="Open mobile menu"
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
}
