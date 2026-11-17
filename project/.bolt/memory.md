# Project memory

## Product intent & audience

- **FindIt : Campus Lost & Found** — a college platform for students to report lost items, post found items, and recover belongings.
- Frontend-only at this stage; MongoDB + Express + Node.js backend planned later.
- Target users: college/university students.

## Brand personality & voice

- Professional, university-grade product — not a basic template.
- Minimalistic, warm, and clean; explicitly avoid "AI-looking" aesthetics.

## Visual design & UX direction

- **Palette**: cream, beige, sand/taupe, charcoal — warm neutral shades; avoid blue tones to prevent AI-looking vibes.
- **Typography**: Cormorant Garamond serif for hero headings (Bookmania substitute); Inter for body text.
- **Animations**: subtle — fade-ins, hover effects, card scaling, smooth transitions.
- **Responsive**: laptop and mobile breakpoints.
- **Components**: attractive navbar, item cards with image/name/category/date/location, swipeable cards carousel (touch-swipe mobile, arrow buttons desktop), split-screen auth layouts, dashboard with stats and tabs.
- **Patterns**: reusable React components, `@/` path alias for imports, React Router for navigation, Context API for in-memory state (items + auth), Lucide React for icons.

## Decisions, constraints & rationale

- Frontend only; no database connection (no Supabase, no Firebase).
- Temporary sample data used for initial UI preview; all interactions functional via in-memory state.
- Claim approval/rejection updates item status client-side.
- Report Item form supports image upload with preview thumbnails.
- Auth uses demo sign-in with university email validation (not real auth).

## Open questions & assumptions

- MongoDB connection and schema design deferred to backend phase.
- Real authentication implementation TBD.
- Image storage strategy TBD (currently preview-only, in-memory).
- Bookmania font not directly available; Cormorant Garamond used as close substitute — may need revisiting if exact font is required.