# UI & Admin upgrade — feature/ui-admin-upgrade

This branch adds a UI upgrade (hero video background), Projects (reels-style), Services cards with WhatsApp CTAs, a minimal Admin panel to manage contact details, and example Netlify Functions for storing contact privately.

What I added
- index.html
- assets/styles.css
- assets/scripts.js
- admin/index.html
- functions/getContact.js
- functions/setContact.js

Quick next steps
1. Review the branch and assets. Currently placeholder media files (assets/bg.mp4, assets/reel1.mp4, assets/reel2.jpg, etc.) are referenced but not included — replace them with your own media in the assets/ directory.
2. Deploy serverless functions on Netlify (recommended):
   - Push branch to repo (already pushed in this PR).
   - On Netlify, connect your GitHub repo and set environment variables under Site settings > Build & deploy > Environment:
     - CONTACT_API_KEY = <strong random secret>
     - CONTACT_JSON = {"name":"Manohar","phone":"+919079216393","email":"you@example.com","whatsapp":"+919079216393"}
   - Netlify will automatically deploy the functions and site.
3. Admin usage
   - Open /admin/ and enter CONTACT_API_KEY to fetch and edit contact details.

WhatsApp
- Buttons open WhatsApp chat with prefilled messages to +91 9079216393.

Security notes
- The provided setContact function only echoes back the posted data — to persist updates you must implement a secure storage backend or call Netlify API with a management token.
- Do not commit real secrets to the repo.

If you want, I can:
- Add placeholder media files (small sized) so you immediately see the UI in action.
- Wire up actual persistence using Upstash/Cloudflare KV or a tiny server endpoint (you'd provide the API token/credentials).
- Tune styles/colors or change WhatsApp number formatting.

Please review the PR and tell me if you want placeholder media added or persistence wired up.
