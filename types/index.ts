// ── Blog / Contentful ────────────────────────────────────────
export type BlogPost = {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    author?: string;
    body?: unknown;
    coverImage?: {
      fields: {
        file: {
          url: string;
          details?: { image?: { width: number; height: number } };
        };
        title: string;
      };
    };
  };
};

// ── Services (legacy — kept for contact API compatibility) ────
export type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  highlights: string[];
};

// ── Soins (new full type) ─────────────────────────────────────
export type SoinItem = {
  id: string;
  name: string;
  category: string;
  type: 'visage' | 'corps' | 'cheveux';
  subtitle: string;
  duration: string;
  price: string;
  price2: string | null;
  description: string;
  highlights: string[];
  isNew: boolean;
  isFeatured: boolean;
};

// ── Opening hours ─────────────────────────────────────────────
export type OpeningHour = {
  days: string;
  time: string;
};

// ── Boutique ──────────────────────────────────────────────────
export type BoutiqueItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  format: string;
  price: string;
  isFeatured: boolean;
};

// ── Coaching program ──────────────────────────────────────────
export type CoachingProgram = {
  title: string;
  slug: string;
};

// ── Testimonial ───────────────────────────────────────────────
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// ── FAQ ───────────────────────────────────────────────────────
export type FaqItem = {
  question: string;
  answer: string;
};
