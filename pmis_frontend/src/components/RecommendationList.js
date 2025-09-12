import React from 'react';

// PUBLIC_INTERFACE
export function RecommendationList({ items = [], onApply }) {
  /** List of recommended internships with basic details and direct PMIS link */
  if (!items.length) return <div className="container">{'No recommendations available.'}</div>;

  const getExternalUrl = (rec) => {
    // Prefer explicit url if present. As a fallback, try constructing from known fields.
    if (rec.url && /^https?:\/\//.test(rec.url)) return rec.url;
    // If backend gives a pmisId or id, attempt to point to the PMIS portal search/registration.
    // We keep this generic; real portal paths can be slotted here when available.
    if (rec.pmisUrl && /^https?:\/\//.test(rec.pmisUrl)) return rec.pmisUrl;
    if (rec.id) {
      return `https://internship.aicte-india.org/`;// Generic landing; user can proceed to register/apply
    }
    return 'https://internship.aicte-india.org/';
  };

  return (
    <div className="grid">
      {items.map((rec) => {
        const external = getExternalUrl(rec);
        return (
          <div key={rec.id || rec.title} className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'start', gap: 8}}>
              <div>
                <h3 style={{margin: 0}}>{rec.title}</h3>
                <div className="helper">{rec.organization} • {rec.location}</div>
              </div>
              {typeof rec._score === 'number' && (
                <span className="badge">Score: {(rec._score*100).toFixed(0)}</span>
              )}
            </div>
            <p style={{marginTop: 8}}>{rec.description?.slice(0, 180)}{rec.description?.length > 180 ? '…' : ''}</p>
            <div style={{marginBottom: 8}}>
              {(rec.tags || []).slice(0, 6).map((t) => <span key={t} className="badge">{t}</span>)}
            </div>
            <div style={{display:'flex', gap: 8, flexWrap:'wrap'}}>
              <a href={external} target="_blank" rel="noopener noreferrer" className="btn secondary">Details</a>
              <button className="btn" onClick={() => onApply && onApply(rec)}>Apply</button>
              <a href={external} target="_blank" rel="noopener noreferrer" className="btn success">Apply on PMIS</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
