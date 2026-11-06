import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Camera, Film, Award, Heart, CheckCircle2, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

export default function About() {
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { siteSettings } = data;

  const gearList = [
    { name: "Sony FX6 Cinema Line", role: "Primary 4K 120fps Cinema Camera", desc: "Full-frame 15+ stops dynamic range with internal electronic variable ND." },
    { name: "Canon EOS R5 C 8K", role: "Hybrid Stills & 8K RAW Cinema", desc: "45MP high-resolution stills and ProRes RAW video." },
    { name: "RED Komodo 6K", role: "High-Speed Commercial Cinema", desc: "Global shutter for dynamic automotive and high-action commercial campaigns." },
    { name: "DJI Inspire 3 Drone", role: "FAA Licensed Aerial Cinematography", desc: "Full-frame 8K Zenmuse X9-8K camera system for sweeping cinematic vistas." },
    { name: "Cooke & Sony G-Master Primes", role: "Cine Optics", desc: "T1.4 – T2.0 fast aperture lenses providing buttery bokeh and rich skin tones." },
    { name: "Sennheiser & Deity Pro Audio", role: "Sound Recording", desc: "32-bit float broadcast wireless recording for pristine wedding vows and commercial voiceovers." }
  ];

  return (
    <div className="w-full">
      
      {/* Hero Header */}
      <section className="relative py-24 bg-black text-white px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-bamboo-500/30 text-bamboo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Heart Behind The Lens</span>
          </div>
          
          {/* SINGLE H1 TAG PER PAGE */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-serif">
            About Panda Creative Studio
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            Born from a passion for monochrome elegance, dramatic contrasts, and timeless human emotion.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/portfolio')}
              className="btn-panda-primary text-xs sm:text-sm px-6 py-3"
            >
              <span>Explore Curated Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/contacts')}
              className="btn-panda-secondary text-xs sm:text-sm px-6 py-3"
            >
              <span>Meet The Directors</span>
            </button>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-bamboo-500">
              Our Creative Ethos
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white font-serif">
              Why the Panda? Contrast, Balance &amp; Authenticity.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Just like the iconic panda, our visual identity is built on high contrast: deep velvety blacks, pure luminous whites, and subtle organic green accents. We believe the most powerful photographs and films are not oversaturated or trendy—they are balanced, emotive, and honest.
            </p>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Founded in {siteSettings.foundedYear} in the Arts District of Los Angeles, we have grown into a multi-disciplinary team of cinematographers, FAA drone pilots, sound engineers, and fine-art photographers. Over {siteSettings.completedProjects} couples and brands worldwide have trusted us with their most milestone moments.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800">
                <span className="text-xl font-bold text-bamboo-500 font-serif">650+</span>
                <span className="block text-xs text-zinc-500 mt-1">Weddings &amp; Commercials</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800">
                <span className="text-xl font-bold text-bamboo-500 font-serif">15+</span>
                <span className="block text-xs text-zinc-500 mt-1">International Film Awards</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-300 dark:border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
                alt="Panda Creative Lead Director in Studio with Cinema Camera"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-[#0c0d0f] text-white border border-zinc-800 shadow-2xl hidden sm:block max-w-xs">
              <Film className="w-6 h-6 text-bamboo-400 mb-2" />
              <h3 className="text-sm font-bold">Cinema Grade Precision</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Every project is color graded on reference monitors in DaVinci Resolve Studio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinema Gear Breakdown */}
      <section className="py-20 bg-zinc-950 text-white border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-bamboo-400 mb-2 block">
              The Technology We Command
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif">
              Our Professional Camera &amp; Cine Arsenal
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              We invest in state-of-the-art cinema equipment so your films retain pristine clarity on 4K YouTube and 85-inch displays for decades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gearList.map((gear, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-bamboo-500/40 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-bamboo-500/10 text-bamboo-400 flex items-center justify-center mb-4">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">
                  {gear.name}
                </h3>
                <span className="text-xs font-semibold text-bamboo-400 block mb-2">
                  {gear.role}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {gear.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/portfolio')}
              className="btn-panda-primary text-xs sm:text-sm px-7 py-3.5"
            >
              See This Gear In Action in Portfolio
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
