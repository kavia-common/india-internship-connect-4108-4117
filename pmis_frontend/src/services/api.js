const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * Basic wrapper around fetch for JSON APIs with error handling.
 */
async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const opts = {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
  };

  const res = await fetch(`${API_BASE}${path}`, opts);
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message = (data && data.message) || res.statusText || 'Request failed';
    throw new Error(message);
  }
  return data;
}

// PUBLIC_INTERFACE
export function createOrUpdateProfile(profile) {
  /** Create or update user profile. */
  return request('/api/profile', { method: 'POST', body: profile });
}

// PUBLIC_INTERFACE
export function getProfile() {
  /** Get current user profile */
  return request('/api/profile', { method: 'GET' });
}

// PUBLIC_INTERFACE
export function uploadResume(file) {
  /** Upload resume to backend for parsing and store reference. */
  const form = new FormData();
  form.append('file', file);
  return request('/api/resume/upload', { method: 'POST', body: form });
}

// PUBLIC_INTERFACE
export function getRecommendations() {
  /** Retrieve AI-based recommendations from backend. */
  return request('/api/recommendations', { method: 'GET' });
}

// PUBLIC_INTERFACE
export function listInternships(query = {}) {
  /** List available internships with optional filters. */
  const qs = new URLSearchParams(query).toString();
  return request(`/api/internships${qs ? `?${qs}` : ''}`, { method: 'GET' });
}

// PUBLIC_INTERFACE
export function applyToInternship(internshipId) {
  /** Trigger application action for an internship */
  return request(`/api/internships/${internshipId}/apply`, { method: 'POST' });
}

// PUBLIC_INTERFACE
export function chatbotAsk(message, context = {}) {
  /** Ask the assistant for help. Fallback handled in frontend if backend missing. */
  return request('/api/assistant/ask', { method: 'POST', body: { message, context } });
}
