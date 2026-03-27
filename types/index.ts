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

// ── Services ─────────────────────────────────────────────────
export type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  highlights: string[];
};

// ── Opening hours ─────────────────────────────────────────────
export type OpeningHour = {
  days: string;
  time: string;
};
