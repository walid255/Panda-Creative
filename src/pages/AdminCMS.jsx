import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useCMS, extractYouTubeId } from '../context/CMSContext';
import {
  Lock,
  Eye,
  EyeOff,
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Share2,
  Settings,
  Mail,
  Users,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  LogOut,
  Calendar,
  Layers,
  DollarSign
} from 'lucide-react';
import CopyButton from '../components/CopyButton';

export default function AdminCMS() {
  const { navigate } = useRouter();
  const {
    data,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    updateSiteSettings,
    updateSocialLinks,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updatePricingPackage,
    updateService,
    updateInquiryStatus,
    deleteInquiry,
    updateBacklinkStrategy,
    exportData,
    importData,
    resetToDefaults,
    requestConfirmation,
    showToast
  } = useCMS();

  const { siteSettings, socialLinks, galleryItems, services, pricingPackages, inquiries, newsletterSubscribers, backlinkStrategy } = data;

  // Login Form State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Requirement: "Password visibility toggle"

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'gallery', 'social', 'settings', 'inquiries', 'subscribers', 'backup'

  // Gallery Item Form State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemForm, setItemForm] = useState({
    type: 'photo', // 'photo' | 'video'
    title: '',
    category: 'Weddings',
    url: '', // for photo
    youtubeUrl: '', // for video (User requirement: videos uploaded through YouTube)
    description: '',
    gear: 'Sony Cine Line',
    duration: '3:30',
    client: '',
    featured: false
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });

  // Handle Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(passwordInput);
    setPasswordInput('');
  };

  // Open Add Gallery Item
  const handleOpenAddGallery = (type = 'photo') => {
    setEditingItemId(null);
    setItemForm({
      type,
      title: '',
      category: 'Weddings',
      url: type === 'photo' ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' : '',
      youtubeUrl: type === 'video' ? 'https://www.youtube.com/watch?v=LXb3EKWsInQ' : '',
      description: '',
      gear: 'Sony FX6 + G-Master Primes',
      duration: '4:15',
      client: 'Private Client',
      featured: true
    });
    setGalleryModalOpen(true);
  };

  // Open Edit Gallery Item
  const handleOpenEditGallery = (item) => {
    setEditingItemId(item.id);
    setItemForm({
      type: item.type,
      title: item.title,
      category: item.category,
      url: item.url || '',
      youtubeUrl: item.youtubeUrl || (item.youtubeId ? `https://www.youtube.com/watch?v=${item.youtubeId}` : ''),
      description: item.description || '',
      gear: item.gear || '',
      duration: item.duration || '',
      client: item.client || '',
      featured: !!item.featured
    });
    setGalleryModalOpen(true);
  };

  // Save Gallery Item
  const handleSaveGalleryItem = (e) => {
    e.preventDefault();
    if (!itemForm.title) {
      showToast('Please provide a title', 'error');
      return;
    }

    if (itemForm.type === 'video') {
      const ytId = extractYouTubeId(itemForm.youtubeUrl);
      if (!ytId) {
        showToast('Please provide a valid YouTube URL or Video ID', 'error');
        return;
      }
    }

    if (editingItemId) {
      updateGalleryItem(editingItemId, itemForm);
    } else {
      addGalleryItem(itemForm);
    }
    setGalleryModalOpen(false);
  };

  // Delete Gallery Item with Confirmation
  const handleDeleteGalleryItem = (item) => {
    requestConfirmation({
      title: `Delete ${item.type === 'video' ? 'Video' : 'Photo'}?`,
      message: `Are you sure you want to remove "${item.title}" from the gallery? This action cannot be undone.`,
      isDanger: true,
      confirmText: 'Delete Item',
      onConfirm: () => deleteGalleryItem(item.id)
    });
  };

  // Export Inquiries to CSV
  const handleExportInquiriesCSV = () => {
    if (inquiries.length === 0) {
      showToast('No inquiries to export', 'info');
      return;
    }
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Event Date', 'UTM Source', 'UTM Campaign', 'Status', 'Message'];
    const rows = inquiries.map(i => [
      i.id,
      i.date,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      i.email,
      i.phone,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      i.budget,
      i.eventDate,
      i.utmSource || '',
      i.utmCampaign || '',
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

  // If Not Logged In, Render Secure Footer Admin Login Panel
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
              Footer Admin Panel. Manage photos, YouTube videos, inquiries, and social networks.
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

  // LOGGED IN ADMIN VIEW
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
                Connected: {siteSettings.name} • Cloudflare Ready
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

        {/* CMS Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-900 rounded-2xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'gallery' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos &amp; YouTube Videos ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'social' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Networks</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquiries &amp; UTM Leads ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'subscribers' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Newsletter Subscribers ({newsletterSubscribers?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'settings' ? 'bg-bamboo-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site Settings &amp; SEO</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
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
                  <span>Total Photos in Gallery</span>
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
                  <span>Client Inquiries</span>
                  <Mail className="w-4 h-4 text-bamboo-400" />
                </div>
                <span className="text-3xl font-extrabold text-white font-serif">
                  {inquiries.length}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121316] border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
                  <span>Newsletter VIPs</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-3xl font-extrabold text-white font-serif">
                  {newsletterSubscribers?.length || 0}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-4">
              <h2 className="text-base font-bold text-white">Quick CMS Actions</h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleOpenAddGallery('photo')}
                  className="btn-panda-primary text-xs py-2.5 px-4"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Photo</span>
                </button>
                <button
                  onClick={() => handleOpenAddGallery('video')}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add YouTube Video</span>
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors"
                >
                  View New Client Leads ({inquiries.filter(i => i.status === 'New').length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY MANAGER (Photos & YouTube Videos) */}
        {activeTab === 'gallery' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Gallery Content Manager</h2>
                <p className="text-xs text-zinc-400">
                  Add, edit, or delete photos and YouTube cinema films.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenAddGallery('photo')}
                  className="btn-panda-primary text-xs py-2 px-4"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
                <button
                  onClick={() => handleOpenAddGallery('video')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add YouTube Video</span>
                </button>
              </div>
            </div>

            {/* List */}
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
                      <h3 className="text-sm font-bold text-white truncate mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-500 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleOpenEditGallery(item)}
                      className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Edit Item"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteGalleryItem(item)}
                      className="p-2 rounded-lg bg-red-950/80 text-red-400 hover:text-white hover:bg-red-900 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL NETWORKS MANAGER (User prompt requirement: all editable through CMS) */}
        {activeTab === 'social' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Social Networks &amp; Channel Manager</h2>
              <p className="text-xs text-zinc-400">
                All social links across the footer, mobile menu, and contact drawers are completely editable here.
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
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
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
                        className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CLIENT INQUIRIES & UTM LEADS */}
        {activeTab === 'inquiries' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">Client Shoot Inquiries &amp; UTM Tracking</h2>
                <p className="text-xs text-zinc-400">
                  Every booking submission captures client details and marketing campaign source.
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
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3"
                  >
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
                          onClick={() => {
                            requestConfirmation({
                              title: 'Delete Inquiry?',
                              message: `Remove inquiry from ${inq.name}?`,
                              isDanger: true,
                              confirmText: 'Delete',
                              onConfirm: () => deleteInquiry(inq.id)
                            });
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-400 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-zinc-950 p-3 rounded-xl">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Service</span>
                        <span className="font-semibold text-zinc-300">{inq.service}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Budget</span>
                        <span className="font-semibold text-bamboo-400">{inq.budget}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">Shoot Date</span>
                        <span className="font-semibold text-zinc-300">{inq.eventDate || 'TBD'}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase">UTM Source</span>
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

        {/* TAB 5: NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-lg font-bold text-white">VIP Newsletter Subscribers</h2>
                <p className="text-xs text-zinc-400">
                  Clients and filmmakers subscribed through the website form.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {newsletterSubscribers?.map((sub) => (
                <div key={sub.id} className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block">{sub.email}</strong>
                    <span className="text-zinc-500 text-[11px]">Subscribed on {sub.date} • Source: {sub.source}</span>
                  </div>
                  <CopyButton text={sub.email} label="Copy Email" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SITE SETTINGS & SEO */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Site Settings &amp; Google SEO</h2>
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

        {/* TAB 7: BACKUP & FACTORY RESET */}
        {activeTab === 'backup' && (
          <div className="p-6 rounded-3xl bg-[#121316] border border-zinc-800 space-y-6">
            <div className="pb-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">CMS Backup, Restore &amp; Reset</h2>
              <p className="text-xs text-zinc-400">
                Safely download your complete website database to JSON, restore from a file, or reset to demo data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <Download className="w-6 h-6 text-bamboo-400" />
                <h3 className="text-sm font-bold text-white">Download JSON Backup</h3>
                <p className="text-xs text-zinc-400">
                  Exports all photos, YouTube videos, services, pricing, inquiries, and settings into a JSON backup file.
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
                  Select a previously downloaded JSON file to restore your entire CMS instantly.
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
                  Resets the CMS to the default Panda Creative photography and YouTube demo datasets.
                </p>
                <button
                  onClick={resetToDefaults}
                  className="w-full py-2 px-3 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Reset CMS Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal for Adding / Editing Gallery Item */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl p-6 bg-[#121316] text-white border border-zinc-800 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 font-serif">
              {editingItemId ? 'Edit Gallery Item' : `Add New ${itemForm.type === 'video' ? 'YouTube Video' : 'Photo'}`}
            </h3>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  value={itemForm.title}
                  onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                  placeholder="e.g. Big Sur Sunset Romance"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Category</label>
                  <select
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
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
                    value={itemForm.type}
                    onChange={(e) => setItemForm({ ...itemForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  >
                    <option value="photo">Fine-Art Photo</option>
                    <option value="video">YouTube Cinematic Film</option>
                  </select>
                </div>
              </div>

              {/* Specific to Photos */}
              {itemForm.type === 'photo' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Image URL (High-Res) *</label>
                  <input
                    type="url"
                    required
                    value={itemForm.url}
                    onChange={(e) => setItemForm({ ...itemForm, url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                  />
                </div>
              )}

              {/* Specific to YouTube Videos (User requirement: videos uploaded through YouTube) */}
              {itemForm.type === 'video' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">YouTube URL or Video ID *</label>
                  <input
                    type="text"
                    required
                    value={itemForm.youtubeUrl}
                    onChange={(e) => setItemForm({ ...itemForm, youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or LXb3EKWsInQ"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                  />
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    Accepts any YouTube share link, watch URL, or raw 11-character video ID.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={itemForm.description}
                  onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                  placeholder="Behind-the-scenes narrative or client summary..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-bamboo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Camera Gear Used</label>
                  <input
                    type="text"
                    value={itemForm.gear}
                    onChange={(e) => setItemForm({ ...itemForm, gear: e.target.value })}
                    placeholder="e.g. Sony FX6 4K"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                {itemForm.type === 'video' && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Film Runtime</label>
                    <input
                      type="text"
                      value={itemForm.duration}
                      onChange={(e) => setItemForm({ ...itemForm, duration: e.target.value })}
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
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
