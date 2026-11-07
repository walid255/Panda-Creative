import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS, extractYouTubeId } from '../context/CMSContext';
import {
  Lock,
  Eye,
  EyeOff,
  LayoutDashboard,
  Home as HomeIcon,
  Users,
  Image as ImageIcon,
  FolderKanban,
  Layers,
  DollarSign,
  Share2,
  Settings,
  Mail,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  Camera,
  Video,
  ExternalLink,
  Sparkles,
  Star
} from 'lucide-react';
import CopyButton from '../components/CopyButton';

export default function AdminCMS() {
  const { navigate } = useRouter();
  const {
    data,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    updateHomeContent,
    updateAboutContent,
    addGearItem,
    updateGearItem,
    deleteGearItem,
    addDirector,
    updateDirector,
    deleteDirector,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    addService,
    updateService,
    deleteService,
    updatePricingPackage,
    addPricingPackage,
    deletePricingPackage,
    addPricingAddOn,
    updatePricingAddOn,
    deletePricingAddOn,
    updatePricingContent,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateSiteSettings,
    updateSocialLinks,
    updateInquiryStatus,
    deleteInquiry,
    exportData,
    importData,
    resetToDefaults,
    requestConfirmation,
    showToast
  } = useCMS();

  const {
    siteSettings,
    homeContent,
    aboutContent,
    portfolioItems,
    galleryItems,
    services,
    pricingPackages,
    pricingAddOns,
    pricingContent,
    testimonials = [],
    socialLinks,
    inquiries,
    newsletterSubscribers
  } = data;

  // Login Form State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Requirement: "Password visibility toggle"

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('dashboard');
  // 'dashboard' | 'home' | 'about' | 'portfolio' | 'gallery' | 'services' | 'pricing' | 'social' | 'inquiries' | 'settings' | 'backup'

  // Modal / Editing states
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    type: 'photo',
    title: '',
    category: 'Weddings',
    url: '',
    youtubeUrl: '',
    description: '',
    gear: 'Sony Cine Line',
    duration: '3:30',
    client: '',
    featured: false
  });

  // Portfolio Modal State
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Weddings',
    type: 'video',
    url: '',
    youtubeUrl: '',
    description: '',
    client: '',
    year: '2026',
    gear: 'Sony FX6 Cinema Line',
    featured: true
  });

  // Service Modal State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    icon: 'Film',
    shortDesc: '',
    fullDesc: '',
    startingPriceUSD: '$3,800',
    startingPriceTZS: 'TSh 9,800,000',
    duration: '8 – 12 Hours',
    deliverablesText: ''
  });

  // Pricing Package Modal State
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [editingPricingId, setEditingPricingId] = useState(null);
  const [pricingForm, setPricingForm] = useState({
    name: '',
    subtitle: '',
    priceUSD: '$2,400',
    priceTZS: 'TSh 6,200,000',
    badge: 'Standard',
    popular: false,
    featuresText: ''
  });

  // Gear Modal State (About Us)
  const [gearModalOpen, setGearModalOpen] = useState(false);
  const [editingGearId, setEditingGearId] = useState(null);
  const [gearForm, setGearForm] = useState({
    name: '',
    role: '',
    desc: ''
  });
  const [editingDirectorId, setEditingDirectorId] = useState(null);
  const [directorForm, setDirectorForm] = useState({ name: '', role: '', bio: '', image: '' });
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    avatar: '',
    quote: '',
    rating: 5,
    date: ''
  });
  const [editingPricingAddOnId, setEditingPricingAddOnId] = useState(null);
  const [pricingAddOnForm, setPricingAddOnForm] = useState({
    name: '',
    desc: '',
    priceUSD: '',
    priceTZS: ''
  });

  // Homepage Form State
  const [homeForm, setHomeForm] = useState({
    badge: homeContent?.badge || "Award-Winning Photography & 4K YouTube Cinematography",
    headlinePart1: homeContent?.headlinePart1 || "Every Frame a",
    headlineGradient: homeContent?.headlineGradient || "Masterpiece",
    description: homeContent?.description || "",
    heroImage: homeContent?.heroImage || "",
    primaryCtaText: homeContent?.primaryCtaText || "Reserve Shoot Date",
    secondaryCtaText: homeContent?.secondaryCtaText || "Watch 4K Showreel",
    showreelYoutubeId: homeContent?.showreelYoutubeId || "LXb3EKWsInQ",
    showreelTitle: homeContent?.showreelTitle || "4K Master Showreel",
    servicesSectionTitle: homeContent?.servicesSectionTitle || "Our Core Creative Services",
    servicesSectionDescription: homeContent?.servicesSectionDescription || "",
    testimonialsEyebrow: homeContent?.testimonialsEyebrow || "Client Praise",
    testimonialsTitle: homeContent?.testimonialsTitle || "Trusted by Couples & Global Brands",
    testimonialsDescription: homeContent?.testimonialsDescription || "",
    stat1Value: homeContent?.stats?.[0]?.value || "650+",
    stat1Label: homeContent?.stats?.[0]?.label || "Shoots Completed",
    stat2Value: homeContent?.stats?.[1]?.value || "10+",
    stat2Label: homeContent?.stats?.[1]?.label || "Years Experience",
    stat3Value: homeContent?.stats?.[2]?.value || "4K / 8K",
    stat3Label: homeContent?.stats?.[2]?.label || "Cine Line Gear",
    stat4Value: homeContent?.stats?.[3]?.value || "100%",
    stat4Label: homeContent?.stats?.[3]?.label || "Client Love"
  });

  // About Us Form State
  const [aboutForm, setAboutForm] = useState({
    badge: aboutContent?.badge || "The Heart Behind The Lens",
    title: aboutContent?.title || "About Panda Creative Studio",
    subtitle: aboutContent?.subtitle || "",
    storyTitle: aboutContent?.storyTitle || "Why the Panda? Contrast, Balance & Authenticity.",
    storyParagraph1: aboutContent?.storyParagraph1 || "",
    storyParagraph2: aboutContent?.storyParagraph2 || "",
    directorImage: aboutContent?.directorImage || "",
    quoteBadgeTitle: aboutContent?.quoteBadgeTitle || "Cinema Grade Precision",
    quoteBadgeText: aboutContent?.quoteBadgeText || ""
  });
  const [pricingSectionForm, setPricingSectionForm] = useState({
    addOnsTitle: pricingContent?.addOnsTitle || "Optional Production Enhancements (USD & TZS)",
    addOnsDescription: pricingContent?.addOnsDescription || ""
  });

  // Site Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(passwordInput);
    setPasswordInput('');
  };

  // Save Homepage Content
  const handleSaveHome = (e) => {
    e.preventDefault();
    updateHomeContent({
      badge: homeForm.badge,
      headlinePart1: homeForm.headlinePart1,
      headlineGradient: homeForm.headlineGradient,
      description: homeForm.description,
      heroImage: homeForm.heroImage,
      primaryCtaText: homeForm.primaryCtaText,
      secondaryCtaText: homeForm.secondaryCtaText,
      showreelYoutubeId: extractYouTubeId(homeForm.showreelYoutubeId),
      showreelTitle: homeForm.showreelTitle,
      servicesSectionTitle: homeForm.servicesSectionTitle,
      servicesSectionDescription: homeForm.servicesSectionDescription,
      testimonialsEyebrow: homeForm.testimonialsEyebrow,
      testimonialsTitle: homeForm.testimonialsTitle,
      testimonialsDescription: homeForm.testimonialsDescription,
      stats: [
        { id: "s1", value: homeForm.stat1Value, label: homeForm.stat1Label },
        { id: "s2", value: homeForm.stat2Value, label: homeForm.stat2Label },
        { id: "s3", value: homeForm.stat3Value, label: homeForm.stat3Label },
        { id: "s4", value: homeForm.stat4Value, label: homeForm.stat4Label }
      ]
    });
  };

  // Save About Us Content
  const handleSaveAbout = (e) => {
    e.preventDefault();
    updateAboutContent(aboutForm);
  };

  const handleSaveDirector = (e) => {
    e.preventDefault();
    if (editingDirectorId) {
      updateDirector(editingDirectorId, directorForm);
    } else {
      addDirector(directorForm);
    }
    setEditingDirectorId(null);
    setDirectorForm({ name: '', role: '', bio: '', image: '' });
  };

  const handleSaveTestimonial = (e) => {
    e.preventDefault();
    const item = { ...testimonialForm, rating: Number(testimonialForm.rating) };
    if (editingTestimonialId) {
      updateTestimonial(editingTestimonialId, item);
    } else {
      addTestimonial(item);
    }
    setEditingTestimonialId(null);
    setTestimonialForm({ name: '', role: '', avatar: '', quote: '', rating: 5, date: '' });
  };

  const handleSavePricingAddOn = (e) => {
    e.preventDefault();
    if (editingPricingAddOnId) {
      updatePricingAddOn(editingPricingAddOnId, pricingAddOnForm);
    } else {
      addPricingAddOn(pricingAddOnForm);
    }
    setEditingPricingAddOnId(null);
    setPricingAddOnForm({ name: '', desc: '', priceUSD: '', priceTZS: '' });
  };

  const handleSavePricingSection = (e) => {
    e.preventDefault();
    updatePricingContent(pricingSectionForm);
  };

  // Save Gallery Item
  const handleSaveGallery = (e) => {
    e.preventDefault();
    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, galleryForm);
    } else {
      addGalleryItem(galleryForm);
    }
    setGalleryModalOpen(false);
  };

  // Save Portfolio Item
  const handleSavePortfolio = (e) => {
    e.preventDefault();
    if (editingPortfolioId) {
      updatePortfolioItem(editingPortfolioId, portfolioForm);
    } else {
      addPortfolioItem(portfolioForm);
    }
    setPortfolioModalOpen(false);
  };

  // Save Service
  const handleSaveService = (e) => {
    e.preventDefault();
    const deliverables = serviceForm.deliverablesText
      ? serviceForm.deliverablesText.split('\n').filter(Boolean)
      : [];
    const itemData = {
      title: serviceForm.title,
      icon: serviceForm.icon,
      shortDesc: serviceForm.shortDesc,
      fullDesc: serviceForm.fullDesc,
      startingPriceUSD: serviceForm.startingPriceUSD,
      startingPriceTZS: serviceForm.startingPriceTZS,
      duration: serviceForm.duration,
      deliverables
    };
    if (editingServiceId) {
      updateService(editingServiceId, itemData);
    } else {
      addService(itemData);
    }
    setServiceModalOpen(false);
  };

  // Save Pricing Package
  const handleSavePricing = (e) => {
    e.preventDefault();
    const features = pricingForm.featuresText
      ? pricingForm.featuresText.split('\n').filter(Boolean)
      : [];
    const itemData = {
      name: pricingForm.name,
      subtitle: pricingForm.subtitle,
      priceUSD: pricingForm.priceUSD,
      priceTZS: pricingForm.priceTZS,
      badge: pricingForm.badge,
      popular: pricingForm.popular,
      features
    };
    if (editingPricingId) {
      updatePricingPackage(editingPricingId, itemData);
    } else {
      addPricingPackage(itemData);
    }
    setPricingModalOpen(false);
  };

  // Save Gear Item
  const handleSaveGear = (e) => {
    e.preventDefault();
    if (editingGearId) {
      updateGearItem(editingGearId, gearForm);
    } else {
      addGearItem(gearForm);
    }
    setGearModalOpen(false);
  };

  // Export Inquiries to CSV
  const handleExportInquiriesCSV = () => {
    if (inquiries.length === 0) {
      showToast('No inquiries to export', 'info');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Currency', 'Shoot Date', 'UTM Source', 'Status', 'Message'];
    const rows = inquiries.map(i => [
      i.id,
      i.date,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      i.email,
      i.phone,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      i.budget,
      i.currency || 'USD',
      i.eventDate,
      i.utmSource || '',
      i.status,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `panda-creative-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Inquiries CSV exported successfully!');
  };

  // IF NOT LOGGED IN: Render Footer Admin Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-[#08090a] text-white">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#121316] border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-bamboo-500/10 text-bamboo-400 flex items-center justify-center mx-auto border border-bamboo-500/20">
              <Lock className="w-6 h-6" />
            </div>
            {/* SINGLE H1 TAG PER PAGE */}
            <h1 className="text-2xl font-bold font-serif text-white">
              Panda Studio CMS Access
            </h1>
            <p className="text-xs text-zinc-400">
              Footer Admin Panel. Manage homepage, about us, gallery, services, portfolio, and pricing (USD &amp; TZS).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Admin Security Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter studio password..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-bamboo-500 focus:ring-1 focus:ring-bamboo-500 transition-all pr-11"
                />
                {/* User requirement: "Password visibility toggle" */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 rounded transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <span className="text-[11px] text-zinc-500 mt-1.5 block">
                Default demo password: <strong className="text-bamboo-400">panda</strong> (customizable in Site Settings)
              </span>
            </div>

            <button
              type="submit"
              className="w-full btn-panda-primary py-3.5 text-xs uppercase tracking-wider font-bold shadow-xl"
            >
              Sign In to CMS
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-800 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN ADMIN PANEL VIEW
  return (
    <div className="w-full min-h-screen bg-[#08090a] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top CMS Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#121316] border border-zinc-800 shadow-xl">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Panda Creative Logo" className="h-9 w-auto" />
            <div>
              {/* SINGLE H1 TAG PER PAGE FOR LOGGED IN ADMIN */}
              <h1 className="text-xl font-bold font-serif text-white">
                Studio CMS Admin Panel
              </h1>
              <span className="text-xs text-bamboo-400">
                Connected: {siteSettings.name} • USD and TZS prices are editable below
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              View Live Site
            </button>
            <button
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-950/80 text-red-300 hover:text-white hover:bg-red-900 border border-red-800/50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* CMS Tab Navigation (Homepage, About Us, Gallery, Services, Portfolio, Pricing, Social, etc.) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'dashboard' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'home' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <HomeIcon className="w-3.5 h-3.5" />
            <span>Homepage</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'about' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>About Us &amp; Gear</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'testimonials' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Client Praise ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'portfolio' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Portfolio Showcase ({portfolioItems?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'gallery' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Gallery (Photos &amp; YouTube)</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'services' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Services (USD &amp; TZS)</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'pricing' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Pricing (TZS &amp; USD Only)</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'social' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Networks</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'inquiries' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'settings' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings &amp; SEO</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'backup' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup &amp; Reset</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-[#121316] border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Gallery Photos</span>
                  <ImageIcon className="w-4 h-4 text-bamboo-400" />
                </div>
                <span className="text-3xl font-extrabold text-white font-serif">
                  {galleryItems.filter(i => i.type === 'photo').length}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121316] border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>YouTube 4K Films</span>
                  <Video className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-3xl font-extrabold text-white font-serif">
                  {galleryItems.filter(i => i.type === 'video').length}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121316] border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Curated Portfolio Works</span>
                  <FolderKanban className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-3xl font-extrabold text-white font-serif">
                  {portfolioItems?.length || 0}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121316] border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Client Inquiries</span>
                  <Mail className="w-4 h-4 text-bamboo-400" />
                </div>
                <span className="text-3xl font-extrabold text-white font-serif">
                  {inquiries.length}
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-4">
              <h2 className="text-base font-bold text-white">Quick CMS Management Portals</h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
                >
                  Manage Homepage
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
                >
                  Manage About Us &amp; Gear
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="btn-panda-primary text-xs py-2.5 px-4"
                >
                  Manage Portfolio
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="px-4 py-2.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 text-xs font-semibold border border-amber-800/50"
                >
                  Edit Pricing (TZS &amp; USD)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOMEPAGE CMS MANAGER */}
        {activeTab === 'home' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Homepage Content Manager</h2>
                <p className="text-xs text-zinc-400">
                  Update hero headline, background image, showreel video, and studio stats.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveHome} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Hero Pill Badge</label>
                  <input
                    type="text"
                    value={homeForm.badge}
                    onChange={(e) => setHomeForm({ ...homeForm, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Hero Background Image URL</label>
                  <input
                    type="url"
                    value={homeForm.heroImage}
                    onChange={(e) => setHomeForm({ ...homeForm, heroImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Headline (First Part)</label>
                  <input
                    type="text"
                    value={homeForm.headlinePart1}
                    onChange={(e) => setHomeForm({ ...homeForm, headlinePart1: e.target.value })}
                    placeholder="e.g. Every Frame a"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Headline (Gradient Highlight Word)</label>
                  <input
                    type="text"
                    value={homeForm.headlineGradient}
                    onChange={(e) => setHomeForm({ ...homeForm, headlineGradient: e.target.value })}
                    placeholder="e.g. Masterpiece"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Hero Sub-Description</label>
                <textarea
                  rows={2}
                  value={homeForm.description}
                  onChange={(e) => setHomeForm({ ...homeForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">4K Showreel YouTube Video ID or URL</label>
                  <input
                    type="text"
                    value={homeForm.showreelYoutubeId}
                    onChange={(e) => setHomeForm({ ...homeForm, showreelYoutubeId: e.target.value })}
                    placeholder="e.g. LXb3EKWsInQ"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Showreel Title</label>
                  <input
                    type="text"
                    value={homeForm.showreelTitle}
                    onChange={(e) => setHomeForm({ ...homeForm, showreelTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              {/* Stats Counters */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-bamboo-400 block mb-2">Homepage Stats Counters</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <label className="block text-[10px] text-zinc-500 uppercase">Stat 1</label>
                    <input
                      type="text"
                      value={homeForm.stat1Value}
                      onChange={(e) => setHomeForm({ ...homeForm, stat1Value: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-xs text-white mb-1"
                    />
                    <input
                      type="text"
                      value={homeForm.stat1Label}
                      onChange={(e) => setHomeForm({ ...homeForm, stat1Label: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-[11px] text-zinc-400"
                    />
                  </div>

                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <label className="block text-[10px] text-zinc-500 uppercase">Stat 2</label>
                    <input
                      type="text"
                      value={homeForm.stat2Value}
                      onChange={(e) => setHomeForm({ ...homeForm, stat2Value: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-xs text-white mb-1"
                    />
                    <input
                      type="text"
                      value={homeForm.stat2Label}
                      onChange={(e) => setHomeForm({ ...homeForm, stat2Label: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-[11px] text-zinc-400"
                    />
                  </div>

                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <label className="block text-[10px] text-zinc-500 uppercase">Stat 3</label>
                    <input
                      type="text"
                      value={homeForm.stat3Value}
                      onChange={(e) => setHomeForm({ ...homeForm, stat3Value: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-xs text-white mb-1"
                    />
                    <input
                      type="text"
                      value={homeForm.stat3Label}
                      onChange={(e) => setHomeForm({ ...homeForm, stat3Label: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-[11px] text-zinc-400"
                    />
                  </div>

                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <label className="block text-[10px] text-zinc-500 uppercase">Stat 4</label>
                    <input
                      type="text"
                      value={homeForm.stat4Value}
                      onChange={(e) => setHomeForm({ ...homeForm, stat4Value: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-xs text-white mb-1"
                    />
                    <input
                      type="text"
                      value={homeForm.stat4Label}
                      onChange={(e) => setHomeForm({ ...homeForm, stat4Label: e.target.value })}
                      className="w-full px-2 py-1 bg-zinc-950 rounded text-[11px] text-zinc-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-zinc-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-bamboo-400">Homepage Services &amp; Testimonials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Services Section Heading</label>
                    <input
                      type="text"
                      value={homeForm.servicesSectionTitle}
                      onChange={(e) => setHomeForm({ ...homeForm, servicesSectionTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Testimonials Eyebrow</label>
                    <input
                      type="text"
                      value={homeForm.testimonialsEyebrow}
                      onChange={(e) => setHomeForm({ ...homeForm, testimonialsEyebrow: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Services Section Description</label>
                  <textarea
                    rows={2}
                    value={homeForm.servicesSectionDescription}
                    onChange={(e) => setHomeForm({ ...homeForm, servicesSectionDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Testimonials Section Heading</label>
                    <input
                      type="text"
                      value={homeForm.testimonialsTitle}
                      onChange={(e) => setHomeForm({ ...homeForm, testimonialsTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Testimonials Description</label>
                    <input
                      type="text"
                      value={homeForm.testimonialsDescription}
                      onChange={(e) => setHomeForm({ ...homeForm, testimonialsDescription: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-panda-primary text-xs py-2.5 px-6 font-semibold"
              >
                Save Homepage Content
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: ABOUT US CMS MANAGER */}
        {activeTab === 'about' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-8">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">About Us &amp; Gear Arsenal Manager</h2>
              <p className="text-xs text-zinc-400">
                Manage the brand story, director photo, philosophy, and camera equipment list.
              </p>
            </div>

            {/* About Text Form */}
            <form onSubmit={handleSaveAbout} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">About Page Badge</label>
                  <input
                    type="text"
                    value={aboutForm.badge}
                    onChange={(e) => setAboutForm({ ...aboutForm, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">About Page Header Title</label>
                  <input
                    type="text"
                    value={aboutForm.title}
                    onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">About Page Subtitle</label>
                  <textarea
                    rows={2}
                    value={aboutForm.subtitle}
                    onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Director Image URL</label>
                  <input
                    type="url"
                    value={aboutForm.directorImage}
                    onChange={(e) => setAboutForm({ ...aboutForm, directorImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Story Heading</label>
                <input
                  type="text"
                  value={aboutForm.storyTitle}
                  onChange={(e) => setAboutForm({ ...aboutForm, storyTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Story Paragraph 1 (Philosophy &amp; Color Scheme)</label>
                <textarea
                  rows={3}
                  value={aboutForm.storyParagraph1}
                  onChange={(e) => setAboutForm({ ...aboutForm, storyParagraph1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Story Paragraph 2 (Background &amp; Trust)</label>
                <textarea
                  rows={3}
                  value={aboutForm.storyParagraph2}
                  onChange={(e) => setAboutForm({ ...aboutForm, storyParagraph2: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Quote Badge Title</label>
                  <input
                    type="text"
                    value={aboutForm.quoteBadgeTitle}
                    onChange={(e) => setAboutForm({ ...aboutForm, quoteBadgeTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Quote Badge Text</label>
                  <textarea
                    rows={2}
                    value={aboutForm.quoteBadgeText}
                    onChange={(e) => setAboutForm({ ...aboutForm, quoteBadgeText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-panda-primary text-xs py-2.5 px-6 font-semibold"
              >
                Save About Story
              </button>
            </form>

            {/* Director profiles */}
            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Meet the Directors</h3>
                <p className="text-xs text-zinc-400 mt-1">Create and manage the director profiles shown on the About page.</p>
              </div>
              <form onSubmit={handleSaveDirector} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={directorForm.name}
                    onChange={(e) => setDirectorForm({ ...directorForm, name: e.target.value })}
                    placeholder="Director name"
                    aria-label="Director name"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    value={directorForm.role}
                    onChange={(e) => setDirectorForm({ ...directorForm, role: e.target.value })}
                    placeholder="Role or title"
                    aria-label="Director role or title"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <input
                  type="url"
                  value={directorForm.image}
                  onChange={(e) => setDirectorForm({ ...directorForm, image: e.target.value })}
                  placeholder="Portrait image URL (optional)"
                  aria-label="Director portrait image URL"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
                <textarea
                  rows={2}
                  required
                  value={directorForm.bio}
                  onChange={(e) => setDirectorForm({ ...directorForm, bio: e.target.value })}
                  placeholder="Short director bio"
                  aria-label="Director bio"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
                <div className="flex items-center gap-2">
                  <button type="submit" className="btn-panda-primary text-xs py-2 px-4 font-semibold">
                    {editingDirectorId ? 'Save Director' : 'Add Director'}
                  </button>
                  {editingDirectorId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDirectorId(null);
                        setDirectorForm({ name: '', role: '', bio: '', image: '' });
                      }}
                      className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(aboutContent?.directors || []).map((director) => (
                  <div key={director.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {director.image && <img src={director.image} alt="" className="w-12 h-12 rounded-full object-cover" />}
                      <div className="min-w-0">
                        <strong className="text-white text-xs block">{director.name}</strong>
                        <span className="text-[11px] text-bamboo-400 block">{director.role}</span>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{director.bio}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDirectorId(director.id);
                          setDirectorForm({ name: director.name, role: director.role, bio: director.bio, image: director.image || '' });
                        }}
                        aria-label={`Edit ${director.name}`}
                        className="p-1.5 text-zinc-400 hover:text-white"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteDirector(director.id)}
                        aria-label={`Delete ${director.name}`}
                        className="p-1.5 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear Arsenal CRUD */}
            <div className="pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Camera Gear &amp; Cine Arsenal</h3>
                <button
                  onClick={() => {
                    setEditingGearId(null);
                    setGearForm({ name: '', role: '', desc: '' });
                    setGearModalOpen(true);
                  }}
                  className="btn-panda-primary text-xs py-1.5 px-3 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Equipment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aboutContent?.gearList?.map((gear) => (
                  <div key={gear.id} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-3">
                    <div>
                      <strong className="text-white text-xs block">{gear.name}</strong>
                      <span className="text-[11px] text-bamboo-400 font-semibold block">{gear.role}</span>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{gear.desc}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingGearId(gear.id);
                          setGearForm({ name: gear.name, role: gear.role, desc: gear.desc });
                          setGearModalOpen(true);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-white"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteGearItem(gear.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CLIENT TESTIMONIALS CMS MANAGER */}
        {activeTab === 'testimonials' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Client Testimonials</h2>
              <p className="text-xs text-zinc-400">Manage the clients and projects featured in the homepage Client Praise section.</p>
            </div>
            <form onSubmit={handleSaveTestimonial} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  placeholder="Client name"
                  aria-label="Client name"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  value={testimonialForm.role}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                  placeholder="Client or project (e.g. brand, wedding)"
                  aria-label="Client or project"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="url"
                  value={testimonialForm.avatar}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                  placeholder="Client photo URL (optional)"
                  aria-label="Client photo URL"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
                <input
                  type="text"
                  value={testimonialForm.date}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, date: e.target.value })}
                  placeholder="Date or year"
                  aria-label="Testimonial date"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                />
                <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                  Rating
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: e.target.value })}
                    className="ml-auto bg-zinc-900 text-white"
                  >
                    {[5, 4, 3, 2, 1].map(rating => <option key={rating} value={rating}>{rating} stars</option>)}
                  </select>
                </label>
              </div>
              <textarea
                rows={3}
                required
                value={testimonialForm.quote}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                placeholder="Client testimonial"
                aria-label="Client testimonial"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
              />
              <div className="flex items-center gap-2">
                <button type="submit" className="btn-panda-primary text-xs py-2 px-4 font-semibold">
                  {editingTestimonialId ? 'Save Testimonial' : 'Add Testimonial'}
                </button>
                {editingTestimonialId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTestimonialId(null);
                      setTestimonialForm({ name: '', role: '', avatar: '', quote: '', rating: 5, date: '' });
                    }}
                    className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {testimonials.map((testimonial, index) => (
                <article key={testimonial.id || index} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    {testimonial.avatar && <img src={testimonial.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />}
                    <div className="min-w-0">
                      <strong className="text-white text-xs block">{testimonial.name}</strong>
                      <span className="text-[11px] text-bamboo-400 block">{testimonial.role}{testimonial.date ? ` • ${testimonial.date}` : ''}</span>
                      <p className="text-[11px] text-zinc-400 mt-1 line-clamp-3">{testimonial.quote}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTestimonialId(testimonial.id);
                        setTestimonialForm({
                          name: testimonial.name || '',
                          role: testimonial.role || '',
                          avatar: testimonial.avatar || '',
                          quote: testimonial.quote || '',
                          rating: testimonial.rating || 5,
                          date: testimonial.date || ''
                        });
                      }}
                      aria-label={`Edit testimonial from ${testimonial.name}`}
                      className="p-1.5 text-zinc-400 hover:text-white"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTestimonial(testimonial.id)}
                      aria-label={`Delete testimonial from ${testimonial.name}`}
                      className="p-1.5 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PORTFOLIO SHOWCASE CMS MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Portfolio Showcase Manager</h2>
                <p className="text-xs text-zinc-400">
                  Manage the curated works featured on the Portfolio page (accessed via the About Us dropdown).
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingPortfolioId(null);
                  setPortfolioForm({
                    title: '',
                    category: 'Weddings',
                    type: 'video',
                    url: '',
                    youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
                    description: '',
                    client: '',
                    year: '2026',
                    gear: 'Sony FX6 4K',
                    featured: true
                  });
                  setPortfolioModalOpen(true);
                }}
                className="btn-panda-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Portfolio Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioItems?.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex gap-3.5 items-start">
                  <img
                    src={item.type === 'video' ? (item.thumbnail || `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg`) : item.url}
                    alt={item.title}
                    className="w-24 h-16 rounded-xl object-cover bg-black shrink-0 border border-zinc-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-bamboo-400 uppercase tracking-wider">{item.category}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{item.year}</span>
                    </div>
                    <h3 className="text-xs font-bold text-white truncate mt-0.5">{item.title}</h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">{item.client} • {item.gear}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          setEditingPortfolioId(item.id);
                          setPortfolioForm({
                            title: item.title,
                            category: item.category,
                            type: item.type,
                            url: item.url || '',
                            youtubeUrl: item.youtubeUrl || '',
                            description: item.description || '',
                            client: item.client || '',
                            year: item.year || '2026',
                            gear: item.gear || '',
                            featured: !!item.featured
                          });
                          setPortfolioModalOpen(true);
                        }}
                        className="text-[11px] text-bamboo-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePortfolioItem(item.id)}
                        className="text-[11px] text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY MANAGER (Photos & YouTube Videos) */}
        {activeTab === 'gallery' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Gallery Content Manager</h2>
                <p className="text-xs text-zinc-400">
                  Manage photos and YouTube video embeds across the public Gallery.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingGalleryId(null);
                    setGalleryForm({
                      type: 'photo',
                      title: '',
                      category: 'Weddings',
                      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                      youtubeUrl: '',
                      description: '',
                      gear: 'Sony A1 50mm f/1.2',
                      duration: '',
                      client: '',
                      featured: true
                    });
                    setGalleryModalOpen(true);
                  }}
                  className="btn-panda-primary text-xs py-2 px-4"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
                <button
                  onClick={() => {
                    setEditingGalleryId(null);
                    setGalleryForm({
                      type: 'video',
                      title: '',
                      category: 'Weddings',
                      url: '',
                      youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
                      description: '',
                      gear: 'Sony FX6 4K',
                      duration: '4:15',
                      client: 'Private Client',
                      featured: true
                    });
                    setGalleryModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add YouTube Video</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.type === 'video' ? item.thumbnail : item.url}
                      alt={item.title}
                      className="w-16 h-12 rounded-lg object-cover bg-black shrink-0 border border-zinc-700"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.type === 'video' ? 'bg-red-500/20 text-red-400' : 'bg-bamboo-500/20 text-bamboo-400'
                        }`}>
                          {item.type === 'video' ? 'YouTube Video' : 'Photo'}
                        </span>
                        <span className="text-xs text-zinc-400">{item.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white truncate mt-0.5">{item.title}</h3>
                      <p className="text-xs text-zinc-500 line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setEditingGalleryId(item.id);
                        setGalleryForm({
                          type: item.type,
                          title: item.title,
                          category: item.category,
                          url: item.url || '',
                          youtubeUrl: item.youtubeUrl || '',
                          description: item.description || '',
                          gear: item.gear || '',
                          duration: item.duration || '',
                          client: item.client || '',
                          featured: !!item.featured
                        });
                        setGalleryModalOpen(true);
                      }}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="p-2 rounded-lg bg-red-950/80 text-red-400 hover:text-white hover:bg-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SERVICES CMS MANAGER (WITH TZS & USD PRICING) */}
        {activeTab === 'services' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Services &amp; Deliverables Manager</h2>
                <p className="text-xs text-zinc-400">
                  Update starting prices in both USD and TZS, deliverables, and service descriptions.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingServiceId(null);
                  setServiceForm({
                    title: '',
                    icon: 'Film',
                    shortDesc: '',
                    fullDesc: '',
                    startingPriceUSD: '$2,500',
                    startingPriceTZS: 'TSh 6,500,000',
                    duration: 'Full Day',
                    deliverablesText: ''
                  });
                  setServiceModalOpen(true);
                }}
                className="btn-panda-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="space-y-4">
              {services.map((svc) => (
                <div key={svc.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{svc.title}</h3>
                      <div className="flex items-center gap-3 text-xs mt-1">
                        <span className="text-bamboo-400 font-semibold font-mono">USD: {svc.startingPriceUSD}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-bamboo-400 font-semibold font-mono">TZS: {svc.startingPriceTZS}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-400">{svc.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingServiceId(svc.id);
                          setServiceForm({
                            title: svc.title,
                            icon: svc.icon || 'Film',
                            shortDesc: svc.shortDesc || '',
                            fullDesc: svc.fullDesc || '',
                            startingPriceUSD: svc.startingPriceUSD,
                            startingPriceTZS: svc.startingPriceTZS,
                            duration: svc.duration || '',
                            deliverablesText: (svc.deliverables || []).join('\n')
                          });
                          setServiceModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200"
                      >
                        Edit Service
                      </button>
                      <button
                        onClick={() => deleteService(svc.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400">{svc.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PRICING CMS MANAGER (STRICTLY IN TZS AND USD) */}
        {activeTab === 'pricing' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Pricing Packages Manager (USD &amp; TZS Only)</h2>
                <p className="text-xs text-zinc-400">
                  Every package and add-on is configured strictly in Tanzanian Shillings (TZS) and US Dollars (USD).
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingPricingId(null);
                  setPricingForm({
                    name: '',
                    subtitle: '',
                    priceUSD: '$3,000',
                    priceTZS: 'TSh 7,800,000',
                    badge: 'Package',
                    popular: false,
                    featuresText: ''
                  });
                  setPricingModalOpen(true);
                }}
                className="btn-panda-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Pricing Tier</span>
              </button>
            </div>

            <form onSubmit={handleSavePricingSection} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <h3 className="text-sm font-bold text-white">Production Enhancements Section Content</h3>
              <input
                type="text"
                value={pricingSectionForm.addOnsTitle}
                onChange={(e) => setPricingSectionForm({ ...pricingSectionForm, addOnsTitle: e.target.value })}
                aria-label="Production enhancements heading"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                placeholder="Section heading"
              />
              <textarea
                rows={2}
                value={pricingSectionForm.addOnsDescription}
                onChange={(e) => setPricingSectionForm({ ...pricingSectionForm, addOnsDescription: e.target.value })}
                aria-label="Production enhancements description"
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                placeholder="Optional section description"
              />
              <button type="submit" className="btn-panda-primary text-xs py-2 px-4 font-semibold">Save Section Content</button>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingPackages.map((pkg) => (
                <div key={pkg.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-bamboo-400 uppercase">{pkg.badge}</span>
                      {pkg.popular && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">Popular</span>}
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{pkg.name}</h3>
                    <p className="text-xs text-zinc-400">{pkg.subtitle}</p>

                    <div className="my-3 p-3 rounded-xl bg-zinc-950 font-mono text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Price in USD:</span>
                        <strong className="text-white">{pkg.priceUSD}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Price in TZS:</span>
                        <strong className="text-bamboo-400">{pkg.priceTZS}</strong>
                      </div>
                    </div>

                    <ul className="text-xs text-zinc-400 space-y-1 mb-4">
                      {pkg.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="line-clamp-1">• {f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                    <button
                      onClick={() => {
                        setEditingPricingId(pkg.id);
                        setPricingForm({
                          name: pkg.name,
                          subtitle: pkg.subtitle,
                          priceUSD: pkg.priceUSD,
                          priceTZS: pkg.priceTZS,
                          badge: pkg.badge,
                          popular: !!pkg.popular,
                          featuresText: pkg.features.join('\n')
                        });
                        setPricingModalOpen(true);
                      }}
                      className="text-xs font-semibold text-bamboo-400 hover:underline"
                    >
                      Edit Package
                    </button>
                    <button
                      onClick={() => deletePricingPackage(pkg.id)}
                      className="text-xs font-semibold text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Add-Ons Manager */}
            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">Pricing Add-on Enhancements</h3>
                <p className="text-xs text-zinc-400 mt-1">Create and edit the enhancements shown on the Pricing page.</p>
              </div>
              <form onSubmit={handleSavePricingAddOn} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={pricingAddOnForm.name}
                    onChange={(e) => setPricingAddOnForm({ ...pricingAddOnForm, name: e.target.value })}
                    placeholder="Enhancement name"
                    aria-label="Enhancement name"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    value={pricingAddOnForm.desc}
                    onChange={(e) => setPricingAddOnForm({ ...pricingAddOnForm, desc: e.target.value })}
                    placeholder="Description"
                    aria-label="Enhancement description"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={pricingAddOnForm.priceUSD}
                    onChange={(e) => setPricingAddOnForm({ ...pricingAddOnForm, priceUSD: e.target.value })}
                    placeholder="USD price"
                    aria-label="Enhancement USD price"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    value={pricingAddOnForm.priceTZS}
                    onChange={(e) => setPricingAddOnForm({ ...pricingAddOnForm, priceTZS: e.target.value })}
                    placeholder="TZS price"
                    aria-label="Enhancement TZS price"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button type="submit" className="btn-panda-primary text-xs py-2 px-4 font-semibold">
                    {editingPricingAddOnId ? 'Save Enhancement' : 'Add Enhancement'}
                  </button>
                  {editingPricingAddOnId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPricingAddOnId(null);
                        setPricingAddOnForm({ name: '', desc: '', priceUSD: '', priceTZS: '' });
                      }}
                      className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pricingAddOns?.map((addon) => (
                  <div key={addon.id} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <strong className="text-white text-xs block">{addon.name}</strong>
                      <span className="text-[11px] text-zinc-500">{addon.desc}</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-white block">{addon.priceUSD}</span>
                      <span className="text-bamboo-400 text-[11px] block">{addon.priceTZS}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPricingAddOnId(addon.id);
                          setPricingAddOnForm({
                            name: addon.name || '',
                            desc: addon.desc || '',
                            priceUSD: addon.priceUSD || '',
                            priceTZS: addon.priceTZS || ''
                          });
                        }}
                        aria-label={`Edit ${addon.name}`}
                        className="p-1.5 text-zinc-400 hover:text-white"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePricingAddOn(addon.id)}
                        aria-label={`Delete ${addon.name}`}
                        className="p-1.5 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: SOCIAL NETWORKS */}
        {activeTab === 'social' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Social Networks &amp; Channel Manager</h2>
              <p className="text-xs text-zinc-400">
                All 8 social channels (Instagram, YouTube, TikTok, Facebook, Twitter, Pinterest, LinkedIn, WhatsApp) are fully editable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <div key={social.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{social.name}</span>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
                      <span>Enabled</span>
                      <input
                        type="checkbox"
                        checked={social.enabled}
                        onChange={(e) => {
                          const updated = [...socialLinks];
                          updated[index].enabled = e.target.checked;
                          updateSocialLinks(updated);
                        }}
                        className="w-4 h-4 accent-bamboo-500"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Target Profile URL</label>
                    <input
                      type="url"
                      value={social.url}
                      onChange={(e) => {
                        const updated = [...socialLinks];
                        updated[index].url = e.target.value;
                        updateSocialLinks(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Handle / Label</label>
                      <input
                        type="text"
                        value={social.handle || ''}
                        onChange={(e) => {
                          const updated = [...socialLinks];
                          updated[index].handle = e.target.value;
                          updateSocialLinks(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-zinc-400 mb-1">Followers Badge</label>
                      <input
                        type="text"
                        value={social.followers || ''}
                        onChange={(e) => {
                          const updated = [...socialLinks];
                          updated[index].followers = e.target.value;
                          updateSocialLinks(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: INQUIRIES & LEADS */}
        {activeTab === 'inquiries' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Client Shoot Inquiries &amp; Leads</h2>
                <p className="text-xs text-zinc-400">
                  Every booking request records client contact info, chosen currency, and marketing campaign UTM tags.
                </p>
              </div>
              <button
                onClick={handleExportInquiriesCSV}
                className="btn-panda-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to CSV</span>
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No inquiries received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-bold text-white">{inq.name}</span>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                          <span>{inq.email}</span>
                          <span>•</span>
                          <span>{inq.phone}</span>
                          <span>•</span>
                          <span className="font-mono text-zinc-500">{inq.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-semibold text-bamboo-400 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Responded">Responded</option>
                          <option value="Booked">Booked</option>
                          <option value="Archived">Archived</option>
                        </select>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-400 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-zinc-950 p-3 rounded-xl font-mono">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-sans">Service</span>
                        <span className="font-semibold text-zinc-300 truncate block">{inq.service}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-sans">Budget</span>
                        <span className="font-semibold text-bamboo-400">{inq.budget}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-sans">Shoot Date</span>
                        <span className="font-semibold text-zinc-300">{inq.eventDate || 'TBD'}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-sans">UTM Source</span>
                        <span className="font-semibold text-zinc-400">{inq.utmSource || 'direct'}</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/60">
                      "{inq.message}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 10: SETTINGS & SEO */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Site Settings &amp; SEO</h2>
              <p className="text-xs text-zinc-400">
                Update brand identity, meta titles, Google Search Console verification, and admin passcode.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSiteSettings(settingsForm);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Studio Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Direct Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Studio Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Primary Meta Title (SEO)</label>
                  <input
                    type="text"
                    value={settingsForm.metaTitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, metaTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Google Search Console Tag</label>
                  <input
                    type="text"
                    value={settingsForm.googleSearchConsole}
                    onChange={(e) => setSettingsForm({ ...settingsForm, googleSearchConsole: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  value={settingsForm.metaDescription}
                  onChange={(e) => setSettingsForm({ ...settingsForm, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Admin Passcode</label>
                <input
                  type="text"
                  value={settingsForm.adminPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminPassword: e.target.value })}
                  className="w-full max-w-xs px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="btn-panda-primary text-xs py-2.5 px-6 font-semibold"
              >
                Save Site Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 11: BACKUP & RESET */}
        {activeTab === 'backup' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">CMS Backup &amp; Factory Reset</h2>
              <p className="text-xs text-zinc-400">
                Download your website database to JSON, restore from backup, or reset to factory defaults.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <Download className="w-6 h-6 text-bamboo-400" />
                <h3 className="text-sm font-bold text-white">Download JSON Backup</h3>
                <p className="text-xs text-zinc-400">
                  Exports all homepage content, about story, portfolio, gallery photos, YouTube videos, services, and pricing (USD &amp; TZS).
                </p>
                <button
                  onClick={exportData}
                  className="w-full btn-panda-primary text-xs py-2"
                >
                  Export Backup
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <Upload className="w-6 h-6 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Restore from Backup</h3>
                <p className="text-xs text-zinc-400">
                  Upload a previously saved JSON backup to replace the current CMS data.
                </p>
                <label className="w-full block text-center py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer transition-colors">
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const content = event.target?.result;
                          if (content) importData(content);
                        };
                        reader.readAsText(file);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <RotateCcw className="w-6 h-6 text-red-400" />
                <h3 className="text-sm font-bold text-white">Factory Reset</h3>
                <p className="text-xs text-zinc-400">
                  Resets the CMS to original Panda Creative defaults (with USD and TZS pricing).
                </p>
                <button
                  onClick={resetToDefaults}
                  className="w-full py-2 px-3 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD / EDIT GALLERY ITEM */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl p-6 bg-[#121316] text-white border border-zinc-800 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 font-serif">
              {editingGalleryId ? 'Edit Gallery Item' : `Add New ${galleryForm.type === 'video' ? 'YouTube Video' : 'Photo'}`}
            </h3>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Drone">Drone</option>
                    <option value="Cinematic">Cinematic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Media Format</label>
                  <select
                    value={galleryForm.type}
                    onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="photo">Fine-Art Photo</option>
                    <option value="video">YouTube Cinematic Film</option>
                  </select>
                </div>
              </div>

              {galleryForm.type === 'photo' ? (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">High-Res Image URL *</label>
                  <input
                    type="url"
                    required
                    value={galleryForm.url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">YouTube URL or Video ID *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.youtubeUrl}
                    onChange={(e) => setGalleryForm({ ...galleryForm, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or 11-char ID"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Camera Gear Used</label>
                  <input
                    type="text"
                    value={galleryForm.gear}
                    onChange={(e) => setGalleryForm({ ...galleryForm, gear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                {galleryForm.type === 'video' && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={galleryForm.duration}
                      onChange={(e) => setGalleryForm({ ...galleryForm, duration: e.target.value })}
                      placeholder="e.g. 4:15"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-panda-primary text-xs py-2 px-5 font-semibold"
                >
                  Save Gallery Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT PORTFOLIO PROJECT */}
      {portfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl p-6 bg-[#121316] text-white border border-zinc-800 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 font-serif">
              {editingPortfolioId ? 'Edit Portfolio Project' : 'Add Curated Portfolio Project'}
            </h3>

            <form onSubmit={handleSavePortfolio} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  placeholder="e.g. Coastal Vows at Big Sur"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={portfolioForm.category}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="Weddings">Weddings</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Drone">Drone</option>
                    <option value="Cinematic">Cinematic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Format</label>
                  <select
                    value={portfolioForm.type}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="video">YouTube Cinematic Film</option>
                    <option value="photo">High-Res Stills</option>
                  </select>
                </div>
              </div>

              {portfolioForm.type === 'video' ? (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">YouTube Video Link or ID *</label>
                  <input
                    type="text"
                    required
                    value={portfolioForm.youtubeUrl}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={portfolioForm.url}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, url: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={portfolioForm.client}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, client: e.target.value })}
                    placeholder="e.g. Eleanor &amp; James"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Year</label>
                  <input
                    type="text"
                    value={portfolioForm.year}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Camera Gear Used</label>
                <input
                  type="text"
                  value={portfolioForm.gear}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, gear: e.target.value })}
                  placeholder="e.g. Sony FX6 + Cooke Primes"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPortfolioModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-panda-primary text-xs py-2 px-5 font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD / EDIT SERVICE (USD & TZS PRICING) */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl p-6 bg-[#121316] text-white border border-zinc-800 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 font-serif">
              {editingServiceId ? 'Edit Service' : 'Add New Production Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Starting Price in USD *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.startingPriceUSD}
                    onChange={(e) => setServiceForm({ ...serviceForm, startingPriceUSD: e.target.value })}
                    placeholder="$3,800"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Starting Price in TZS *</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.startingPriceTZS}
                    onChange={(e) => setServiceForm({ ...serviceForm, startingPriceTZS: e.target.value })}
                    placeholder="TSh 9,800,000"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Coverage Duration</label>
                <input
                  type="text"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  placeholder="e.g. 8 – 12 Hours"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Short Summary</label>
                <textarea
                  rows={2}
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Deliverables (One per line)</label>
                <textarea
                  rows={4}
                  value={serviceForm.deliverablesText}
                  onChange={(e) => setServiceForm({ ...serviceForm, deliverablesText: e.target.value })}
                  placeholder="Full Day Multi-Camera Coverage&#10;4K Slow Motion YouTube Cut&#10;600+ Retouched Photos"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-panda-primary text-xs py-2 px-5 font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD / EDIT PRICING PACKAGE (TZS & USD ONLY) */}
      {pricingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl p-6 bg-[#121316] text-white border border-zinc-800 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 font-serif">
              {editingPricingId ? 'Edit Pricing Package' : 'Add Pricing Package (USD &amp; TZS Only)'}
            </h3>

            <form onSubmit={handleSavePricing} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Tier Name *</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.name}
                    onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                    placeholder="e.g. Cinematic Signature"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={pricingForm.badge}
                    onChange={(e) => setPricingForm({ ...pricingForm, badge: e.target.value })}
                    placeholder="e.g. Most Popular"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={pricingForm.subtitle}
                  onChange={(e) => setPricingForm({ ...pricingForm, subtitle: e.target.value })}
                  placeholder="Target audience or project description..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Price in USD ($) *</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.priceUSD}
                    onChange={(e) => setPricingForm({ ...pricingForm, priceUSD: e.target.value })}
                    placeholder="$4,800"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Price in TZS (TSh) *</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.priceTZS}
                    onChange={(e) => setPricingForm({ ...pricingForm, priceTZS: e.target.value })}
                    placeholder="TSh 12,500,000"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={pricingForm.popular}
                  onChange={(e) => setPricingForm({ ...pricingForm, popular: e.target.checked })}
                  className="w-4 h-4 accent-bamboo-500"
                />
                <label htmlFor="popularCheck" className="text-xs text-zinc-300 cursor-pointer">
                  Mark as "Most Popular" Tier (Highlighted with bamboo border &amp; badge)
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Features (One per line)</label>
                <textarea
                  rows={5}
                  value={pricingForm.featuresText}
                  onChange={(e) => setPricingForm({ ...pricingForm, featuresText: e.target.value })}
                  placeholder="10 Hours of Full Production Coverage&#10;2 Senior Creatives (Director + Photographer)&#10;8-10 Minute Cinematic YouTube Highlight Film&#10;FAA 8K Drone Aerial Footage Included"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPricingModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-panda-primary text-xs py-2 px-5 font-semibold"
                >
                  Save Pricing Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD / EDIT CAMERA GEAR */}
      {gearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 bg-[#121316] text-white border border-zinc-800 rounded-3xl shadow-2xl">
            <h3 className="text-lg font-bold mb-4 font-serif">
              {editingGearId ? 'Edit Cinema Equipment' : 'Add Camera Equipment'}
            </h3>

            <form onSubmit={handleSaveGear} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Model / Gear Name *</label>
                <input
                  type="text"
                  required
                  value={gearForm.name}
                  onChange={(e) => setGearForm({ ...gearForm, name: e.target.value })}
                  placeholder="e.g. Sony FX6 Cinema Line"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Role / Function</label>
                <input
                  type="text"
                  value={gearForm.role}
                  onChange={(e) => setGearForm({ ...gearForm, role: e.target.value })}
                  placeholder="e.g. Primary 4K 120fps Cinema Camera"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Specs &amp; Description</label>
                <textarea
                  rows={2}
                  value={gearForm.desc}
                  onChange={(e) => setGearForm({ ...gearForm, desc: e.target.value })}
                  placeholder="Sensor type, dynamic range, or lens aperture..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setGearModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-panda-primary text-xs py-2 px-5 font-semibold"
                >
                  Save Gear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
