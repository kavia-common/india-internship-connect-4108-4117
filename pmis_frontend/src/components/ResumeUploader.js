import React, { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';
import { uploadResume } from '../services/api';

// PUBLIC_INTERFACE
export default function ResumeUploader({ onUploaded }) {
  /** Component to upload resume and display status */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [message, setMessage] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus('uploading');
    setMessage('');
    try {
      const res = await uploadResume(file);
      setStatus('success');
      setMessage(t.resume.success);
      onUploaded && onUploaded(res);
    } catch (err) {
      setStatus('error');
      setMessage(t.resume.error);
    }
  };

  return (
    <div className="container">
      <h3 className="section-title">📄 {t.resume.title}</h3>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFile}
        aria-label="resume upload"
      />
      <div className="helper">
        {status === 'uploading' && `⏳ ${t.resume.uploading}`}
        {status === 'success' && `✅ ${message}`}
        {status === 'error' && `❌ ${message}`}
      </div>
    </div>
  );
}
