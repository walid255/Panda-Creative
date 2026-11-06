import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useCMS();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false
  });

  if (cookieConsent) return null;

  const handleSavePreferences = () => {
    setCookieConsent('custom');
    setShowPreferences(false);
  };

  return (
    <>
      <div 
        className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 p-5 rounded-2xl bg-[#121316]/95 text-white border border-zinc-800 shadow-2xl backdrop-blur-md animate-slide-up cookie-banner"
        role="region"
        aria-label="Cookie consent banner"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-bamboo-500/10 text-bamboo-400 border border-bamboo-500/20 shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white mb-1">
              Privacy &amp; Cookie Preferences
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              We use minimal cookies and local storage to personalize your photography &amp; cinema browsing experience, stream 4K YouTube reels, and analyze studio traffic.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCookieConsent('accepted')}
                className="px-4 py-2 text-xs font-semibold bg-bamboo-500 hover:bg-bamboo-400 text-white rounded-lg transition-all shadow-md active:scale-95"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => setCookieConsent('declined')}
                className="px-3.5 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg transition-all"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="text-xs text-zinc-400 hover:text-bamboo-400 underline underline-offset-2 ml-1"
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md p-6 bg-[#121316] text-white border border-zinc-800 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-bamboo-400" />
                <h3 className="text-base font-bold text-white">Cookie Settings</h3>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-white block">Strictly Necessary</span>
                  <span className="text-[11px] text-zinc-400">Essential for PWA offline cache and theme preference</span>
                </div>
                <input type="checkbox" checked disabled className="w-4 h-4 accent-bamboo-500 cursor-not-allowed" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-white block">YouTube Media &amp; Analytics</span>
                  <span className="text-[11px] text-zinc-400">Allows fast 4K video playback and anonymous view counters</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 accent-bamboo-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-white block">Marketing &amp; UTM Tracking</span>
                  <span className="text-[11px] text-zinc-400">Stores referral campaign tags for custom booking quotes</span>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 accent-bamboo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-5 py-2 text-xs font-semibold bg-bamboo-500 hover:bg-bamboo-400 text-white rounded-lg transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
