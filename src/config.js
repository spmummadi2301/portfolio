// All personal details come from .env (VITE_* variables).
const e = import.meta.env
const config = {
  name: e.VITE_NAME || 'Your Name',
  role: e.VITE_ROLE || 'Video editor',
  tagline: e.VITE_TAGLINE || '',
  bioLead: e.VITE_BIO_LEAD || '',
  bio: e.VITE_BIO || '',
  // About-section stats; leave empty to count the reels and clients on the site.
  statReels: e.VITE_STAT_REELS || '',
  statClients: e.VITE_STAT_CLIENTS || '',
  statLanguages: e.VITE_STAT_LANGUAGES || '2',
  skills:(e.VITE_SKILLS || '').split(',').map((s) => s.trim()).filter(Boolean),
  location: e.VITE_LOCATION || '',
  email: e.VITE_EMAIL || '',
  phone: e.VITE_PHONE || '',
  instagram: e.VITE_INSTAGRAM || '',
  youtube: e.VITE_YOUTUBE || '',
  // Paths like /profile.png point into public/; make them relative so they work under any base path.
  image: (e.VITE_PROFILE_IMAGE || '').replace(/^\//, import.meta.env.BASE_URL),
}
export default config
