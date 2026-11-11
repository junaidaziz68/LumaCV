/**
 * API Configuration
 * In production (Vercel), requests go to the same origin via /api rewrite.
 * In development, requests go to the local FastAPI server.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://lumacv.onrender.com' : 'http://localhost:8000');

export default API_BASE_URL;
