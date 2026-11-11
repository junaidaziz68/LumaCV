/**
 * API Configuration
 * In production, requests go to the same origin; Netlify proxies /api/* to the
 * FastAPI backend (see netlify.toml). In development, requests go to the local
 * FastAPI server. Set VITE_API_URL to override.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '' : 'http://localhost:8000');

export default API_BASE_URL;
