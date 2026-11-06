import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Search, X, Image as ImageIcon, Video, Layers, DollarSign, HelpCircle, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, data } = useCMS();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');

  const { galleryItems, services, pricingPackages, faqs } = data;

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const matches = [];

    // 1. Pages
    const pages = [
      { title: 'Home', path: '/', category: 'Page', desc: 'Main studio showcase, featured films and photography' },
      { title: 'About Us', path: '/about', category: 'Page', desc: 'Creative philosophy, director bios and camera gear' },
      { title: 'Portfolio', path: '/portfolio', category: 'Page', desc: 'Curated photo and video masterworks' },
      { title: 'Services', path: '/services', category: 'Page', desc: 'Weddings, commercial, drone aerials and color grading' },
      { title: 'Pricing Packages', path: '/pricing', category: 'Page', desc: 'Transparent production packages and print guides' },
      { title: 'Gallery (Photos & YouTube Films)', path: '/gallery', category: 'Page', desc: 'Full photo library and 4K YouTube cinematic reels' },
      { title: 'Contacts & Booking', path: '/contacts', category: 'Page', desc: 'Book your shoot date, inquire about availability' },
      { title: 'SEO Backlink Blueprint', path: '/backlink-strategy', category: 'Page', desc: 'Official studio PR and high-authority link strategy' }
    ];

    pages.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
        matches.push({ ...p, type: 'page' });
      }
    });

    // 2. Gallery Items (Photos & YouTube Videos)
    galleryItems.forEach(item => {
      if (
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.gear && item.gear.toLowerCase().includes(q)) ||
        (item.client && item.client.toLowerCase().includes(q))
      ) {
        matches.push({
          title: item.title,
          desc: `${item.category} • ${item.type === 'video' ? 'YouTube 4K Film' : 'High-Res Photo'} • ${item.description || ''}`,
          path: '/gallery',
          type: item.type === 'video' ? 'video' : 'photo',
          extra: item.type === 'video' ? item.youtubeId : null
        });
      }
    });

    // 3. Services
    services.forEach(s => {
      if (
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.deliverables.some(d => d.toLowerCase().includes(q))
      ) {
        matches.push({
          title: s.title,
          desc: `${s.startingPrice} • ${s.shortDesc}`,
          path: '/services',
          type: 'service'
        });
      }
    });

    // 4. Pricing
    pricingPackages.forEach(p => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      ) {
        matches.push({
          title: `${p.name} (${p.price})`,
          desc: p.subtitle,
          path: '/pricing',
          type: 'pricing'
        });
      }
    });

    // 5. FAQs
    faqs.forEach(f => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        matches.push({
          title: f.question,
          desc: f.answer,
          path: '/about',
          type: 'faq'
        });
      }
    });

    return matches.slice(0, 12);
  }, [query, galleryItems, services, pricingPackages, faqs]);

  if (!isSearchOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    closeSearch();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-red-400" />;
      case 'photo':
        return <ImageIcon className="w-4 h-4 text-bamboo-400" />;
      case 'service':
        return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'pricing':
        return <DollarSign className="w-4 h-4 text-amber-400" />;
      case 'faq':
        return <HelpCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <Search className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#121316] text-white border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-label="Full site search"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-950/60">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos, YouTube films, services, pricing, FAQs..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="px-2 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-800/80 rounded border border-zinc-700/50"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30 text-bamboo-500" />
              <span>Type a keyword like "wedding", "commercial", "youtube", "pricing", or "drone"</span>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              <span>No results found for "{query}". Try checking our Gallery or Services.</span>
            </div>
          ) : (
            results.map((res, index) => (
              <button
                key={index}
                onClick={() => handleSelect(res.path)}
                className="w-full text-left flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-800/60 transition-colors group border border-transparent hover:border-zinc-700/50"
              >
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5">
                  {getIcon(res.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white group-hover:text-bamboo-400 transition-colors truncate">
                      {res.title}
                    </h4>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                      {res.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                    {res.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="px-4 py-2.5 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <span>{results.length} result(s) found</span>
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300">Ctrl+K</kbd> anywhere</span>
        </div>
      </div>
    </div>
  );
}
