# Video editor portfolio

React + Vite. Royal oxblood and brass, built for vertical reels.

## Run
```
npm install
npm run dev
```

## Your details
Edit `.env` (name, role, tagline, bio, email, phone, social links, profile photo path). Restart the dev server after changes.
Profile photo: put it in `public/` and set `VITE_PROFILE_IMAGE=/profile.jpg`.

## Videos: one folder per client
```
src/clients/
  nev-infotech/   nev_day_1.mp4, nev_in.mp4
  dental-clinic/  8th.mp4, review_1_demo.mp4
  carr/           CARR.mp4
```
Any new folder with videos becomes a new section automatically.
Optional `client.json` in a folder sets the title, description, order and per-video titles.

## Build
`npm run build` outputs `dist/`. Deploy to Netlify, Vercel or Cloudflare Pages.
Heads up: the source videos are large (30-60 MB each). Compress them (H.264, ~6-8 Mbps) before deploying.
