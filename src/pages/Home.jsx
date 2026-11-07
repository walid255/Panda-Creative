import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import {
  Play,
  ArrowRight,
  Film,
  Sparkles,
  Star,
  ChevronDown,
  Video
} from 'lucide-react';

export default function Home() {
  const { navigate } = useRouter();
  const { data, currency } = useCMS();
  const { homeContent, galleryItems, services, faqs, testimonials = [] } = data;

  const [activeFaq, setActiveFaq] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Fallbacks for homeContent in case of partial saves
  const hc = homeContent || {
    badge: "Award-Winning Photography & 4K YouTube Cinematography",
    headlinePart1: "Every Frame a",
    headlineGradient: "Masterpiece",
    description: "We capture weddings, brand commercials, and editorial stories with Hollywood cinema gear and timeless soul.",
    heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    primaryCtaText: "Reserve Shoot Date",
    secondaryCtaText: "Watch 4K Showreel",
    showreelYoutubeId: "LXb3EKWsInQ",
    servicesSectionTitle: "Our Core Creative Services",
    servicesSectionDescription: "From intimate weddings to large commercial campaigns, we bring unmatched visual discipline.",
    testimonialsEyebrow: "Client Praise",
    testimonialsTitle: "Trusted by Couples & Global Brands",
    stats: [
      { id: "s1", value: "650+", label: "Shoots Completed" },
      { id: "s2", value: "10+", label: "Years Experience" },
      { id: "s3", value: "4K / 8K", label: "Cine Line Gear" },
      { id: "s4", value: "100%", label: "Client Love" }
    ]
  };

  const featuredPhotos = galleryItems.filter(i => i.type === 'photo').slice(0, 4);
  const featuredVideos = galleryItems.filter(i => i.type === 'video').slice(0, 2);

  return (
    <div className="w-full">
      
      {/* 1. Hero Section (Controlled via CMS Homepage Manager) */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white px-4 sm:px-6 lg:px-8 py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={hc.heroImage}
            alt="Panda Creative Cinematic Background"
            className="w-full h-full object-cover opacity-35 filter brightness-75 scale-105 animate-pulse-subtle"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0f] via-[#0c0d0f]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-bamboo-500/30 text-bamboo-400 text-xs sm:text-sm font-medium backdrop-blur-md animate-fade-in shadow-lg">
            <Sparkles className="w-4 h-4 text-bamboo-400" />
            <span>{hc.badge}</span>
          </div>

          {/* SINGLE H1 TAG PER PAGE FOR SEO */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight font-serif">
            {hc.headlinePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bamboo-400 via-emerald-300 to-white">
              {hc.headlineGradient}
            </span>.
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
            {hc.description}
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => navigate('/contacts')}
              className="btn-panda-primary text-sm sm:text-base px-8 py-4 uppercase tracking-wider font-semibold group shadow-xl"
            >
              <span>{hc.primaryCtaText || "Reserve Shoot Date"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                setActiveVideoModal({
                  title: hc.showreelTitle || "4K Master Showreel",
                  youtubeId: hc.showreelYoutubeId || "LXb3EKWsInQ",
                  description: "4K Sony FX6 & RED Cinema Showreel streamed through YouTube."
                });
              }}
              className="btn-panda-secondary text-sm sm:text-base px-7 py-4 group"
            >
              <Play className="w-4 h-4 text-bamboo-400 fill-bamboo-400 transition-transform group-hover:scale-110" />
              <span>{hc.secondaryCtaText || "Watch 4K Showreel"}</span>
            </button>
          </div>

          {/* Dynamic Stats Banner from CMS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-zinc-800/80 max-w-3xl mx-auto text-zinc-400">
            {hc.stats?.map((stat) => (
              <div key={stat.id}>
                <span className="block text-2xl sm:text-3xl font-bold text-white font-serif">{stat.value}</span>
                <span className="text-xs uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Featured Photo Masterpieces */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-bamboo-500 mb-2 block">
              Curated Highlights
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-serif">
              Visual Elegance in Motion &amp; Stills
            </h2>
          </div>
          <button
            onClick={() => navigate('/portfolio')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-bamboo-500 hover:text-bamboo-400 group"
          >
            <span>Explore Full Portfolio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => navigate('/gallery')}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={photo.url}
                  alt={`${photo.title} - ${photo.category} photography by Panda Creative`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-bamboo-400 mb-1">
                  {photo.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-bamboo-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-1 mt-1 font-light">
                  {photo.description}
                </p>
                <span className="text-[10px] text-zinc-400 mt-2 font-mono">
                  {photo.gear}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. YouTube Cinematic Films Showcase */}
      <section className="py-20 bg-zinc-950 text-white border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-bamboo-400 mb-2 block">
              4K YouTube Cinema Releases
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-serif">
              Cinematic Films Streamed Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
              Experience the depth of our cinema line cameras. Hosted in pristine 4K 60fps on YouTube with Dolby audio mastering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group flex flex-col"
              >
                <div className="video-responsive-container bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-bamboo-400 font-semibold mb-2">
                      <span className="uppercase tracking-wider">{video.category} • YouTube 4K</span>
                      <span className="font-mono text-zinc-400">{video.duration}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-bamboo-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                    <span>Client: <strong className="text-zinc-200">{video.client}</strong></span>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold"
                    >
                      <Video className="w-3.5 h-3.5" /> Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/gallery')}
              className="btn-panda-secondary text-sm px-7 py-3.5"
            >
              Browse Complete Photo &amp; YouTube Video Library
            </button>
          </div>
        </div>
      </section>

      {/* 4. Services Teaser (With USD / TZS Price Rendering) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-bamboo-500 mb-2 block">
            Tailored Production
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-serif">
            {hc.servicesSectionTitle || 'Our Core Creative Services'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            {hc.servicesSectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 3).map((svc) => {
            const price = currency === 'TZS' ? svc.startingPriceTZS : svc.startingPriceUSD;

            return (
              <div
                key={svc.id}
                className="p-8 rounded-3xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800/80 hover:border-bamboo-500/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-bamboo-500/10 text-bamboo-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-bamboo-500 group-hover:text-white transition-all">
                    <Film className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {svc.shortDesc}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-bamboo-500 block mb-4">
                    Starting at {price} ({currency})
                  </span>
                  <button
                    onClick={() => navigate('/services')}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-bamboo-500 hover:text-white transition-colors"
                  >
                    View Deliverables &amp; Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section className="py-20 bg-zinc-100 dark:bg-[#08090a] border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-bamboo-500 mb-2 block">
              {hc.testimonialsEyebrow || 'Client Praise'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-serif">
              {hc.testimonialsTitle || 'Trusted by Couples & Global Brands'}
            </h2>
            {hc.testimonialsDescription && (
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                {hc.testimonialsDescription}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div
                key={test.id || index}
                className="p-8 rounded-3xl bg-white dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed mb-6">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  {test.avatar ? (
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-300 dark:border-zinc-700"
                      loading="lazy"
                    />
                  ) : (
                    <div aria-hidden="true" className="w-10 h-10 rounded-full bg-bamboo-500/15 text-bamboo-500 flex items-center justify-center font-bold">
                      {test.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white">
                      {test.name}
                    </h3>
                    <span className="text-[11px] text-zinc-500 block">
                      {test.role} • {test.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Expandable FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-bamboo-500 mb-2 block">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-serif">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121316] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-semibold text-zinc-900 dark:text-white hover:text-bamboo-500 transition-colors"
                aria-expanded={activeFaq === idx}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-bamboo-500' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0c0d0f] to-zinc-900 p-8 sm:p-14 text-white text-center border border-zinc-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-bamboo-400">
              Dates Limited For 2026 &amp; 2027
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif">
              Ready to Craft Your Visual Story?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Contact our directors today to check studio availability, request an exact proposal in USD or TZS, or schedule a consultation.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/contacts')}
                className="btn-panda-primary px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider font-bold"
              >
                Inquire &amp; Reserve Date
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="btn-panda-secondary px-7 py-3.5 text-xs sm:text-sm"
              >
                View Pricing (USD &amp; TZS)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for 4K Showreel Video */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <div className="p-3 bg-zinc-950 flex items-center justify-between border-b border-zinc-800 text-white">
              <span className="text-xs font-bold text-bamboo-400">{activeVideoModal.title}</span>
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
          </div>
        </div>
      )}

    </div>
  );
}
