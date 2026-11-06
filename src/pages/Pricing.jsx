import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Check, Sparkles, Printer, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Pricing() {
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { pricingPackages } = data;

  const [billingType, setBillingType] = useState('full'); // full / installment

  const addOns = [
    { name: "FAA Drone Aerial Cinematography Add-on", price: "$650", desc: "Dual operator 8K aerials for ceremony & venue establishers" },
    { name: "RAW Master Footage Hard Drive (2TB Rugged SSD)", price: "$450", desc: "Every unedited take, audio scratch, and B-roll file shipped to your door" },
    { name: "Rush Turnaround Guarantee (7 Business Days)", price: "$800", desc: "Jump straight to the front of the editing queue for immediate YouTube release" },
    { name: "Rehearsal Dinner / Welcome Party Coverage (3 Hours)", price: "$950", desc: "Candid photography and speeches from the eve of your wedding" }
  ];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-zinc-200 dark:border-zinc-800 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest &amp; All-Inclusive Investment</span>
          </div>
          {/* SINGLE H1 TAG PER PAGE */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-serif tracking-tight">
            Transparent Pricing &amp; Cinema Packages
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
            Zero hidden travel surcharges or surprise licensing fees. Every package includes high-res stills and 4K YouTube cinematic highlight films.
          </p>
        </div>

        {/* Print button */}
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={() => window.print()}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-white hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60 transition-colors allow-print"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pricing Guide (PDF)</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingPackages.map((pkg) => {
          const isPopular = pkg.popular;

          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                isPopular
                  ? 'bg-zinc-900 text-white border-2 border-bamboo-500 shadow-2xl shadow-bamboo-500/10 lg:-translate-y-2'
                  : 'bg-zinc-50 dark:bg-[#121316] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 shadow-sm'
              }`}
            >
              {/* Most Popular Badge */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-bamboo-500 to-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  Most Popular Choice
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    isPopular ? 'bg-bamboo-500/20 text-bamboo-400' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    {pkg.badge}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-serif mb-2">
                  {pkg.name}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                  {pkg.subtitle}
                </p>

                <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold font-serif">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-zinc-500">/ project</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div className="p-0.5 rounded-full bg-bamboo-500/20 text-bamboo-500 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={isPopular ? 'text-zinc-200' : 'text-zinc-700 dark:text-zinc-300'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigate('/contacts')}
                  className={`w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md ${
                    isPopular
                      ? 'btn-panda-primary'
                      : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-bamboo-500 dark:hover:bg-bamboo-500 dark:hover:text-white'
                  }`}
                >
                  Reserve This Package
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Production Add-ons Section */}
      <section className="mt-20 pt-16 border-t border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-serif mb-6 text-center">
          Optional Production Enhancements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {addOns.map((addon, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  {addon.name}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {addon.desc}
                </p>
              </div>
              <span className="text-sm font-bold text-bamboo-500 ml-4 shrink-0 font-mono">
                {addon.price}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Guarantee & Terms Note */}
      <div className="mt-14 p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 max-w-3xl mx-auto text-center space-y-2 text-xs text-zinc-500">
        <div className="flex items-center justify-center gap-1.5 text-bamboo-500 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Payment Schedule &amp; Guarantee</span>
        </div>
        <p>
          Retainer of 30% reserves your date exclusively on our calendar. The remaining balance is split: 40% due 30 days prior to shoot, and 30% upon delivery of your 4K master films.
        </p>
      </div>

    </div>
  );
}
