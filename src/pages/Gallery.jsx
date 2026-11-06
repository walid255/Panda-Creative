import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import {
  Sparkles,
  Camera,
  Video,
  Play,
  Search,
  X,
  Share2,
  ExternalLink,
  Layers,
  Calendar,
  Clock,
  Check
} from 'lucide-react';
import CopyButton from '../components/CopyButton';

export default function Gallery() {
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { galleryItems } = data;

  const [mediaTypeFilter, setMediaTypeFilter] = useState('all'); // 'all' | 'photo' | 'video'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activePhotoLightbox, setActivePhotoLightbox] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const categories = ['All', 'Weddings', 'Commercial', 'Fashion', 'Drone', 'Cinematic'];

  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      // 1. Media Type Filter
      if (mediaTypeFilter === 'photo' && item.type !== 'photo') return false;
      if (mediaTypeFilter === 'video' && item.type !== 'video') return false;

      // 2. Category Filter
      if (categoryFilter !== 'All' && item.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // 3. Search Query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesCat = item.category?.toLowerCase().includes(q);
        const matchesGear = item.gear?.toLowerCase().includes(q);
        const matchesClient = item.client?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesGear && !matchesClient) {
          return false;
        }
      }

      return true;
    });
  }, [galleryItems, mediaTypeFilter, categoryFilter, searchTerm]);

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full Visual Archives</span>
        </div>
        {/* SINGLE H1 TAG PER PAGE */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-serif tracking-tight">
          Gallery: Fine-Art Photos &amp; YouTube Films
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
          Browse our high-resolution photography archives and watch 4K cinematic film highlights streamed directly via YouTube.
        </p>
      </div>

      {/* Control Bar: Media Type Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-zinc-50 dark:bg-[#121316] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        
        {/* Media Type Tabs (All, Photos Only, YouTube Videos Only) */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-200 dark:bg-zinc-900 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setMediaTypeFilter('all')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mediaTypeFilter === 'all'
                ? 'bg-bamboo-500 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Media ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setMediaTypeFilter('photo')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mediaTypeFilter === 'photo'
                ? 'bg-bamboo-500 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-bamboo-400" />
            <span>Photos ({galleryItems.filter(i => i.type === 'photo').length})</span>
          </button>

          <button
            onClick={() => setMediaTypeFilter('video')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mediaTypeFilter === 'video'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube Videos ({galleryItems.filter(i => i.type === 'video').length})</span>
          </button>
        </div>

        {/* Search Inside Gallery */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search gallery archives..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-500 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-bamboo-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              categoryFilter === cat
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Filter Summary */}
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-6">
        <span>Showing {filteredItems.length} item(s)</span>
        {(searchTerm || categoryFilter !== 'All' || mediaTypeFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('All');
              setMediaTypeFilter('all');
            }}
            className="text-bamboo-500 hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Media Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center text-zinc-500">
          <Camera className="w-12 h-12 mx-auto mb-3 opacity-30 text-bamboo-500" />
          <h3 className="text-base font-bold text-zinc-400 mb-1">No items found</h3>
          <p className="text-xs">Try selecting another category or searching a different term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isVideo = item.type === 'video';

            return (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Media Container */}
                <div
                  className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black"
                  onClick={() => {
                    if (isVideo) {
                      setActiveVideoModal(item);
                    } else {
                      setActivePhotoLightbox(item);
                    }
                  }}
                >
                  <img
                    src={isVideo ? item.thumbnail : item.url}
                    alt={`${item.title} - ${item.category} photography and video by Panda Creative`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Video Play Button Overlay */}
                  {isVideo && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/20">
                      <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/75 text-white border border-white/10 flex items-center gap-1.5">
                    {isVideo ? (
                      <>
                        <Video className="w-3.5 h-3.5 text-red-400" />
                        <span>YouTube 4K</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5 text-bamboo-400" />
                        <span>{item.category}</span>
                      </>
                    )}
                  </div>

                  {isVideo && item.duration && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-white">
                      {item.duration}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                      <span className="text-bamboo-500 font-semibold">{item.category}</span>
                      <span className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>Updated: {item.date}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-bamboo-500 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[170px]">
                      {item.gear || 'Sony Cine Line'}
                    </span>

                    {isVideo ? (
                      <button
                        onClick={() => setActiveVideoModal(item)}
                        className="text-red-500 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-red-500" />
                        <span>Play Video</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setActivePhotoLightbox(item)}
                        className="text-bamboo-500 font-bold hover:underline"
                      >
                        Inspect Photo →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox for Photos */}
      {activePhotoLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#121316] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 text-white">
              <div>
                <h3 className="text-sm font-bold text-white">{activePhotoLightbox.title}</h3>
                <span className="text-xs text-zinc-400">{activePhotoLightbox.category} • Gear: {activePhotoLightbox.gear}</span>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={activePhotoLightbox.url} label="Copy Photo URL" />
                <button
                  onClick={() => setActivePhotoLightbox(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                  aria-label="Close photo view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-black">
              <img
                src={activePhotoLightbox.url}
                alt={activePhotoLightbox.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
              <p>{activePhotoLightbox.description}</p>
              <button
                onClick={() => {
                  navigate('/contacts');
                  setActivePhotoLightbox(null);
                }}
                className="btn-panda-primary text-xs py-2 px-5 shrink-0"
              >
                Inquire For This Aesthetic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for YouTube Videos */}
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

            {/* YouTube Player */}
            <div className="video-responsive-container">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1&rel=0`}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-zinc-950 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-zinc-300 font-medium">{activeVideoModal.description}</p>
                <span className="text-[11px] text-zinc-500 block mt-1">Client: {activeVideoModal.client} • Gear: {activeVideoModal.gear}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeVideoModal.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
