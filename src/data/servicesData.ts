import { ServiceProduct } from '../types';

export interface ServicePackage {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unitPrice: number;
  discountPercent: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface DetailedServiceInfo extends ServiceProduct {
  heroTagline: string;
  longDescription: string;
  useCases: string[];
  loginInstructions: string[];
  bestTools: string[];
  sampleFormat: string;
  packages: ServicePackage[];
}

export const detailedServicesData: DetailedServiceInfo[] = [
  {
    id: 'usa-gmail-accounts',
    name: 'USA Gmail Accounts',
    shortDesc: 'Created on genuine USA residential IPs with real US mobile numbers. Perfect for US cold outreach, Google Workspace & marketing.',
    heroTagline: '100% Genuine USA Residential IP Created with Physical US Carrier SIMs',
    longDescription: 'Our USA Gmail accounts represent the pinnacle of email marketing reliability. Each account is registered exclusively using clean, dedicated USA residential ISP connections (Comcast, AT&T, Spectrum) and verified with non-VoIP physical SIM cards from major US carriers. They come pre-configured with recovery emails, 2FA backup codes, and full security protocols, ensuring maximum inbox deliverability for cold email campaigns and US-targeted business operations.',
    basePrice: 6,
    baseQuantity: 2,
    unitPrice: 3.0,
    popular: true,
    age: '2020 - 2024 Aged',
    category: 'usa',
    country: 'United States',
    countryCode: 'US',
    inStock: 3420,
    rating: 4.95,
    reviewsCount: 1240,
    features: [
      '100% Real US Carrier SIM Verified (AT&T / Verizon / T-Mobile)',
      'Static USA Residential ISP IP Created (Comcast / Spectrum)',
      'Configured Recovery Email Included with Full Access',
      '2FA / App Password Access Enabled for Instant SMTP/IMAP',
      'Pre-warmed with Natural US Search & Browsing Footprint',
      '7-Day 100% Instant Replacement Guarantee'
    ],
    specs: {
      phoneType: 'Physical US Carrier SIM (Non-VoIP)',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'USA Residential (Tier 1 ISP)',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Cold Email Outreach via Instantly, Smartlead, Lemlist & Woodpecker',
      'US SaaS Trial Signups & Business Tool Registrations',
      'Google My Business Management & US Client Portals',
      'High-Deliverability B2B Sales Prospecting',
      'Multi-Account Browser Profiles (Dolphin, AdsPower, Multilogin)'
    ],
    loginInstructions: [
      'Use clean US Residential or 4G Mobile Proxies for initial login.',
      'Import provided browser cookies (JSON) or login via Anti-Detect Browser.',
      'Enter the provided recovery email if Google asks for security verification.',
      'Allow 24-48 hours gentle warmup before sending high-volume cold emails.'
    ],
    bestTools: ['Instantly.ai', 'Smartlead.ai', 'AdsPower', 'Dolphin{anty}', 'Multilogin', 'Lemlist'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : +1 (555) 234-5678 : 2FA_SECRET : UserAgent',
    packages: [
      {
        id: 'usa-starter',
        name: 'Starter Test Pack',
        quantity: 2,
        price: 6.00,
        unitPrice: 3.00,
        discountPercent: 0,
        badge: 'Trial Pack',
        features: ['2 USA Aged Accounts', 'Physical US SIM Verified', 'Recovery Mail Included', 'Instant Delivery']
      },
      {
        id: 'usa-cold-outreach',
        name: 'Cold Outreach Pack',
        quantity: 10,
        price: 28.50,
        unitPrice: 2.85,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 USA Aged Accounts', 'Clean US ISP Registration', 'SMTP/IMAP Ready', '7-Day Warranty']
      },
      {
        id: 'usa-agency-scale',
        name: 'Agency Scale Pack',
        quantity: 25,
        price: 67.50,
        unitPrice: 2.70,
        discountPercent: 10,
        badge: '🔥 Best Seller',
        isPopular: true,
        features: ['25 USA Aged Accounts', '2FA Secret Keys Included', 'Smartlead/Instantly Ready', 'Priority Support']
      },
      {
        id: 'usa-outreach-pro',
        name: 'Enterprise Outreach',
        quantity: 50,
        price: 127.50,
        unitPrice: 2.55,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 USA Aged Accounts', 'Dedicated US ISP Allocation', 'Cookie JSON Files Included', '7-Day Replacement']
      },
      {
        id: 'usa-bulk-century',
        name: 'High-Volume Agency',
        quantity: 100,
        price: 240.00,
        unitPrice: 2.40,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 USA Aged Accounts', 'Maximum Spam-Filter Resistance', 'CSV / Excel Export', 'VIP Telegram Support']
      },
      {
        id: 'usa-reseller-crate',
        name: 'Master Reseller Crate',
        quantity: 500,
        price: 1050.00,
        unitPrice: 2.10,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 USA Aged Accounts', 'Lowest Wholesale Unit Rate ($2.10)', 'Automated API Webhook Delivery', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'pva-gmail-accounts',
    name: 'PVA Gmail Accounts',
    shortDesc: 'Phone-Verified Accounts with active SMS validation. Zero VoIP flags and resilient login security for multi-platform usage.',
    heroTagline: '100% Real SIM SMS Verified Gmail Accounts for Bulletproof Security',
    longDescription: 'PVA (Phone Verified Account) Gmails are the golden standard for marketers, developers, and businesses requiring hardened accounts that pass Google automated verification challenges. Every PVA account is verified with a real physical SIM card, preventing sudden verification lockouts. Designed for bulk integration, automated software, and social marketing.',
    basePrice: 6,
    baseQuantity: 2,
    unitPrice: 3.0,
    popular: false,
    bestValue: true,
    age: '2021 - 2024 Aged',
    category: 'pva',
    country: 'USA / UK / CA',
    countryCode: 'GLOBAL',
    inStock: 2890,
    rating: 4.92,
    reviewsCount: 980,
    features: [
      '100% SMS Phone Verified with Real Physical SIMs (Zero VoIP)',
      'Clean IP registration with zero blacklisted telemetry',
      'Configured with Secondary Recovery Email & Security Answers',
      'Full account ownership: Password and 2FA fully changeable',
      'Ready for IMAP / POP3 / SMTP bulk email warmup tools',
      '7-Day Instant Replacement Policy'
    ],
    specs: {
      phoneType: 'Physical Carrier SIM Card (Non-Virtual)',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Tier 1 Clean Residential',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Social Media Account Creation (Twitter/X, Facebook, Instagram, TikTok)',
      'App Store, Play Store & Developer Console Logins',
      'Newsletter Signups & Automated Lead Generation',
      'Scraping Bots, Puppeteer, Selenium & Python Scripts',
      'E-commerce Store Registrations (Shopify, eBay, Amazon)'
    ],
    loginInstructions: [
      'Login with matching country proxy or residential VPN.',
      'If prompted, enter the included recovery email address to bypass checkpoints.',
      'Change password after initial delivery for long-term operations.'
    ],
    bestTools: ['GSA Search Engine', 'ScrapeBox', 'Octo Browser', 'Incogniton', 'JarveePro', 'Kameleo'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : Phone_Number : Recovery_Status',
    packages: [
      {
        id: 'pva-starter',
        name: 'Duo Verification Pack',
        quantity: 2,
        price: 6.00,
        unitPrice: 3.00,
        discountPercent: 0,
        badge: 'Starter',
        features: ['2 PVA SIM Verified Accounts', 'Recovery Email Included', 'Password Changeable', 'Instant Delivery']
      },
      {
        id: 'pva-bundle',
        name: 'PVA Starter Bundle',
        quantity: 10,
        price: 28.50,
        unitPrice: 2.85,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 PVA SIM Verified Accounts', '100% Unique Phone Numbers', 'SMTP/POP3 Access', '7-Day Warranty']
      },
      {
        id: 'pva-pro',
        name: 'Marketing PVA Pro',
        quantity: 25,
        price: 67.50,
        unitPrice: 2.70,
        discountPercent: 10,
        badge: '🛡️ Best Value',
        isPopular: true,
        features: ['25 PVA SIM Verified Accounts', 'Clean Residential IPs', 'Zero VoIP Checkpoints', 'Priority Support']
      },
      {
        id: 'pva-fleet',
        name: 'Bulk PVA Fleet',
        quantity: 50,
        price: 127.50,
        unitPrice: 2.55,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 PVA SIM Verified Accounts', 'Multi-Platform Compatible', 'Full Recovery Credentials', '7-Day Replacement']
      },
      {
        id: 'pva-century',
        name: 'Automation PVA Squad',
        quantity: 100,
        price: 240.00,
        unitPrice: 2.40,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 PVA SIM Verified Accounts', 'Tier 1 Clean IP Allocation', 'Exportable Format (TXT/CSV)', '24/7 Priority Support']
      },
      {
        id: 'pva-warehouse',
        name: 'Wholesale PVA Warehouse',
        quantity: 500,
        price: 1050.00,
        unitPrice: 2.10,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 PVA SIM Verified Accounts', 'Bulk Discounted Wholesale Rate', 'API Integration Access', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'aged-mix-country-gmail',
    name: 'Aged Mix Country Gmail Accounts',
    shortDesc: 'High-authority vintage accounts from 2016 to 2022 from UK, Canada, Australia & Europe with mature browsing history.',
    heroTagline: 'High-Trust Vintage Gmails Aged 3 to 8+ Years with Organic Activity Footprint',
    longDescription: 'Age is the #1 metric Google algorithms utilize to calculate trust score. Our Aged Mix Country Gmail accounts were created between 2016 and 2022 across Tier-1 regions (United Kingdom, Canada, Australia, Germany, France). Having seasoned cookies, historical telemetry, and zero suspension flags, these accounts easily bypass captcha barriers and strict anti-bot systems.',
    basePrice: 5,
    baseQuantity: 2,
    unitPrice: 2.5,
    popular: false,
    age: '2016 - 2022 (Aged 3 to 8 Years)',
    category: 'aged',
    country: 'Mixed Tier-1 (UK, CA, AU, EU)',
    countryCode: 'MIX',
    inStock: 4150,
    rating: 4.88,
    reviewsCount: 860,
    features: [
      'Aged 3 to 8+ Years Old with organic registration telemetry',
      'Established trust history with natural Google profile data',
      'Superior resistance to sudden phone verification lockouts',
      'Includes complete recovery credentials & cookies',
      'Tested with Dolphin{anty}, AdsPower, Multilogin, GoLogin',
      '7-Day 100% Instant Replacement Policy'
    ],
    specs: {
      phoneType: 'Carrier Verified at Registration',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Mixed Clean Residential (UK/CA/AU/EU)',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'High-Volume Web Scraping & Automated Data Extraction',
      'High-Trust Forum Postings (Reddit, Quora, Medium, Trustpilot)',
      'Warming Up Cold Email Deliverability Pools',
      'Registering on High-Security Developer Platforms (GitHub, OpenAI)',
      'Creating Multi-Geo Social Media Assets'
    ],
    loginInstructions: [
      'Use Residential Proxies corresponding to the country profile.',
      'Import cookies or login via an Anti-Detect browser profile.',
      'Do not change security settings immediately—allow 24h rest before heavy actions.'
    ],
    bestTools: ['AdsPower', 'Dolphin{anty}', 'GoLogin', 'Multilogin', 'Kameleo', 'Python-Playwright'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : CountryCode : RegYear : Cookies_Base64',
    packages: [
      {
        id: 'aged-duo',
        name: 'Vintage Duo Pack',
        quantity: 2,
        price: 5.00,
        unitPrice: 2.50,
        discountPercent: 0,
        badge: 'Starter',
        features: ['2 Aged Accounts (2016-2022)', 'Organic History', 'Recovery Mail Included', 'Instant Delivery']
      },
      {
        id: 'aged-explorer',
        name: 'Aged Explorer Bundle',
        quantity: 10,
        price: 23.75,
        unitPrice: 2.38,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 Aged Accounts', 'Mixed Tier-1 Geolocation', 'High Trust Score', '7-Day Warranty']
      },
      {
        id: 'aged-authority',
        name: 'Global Authority Pack',
        quantity: 25,
        price: 56.25,
        unitPrice: 2.25,
        discountPercent: 10,
        badge: '🌍 Best Value',
        isPopular: true,
        features: ['25 Aged Accounts', '3-8 Years Organic Age', 'Cookie Sessions Included', 'Priority Support']
      },
      {
        id: 'aged-scraper',
        name: 'Aged Scraper Fleet',
        quantity: 50,
        price: 106.25,
        unitPrice: 2.12,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 Aged Accounts', 'Anti-Detect Optimized', 'Immune to Captcha Loops', '7-Day Replacement']
      },
      {
        id: 'aged-century',
        name: 'High-Trust Vintage 100',
        quantity: 100,
        price: 200.00,
        unitPrice: 2.00,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 Aged Accounts', 'Deep Historical Cookies', 'CSV / JSON Export', 'VIP Telegram Support']
      },
      {
        id: 'aged-vault',
        name: 'Reseller Vintage Vault',
        quantity: 500,
        price: 875.00,
        unitPrice: 1.75,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 Aged Accounts', 'Lowest Vintage Rate ($1.75/ea)', 'Bulk API Webhook Access', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'aged-gmail-for-reviews',
    name: 'Aged Gmail Accounts For Reviews',
    shortDesc: 'Specially aged accounts with Google Maps & Local Guides history. Reviews stick permanently with 95%+ live rate.',
    heroTagline: 'High Local Guide Trust Score Accounts Formulated for Google Maps & Reviews',
    longDescription: 'Google utilizes advanced AI algorithms to filter out fake or suspicious business reviews. Our Aged Review Gmail Accounts are seasoned with real location check-ins, Google Maps navigation history, and Local Guides trust badges. When you post reviews using these accounts, they stick permanently and build organic reputation for your clients.',
    basePrice: 6,
    baseQuantity: 2,
    unitPrice: 3.0,
    popular: true,
    age: '2017 - 2023 Aged',
    category: 'reviews',
    country: 'USA / UK / CA / AU',
    countryCode: 'US',
    inStock: 1950,
    rating: 4.98,
    reviewsCount: 1430,
    features: [
      'High Local Guide & Google Maps Trust Score',
      '96%+ Google Maps Review Stick Rate (Zero Shadow-Bans)',
      'Aged Google Profile with organic photo & location history',
      'Pre-warmed with real search cookies & browser cache',
      'Includes Step-by-Step Review Posting SOP Guide',
      '3-Day Review Retention Live Guarantee or Instant Swap'
    ],
    specs: {
      phoneType: 'Physical Tier-1 SIM Verified',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Geo-Targeted Residential Proxies',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '3-Day Review Retention Guarantee'
    },
    useCases: [
      'Google Maps & Google Business Profile (GBP) 5-Star Reviews',
      'Trustpilot, Sitejabber, ProductHunt & Clutch Reviews',
      'App Store & Google Play Store App Ratings',
      'Local SEO Reputation Management for Digital Agencies',
      'Brand Sentiment & E-commerce Product Feedback'
    ],
    loginInstructions: [
      'Use residential proxy geolocated to the target business city/state.',
      'Import the browser session and search the business organically.',
      'Spend 1-2 minutes scrolling photos/menu before posting review.',
      'Attach a real photo to achieve maximum review prominence.'
    ],
    bestTools: ['AdsPower', 'Dolphin{anty}', 'Octo Browser', 'Bright Data Residential', 'IPRoyal Proxies'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : LocalGuideLevel : CityGeo : Cookies_JSON',
    packages: [
      {
        id: 'reviews-duo',
        name: 'Local Guide Duo',
        quantity: 2,
        price: 6.00,
        unitPrice: 3.00,
        discountPercent: 0,
        badge: 'Trial',
        features: ['2 Review Ready Accounts', 'Local Guide Trust History', 'Posting SOP Guide Included', 'Instant Delivery']
      },
      {
        id: 'reviews-boost',
        name: 'Google Maps Boost Pack',
        quantity: 10,
        price: 28.50,
        unitPrice: 2.85,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 Review Ready Accounts', 'High Stick Rate Formula', 'Recovery Mail Configured', '3-Day Retention Warranty']
      },
      {
        id: 'reviews-pro',
        name: 'Reputation Pro Pack',
        quantity: 25,
        price: 67.50,
        unitPrice: 2.70,
        discountPercent: 10,
        badge: '⭐ 95%+ Stick Rate',
        isPopular: true,
        features: ['25 Review Ready Accounts', 'Pre-warmed Location History', 'Browser Cookie Profiles', 'Priority Telegram Support']
      },
      {
        id: 'reviews-agency',
        name: 'Agency Review Fleet',
        quantity: 50,
        price: 127.50,
        unitPrice: 2.55,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 Review Ready Accounts', 'Zero Shadow-Ban Guarantee', 'Full Security Handover', 'Dedicated Replacement Line']
      },
      {
        id: 'reviews-century',
        name: 'Enterprise Reputation 100',
        quantity: 100,
        price: 240.00,
        unitPrice: 2.40,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 Review Ready Accounts', 'Maximum Local Trust Rating', 'Batch CSV/JSON Delivery', 'VIP Telegram Support']
      },
      {
        id: 'reviews-vault',
        name: 'Mass Reviews Authority 500',
        quantity: 500,
        price: 1050.00,
        unitPrice: 2.10,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 Review Ready Accounts', 'Wholesale Pricing ($2.10/ea)', 'Continuous Stock Reservation', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'aged-gmail-for-google-ads',
    name: 'Aged Gmail Accounts For Google Ads',
    shortDesc: 'Prime aged accounts conditioned for Google Ads thresholds, billing setup & zero suspicious payment suspension.',
    heroTagline: 'Heavy-Aged Accounts Pre-Warmed for Google Ads Campaigns & Billing Thresholds',
    longDescription: 'Launching Google Ads on fresh accounts frequently triggers immediate "Suspicious Payment Activity" or "Circumventing Systems" account suspensions. Our Aged Google Ads Gmails have years of natural payment telemetry, YouTube viewing history, and Google Play activity. They warmup smoothly and support high initial billing thresholds.',
    basePrice: 5,
    baseQuantity: 1,
    unitPrice: 5.0,
    popular: true,
    bestValue: true,
    age: '2015 - 2021 (Heavy Aged)',
    category: 'google-ads',
    country: 'USA / UK / Global',
    countryCode: 'US',
    inStock: 1120,
    rating: 4.92,
    reviewsCount: 790,
    features: [
      'Seasoned Google Pay & Ads payment telemetry',
      'Bypasses "Suspicious Payment Activity" early fraud filters',
      'Clean historical search, YouTube & Google Maps cookies',
      'Session cookies (JSON format) and User-Agent profile included',
      'Ad spend threshold friendly for high-budget campaigns',
      'Dedicated Google Ads Warmup Checklist Included'
    ],
    specs: {
      phoneType: 'USA Carrier Phone Verified',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'USA Pure Residential IP',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Google Search, Display & Performance Max Ad Campaigns',
      'Google Merchant Center & Shopping Feed Setup',
      'YouTube Ads & Video Promotion Accounts',
      'Affiliate Marketing & High-ROI Lead Gen Funnels',
      'Agency Client Sub-Account Management'
    ],
    loginInstructions: [
      'Always use static clean USA/UK Residential or Mobile Proxies.',
      'Import provided JSON cookies into AdsPower, Dolphin{anty}, or Multilogin.',
      'Spend 1-2 days browsing and watching YouTube videos before linking credit card.',
      'Start with a low daily budget ($10-$20) for the first 48 hours.'
    ],
    bestTools: ['AdsPower', 'Dolphin{anty}', 'Multilogin', 'Octo Browser', 'Google Ads Editor'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : 2FA_SECRET : RegDate : Cookies_JSON',
    packages: [
      {
        id: 'ads-single',
        name: 'Single Ad Trial',
        quantity: 1,
        price: 5.00,
        unitPrice: 5.00,
        discountPercent: 0,
        badge: 'Trial',
        features: ['1 Heavy-Aged Account (2015-2021)', 'Google Pay Telemetry', 'Cookie Profile Included', 'Instant Delivery']
      },
      {
        id: 'ads-trio',
        name: 'Media Buyer Starter Trio',
        quantity: 3,
        price: 14.25,
        unitPrice: 4.75,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['3 Heavy-Aged Accounts', 'Suspicious Payment Shield', 'Google Ads Warmup SOP', '7-Day Warranty']
      },
      {
        id: 'ads-pro',
        name: 'Media Buyer Pro Squad',
        quantity: 10,
        price: 45.00,
        unitPrice: 4.50,
        discountPercent: 10,
        badge: '🎯 Ads Ready',
        isPopular: true,
        features: ['10 Heavy-Aged Accounts', 'High Threshold Support', '2FA Secret Keys Included', 'Priority Support']
      },
      {
        id: 'ads-scaler',
        name: 'Campaign Scaler Fleet',
        quantity: 25,
        price: 106.25,
        unitPrice: 4.25,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['25 Heavy-Aged Accounts', 'Full Profile Backups', 'Session Cookies (JSON)', '7-Day Replacement']
      },
      {
        id: 'ads-agency',
        name: 'PPC Agency Master Pack',
        quantity: 50,
        price: 200.00,
        unitPrice: 4.00,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['50 Heavy-Aged Accounts', 'Zero Suspension Warmup SOP', 'CSV/JSON Export', 'VIP Telegram Support']
      },
      {
        id: 'ads-century',
        name: 'Enterprise Ad Farms 100',
        quantity: 100,
        price: 375.00,
        unitPrice: 3.75,
        discountPercent: 25,
        badge: 'Save 25% Wholesale',
        features: ['100 Heavy-Aged Accounts', 'Lowest Rate ($3.75/ea)', 'Bulk Replacement Guarantee', 'Dedicated Ad Strategist Support']
      }
    ]
  },
  {
    id: 'new-gmail-accounts',
    name: 'New Gmail Accounts',
    shortDesc: 'Freshly generated clean PVA Gmails registered within the last 30-90 days. Budget-friendly for high-volume tasks.',
    heroTagline: 'Fresh 100% Phone Verified PVA Accounts at the Lowest Wholesale Pricing',
    longDescription: 'When your project requires sheer volume without the premium cost of vintage aging, our New Gmail Accounts provide the optimal solution. Created with clean residential IPs and real carrier numbers within the last 30-90 days, each account includes complete email, password, and recovery details for immediate high-volume deployments.',
    basePrice: 3,
    baseQuantity: 2,
    unitPrice: 1.5,
    popular: false,
    age: 'Fresh (1-3 Months Old)',
    category: 'new',
    country: 'Worldwide / Mixed',
    countryCode: 'GLOBAL',
    inStock: 6800,
    rating: 4.82,
    reviewsCount: 620,
    features: [
      'Low cost bulk solution ($1.50 per account)',
      '100% Phone Verified with unique SIM numbers',
      'Complete email : password : recovery credentials format',
      'Fresh registration with zero historical spam strikes',
      'Great for account creation, social signups & testers',
      '48-Hour Instant Replacement Guarantee'
    ],
    specs: {
      phoneType: 'SMS Carrier PVA',
      recoveryMail: true,
      twoFA: false,
      ipOrigin: 'Clean Residential Proxies',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '48-Hour Replacement Policy'
    },
    useCases: [
      'High-Volume Social Media Account Registrations',
      'Software Testing, QA Benchmarks & Script Development',
      'Coupon, Rebate & Promo Signups',
      'Bulk Newsletter & Community Registrations',
      'Temporary Account Needs & Mass Verification'
    ],
    loginInstructions: [
      'Login with matching country proxy or clean VPN.',
      'Use the recovery email provided if a secondary checkpoint appears.',
      'Avoid sending mass spam emails on day 1 to preserve account health.'
    ],
    bestTools: ['Python', 'Puppeteer', 'Selenium', 'Postman', 'Ant-Detect Browsers'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com',
    packages: [
      {
        id: 'new-duo',
        name: 'Budget Duo Pack',
        quantity: 2,
        price: 3.00,
        unitPrice: 1.50,
        discountPercent: 0,
        badge: 'Trial',
        features: ['2 Fresh PVA Accounts', 'SIM Verified', 'Recovery Mail Included', 'Instant Delivery']
      },
      {
        id: 'new-starter',
        name: 'Starter Fresh 10',
        quantity: 10,
        price: 14.25,
        unitPrice: 1.42,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 Fresh PVA Accounts', 'Clean IP Registration', 'Full Credentials', '48-Hour Warranty']
      },
      {
        id: 'new-signup',
        name: 'Social Signup Squad 25',
        quantity: 25,
        price: 33.75,
        unitPrice: 1.35,
        discountPercent: 10,
        badge: '⚡ Popular',
        isPopular: true,
        features: ['25 Fresh PVA Accounts', 'Zero Prior Usage', 'TXT/CSV Export', 'Priority Support']
      },
      {
        id: 'new-bulk',
        name: 'Bulk Fresh 50',
        quantity: 50,
        price: 63.75,
        unitPrice: 1.27,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 Fresh PVA Accounts', 'Ideal for App Testing', 'Fast Import Format', '48-Hour Replacement']
      },
      {
        id: 'new-century',
        name: 'Automation Century 100',
        quantity: 100,
        price: 120.00,
        unitPrice: 1.20,
        discountPercent: 20,
        badge: '⚡ Lowest Unit Price',
        features: ['100 Fresh PVA Accounts', 'Just $1.20 per Account', 'Batch File Download', 'Priority Support']
      },
      {
        id: 'new-mass',
        name: 'Mass Creation 500',
        quantity: 500,
        price: 525.00,
        unitPrice: 1.05,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 Fresh PVA Accounts', 'Bottom Dollar Wholesale ($1.05/ea)', 'Automated API Webhook', 'Dedicated Support Manager']
      }
    ]
  }
];

export const servicesData: ServiceProduct[] = detailedServicesData;

export const quantityTiers = [
  { label: 'Starter Pack', count: 2, discount: 0, badge: 'Standard' },
  { label: 'Growth Pack', count: 10, discount: 0.05, badge: '5% OFF' },
  { label: 'Agency Batch', count: 25, discount: 0.10, badge: '10% OFF' },
  { label: 'Outreach Pro', count: 50, discount: 0.15, badge: '15% OFF' },
  { label: 'Bulk Enterprise', count: 100, discount: 0.20, badge: '20% OFF' },
  { label: 'Master Reseller', count: 500, discount: 0.30, badge: '30% OFF' }
];
