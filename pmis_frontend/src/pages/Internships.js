import React, { useEffect, useMemo, useState } from 'react';
import { listInternships, applyToInternship } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';

// PUBLIC_INTERFACE
export default function Internships() {
  /** Browse internships with basic search and location filter */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [query, setQuery] = useState('');
  const [loc, setLoc] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = async () => {
    setLoading(true);
    try {
      const res = await listInternships({ q: query, location: loc });
      setItems(res || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { search(); }, []);

  const externalUrl = (it) => {
    if (it.url && /^https?:\/\//.test(it.url)) return it.url;
    if (it.pmisUrl && /^https?:\/\//.test(it.pmisUrl)) return it.pmisUrl;
    if (it.id) return 'https://internship.aicte-india.org/';
    return 'https://internship.aicte-india.org/';
  };

  const onApply = async (it) => {
    try {
      await applyToInternship(it.id);
      alert('Application triggered successfully.');
    } catch {
      window.open(externalUrl(it), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="grid">
      <div className="container">
        <h2 style={{marginTop:0}}>🗂 {t.internships.title}</h2>
        <div className="row">
          <div>
            <label>🔎 {t.internships.search}</label>
            <input className="input" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div>
            <label>📍 {t.internships.filterLocation}</label>
            <input className="input" value={loc} onChange={e => setLoc(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop: 10, display:'flex', gap:8}}>
          <button className="btn" onClick={search}>Search</button>
          <a className="btn secondary" href="/recommendations">See Recommendations</a>
        </div>
      </div>

      {loading ? <div className="container">Loading…</div> : (
        <div className="grid">
          {items.map((it) => (
            <div key={it.id || it.title} className="card">
              <h3 style={{margin:0}}>{it.title}</h3>
              <div className="helper">{it.organization} • {it.location}</div>
              <p>{it.description?.slice(0, 200)}{it.description?.length > 200 ? '…' : ''}</p>
              <div style={{marginBottom:8}}>
                {(it.tags || []).slice(0,6).map(t => <span key={t} className="badge">{t}</span>)}
              </div>
              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                <a className="btn secondary" href={externalUrl(it)} target="_blank" rel="noopener noreferrer">Details</a>
                <button className="btn" onClick={() => onApply(it)}>{t.internships.apply}</button>
                <a className="btn success" href={externalUrl(it)} target="_blank" rel="noopener noreferrer">Apply on PMIS</a>
              </div>
            </div>
          ))}
          {!items.length && <div className="container">No results.</div>}
        </div>
      )}
    </div>
  );
}
