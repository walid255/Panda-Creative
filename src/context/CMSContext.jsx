import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const CMSContext = createContext(null);

const STORAGE_KEY = 'panda_creative_cms_data_v2';
const AUTH_KEY = 'panda_creative_admin_auth_v1';
const COOKIE_KEY = 'panda_creative_cookie_consent_v1';
const CURRENCY_KEY = 'panda_creative_currency_v1';

// Helper to extract YouTube ID from diverse formats
export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : trimmed;
}

export function CMSProvider({ children }) {
  // 1. Data Store
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialData,
          ...parsed,
          homeContent: { ...initialData.homeContent, ...parsed.homeContent },
          aboutContent: { ...initialData.aboutContent, ...parsed.aboutContent },
          pricingContent: { ...initialData.pricingContent, ...parsed.pricingContent },
          pricingAddOns: parsed.pricingAddOns || initialData.pricingAddOns,
          testimonials: (parsed.testimonials || initialData.testimonials).map((testimonial, index) => ({
            ...testimonial,
            id: testimonial.id || `testimonial-${index + 1}`
          }))
        };
      }
    } catch (e) {
      console.error('Failed to parse CMS data from localStorage', e);
    }
    return initialData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage', e);
    }
  }, [data]);

  // 2. Dual Currency Switcher (TZS and USD ONLY)
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem(CURRENCY_KEY) || data.currency || 'USD';
  });

  const setCurrency = (curr) => {
    const valid = curr === 'TZS' ? 'TZS' : 'USD';
    setCurrencyState(valid);
    localStorage.setItem(CURRENCY_KEY, valid);
  };

  const formatPrice = (usdStr, tzsStr) => {
    return currency === 'TZS' ? (tzsStr || usdStr) : (usdStr || tzsStr);
  };

  // 3. Dark Mode Toggle
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('panda_theme_dark');
    if (saved !== null) {
      return saved === 'true';
    }
    return true; // Default to dark luxury panda theme
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('panda_theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('panda_theme_dark', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // 4. Admin Authentication
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });

  const adminLogin = (password) => {
    const validPassword = data.siteSettings.adminPassword || 'panda';
    if (password === validPassword) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      showToast('Welcome back, Admin!', 'success');
      return true;
    } else {
      showToast('Incorrect passcode. Default demo is "panda"', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(AUTH_KEY);
    showToast('Logged out of Admin CMS', 'info');
  };

  useEffect(() => {
    if (!isAdminLoggedIn) return undefined;

    let inactivityTimer;
    const resetInactivityTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(adminLogout, 15 * 60 * 1000);
    };
    const activityEvents = ['pointerdown', 'keydown', 'mousemove', 'scroll', 'touchstart'];

    activityEvents.forEach(eventName => {
      document.addEventListener(eventName, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();

    return () => {
      window.clearTimeout(inactivityTimer);
      activityEvents.forEach(eventName => {
        document.removeEventListener(eventName, resetInactivityTimer);
      });
    };
  }, [isAdminLoggedIn]);

  // 5. UTM Tracker
  const [utmParams] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const utm = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
        const val = params.get(k);
        if (val) utm[k] = val;
      });
      if (Object.keys(utm).length > 0) {
        sessionStorage.setItem('panda_utm_params', JSON.stringify(utm));
        return utm;
      }
      const savedUtm = sessionStorage.getItem('panda_utm_params');
      return savedUtm ? JSON.parse(savedUtm) : {};
    } catch {
      return {};
    }
  });

  // 6. Toast Notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 7. Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDanger: false,
    onConfirm: () => {}
  });

  const requestConfirmation = ({ title, message, onConfirm, confirmText = 'Confirm', isDanger = false }) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmText,
      cancelText: 'Cancel',
      isDanger,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeConfirmation = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  // 8. Full-Site Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // 9. Cookie Consent State
  const [cookieConsent, setCookieConsentState] = useState(() => {
    return localStorage.getItem(COOKIE_KEY);
  });

  const setCookieConsent = (value) => {
    setCookieConsentState(value);
    localStorage.setItem(COOKIE_KEY, value);
    if (value === 'accepted') {
      showToast('Cookie preferences saved', 'info');
    }
  };

  // ==========================================
  // CMS CRUD & MANAGEMENT ACTIONS
  // ==========================================

  // HOMEPAGE MANAGEMENT
  const updateHomeContent = (newHomeContent) => {
    setData(prev => ({
      ...prev,
      homeContent: { ...prev.homeContent, ...newHomeContent }
    }));
    showToast('Homepage hero, showreel & stats updated!');
  };

  // ABOUT US MANAGEMENT
  const updateAboutContent = (newAboutContent) => {
    setData(prev => ({
      ...prev,
      aboutContent: { ...prev.aboutContent, ...newAboutContent }
    }));
    showToast('About Us story, vision & quotes updated!');
  };

  // CAMERA GEAR ARSENAL CRUD
  const addGearItem = (gear) => {
    const newGear = { ...gear, id: `g-${Date.now()}` };
    setData(prev => ({
      ...prev,
      aboutContent: {
        ...prev.aboutContent,
        gearList: [...(prev.aboutContent.gearList || []), newGear]
      }
    }));
    showToast('Camera equipment added');
  };

  const updateGearItem = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      aboutContent: {
        ...prev.aboutContent,
        gearList: prev.aboutContent.gearList.map(g => g.id === id ? { ...g, ...updatedFields } : g)
      }
    }));
    showToast('Equipment updated');
  };

  const deleteGearItem = (id) => {
    setData(prev => ({
      ...prev,
      aboutContent: {
        ...prev.aboutContent,
        gearList: prev.aboutContent.gearList.filter(g => g.id !== id)
      }
    }));
    showToast('Equipment removed');
  };

  const addDirector = (director) => {
    const newDirector = { ...director, id: `director-${Date.now()}` };
    setData(prev => ({
      ...prev,
      aboutContent: {
        ...prev.aboutContent,
        directors: [...(prev.aboutContent.directors || []), newDirector]
      }
    }));
    showToast('Director profile added');
  };

  const updateDirector = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      aboutContent: {
        ...prev.aboutContent,
        directors: (prev.aboutContent.directors || []).map(director =>
          director.id === id ? { ...director, ...updatedFields } : director
        )
      }
    }));
    showToast('Director profile updated');
  };

  const deleteDirector = (id) => {
    setData(prev => ({
      ...prev,
      aboutContent: {
        ...prev.aboutContent,
        directors: (prev.aboutContent.directors || []).filter(director => director.id !== id)
      }
    }));
    showToast('Director profile removed', 'info');
  };

  // PORTFOLIO SHOWCASE CRUD
  const addPortfolioItem = (item) => {
    const newItem = {
      ...item,
      id: `port-${Date.now()}`
    };
    if (newItem.type === 'video') {
      const ytId = extractYouTubeId(newItem.youtubeId || newItem.youtubeUrl);
      newItem.youtubeId = ytId;
      newItem.youtubeUrl = `https://www.youtube.com/watch?v=${ytId}`;
      if (!newItem.thumbnail) {
        newItem.thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }
    }
    setData(prev => ({
      ...prev,
      portfolioItems: [newItem, ...(prev.portfolioItems || [])]
    }));
    showToast('Project added to Portfolio showcase!');
  };

  const updatePortfolioItem = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      portfolioItems: (prev.portfolioItems || []).map(item => {
        if (item.id === id) {
          const merged = { ...item, ...updatedFields };
          if (merged.type === 'video') {
            const ytId = extractYouTubeId(merged.youtubeId || merged.youtubeUrl);
            merged.youtubeId = ytId;
            merged.youtubeUrl = `https://www.youtube.com/watch?v=${ytId}`;
            if (!merged.thumbnail || merged.thumbnail.includes('img.youtube.com')) {
              merged.thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
            }
          }
          return merged;
        }
        return item;
      })
    }));
    showToast('Portfolio project updated');
  };

  const deletePortfolioItem = (id) => {
    setData(prev => ({
      ...prev,
      portfolioItems: (prev.portfolioItems || []).filter(item => item.id !== id)
    }));
    showToast('Project removed from Portfolio', 'info');
  };

  // SERVICES CRUD (With starting prices in USD & TZS)
  const addService = (service) => {
    const newService = {
      ...service,
      id: `svc-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
    showToast('New service added');
  };

  const updateService = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updatedFields } : s)
    }));
    showToast('Service & pricing updated');
  };

  const deleteService = (id) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
    showToast('Service deleted', 'info');
  };

  // PRICING PACKAGES CRUD (With prices strictly in USD and TZS)
  const addPricingPackage = (pkg) => {
    const newPkg = {
      ...pkg,
      id: `tier-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      pricingPackages: [...prev.pricingPackages, newPkg]
    }));
    showToast('New pricing tier added');
  };

  const updatePricingPackage = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      pricingPackages: prev.pricingPackages.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
    showToast('Package pricing updated in USD & TZS');
  };

  const deletePricingPackage = (id) => {
    setData(prev => ({
      ...prev,
      pricingPackages: prev.pricingPackages.filter(p => p.id !== id)
    }));
    showToast('Pricing package removed', 'info');
  };

  // PRICING ADD-ONS CRUD
  const addPricingAddOn = (addon) => {
    const newAddon = { ...addon, id: `addon-${Date.now()}` };
    setData(prev => ({
      ...prev,
      pricingAddOns: [...(prev.pricingAddOns || []), newAddon]
    }));
    showToast('Production add-on created');
  };

  const updatePricingAddOn = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      pricingAddOns: (prev.pricingAddOns || []).map(a => a.id === id ? { ...a, ...updatedFields } : a)
    }));
    showToast('Production add-on updated');
  };

  const deletePricingAddOn = (id) => {
    setData(prev => ({
      ...prev,
      pricingAddOns: (prev.pricingAddOns || []).filter(a => a.id !== id)
    }));
    showToast('Production add-on removed');
  };

  const updatePricingContent = (newContent) => {
    setData(prev => ({
      ...prev,
      pricingContent: { ...prev.pricingContent, ...newContent }
    }));
    showToast('Pricing section content updated');
  };

  const addTestimonial = (testimonial) => {
    const newTestimonial = { ...testimonial, id: `testimonial-${Date.now()}` };
    setData(prev => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), newTestimonial]
    }));
    showToast('Client testimonial added');
  };

  const updateTestimonial = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).map(testimonial =>
        testimonial.id === id ? { ...testimonial, ...updatedFields } : testimonial
      )
    }));
    showToast('Client testimonial updated');
  };

  const deleteTestimonial = (id) => {
    setData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter(testimonial => testimonial.id !== id)
    }));
    showToast('Client testimonial removed', 'info');
  };

  // GALLERY CRUD (Fine-Art Photos and YouTube Videos)
  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: `${item.type}-${Date.now()}`,
      date: item.date || new Date().toISOString().split('T')[0]
    };
    if (newItem.type === 'video') {
      const ytId = extractYouTubeId(newItem.youtubeId || newItem.youtubeUrl);
      newItem.youtubeId = ytId;
      newItem.youtubeUrl = `https://www.youtube.com/watch?v=${ytId}`;
      if (!newItem.thumbnail) {
        newItem.thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }
    }
    setData(prev => ({
      ...prev,
      galleryItems: [newItem, ...prev.galleryItems]
    }));
    showToast(`Added ${item.type === 'video' ? 'YouTube video' : 'photo'} to gallery!`);
  };

  const updateGalleryItem = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.map(item => {
        if (item.id === id) {
          const merged = { ...item, ...updatedFields };
          if (merged.type === 'video') {
            const ytId = extractYouTubeId(merged.youtubeId || merged.youtubeUrl);
            merged.youtubeId = ytId;
            merged.youtubeUrl = `https://www.youtube.com/watch?v=${ytId}`;
            if (!merged.thumbnail || merged.thumbnail.includes('img.youtube.com')) {
              merged.thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
            }
          }
          return merged;
        }
        return item;
      })
    }));
    showToast('Gallery item updated');
  };

  const deleteGalleryItem = (id) => {
    setData(prev => ({
      ...prev,
      galleryItems: prev.galleryItems.filter(item => item.id !== id)
    }));
    showToast('Item deleted from gallery', 'info');
  };

  // SITE SETTINGS & SOCIAL LINKS
  const updateSiteSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...newSettings }
    }));
    showToast('Site settings & SEO updated');
  };

  const updateSocialLinks = (newLinks) => {
    setData(prev => ({ ...prev, socialLinks: newLinks }));
    showToast('Social network links updated');
  };

  // INQUIRIES & NEWSLETTER
  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      utmSource: utmParams.utm_source || 'direct',
      utmCampaign: utmParams.utm_campaign || 'organic',
      currency,
      status: 'New'
    };
    setData(prev => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));
    showToast('Your inquiry has been received! We will be in touch within 24 hours.', 'success');
  };

  const updateInquiryStatus = (id, status) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(i => i.id === id ? { ...i, status } : i)
    }));
    showToast(`Inquiry status updated to ${status}`);
  };

  const deleteInquiry = (id) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(i => i.id !== id)
    }));
    showToast('Inquiry removed');
  };

  const addNewsletterSubscriber = (email, source = 'general') => {
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    const exists = data.newsletterSubscribers?.some(s => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      showToast('You are already subscribed to our newsletter!', 'info');
      return true;
    }
    const newSub = {
      id: `sub-${Date.now()}`,
      email: email.trim(),
      date: new Date().toISOString().split('T')[0],
      source
    };
    setData(prev => ({
      ...prev,
      newsletterSubscribers: [newSub, ...(prev.newsletterSubscribers || [])]
    }));
    showToast('Subscribed to VIP Cinema Newsletter!', 'success');
    return true;
  };

  const updateBacklinkStrategy = (newStrategy) => {
    setData(prev => ({ ...prev, backlinkStrategy: newStrategy }));
    showToast('Backlink strategy updated');
  };

  // BACKUP EXPORT & IMPORT
  const exportData = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `panda-creative-backup-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('CMS Backup JSON exported successfully');
    } catch {
      showToast('Failed to export backup', 'error');
    }
  };

  const importData = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (!parsed.siteSettings || !parsed.galleryItems) {
        showToast('Invalid backup format', 'error');
        return false;
      }
      setData({ ...initialData, ...parsed });
      showToast('CMS Data successfully restored from backup!');
      return true;
    } catch {
      showToast('Failed to parse backup JSON file', 'error');
      return false;
    }
  };

  const resetToDefaults = () => {
    requestConfirmation({
      title: 'Reset CMS to Defaults?',
      message: 'This will restore all default homepage, about us, portfolio, services, and pricing data (in USD and TZS).',
      confirmText: 'Reset Everything',
      isDanger: true,
      onConfirm: () => {
        setData(initialData);
        localStorage.removeItem(STORAGE_KEY);
        showToast('CMS successfully reset to factory defaults!', 'info');
      }
    });
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        currency,
        setCurrency,
        formatPrice,
        darkMode,
        toggleDarkMode,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        toasts,
        showToast,
        removeToast,
        confirmModal,
        requestConfirmation,
        closeConfirmation,
        isSearchOpen,
        openSearch,
        closeSearch,
        cookieConsent,
        setCookieConsent,
        utmParams,
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
        addPricingPackage,
        updatePricingPackage,
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
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        addNewsletterSubscriber,
        updateBacklinkStrategy,
        exportData,
        importData,
        resetToDefaults
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
