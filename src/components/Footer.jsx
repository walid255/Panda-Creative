import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS } from '../context/CMSContext';
import {
  Lock,
  Mail,
  Phone,
  MapPin,
  Check,
  Send,
  ExternalLink
} from 'lucide-react';
import {
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  TwitterXIcon,
  TikTokIcon,
  PinterestIcon,
  LinkedInIcon,
  WhatsAppIcon
} from './SocialIcons';
import CopyButton from './CopyButton';

export default function Footer() {
  const { navigate } = useRouter();
  const { data, addNewsletterSubscriber } = useCMS();
  const { siteSettings, socialLinks } = data;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      const ok = addNewsletterSubscriber(newsletterEmail, 'footer');
      if (ok) {
        setIsSubscribed(true);
        setNewsletterEmail('');
        setTimeout(() => setIsSubscribed(false), 4000);
      }
    }
  };

  const getSocialIcon = (id) => {
    switch (id) {
      case 'instagram':
        return <InstagramIcon className="w-4 h-4 text-pink-500" />;
      case 'youtube':
        return <YoutubeIcon className="w-4 h-4 text-red-500" />;
      case 'facebook':
        return <FacebookIcon className="w-4 h-4 text-blue-500" />;
      case 'twitter':
        return <TwitterXIcon className="w-4 h-4 text-zinc-100" />;
      case 'linkedin':
        return <LinkedInIcon className="w-4 h-4 text-blue-400" />;
      case 'pinterest':
        return <PinterestIcon className="w-4 h-4 text-red-600" />;
      case 'whatsapp':
        return <WhatsAppIcon className="w-4 h-4 text-emerald-400" />;
      case 'tiktok':
        return <TikTokIcon className="w-4 h-4 text-zinc-100" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer className="w-full bg-[#08090a] text-zinc-300 border-t border-zinc-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-800/60">
          
          {/* Col 1 & 2: Brand Identity & Story */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="focus:outline-none text-left"
              aria-label="Panda Creative Home"
            >
              <img
                src="/logo.svg"
                alt="Panda Creative Logo"
                className="h-11 w-auto mb-2"
                width="200"
                height="50"
                loading="lazy"
              />
            </button>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              {siteSettings.description}
            </p>
            
            {/* Studio Contact Info */}
            <div className="space-y-2.5 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-bamboo-400 shrink-0" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bamboo-400 shrink-0" />
                <a href={`tel:${siteSettings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {siteSettings.phone}
                </a>
                <CopyButton text={siteSettings.phone} label="Copy Phone" className="ml-1" iconOnly />
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-bamboo-400 shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="hover:text-white transition-colors">
                  {siteSettings.email}
                </a>
                <CopyButton text={siteSettings.email} label="Copy Email" className="ml-1" iconOnly />
              </div>
            </div>

            {/* Social Networks (Fully editable through CMS as required!) */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 block mb-2.5">
                Connect on Social Networks
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.filter(s => s.enabled).map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${social.name} (${social.followers || social.handle})`}
                    className="p-2.5 rounded-xl bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800/80 transition-all duration-200 hover:scale-105 active:scale-95 group"
                  >
                    {getSocialIcon(social.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Studio Pages
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-bamboo-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-bamboo-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/portfolio')} className="hover:text-bamboo-400 transition-colors">
                  Portfolio Showcase
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services')} className="hover:text-bamboo-400 transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pricing')} className="hover:text-bamboo-400 transition-colors">
                  Pricing Packages
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-bamboo-400 transition-colors">
                  Gallery (Photos &amp; YouTube)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contacts')} className="hover:text-bamboo-400 transition-colors">
                  Contacts &amp; Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & SEO */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Resources &amp; SEO
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <button onClick={() => navigate('/backlink-strategy')} className="hover:text-bamboo-400 transition-colors text-left">
                  Backlink Strategy &amp; PR
                </button>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-bamboo-400 transition-colors inline-flex items-center gap-1">
                  XML Sitemap <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-bamboo-400 transition-colors inline-flex items-center gap-1">
                  Robots.txt <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <button onClick={() => window.print()} className="hover:text-bamboo-400 transition-colors text-left">
                  Print Client Sheet (PDF)
                </button>
              </li>
              <li>
                <span className="text-zinc-500 text-[11px] block pt-1">
                  Force HTTPS • Cloudflare Edge • PWA 100%
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter Signup */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              VIP Cinema Newsletter
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get secret 4K film drops, camera gear discounts, and seasonal shoot dates delivered monthly.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribed}
                className="w-full btn-panda-primary text-xs py-2.5"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Join VIP Circle</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {siteSettings.name}. All rights reserved.
          </div>

          {/* CRITICAL USER REQUIREMENT:
              "AND FOR the login panel for admin make it only on the footer not else where"
              Discreet, secure admin link located ONLY in the footer */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/contacts')}
              className="hover:text-zinc-300 transition-colors"
            >
              Privacy &amp; Terms
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-bamboo-400 hover:underline transition-colors group"
              title="Studio Administration &amp; CMS Panel"
            >
              <Lock className="w-3.5 h-3.5 group-hover:text-bamboo-400" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
