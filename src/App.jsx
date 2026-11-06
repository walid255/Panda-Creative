import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CMSProvider } from './context/CMSContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';
import BackToTop from './components/BackToTop';
import FloatingContact from './components/FloatingContact';
import StickyHelp from './components/StickyHelp';
import SearchModal from './components/SearchModal';
import CookieBanner from './components/CookieBanner';
import ConfirmationModal from './components/ConfirmationModal';
import ToastNotification from './components/ToastNotification';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import BacklinkStrategyPage from './pages/BacklinkStrategyPage';
import AdminCMS from './pages/AdminCMS';
import NotFound from './pages/NotFound';

function PageContent() {
  const { currentPath } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Router Switch
  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/about':
        return <About />;
      case '/portfolio':
        return <Portfolio />;
      case '/services':
        return <Services />;
      case '/pricing':
        return <Pricing />;
      case '/gallery':
        return <Gallery />;
      case '/contacts':
        return <Contact />;
      case '/backlink-strategy':
        return <BacklinkStrategyPage />;
      case '/admin':
        return <AdminCMS />;
      default:
        return <NotFound />;
    }
  };

  const isAdminPage = currentPath === '/admin';

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-[#0c0d0f] dark:text-zinc-100 transition-colors duration-300">
      
      {/* Header Navigation (Hidden on Admin panel for clean full-screen CMS experience) */}
      {!isAdminPage && (
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      )}

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full animate-fade-in focus:outline-none">
        {renderPage()}
      </main>

      {/* Footer (Always rendered so the Admin CMS login link is available in the footer as required!) */}
      <Footer />

      {/* Interactive Global Floating Tools */}
      {!isAdminPage && (
        <>
          <FloatingContact />
          <StickyHelp />
          <BackToTop />
        </>
      )}

      {/* Global Modals & Notifications */}
      <SearchModal />
      <CookieBanner />
      <ConfirmationModal />
      <ToastNotification />

    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <RouterProvider>
        <PageContent />
      </RouterProvider>
    </CMSProvider>
  );
}
