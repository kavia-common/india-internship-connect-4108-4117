import React, { useEffect, useMemo, useState } from 'react';
import { createOrUpdateProfile, getProfile } from '../services/api';
import ResumeUploader from '../components/ResumeUploader';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';

// PUBLIC_INTERFACE
export default function Profile() {
  /** Profile form and resume uploader */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    eduLevel: '',
    degree: '',
    skills: '',
    interests: '',
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          eduLevel: data.eduLevel || '',
          degree: data.degree || '',
          skills: (Array.isArray(data.skills) ? data.skills.join(', ') : data.skills) || '',
          interests: (Array.isArray(data.interests) ? data.interests.join(', ') : data.interests) || '',
        });
      } catch {
        // ignore if backend not yet available
      }
    })();
  }, []);

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const save = async () => {
    try {
      await createOrUpdateProfile({
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: form.interests.split(',').map(s => s.trim()).filter(Boolean),
      });
      setStatus(t.profile.saved);
    } catch (e) {
      setStatus(e.message || 'Failed to save');
    }
    setTimeout(() => setStatus(''), 2500);
  };

  return (
    <div className="grid">
      <div className="container">
        <h2 style={{marginTop:0}}>{t.profile.title}</h2>
        <div className="helper">{t.profile.helper}</div>
      </div>

      <div className="container">
        <div className="row">
          <div>
            <label>{t.profile.name}</label>
            <input className="input" value={form.name} onChange={e => update('name', e.target.value)} />
          </div>
          <div>
            <label>{t.profile.location}</label>
            <input className="input" value={form.location} onChange={e => update('location', e.target.value)} />
          </div>
          <div>
            <label>{t.profile.email}</label>
            <input className="input" value={form.email} onChange={e => update('email', e.target.value)} />
          </div>
          <div>
            <label>{t.profile.phone}</label>
            <input className="input" value={form.phone} onChange={e => update('phone', e.target.value)} />
          </div>
          <div>
            <label>{t.profile.eduLevel}</label>
            <input className="input" value={form.eduLevel} onChange={e => update('eduLevel', e.target.value)} />
          </div>
          <div>
            <label>{t.profile.degree}</label>
            <input className="input" value={form.degree} onChange={e => update('degree', e.target.value)} />
          </div>
          <div className="row-1">
            <div>
              <label>{t.profile.skills}</label>
              <input className="input" value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="e.g., Python, Excel" />
            </div>
          </div>
          <div className="row-1">
            <div>
              <label>{t.profile.interests}</label>
              <input className="input" value={form.interests} onChange={e => update('interests', e.target.value)} placeholder="e.g., Data, Policy" />
            </div>
          </div>
        </div>
        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn" onClick={save}>{t.profile.save}</button>
          {status && <div className="helper">✅ {status}</div>}
        </div>
      </div>

      <ResumeUploader onUploaded={() => {}} />
    </div>
  );
}
