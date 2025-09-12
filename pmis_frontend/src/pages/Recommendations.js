import React, { useEffect, useMemo, useState } from 'react';
import { getRecommendations, getProfile, listInternships, applyToInternship } from '../services/api';
import { rankInternships } from '../utils/recommender';
import { RecommendationList } from '../components/RecommendationList';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';

// PUBLIC_INTERFACE
export default function Recommendations() {
  /** Fetch recommendations; if backend not available, fallback to client-side ranking using listing */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');

  const fetchRecs = async () => {
    setLoading(true); setNote('');
    try {
      const recs = await getRecommendations();
      setItems(recs || []);
    } catch {
      try {
        // Fallback: get profile + internships and rank locally
        const [profile, all] = await Promise.all([getProfile().catch(()=> ({})), listInternships({}).catch(()=> [])]);
        const ranked = rankInternships(profile || {}, (all || []), 5);
        setItems(ranked);
        setNote('Using local ranking based on your profile and listings.');
      } catch {
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecs(); }, []);

  return (
    <div className="grid">
      <div className="container">
        <h2 style={{marginTop:0}}>✨ {t.recs.title}</h2>
        <div className="helper">Get 3-5 top matches tailored to your skills and interests.</div>
        <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
          <button className="btn" onClick={fetchRecs}>{t.recs.refresh}</button>
        </div>
        {note && <div className="helper">ℹ️ {note}</div>}
      </div>
      {loading ? <div className="container">Loading recommendations…</div> : (
        items.length ? <RecommendationList items={items} onApply={async (rec) => {
          try {
            await applyToInternship(rec.id);
            alert('Application triggered successfully.');
          } catch {
            const url = rec.url || rec.pmisUrl || 'https://internship.aicte-india.org/';
            window.open(url, '_blank', 'noopener,noreferrer');
          }
        }} /> : <div className="container">{t.recs.empty}</div>
      )}
    </div>
  );
}
