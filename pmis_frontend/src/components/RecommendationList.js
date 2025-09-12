import React from 'react';

// PUBLIC_INTERFACE
export function RecommendationList({ items = [], onApply }) {
  /** List of recommended internships with basic details */
  if (!items.length) return <div className="container">{'No recommendations available.'}</div>;

  return (
    <div className="grid">
      {items.map((rec) => (
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
          <div style={{display:'flex', gap: 8}}>
            <a href={rec.url || '#'} target="_blank" rel="noreferrer" className="btn secondary">Details</a>
            <button className="btn" onClick={() => onApply && onApply(rec)}>Apply</button>
          </div>
        </div>
      ))}
    </div>
  );
}
