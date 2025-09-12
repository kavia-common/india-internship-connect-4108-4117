import React, { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';
import ResumeUploader from '../components/ResumeUploader';

// PUBLIC_INTERFACE
export default function Onboarding({ navigateTo }) {
  /** Multi-step onboarding: info -> skills -> resume -> done (single-page mode) */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [step, setStep] = useState(0);

  const next = () => setStep(s => Math.min(s + 1, 3));
  const skip = () => navigateTo && navigateTo('profile');

  return (
    <div className="grid">
      <div className="container">
        <h2 style={{marginBottom: 4}}>{t.onboarding.title}</h2>
        <div className="helper">{t.onboarding.subtitle}</div>
        <div style={{display: 'flex', gap: 6, marginTop: 8}}>
          {t.onboarding.steps.map((s, i) => (
            <span key={s} className="badge" style={{ background: i <= step ? 'var(--border-color)' : 'transparent' }}>{s}</span>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="container">
          <div className="row">
            <div>
              <label>👤 {t.profile.name}</label>
              <input className="input" placeholder="Your full name" />
            </div>
            <div>
              <label>📍 {t.profile.location}</label>
              <input className="input" placeholder="City, State" />
            </div>
          </div>
          <div className="helper">Tip: Use your official email address for better communication.</div>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button className="btn" onClick={next}>{t.onboarding.next}</button>
            <button className="btn secondary" onClick={skip}>{t.onboarding.skip}</button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="container">
          <div className="row">
            <div>
              <label>🛠 {t.profile.skills}</label>
              <input className="input" placeholder="e.g., Python, Excel, Web Dev" />
            </div>
            <div>
              <label>⭐ {t.profile.interests}</label>
              <input className="input" placeholder="e.g., Data, Design, Policy" />
            </div>
          </div>
          <div className="helper">Tip: Add 5-8 skills to increase match accuracy.</div>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button className="btn" onClick={next}>{t.onboarding.next}</button>
            <button className="btn secondary" onClick={skip}>{t.onboarding.skip}</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <ResumeUploader onUploaded={() => setStep(3)} />
      )}

      {step === 3 && (
        <div className="container">
          <h3 style={{marginTop:0}}>🎉 {t.onboarding.doneTitle}</h3>
          <div className="helper">{t.onboarding.doneSubtitle}</div>
          <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
            <button className="btn success" onClick={() => navigateTo && navigateTo('recommendations')}>{t.nav.recommendations}</button>
            <button className="btn secondary" onClick={() => navigateTo && navigateTo('profile')}>{t.nav.profile}</button>
            <button className="btn secondary" onClick={() => navigateTo && navigateTo('assistant')}>{t.nav.assistant}</button>
          </div>
        </div>
      )}
    </div>
  );
}
