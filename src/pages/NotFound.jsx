import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Home, Search, Image as ImageIcon, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  const { navigate } = useRouter();
  const { openSearch } = useCMS();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md w-full space-y-6">
        
        {/* Panda 404 Visual */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-bamboo-500/10 border-2 border-dashed border-bamboo-500/30 animate-shutter-spin" />
          <img
            src="/favicon.svg"
            alt="Panda Creative Shutter Aperture"
            className="w-20 h-20 relative z-10"
            width="80"
            height="80"
          />
        </div>

        {/* SINGLE H1 TAG PER PAGE */}
        <div className="space-y-2">
          <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-bamboo-500 to-emerald-400 font-serif">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-serif">
            Out of Frame • Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The shot you were looking for seems to have moved or does not exist. Let's redirect you back to the showcase.
          </p>
        </div>

        {/* Helpful Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto btn-panda-primary text-xs py-3 px-6"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>

          <button
            onClick={openSearch}
            className="w-full sm:w-auto btn-panda-secondary text-xs py-3 px-6"
          >
            <Search className="w-4 h-4" />
            <span>Search Website</span>
          </button>
        </div>

        <div className="pt-4 text-xs text-zinc-500">
          <span>Or explore our </span>
          <button onClick={() => navigate('/gallery')} className="text-bamboo-500 hover:underline font-semibold">
            Photo &amp; YouTube Gallery
          </button>
        </div>

      </div>
    </div>
  );
}
