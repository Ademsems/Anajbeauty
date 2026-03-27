# /public — Static Assets

## Required Images

Place these files here before deploying:

### Hero
- `images/hero-poster.jpg` — Static fallback poster for the hero video (1920×1080 minimum)
- `video/hero.mp4` — Hero background video (muted, looping, ideally 10–30s, compressed to <10MB)
  → Recommended tool: Handbrake or FFmpeg
  → FFmpeg command: `ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -an -movflags +faststart public/video/hero.mp4`

### Jana Portrait
- `images/jana-portrait.jpg` — Portrait of Jana (aspect ratio ~3:4, min 800×1067px)

### Instagram Placeholder
- `images/instagram-placeholder.jpg` — Fallback for Instagram video thumbnails

### Favicon / OG
- `favicon.ico` — 32×32 ICO
- `images/og-image.jpg` — Open Graph preview image (1200×630)
- `apple-touch-icon.png` — 180×180 PNG

## Recommended Image Optimization
- Use WebP format where possible (Next.js Image component handles this automatically)
- Hero poster: compress to <200KB
- Portrait: compress to <300KB

## Video Hosting Alternative
For production, consider hosting the hero video on:
- Cloudflare Stream (free tier available)
- Mux (high quality, paid)
- AWS S3 + CloudFront

Update the `src` in `HeroSection.tsx` accordingly.
