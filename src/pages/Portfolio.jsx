import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Play, X, Camera, Video, ExternalLink } from 'lucide-react';
import CopyButton from '../components/CopyButton';

export default function Portfolio() {
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { portfolioItems } = data;

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const categories = ['All', 'Weddings', 'Commercial', 'Fashion', 'Drone', 'Cinematic'];

  const items = portfolioItems || [];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Showcase • Managed via CMS</span>
          </div>
          {/* SINGLE H1 TAG PER PAGE */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-serif tracking-tight">
            Portfolio &amp; Selected Works
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
            A hand-picked collection of high-resolution stills and YouTube 4K cinematic films produced across the globe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={() => navigate('/contacts')}
            className="hidden md:inline-flex btn-panda-primary text-xs px-5 py-2.5 uppercase tracking-wider font-bold"
          >
            Book Shoot
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 no-print" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-bamboo-500 text-white shadow-md shadow-bamboo-500/20'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const isVideo = item.type === 'video';

          return (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div 
                className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black"
                onClick={() => {
                  if (isVideo) {
                    setActiveVideoModal(item);
                  } else {
                    setActiveLightbox(item);
                  }
                }}
              >
                <img
                  src={isVideo ? item.thumbnail : item.url}
                  alt={`${item.title} - ${item.category} by Panda Creative`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Video Play Button Overlay */}
                {isVideo && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/20">
                    <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/70 text-white border border-white/10 flex items-center gap-1">
                  {isVideo ? <Video className="w-3 h-3 text-red-400" /> : <Camera className="w-3 h-3 text-bamboo-400" />}
                  <span>{isVideo ? 'YouTube 4K' : item.category}</span>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-6 bg-white dark:bg-[#121316] text-zinc-900 dark:text-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="text-bamboo-500 font-semibold">{item.category}</span>
                    <span className="font-mono text-[11px]">{item.year || '2026'}</span>
                  </div>
                  <h3 className="text-base font-bold group-hover:text-bamboo-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono text-[11px] text-zinc-500 truncate max-w-[180px]">
                    {item.gear || 'Sony Cine Line'}
                  </span>

                  {isVideo ? (
                    <button
                      onClick={() => setActiveVideoModal(item)}
                      className="text-red-500 font-semibold hover:underline text-xs"
                    >
                      Watch Film →
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveLightbox(item)}
                      className="text-bamboo-500 font-semibold hover:underline text-xs"
                    >
                      View High-Res →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Photos */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#121316] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 text-white">
              <div>
                <h3 className="text-sm font-bold text-white">{activeLightbox.title}</h3>
                <span className="text-xs text-zinc-400">{activeLightbox.category} • Shot on {activeLightbox.gear}</span>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={activeLightbox.url} label="Copy Image Link" />
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black">
              <img
                src={activeLightbox.url}
                alt={activeLightbox.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <p className="max-w-xl">{activeLightbox.description}</p>
              <button
                onClick={() => {
                  navigate('/contacts');
                  setActiveLightbox(null);
                }}
                className="btn-panda-primary text-xs py-1.5 px-4"
              >
                Inquire About This Style
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for YouTube Videos */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="p-3 bg-zinc-950 flex items-center justify-between border-b border-zinc-800 text-white">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-white">{activeVideoModal.title}</span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-zinc-400 hover:text-white px-2 py-1 text-xs bg-zinc-800 rounded"
              >
                Close ✕
              </button>
            </div>
            <div className="video-responsive-container">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-zinc-950 text-xs text-zinc-400 flex items-center justify-between">
              <span>Client: <strong className="text-white">{activeVideoModal.client}</strong></span>
              <a
                href={activeVideoModal.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:underline inline-flex items-center gap-1"
              >
                Open in YouTube <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
