# PMIS Frontend (React)

A mobile-first web app to help candidates discover and apply for relevant internships on the PM Internship Scheme portal. Includes onboarding, profile entry, resume upload, AI-based recommendations, internship listing, regional language support, and an AI assistant.

## Quick Start

1. Copy environment variables
   cp .env.example .env
   Then update:
   - REACT_APP_API_BASE_URL to point to pmis_backend (e.g., http://localhost:8000)

2. Install and run
   npm install
   npm start
   Open http://localhost:3000

3. Build
   npm run build

## Features Implemented

- Candidate onboarding with visual steps
- Profile form with skills and interests
- Resume upload (multipart) and status
- Personalized recommendations (uses backend if available; otherwise client-side lightweight ranking)
- Internship listing with search and location filter
- AI chatbot (widget + page) with backend integration and local rule-based fallback
- Regional language adaptation (EN, HI, TA, TE, BN, MR)
- Light/Dark theme toggle
- Responsive design for mobile

## API Integration

The app expects these endpoints in pmis_backend:

- POST /api/profile
- GET  /api/profile
- POST /api/resume/upload
- GET  /api/recommendations
- GET  /api/internships?q=&location=
- POST /api/internships/:id/apply
- POST /api/assistant/ask

All API calls are configured via REACT_APP_API_BASE_URL.

## Notes

- If backend endpoints are not yet available, Recommendations fall back to client-side ranking using /api/internships and your saved profile (or defaults).
- The AI assistant uses backend first; if unavailable it uses a small rule-based set of answers.

## Accessibility

- Keyboard friendly forms and buttons
- Clear labels and helper text
- High-contrast theme available via theme toggle
