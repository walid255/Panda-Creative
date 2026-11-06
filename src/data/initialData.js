export const initialData = {
  siteSettings: {
    name: "Panda Creative",
    tagline: "Cinematic Photography & Film Studio",
    description: "Award-winning photo and cinematography studio specializing in luxury weddings, brand commercials, fashion editorial, and 4K/8K YouTube cinematic films.",
    email: "hello@pandacreative.studio",
    phone: "+1 (800) 726-3221",
    address: "742 Studio Loft Boulevard, Arts District, Los Angeles, CA 90013",
    hours: "Monday – Saturday: 9:00 AM – 7:00 PM PST",
    foundedYear: "2018",
    completedProjects: "650+",
    camerasUsed: "Sony FX6 Cinema Line, Canon R5 C, RED Komodo 6K, DJI Inspire 3 Drone",
    metaTitle: "Panda Creative | Premier Photography & Cinematography Studio",
    metaDescription: "Award-winning photo and cinematography studio specializing in luxury weddings, brand commercials, fashion editorial, and 4K/8K YouTube cinematic films.",
    googleSearchConsole: "google4e92a83bd0a39a9c",
    canonicalDomain: "https://pandacreative.studio",
    adminPassword: "panda" // Default password for CMS demo (can be changed in settings)
  },

  socialLinks: [
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com/pandacreativestudio",
      handle: "@pandacreativestudio",
      followers: "48.5K",
      icon: "Instagram",
      enabled: true
    },
    {
      id: "youtube",
      name: "YouTube",
      url: "https://youtube.com/@pandacreativestudio",
      handle: "@pandacreativestudio",
      followers: "125K",
      icon: "Youtube",
      enabled: true
    },
    {
      id: "tiktok",
      name: "TikTok",
      url: "https://tiktok.com/@pandacreative",
      handle: "@pandacreative",
      followers: "89.2K",
      icon: "Video",
      enabled: true
    },
    {
      id: "facebook",
      name: "Facebook",
      url: "https://facebook.com/pandacreativestudio",
      handle: "Panda Creative Studio",
      followers: "24K",
      icon: "Facebook",
      enabled: true
    },
    {
      id: "twitter",
      name: "Twitter / X",
      url: "https://twitter.com/pandacreative",
      handle: "@pandacreative",
      followers: "15.4K",
      icon: "Twitter",
      enabled: true
    },
    {
      id: "pinterest",
      name: "Pinterest",
      url: "https://pinterest.com/pandacreative",
      handle: "PandaCreativeVisuals",
      followers: "32K",
      icon: "Pin",
      enabled: true
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com/company/panda-creative-studio",
      handle: "Panda Creative Media",
      followers: "8.1K",
      icon: "Linkedin",
      enabled: true
    },
    {
      id: "whatsapp",
      name: "WhatsApp Direct",
      url: "https://wa.me/18007263221?text=Hello%20Panda%20Creative,%20I'd%20like%20to%20inquire%20about%20a%20shoot!",
      handle: "+1 (800) 726-3221",
      followers: "Instant Chat",
      icon: "MessageCircle",
      enabled: true
    }
  ],

  galleryItems: [
    // PHOTOS
    {
      id: "photo-1",
      type: "photo",
      title: "Ethereal Sunset Coastline",
      category: "Weddings",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      description: "Sunset bridal portrait on the cliffs of Big Sur with golden hour backlighting.",
      date: "2026-10-14",
      aspect: "landscape",
      gear: "Sony A1 + 50mm f/1.2 GM",
      featured: true
    },
    {
      id: "photo-2",
      type: "photo",
      title: "Noir Fashion Editorial",
      category: "Fashion",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      description: "Monochrome high-contrast studio editorial styling with panda color scheme.",
      date: "2026-09-28",
      aspect: "portrait",
      gear: "Canon R5 C + 85mm f/1.2 L",
      featured: true
    },
    {
      id: "photo-3",
      type: "photo",
      title: "Luxury Watch Commercial Campaign",
      category: "Commercial",
      url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      description: "Precision macro lighting and product aesthetics for Geneva horology client.",
      date: "2026-08-19",
      aspect: "landscape",
      gear: "Sony FX6 + 90mm f/2.8 Macro",
      featured: true
    },
    {
      id: "photo-4",
      type: "photo",
      title: "Misty Alpine Drone Vista",
      category: "Drone",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      description: "Atmospheric aerial cinematography of misty mountain valley at sunrise.",
      date: "2026-07-11",
      aspect: "landscape",
      gear: "DJI Inspire 3 Zenmuse X9-8K",
      featured: false
    },
    {
      id: "photo-5",
      type: "photo",
      title: "Tuscan Vineyard Vows",
      category: "Weddings",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      description: "Intimate destination wedding ceremony in Florence, Italy with natural flare.",
      date: "2026-06-22",
      aspect: "landscape",
      gear: "Sony A1 + 35mm f/1.4 GM",
      featured: true
    },
    {
      id: "photo-6",
      type: "photo",
      title: "Cyberpunk Urban Streets",
      category: "Cinematic",
      url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      description: "Neon reflections and cinematic street photography in Shibuya, Tokyo.",
      date: "2026-05-30",
      aspect: "portrait",
      gear: "Leica SL2 + 28mm Summicron",
      featured: false
    },
    {
      id: "photo-7",
      type: "photo",
      title: "Artisan Culinary Story",
      category: "Commercial",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      description: "Michelin-starred restaurant culinary documentary for Eater feature.",
      date: "2026-04-18",
      aspect: "landscape",
      gear: "Canon R5 C + 50mm f/1.2",
      featured: false
    },
    {
      id: "photo-8",
      type: "photo",
      title: "Nordic Glacial Architecture",
      category: "Cinematic",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      description: "Minimalist brutalist geometry captured in Reykjavik, Iceland.",
      date: "2026-03-12",
      aspect: "portrait",
      gear: "Hasselblad X2D 100C",
      featured: false
    },

    // YOUTUBE VIDEOS (Requirement: videos should be uploaded/embedded through YouTube)
    {
      id: "video-1",
      type: "video",
      title: "Cinematic Wedding Film - Big Sur Romance",
      category: "Weddings",
      youtubeId: "LXb3EKWsInQ", // 4K Cinematic Nature & Visuals
      youtubeUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      thumbnail: "https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg",
      description: "4K Sony FX6 & DJI Inspire 3 highlight film celebrating Eleanor & James' oceanfront wedding in Big Sur.",
      date: "2026-10-20",
      duration: "4:35",
      client: "Eleanor & James",
      gear: "Sony FX6 4K 120fps + Cooke Cine Primes",
      featured: true
    },
    {
      id: "video-2",
      type: "video",
      title: "Porsche GT3 RS - Brand Commercial Reel",
      category: "Commercial",
      youtubeId: "ScMzIvxBSi4", // Dynamic 4K Car / Speed Reel
      youtubeUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
      description: "High-octane commercial film shot on RED Komodo 6K on closed mountain roads in Colorado.",
      date: "2026-09-15",
      duration: "2:15",
      client: "Apex Automotive Media",
      gear: "RED Komodo 6K + Tilta Russian Arm",
      featured: true
    },
    {
      id: "video-3",
      type: "video",
      title: "Tokyo After Dark - 8K Anamorphic Short",
      category: "Cinematic",
      youtubeId: "Bey4XXJAqS8", // 4K/8K Tokyo / City Visuals
      youtubeUrl: "https://www.youtube.com/watch?v=Bey4XXJAqS8",
      thumbnail: "https://img.youtube.com/vi/Bey4XXJAqS8/maxresdefault.jpg",
      description: "Atmospheric short film capturing the neon pulse and quiet alleyways of Shinjuku and Ginza.",
      date: "2026-08-04",
      duration: "6:10",
      client: "Tokyo Cultural Board",
      gear: "Sony FX3 + Atlas Orion Anamorphic 40mm",
      featured: true
    },
    {
      id: "video-4",
      type: "video",
      title: "Iceland Aerial Drone Odyssey",
      category: "Drone",
      youtubeId: "ysz5S6PUM-U", // Nature aerial 
      youtubeUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/maxresdefault.jpg",
      description: "Glacial waterfalls, black sand beaches, and active volcanic fissures captured in ProRes RAW.",
      date: "2026-06-18",
      duration: "3:45",
      client: "National Geographic Traveler",
      gear: "DJI Inspire 3 ProRes RAW",
      featured: false
    },
    {
      id: "video-5",
      type: "video",
      title: "Fashion Week Runway - Paris Haute Couture",
      category: "Fashion",
      youtubeId: "kJQP7kiw5Fk", // Fashion / Music visual
      youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      description: "Backstage intimate moments and dynamic runway slow-motion cinematography in Paris.",
      date: "2026-05-10",
      duration: "2:50",
      client: "Maison V",
      gear: "Canon R5 C 8K RAW + 24-70mm f/2.8",
      featured: false
    }
  ],

  services: [
    {
      id: "svc-weddings",
      title: "Luxury Wedding Cinematography & Photography",
      slug: "wedding-cinematography",
      icon: "HeartHandshake",
      shortDesc: "Timeless, cinematic storytelling for couples who desire an emotional, magazine-worthy heirloom film.",
      fullDesc: "We bring a cinema-grade crew to capture tears, laughter, and spontaneous moments in breathtaking 4K/8K. From morning preparations to midnight sparkler exits, we craft a bespoke wedding film score and color grade tailored to your love story.",
      deliverables: [
        "Full Day Multi-Camera Coverage (2 Lead Shooters)",
        "4K 60fps / 120fps Slow Motion Cinema Cameras",
        "8-12 Minute Cinematic Highlight Film on YouTube 4K",
        "Full Documentary Cut of Ceremony & Speeches",
        "600+ Edited High-Resolution Photographs with Online Gallery",
        "Licensed Custom Film Scoring & Audio Mixing"
      ],
      startingPrice: "$3,800",
      duration: "8 – 12 Hours"
    },
    {
      id: "svc-commercial",
      title: "Commercial & Brand Storytelling",
      slug: "commercial-brand-films",
      icon: "Film",
      shortDesc: "Compelling brand adverts, product promos, and investor videos that drive conversions and prestige.",
      fullDesc: "Elevate your brand with Hollywood-caliber cinematography. We manage pre-production scriptwriting, location scouting, casting, lighting design, and sound mixing to produce YouTube commercials that captivate audiences.",
      deliverables: [
        "Creative Direction & Scriptwriting",
        "Cinema Camera Package (RED / Sony FX6) & Lighting Rig",
        "60s Hero YouTube Ad + 15s/30s Social Media Cuts",
        "Voiceover Recording & Commercial Audio Mastering",
        "Color Grading in DaVinci Resolve",
        "Full Commercial Usage & Broadcast Rights"
      ],
      startingPrice: "$4,500",
      duration: "1 – 3 Production Days"
    },
    {
      id: "svc-drone",
      title: "FAA Part 107 Drone Aerial Cinematography",
      slug: "drone-aerial-cinematography",
      icon: "Plane",
      shortDesc: "Epic 8K aerial perspectives over real estate, coastal landscapes, and luxury events with licensed pilots.",
      fullDesc: "Fully insured and FAA Part 107 certified. Our dual-operator drone setups capture high-speed sweeping shots, architectural reveals, and cinematic establishes that make your production stand out.",
      deliverables: [
        "FAA Part 107 Licensed Pilot & Gimbal Operator",
        "DJI Inspire 3 with 8K Full-Frame Zenmuse Camera",
        "ProRes RAW & CinemaDNG Aerial Footage",
        "High-Resolution 48MP Aerial Stills",
        "Airspace Clearances & Flight Permissions Included"
      ],
      startingPrice: "$1,400",
      duration: "Half / Full Day"
    },
    {
      id: "svc-editorial",
      title: "Fashion & Executive Editorial Portraits",
      slug: "editorial-portraits",
      icon: "Camera",
      shortDesc: "Striking studio or location portraiture for models, magazine covers, executives, and artists.",
      fullDesc: "Whether in our Arts District studio with Profoto strobe lighting or on location, we create iconic, flattering portraits that showcase authority, elegance, and distinct personality.",
      deliverables: [
        "Studio or On-Location Setup",
        "Professional Hair & Makeup Artist Coordination",
        "30 High-End Retouched Final Images",
        "Private Proofing Web Gallery within 48 Hours",
        "Express Delivery Available"
      ],
      startingPrice: "$1,200",
      duration: "2 – 4 Hours"
    },
    {
      id: "svc-music-videos",
      title: "Music Videos & Creative Short Films",
      slug: "music-videos-shorts",
      icon: "Disc",
      shortDesc: "Visually stunning narrative music videos for record labels, indie artists, and film festivals.",
      fullDesc: "We turn your sonic vision into unforgettable cinema. Combining dynamic gimbal moves, vintage anamorphic glass, and cutting-edge visual effects for viral YouTube releases.",
      deliverables: [
        "Concept Art & Storyboarding",
        "Anamorphic Lens Kit & Professional Lighting Gaffer",
        "Full Video Edit, VFX & Motion Graphics",
        "Mastered in 4K DCI for YouTube & Apple Music",
        "Behind-the-Scenes Photo & Video Package"
      ],
      startingPrice: "$3,200",
      duration: "2 Production Days"
    },
    {
      id: "svc-color-grading",
      title: "Post-Production & DaVinci Color Grading",
      slug: "color-grading-post",
      icon: "Sliders",
      shortDesc: "Masterful color timing, look creation, and sound design to give your footage a cinematic finish.",
      fullDesc: "Already shot your project? Send your RAW footage to our color suite. We utilize DaVinci Resolve Studio with calibrated reference monitors to deliver rich Kodak film looks or modern punchy grades.",
      deliverables: [
        "Custom Show LUT Creation",
        "Shot-to-Shot Matching & Skin Tone Correction",
        "Film Grain Emulation (Kodak 5219 / 250D)",
        "Dialogue De-Noising & Sound Design",
        "Deliverables in ProRes 4444 XQ and H.265 Master"
      ],
      startingPrice: "$950",
      duration: "3 – 5 Business Days"
    }
  ],

  pricingPackages: [
    {
      id: "tier-silver",
      name: "Essential Collection",
      subtitle: "Perfect for intimate gatherings, indie commercials, and portrait sessions",
      price: "$2,400",
      badge: "Standard",
      popular: false,
      features: [
        "6 Hours of Continuous Production Coverage",
        "1 Lead Cinema Director / Senior Photographer",
        "4K Ultra HD Master Delivery via Private Cloud",
        "300+ Color Graded High-Res Photos",
        "3-5 Minute Cinematic YouTube Highlight Reel",
        "Online Viewing Gallery with 10-Year Cloud Storage",
        "Turnaround in 3 Weeks"
      ]
    },
    {
      id: "tier-gold",
      name: "Cinematic Signature",
      subtitle: "Our most requested hybrid photo & video package for weddings and luxury brands",
      price: "$4,800",
      badge: "Most Popular",
      popular: true,
      features: [
        "10 Hours of Full Production Coverage",
        "2 Senior Creatives (1 Lead Director + 1 Lead Photographer)",
        "4K 60fps & 120fps Cinema Line Equipment",
        "FAA Certified 8K Drone Aerial Footage Included",
        "8-10 Minute Cinematic YouTube Highlight Film",
        "60s Teaser Reel for Instagram Reels & TikTok within 48 Hours",
        "650+ Retouched Photos with Full Print Release",
        "Full Audio Recording for Speeches, Vows & Audio FX",
        "Custom Thumbnails & SEO Tags for YouTube Upload",
        "Turnaround in 2 Weeks"
      ]
    },
    {
      id: "tier-platinum",
      name: "Masterpiece Elite VIP",
      subtitle: "The ultimate red-carpet production for destination events, luxury campaigns & festivals",
      price: "$8,500",
      badge: "Luxury VIP",
      popular: false,
      features: [
        "Full Multi-Day Production Coverage (Up to 16 Hours)",
        "3-Person Cinema Crew & Lighting Technician",
        "RED Digital Cinema 6K + DJI Inspire 3 Dual-Operator Drone",
        "15-20 Minute Extended Documentary Film on 4K YouTube",
        "1,000+ Masterfully Retouched High-Res Photos",
        "3 Teaser Cutdowns optimized for TikTok, Reels & Shorts",
        "Handcrafted Italian Leather Bound Wedding / Brand Photo Album",
        "RAW Master Footage on Engraved 2TB SSD Drive",
        "Worldwide Travel Included (First 500 Miles)",
        "Priority 7-Day Rush Turnaround"
      ]
    }
  ],

  faqs: [
    {
      question: "How do you deliver our final videos and photographs?",
      answer: "We deliver all photography via a private, password-protected interactive cloud gallery with full-resolution downloads and print store integration. For videos, we deliver master 4K ProRes files, and we also provide optimized YouTube uploads with custom cinematic thumbnails, chapters, and private or unlisted YouTube links so you can easily embed or share your film with friends and clients in native 4K."
    },
    {
      question: "Can we upload or host our videos through YouTube?",
      answer: "Yes! YouTube is our preferred streaming and embed partner because it supports pristine 4K HDR playback on smart TVs, phones, and laptops with zero buffering. Through our CMS, you can easily link any YouTube video URL or ID to display instantly in your gallery."
    },
    {
      question: "What camera gear and lenses do you use on shoot days?",
      answer: "Our primary cinema cameras include the Sony FX6, Canon R5 C, and RED Komodo 6K. For still photography, we shoot with Sony A1 and Canon R5 bodies paired with G Master f/1.2 primes. For aerial cinematography, our licensed pilots fly the DJI Inspire 3 with full-frame Zenmuse cameras."
    },
    {
      question: "How far in advance do we need to book our date?",
      answer: "For weddings and high-season events (May through October), we recommend booking 6 to 12 months in advance. For commercial and studio portrait sessions, 2 to 4 weeks notice is usually sufficient depending on current studio scheduling."
    },
    {
      question: "Do you travel for destination weddings and international shoots?",
      answer: "Absolutely! We have captured love stories and commercial campaigns in Italy, France, Japan, Iceland, and throughout North America. Travel fees are transparent and itemized without hidden markups."
    },
    {
      question: "What is your backup and archiving policy for client footage?",
      answer: "We practice triple-redundant data protection. Footage is written simultaneously to dual card slots in camera, dumped to dual RAID SSDs on-site with checksum verification, and archived to cold cloud storage for a minimum of 10 years."
    }
  ],

  testimonials: [
    {
      name: "Sophia & Marcus Vance",
      role: "Lake Como Destination Wedding",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "Watching our YouTube cinematic film made our entire family cry all over again. Panda Creative captured the light, the emotion, and the grandeur in a way that felt like a Hollywood movie.",
      rating: 5,
      date: "October 2026"
    },
    {
      name: "Julian Rivera",
      role: "Creative Director, Apex Automotive",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Panda Creative's drone work and RED Komodo tracking shots blew our executives away. The commercial drove over 2.4 million views on YouTube within two weeks.",
      rating: 5,
      date: "September 2026"
    },
    {
      name: "Elena Rostova",
      role: "Fashion Editor, Vogue Runway Feature",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      quote: "Their mastery of dramatic panda-inspired contrast and high-key editorial lighting is unparalleled. They are true visual artists.",
      rating: 5,
      date: "August 2026"
    }
  ],

  backlinkStrategy: {
    overview: "A comprehensive SEO and high-authority backlink blueprint designed to rank Panda Creative #1 for high-intent photography, cinematography, and wedding video keywords on Google.",
    pillars: [
      {
        name: "1. Top-Tier Photography & Videography Directories",
        authority: "DA 70 – 94",
        status: "Active / Recommended",
        description: "Listing complete NAP (Name, Address, Phone) profiles with links to portfolio pages.",
        targets: [
          { name: "The Knot (Wedding Photography & Video)", url: "https://www.theknot.com", priority: "High", da: 91 },
          { name: "WeddingWire Vendor Directory", url: "https://www.weddingwire.com", priority: "High", da: 89 },
          { name: "ProductionHub (Film & Video Crew Directory)", url: "https://www.productionhub.com", priority: "High", da: 74 },
          { name: "Fearless Photographers (Curated Showcase)", url: "https://www.fearlessphotographers.com", priority: "Medium", da: 68 },
          { name: "Junebug Weddings Directory", url: "https://junebugweddings.com", priority: "High", da: 78 },
          { name: "Clutch.co (Video Production Agencies)", url: "https://clutch.co", priority: "Medium", da: 88 }
        ]
      },
      {
        name: "2. YouTube Video Descriptions & Channel Backlinks",
        authority: "DA 100",
        status: "Automated / Core Strategy",
        description: "Leverage every YouTube video upload by placing canonical deep links in the first 2 lines of video descriptions.",
        targets: [
          { name: "Panda Creative Official YouTube Channel About Page", url: "https://youtube.com/@pandacreativestudio", priority: "Critical", da: 100 },
          { name: "Client YouTube Video Descriptions (Collaborative Links)", url: "https://youtube.com", priority: "High", da: 100 },
          { name: "Gear Review & Camera Test YouTube Descriptions", url: "https://youtube.com", priority: "Medium", da: 100 }
        ]
      },
      {
        name: "3. Luxury Venue & Vendor Cross-Linking",
        authority: "DA 45 – 75",
        status: "High Conversion",
        description: "Partner with luxury wedding venues, floral designers, and dress boutiques to be featured on their 'Preferred Vendors' pages.",
        targets: [
          { name: "Big Sur Coastal Venues Preferred Vendors", url: "#", priority: "High", da: 62 },
          { name: "Napa Valley Vineyard Estate Vendor Pages", url: "#", priority: "High", da: 58 },
          { name: "Arts District Loft Studio Directories", url: "#", priority: "Medium", da: 51 }
        ]
      },
      {
        name: "4. Digital PR, Awards & Editorial Features",
        authority: "DA 60 – 85",
        status: "Brand Authority",
        description: "Submit award-winning photographs and films to global competitions and wedding blogs.",
        targets: [
          { name: "International Photography Awards (IPA)", url: "https://photoawards.com", priority: "Medium", da: 71 },
          { name: "Vimeo Staff Picks & Film Short Competitions", url: "https://vimeo.com/watch", priority: "High", da: 94 },
          { name: "Style Me Pretty Real Weddings Submission", url: "https://www.stylemepretty.com", priority: "High", da: 76 }
        ]
      },
      {
        name: "5. Unsplash & Pexels Profile Attribution Links",
        authority: "DA 92 – 95",
        status: "Passive Traffic",
        description: "Upload high-res sample b-roll photos to Unsplash/Pexels with studio attribution credit in author bio linking to pandacreative.studio.",
        targets: [
          { name: "Unsplash Verified Photographer Profile", url: "https://unsplash.com/@pandacreative", priority: "Medium", da: 94 },
          { name: "Pexels Video Creator Profile", url: "https://pexels.com/@pandacreative", priority: "Medium", da: 92 }
        ]
      }
    ],
    actionPlan: [
      "Step 1: Ensure Google Business Profile is 100% verified with matching NAP and website link.",
      "Step 2: Add canonical website URL to all YouTube video uploads in first line of description.",
      "Step 3: Submit 3 real wedding stories monthly to Style Me Pretty, Junebug Weddings, and Green Wedding Shoes.",
      "Step 4: Contact 10 luxury wedding venues shot at this season to request placement on their Preferred Vendors page.",
      "Step 5: Publish gear breakdowns & color grading LUT tips to attract organic backlinks from indie filmmaker blogs."
    ]
  },

  inquiries: [
    {
      id: "inq-101",
      name: "Charlotte Montclaire",
      email: "charlotte@montclairebrands.com",
      phone: "+1 (310) 555-0198",
      service: "Commercial & Brand Campaigns",
      date: "2026-11-04",
      budget: "$5,000 – $10,000",
      eventDate: "2027-02-14",
      utmSource: "google_search",
      utmCampaign: "luxury_commercial_q4",
      message: "We are launching a luxury fragrance line in early 2027 and loved your noir fashion and YouTube commercial samples. Would love to discuss a 2-day shoot in DTLA.",
      status: "New"
    },
    {
      id: "inq-102",
      name: "David & Maya Lin",
      email: "david.lin@gmail.com",
      phone: "+1 (415) 555-8371",
      service: "Luxury Wedding Cinematography & Photography",
      date: "2026-11-02",
      budget: "$5,000 – $10,000",
      eventDate: "2027-06-20",
      utmSource: "instagram",
      utmCampaign: "big_sur_reel",
      message: "Getting married at Post Ranch Inn in Big Sur! We watched your YouTube Big Sur Romance film and were mesmerized. Are you available on June 20, 2027?",
      status: "Responded"
    }
  ],

  newsletterSubscribers: [
    { id: "sub-1", email: "creative.director@studio8.com", date: "2026-11-05", source: "home_footer" },
    { id: "sub-2", email: "sarah.photog@gmail.com", date: "2026-11-03", source: "home_footer" },
    { id: "sub-3", email: "mark.films@cinevibe.co", date: "2026-10-29", source: "gallery_popup" }
  ]
};
