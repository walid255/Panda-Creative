import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    // Return clean normalized pathname
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    return path;
  });

  const navigate = (to) => {
    let cleanPath = to.toLowerCase().replace(/\/$/, '') || '/';
    if (cleanPath !== currentPath) {
      window.history.pushState({}, '', cleanPath);
      setCurrentPath(cleanPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update Page SEO Meta & Canonical Link on route change
  useEffect(() => {
    const titles = {
      '/': 'Panda Creative | Premier Photography & Cinematography Studio',
      '/about': 'About Us & Creative Vision | Panda Creative Studio',
      '/portfolio': 'Portfolio Showcase | Wedding, Brand & Film Masterpieces | Panda Creative',
      '/services': 'Photography & Cinematography Services | Panda Creative',
      '/pricing': 'Transparent Packages & Pricing | Panda Creative Photo & Cinema',
      '/gallery': 'Gallery: High-Res Photos & 4K YouTube Films | Panda Creative',
      '/contacts': 'Contact & Book Shoot Date | Panda Creative Studio',
      '/backlink-strategy': 'SEO Backlink Blueprint & PR Guide | Panda Creative',
      '/admin': 'Studio CMS & Content Management Panel | Panda Creative'
    };

    const descriptions = {
      '/': 'Award-winning photo and cinematography studio specializing in luxury weddings, brand commercials, fashion editorial, and 4K/8K YouTube cinematic films.',
      '/about': 'Discover our story, cinema-grade camera gear, philosophy, and the creative directors behind Panda Creative.',
      '/portfolio': 'Explore our curated portfolio of weddings, commercial films, aerial drone cinematography, and editorial portraits.',
      '/services': 'Full-service photography, cinema-line video production, FAA drone aerials, and DaVinci Resolve color grading.',
      '/pricing': 'Simple, transparent photography and cinematography pricing packages with no hidden fees.',
      '/gallery': 'Browse our comprehensive photo collections and watch 4K YouTube cinematic highlight films.',
      '/contacts': 'Inquire about your event, wedding, or commercial production. Direct studio booking in Los Angeles and worldwide.',
      '/backlink-strategy': 'Actionable SEO and high-domain-authority backlink strategy for creative photo & cinema studios.',
      '/admin': 'Secure studio administration panel for managing gallery photos, YouTube videos, pricing, inquiries, and site settings.'
    };

    const pageTitle = titles[currentPath] || 'Page Not Found | Panda Creative';
    const pageDesc = descriptions[currentPath] || 'Panda Creative Photo and Cinematography Studio.';

    document.title = pageTitle;

    // Update meta description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', pageDesc);
    }

    // Update canonical link
    let canonicalTag = document.getElementById('canonical-link');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', `https://pandacreative.studio${currentPath === '/' ? '' : currentPath}`);
    }
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
