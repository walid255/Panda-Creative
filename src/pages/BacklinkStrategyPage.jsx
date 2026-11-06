import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Globe, Link2, ExternalLink, CheckCircle2, Award, FileText, ArrowRight } from 'lucide-react';
import { YoutubeIcon } from '../components/SocialIcons';

export default function BacklinkStrategyPage() {
  const { navigate } = useRouter();
  const { data } = useCMS();
  const { backlinkStrategy } = data;

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SEO &amp; High-Authority Acquisition</span>
        </div>
        {/* SINGLE H1 TAG PER PAGE */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-serif tracking-tight">
          SEO &amp; Backlink Strategy Blueprint
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
          The strategic architecture engineered for Panda Creative to dominate organic Google rankings for high-intent photography, cinematography, and luxury wedding films.
        </p>
      </div>

      {/* Strategic Pillars Grid */}
      <div className="space-y-10">
        {backlinkStrategy.pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                  {pillar.name}
                </h2>
                <p className="text-xs text-zinc-500 mt-1">
                  {pillar.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-bold font-mono">
                  {pillar.authority}
                </span>
                <span className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-semibold">
                  {pillar.status}
                </span>
              </div>
            </div>

            {/* Target Sites List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {pillar.targets.map((tgt, tIdx) => (
                <div
                  key={tIdx}
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white block truncate">
                      {tgt.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Priority: {tgt.priority} • DA: {tgt.da}
                    </span>
                  </div>
                  {tgt.url !== '#' && (
                    <a
                      href={tgt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-bamboo-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Plan Checklist */}
      <section className="mt-16 p-8 sm:p-10 rounded-3xl bg-zinc-900 text-white border border-zinc-800 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold font-serif mb-6 flex items-center gap-2.5">
          <CheckCircle2 className="w-6 h-6 text-bamboo-400" />
          <span>Execution Roadmap for Web Ranking</span>
        </h2>

        <div className="space-y-3.5">
          {backlinkStrategy.actionPlan.map((action, aIdx) => (
            <div key={aIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs sm:text-sm text-zinc-300">
              <span className="w-6 h-6 rounded-full bg-bamboo-500/20 text-bamboo-400 font-bold flex items-center justify-center shrink-0 text-xs">
                {aIdx + 1}
              </span>
              <span className="mt-0.5">{action}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <span>Strategy updated for current Q4 2026 search algorithm indexing</span>
          <button
            onClick={() => navigate('/contacts')}
            className="btn-panda-primary text-xs py-2 px-5"
          >
            Contact PR Team
          </button>
        </div>
      </section>

    </div>
  );
}
