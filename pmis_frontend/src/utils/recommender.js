function tokenize(str = '') {
  return String(str).toLowerCase().split(/[^a-z0-9+#]+/).filter(Boolean);
}

function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  const inter = new Set([...A].filter(x => B.has(x)));
  const union = new Set([...A, ...B]);
  return union.size ? inter.size / union.size : 0;
}

// PUBLIC_INTERFACE
export function scoreInternship(profile, internship) {
  /**
   * Lightweight scoring: combines skill overlap, interest match, location proximity, and title/desc keywords.
   */
  const skills = tokenize(profile.skills?.join(',') || profile.skills || '');
  const interests = tokenize(profile.interests?.join(',') || profile.interests || '');
  const location = String(profile.location || '').toLowerCase();

  const title = tokenize(internship.title || '');
  const desc = tokenize(internship.description || '');
  const tags = tokenize((internship.tags || []).join(','));
  const iloc = String(internship.location || '').toLowerCase();

  const skillScore = jaccard(skills, tags.length ? tags : desc);
  const interestScore = jaccard(interests, title.concat(desc));
  const locationScore = location && iloc ? (iloc.includes(location) || location.includes(iloc) ? 1 : 0) : 0;
  const keywordScore = jaccard(skills.concat(interests), title.concat(desc).concat(tags));

  // Weighted sum
  return 0.4 * skillScore + 0.25 * interestScore + 0.2 * keywordScore + 0.15 * locationScore;
}

// PUBLIC_INTERFACE
export function rankInternships(profile, internships = [], topK = 5) {
  /** Rank internships using scoreInternship and return topK */
  const scored = internships.map(it => ({ ...it, _score: scoreInternship(profile || {}, it) }));
  return scored.sort((a, b) => b._score - a._score).slice(0, topK);
}
