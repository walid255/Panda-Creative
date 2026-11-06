import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const CMSContext = createContext(null);

const STORAGE_KEY = 'panda_creative_cms_data_v1';
const AUTH_KEY = 'panda_creative_admin_auth_v1';
const COOKIE_KEY = 'panda_creative_cookie_consent_v1';

// Helper to extract YouTube ID from diverse formats
export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  // If it's already an 11-char ID without special URL characters
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  // Try regex for various YouTube URL formats
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
        // Ensure all top-level keys exist by merging with initialData
        return { ...initialData, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse CMS data from localStorage', e);
    }
    return initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save CMS data to localStorage', e);
    }
  }, [data]);

  // 2. Dark Mode Toggle
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

  // 3. Admin Authentication
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
      showToast('Incorrect password. Default demo is "panda"', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(AUTH_KEY);
    showToast('Logged out of Admin CMS', 'info');
  };

  // 4. UTM Tracker: Extract and preserve marketing parameters
  const [utmParams, setUtmParams] = useState(() => {
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

  // 5. Toast Notifications
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

  // 6. Confirmation Modal State
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

  // 7. Full-Site Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
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

  // 8. Cookie Consent State
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

  // 9. CMS CRUD Actions
  // Site Settings
  const updateSiteSettings = (newSettings) => {
    setData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...newSettings }
    }));
    showToast('Site settings updated successfully');
  };

  // Social Links
  const updateSocialLinks = (newLinks) => {
    setData(prev => ({ ...prev, socialLinks: newLinks }));
    showToast('Social network links updated');
  };

  // Gallery CRUD
  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: `${item.type}-${Date.now()}`,
      date: item.date || new Date().toISOString().split('T')[0]
    };
    // If it's a video, format YouTube ID
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
    showToast(`Added new ${item.type === 'video' ? 'YouTube video' : 'photo'} to gallery!`);
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

  // Services CRUD
  const addService = (service) => {
    const newService = {
      ...service,
      id: `svc-${Date.now()}`
    };
    setData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
    showToast('Service added');
  };

  const updateService = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updatedFields } : s)
    }));
    showToast('Service updated');
  };

  const deleteService = (id) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
    showToast('Service deleted', 'info');
  };

  // Pricing Packages CRUD
  const updatePricingPackage = (id, updatedFields) => {
    setData(prev => ({
      ...prev,
      pricingPackages: prev.pricingPackages.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
    showToast('Pricing package updated');
  };

  // FAQs CRUD
  const updateFAQs = (newFAQs) => {
    setData(prev => ({ ...prev, faqs: newFAQs }));
    showToast('FAQs updated');
  };

  // Inquiries
  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      utmSource: utmParams.utm_source || 'direct',
      utmCampaign: utmParams.utm_campaign || 'organic',
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
    showToast(`Inquiry status changed to ${status}`);
  };

  const deleteInquiry = (id) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(i => i.id !== id)
    }));
    showToast('Inquiry removed');
  };

  // Newsletter Subscribers
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
    showToast('Subscribed! Check your inbox soon for exclusive cinematography reels & tips.', 'success');
    return true;
  };

  // Backlink Strategy Update
  const updateBacklinkStrategy = (newStrategy) => {
    setData(prev => ({ ...prev, backlinkStrategy: newStrategy }));
    showToast('Backlink strategy updated');
  };

  // Data Export / Import / Reset
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
      setData(parsed);
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
      message: 'This will restore the original demo photography, YouTube videos, services, and pricing. All your customized items will be reset.',
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
        updateSiteSettings,
        updateSocialLinks,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addService,
        updateService,
        deleteService,
        updatePricingPackage,
        updateFAQs,
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
