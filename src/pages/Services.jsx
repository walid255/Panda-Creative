import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Film, Camera, HeartHandshake, Plane, Disc, Sliders, CheckCircle2, ArrowRight, Clock, DollarSign, Sparkles } from 'lucide-react';

export default function Services() {
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { services } = data;

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-pink-400" />;
      case 'Film':
        return <Film className="w-6 h-6 text-bamboo-400" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-sky-400" />;
      case 'Camera':
        return <Camera className="w-6 h-6 text-emerald-400" />;
      case 'Disc':
        return <Disc className="w-6 h-6 text-purple-400" />;
      case 'Sliders':
        return <Sliders className="w-6 h-6 text-amber-400" />;
      default:
        return <Film className="w-6 h-6 text-bamboo-400" />;
    }
  };

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Creative Vision",
      desc: "We discuss your vision, mood boards, music styles, shot lists, and timelines to construct a bulletproof production plan."
    },
    {
      step: "02",
      title: "The Production Shoot",
      desc: "Our directors, lighting technicians, and drone pilots execute every shot with Sony FX6, RED 6K, and high-end prime optics."
    },
    {
      step: "03",
      title: "DaVinci Color & Sound Design",
      desc: "Footage is ingested with checksum verification, cut to music rhythm, and color graded in DaVinci Resolve Studio."
    },
    {
      step: "04",
      title: "4K YouTube & Cloud Master Delivery",
      desc: "We deliver full-res master ProRes files and provide optimized 4K YouTube uploads with chapters and custom thumbnails."
    }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Spectrum Production</span>
        </div>
        {/* SINGLE H1 TAG PER PAGE */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-serif tracking-tight">
          Photography &amp; Cinematography Services
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
          From multi-day luxury destination weddings to global commercial campaigns, explore our complete suite of cinema and photographic disciplines.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {services.map((svc, idx) => (
          <div
            key={svc.id}
            className={`p-8 sm:p-10 rounded-3xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-bamboo-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start`}
          >
            {/* Col 1: Overview */}
            <div className="lg:col-span-1 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                {getServiceIcon(svc.icon)}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {svc.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {svc.fullDesc || svc.shortDesc}
              </p>
              
              <div className="pt-2 flex flex-col gap-1.5 text-xs">
                <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Clock className="w-4 h-4 text-bamboo-500" />
                  <span>Coverage: <strong>{svc.duration}</strong></span>
                </span>
                <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <DollarSign className="w-4 h-4 text-bamboo-500" />
                  <span>Investment: <strong className="text-bamboo-500 font-bold">{svc.startingPrice}</strong></span>
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/contacts')}
                  className="btn-panda-primary text-xs py-2.5 px-6 uppercase tracking-wider font-semibold"
                >
                  Book This Service
                </button>
              </div>
            </div>

            {/* Col 2 & 3: Deliverables */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0c0d0f] p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
                What Is Included &amp; Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {svc.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-bamboo-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Production Workflow Section */}
      <section className="mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-bamboo-500 mb-2 block">
            Our Proven Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-serif">
            From First Call to 4K YouTube Premiere
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((ps, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 relative"
            >
              <span className="text-3xl font-extrabold text-bamboo-500/30 dark:text-bamboo-500/20 font-serif block mb-3">
                {ps.step}
              </span>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                {ps.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {ps.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
