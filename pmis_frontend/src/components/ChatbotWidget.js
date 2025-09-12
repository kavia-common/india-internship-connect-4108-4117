import React, { useMemo, useState } from 'react';
import { chatbotAsk } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';

// PUBLIC_INTERFACE
export function ChatbotWidget() {
  /** Floating chatbot widget that uses backend if available, otherwise simple local responses. */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! How can I help you find internships today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  function localAnswer(prompt) {
    // Lightweight rule-based fallback
    const p = prompt.toLowerCase();
    if (p.includes('resume')) return 'Make sure your resume highlights skills and relevant projects. You can upload it on the Profile page.';
    if (p.includes('apply')) return 'Open the internship and click Apply; ensure your profile is complete.';
    if (p.includes('recommend')) return 'Head to Recommendations to see top matches based on your profile.';
    return 'I can help with profile, resume, recommendations, and applications. Try asking: "How to improve my chances?"';
  }

  const send = async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await chatbotAsk(msg, { lang });
      const answer = res?.answer || localAnswer(msg);
      setMessages(m => [...m, { role: 'assistant', content: answer }]);
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: localAnswer(msg) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="chat-window" aria-label="chatbot window">
          <div className="chat-header">
            <strong>🤖 {t.assistant.title}</strong>
            <button className="btn secondary" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'end' : 'start', maxWidth: '90%' }}>
                <div className="card" style={{ background: m.role === 'user' ? 'var(--bg-secondary)' : 'var(--bg-primary)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.role === 'user' ? 'You' : 'Assistant'}</div>
                  <div>{m.content}</div>
                </div>
              </div>
            ))}
            {loading && <div className="helper">Assistant is typing…</div>}
          </div>
          <div className="chat-input">
            <input
              className="input"
              placeholder={t.assistant.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? send() : undefined}
            />
            <button className="btn" onClick={send}>{t.assistant.send}</button>
          </div>
        </div>
      )}
      <button className="chatbot-fab" onClick={() => setOpen(o => !o)} aria-label="open assistant">
        {open ? '✕' : '🤖'}
      </button>
    </>
  );
}
