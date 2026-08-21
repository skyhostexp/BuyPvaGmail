export interface ServiceProduct {
  id: string;
  name: string;
  shortDesc: string;
  basePrice: number; // price for base quantity
  baseQuantity: number; // e.g. 2 pcs or 1 pcs
  unitPrice: number;
  popular?: boolean;
  bestValue?: boolean;
  age: string;
  category: 'usa' | 'pva' | 'aged' | 'reviews' | 'google-ads' | 'new';
  country: string;
  countryCode: string;
  inStock: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  specs: {
    phoneType: string;
    recoveryMail: boolean;
    twoFA: boolean;
    ipOrigin: string;
    deliveryTime: string;
    warranty: string;
  };
}

export interface CartItem {
  product: ServiceProduct;
  quantity: number;
  selectedCountry?: string;
  selectedAge?: string;
  totalPrice: number;
}

export interface BlogGuide {
  id: string;
  title: string;
  slug: string;
  category: 'Cold Outreach' | 'Antidetect & Proxies' | 'Google Ads' | 'Google Reviews' | 'Account Security';
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General & Stock' | 'Delivery & Formats' | 'Replacements & Warranty' | 'Usage & Safety' | 'Billing & Crypto';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
  accountsBought: string;
  useCase: string;
  review: string;
  verified: boolean;
  date: string;
}

export interface ComparisonRow {
  feature: string;
  buyPvaGmail: string;
  cheapVoip: string;
  highlight?: boolean;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  email: string;
  telegramOrSkype?: string;
  paymentMethod: 'crypto';
  cryptoCurrency: string;
  txHash?: string;
  totalAmount: number;
  date: string;
  status: 'completed' | 'processing' | 'delivered';
}
