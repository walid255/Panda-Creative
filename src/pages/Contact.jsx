import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import {
  Sparkles,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import CopyButton from '../components/CopyButton';

export default function Contact() {
  const { navigate } = useRouter();
  const { data, currency, addInquiry } = useCMS();
  const { siteSettings, services, socialLinks } = data;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0]?.title || 'Wedding Cinematography & Photography',
    eventDate: '',
    budget: '$5,000 – $10,000 / TSh 13M – 26M',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addInquiry(form);
    setSubmitted(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      service: services[0]?.title || 'Wedding Cinematography & Photography',
      eventDate: '',
      budget: '$5,000 – $10,000 / TSh 13M – 26M',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const whatsapp = socialLinks.find(s => s.id === 'whatsapp');

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bamboo-500/10 text-bamboo-500 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Studio Availability &amp; Inquiries</span>
        </div>
        {/* SINGLE H1 TAG PER PAGE */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white font-serif tracking-tight">
          Let’s Create Something Unforgettable
        </h1>
        <p className="text-xs sm:text-base text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">
          Tell us about your wedding, commercial campaign, or creative film. Invoicing available exclusively in <strong>USD ($)</strong> and <strong>TZS (TSh)</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Col 1: Studio Info & Contact Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-[#121316] border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-serif">
              Studio Headquarters
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-bamboo-500/10 text-bamboo-500 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-zinc-900 dark:text-white">Arts District Loft Studio</strong>
                  <span>{siteSettings.address}</span>
                  <div className="mt-1">
                    <CopyButton text={siteSettings.address} label="Copy Address" iconOnly />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-bamboo-500/10 text-bamboo-500 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-zinc-900 dark:text-white">Direct Line</strong>
                  <a href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-bamboo-500 transition-colors">
                    {siteSettings.phone}
                  </a>
                  <div className="mt-1">
                    <CopyButton text={siteSettings.phone} label="Copy Phone" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-bamboo-500/10 text-bamboo-500 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-zinc-900 dark:text-white">Studio Email</strong>
                  <a href={`mailto:${siteSettings.email}`} className="hover:text-bamboo-500 transition-colors">
                    {siteSettings.email}
                  </a>
                  <div className="mt-1">
                    <CopyButton text={siteSettings.email} label="Copy Email" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-bamboo-500/10 text-bamboo-500 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-zinc-900 dark:text-white">Business Hours</strong>
                  <span>{siteSettings.hours}</span>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Quick Link */}
            {whatsapp && whatsapp.enabled && (
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <a
                  href={whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Direct</span>
                </a>
              </div>
            )}
          </div>

          {/* Map Representation Card */}
          <div className="rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-[#0c0d0f] p-6 text-white text-center relative shadow-sm">
            <div className="h-44 w-full bg-zinc-900 rounded-2xl flex flex-col items-center justify-center border border-zinc-800 p-4">
              <MapPin className="w-8 h-8 text-bamboo-400 mb-2 animate-bounce" />
              <span className="text-xs font-bold text-white">Downtown Arts District &amp; Worldwide Commissions</span>
              <span className="text-[11px] text-zinc-400 mt-1">Direct bookings in East Africa (Tanzania, Zanzibar) &amp; North America</span>
            </div>
          </div>

        </div>

        {/* Col 2: The Booking & Inquiry Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#121316] p-8 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-serif">
              Shoot Reservation Form
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-8">
            Please fill in your project details. We will prepare an exact proposal in your preferred currency ({currency}).
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-bamboo-500/10 border border-bamboo-500/30 text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-bamboo-500 mx-auto" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Inquiry Successfully Transmitted!
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                Thank you for considering Panda Creative. One of our lead directors will reach out via email or phone within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Your Name / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Eleanor &amp; James / Apex Media"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000 or +255 7..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Target Shoot Date
                  </label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Primary Service Needed
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-bamboo-500 transition-all"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Custom Combo Package">Custom Photo &amp; Video Combo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Estimated Budget ({currency})
                  </label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-bamboo-500 transition-all"
                  >
                    {currency === 'TZS' ? (
                      <>
                        <option value="Under TSh 7,500,000">Under TSh 7,500,000</option>
                        <option value="TSh 7,500,000 – TSh 13,000,000">TSh 7,500,000 – TSh 13,000,000</option>
                        <option value="TSh 13,000,000 – TSh 26,000,000">TSh 13,000,000 – TSh 26,000,000</option>
                        <option value="TSh 26,000,000+ (VIP Masterpiece)">TSh 26,000,000+ (VIP Masterpiece)</option>
                      </>
                    ) : (
                      <>
                        <option value="Under $3,000">Under $3,000</option>
                        <option value="$3,000 – $5,000">$3,000 – $5,000</option>
                        <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                        <option value="$10,000+ (VIP Masterpiece)">$10,000+ (VIP Masterpiece)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Vision, Location &amp; Shoot Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about the venue, timeline, music preferences, or special moments you want us to capture..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-panda-primary py-4 text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl"
              >
                <Send className="w-4 h-4" />
                <span>Send Production Inquiry ({currency})</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
