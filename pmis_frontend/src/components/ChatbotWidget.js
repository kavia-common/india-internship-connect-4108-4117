import React, { useMemo, useState } from 'react';
import { chatbotAsk, getRecommendations, getProfile, listInternships } from '../services/api';
import { useLanguage } from '../i18n/LanguageContext';
import { getText } from '../i18n/texts';
import { rankInternships } from '../utils/recommender';

// PUBLIC_INTERFACE
export function ChatbotWidget() {
  /** Floating chatbot widget that uses backend if available, otherwise enhanced local recommendations. */
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I’m your PMIS assistant. Ask for recommendations or anything about your profile. 😊' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const makeExternalUrl = (it) => {
    if (it.url && /^https?:\/\//.test(it.url)) return it.url;
    if (it.pmisUrl && /^https?:\/\//.test(it.pmisUrl)) return it.pmisUrl;
    if (it.id) return 'https://internship.aicte-india.org/';
    return 'https://internship.aicte-india.org/';
  };

  function formatRecs(internships = []) {
    if (!internships.length) return 'I could not find relevant internships right now. Try updating your profile and resume, then ask me again!';
    const lines = internships.slice(0, 5).map((it, idx) => {
      const url = makeExternalUrl(it);
      const org = it.organization ? ` • ${it.organization}` : '';
      const loc = it.location ? ` • ${it.location}` : '';
      return `${idx + 1}. ${it.title}${org}${loc}\nApply: ${url}`;
    });
    return `Here are a few internships you might like:\n\n${lines.join('\n')}\n\nI can fetch more if you share your interests or preferred location. 🌟`;
  }

  function isRecIntent(text) {
    const p = text.toLowerCase();
    const keywords = ['recommend', 'suggest', 'opportunities', 'internships', 'matches', 'best for me', 'what should i apply', 'any roles'];
    return keywords.some(k => p.includes(k)) || /rec(om)?s?/.test(p);
  }

  function isProfileIntent(text) {
    const p = text.toLowerCase();
    return ['profile', 'skills', 'interests', 'resume', 'cv', 'location'].some(k => p.includes(k));
  }

  async function localRecommend() {
    // Try backend recommendations first; if failing, do local ranking.
    try {
      const recs = await getRecommendations();
      return Array.isArray(recs) ? recs : [];
    } catch {
      try {
        const [profile, all] = await Promise.all([
          getProfile().catch(() => ({})),
          listInternships({}).catch(() => []),
        ]);
        return rankInternships(profile || {}, all || [], 5);
      } catch {
        return [];
      }
    }
  }

  function localAnswer(prompt) {
    const p = prompt.toLowerCase();

    if (isRecIntent(p)) {
      // We will fetch recs in send() path and replace with formatted list; return a holding message
      return 'Absolutely! Let me find a few internships that match your profile…';
    }

    if (isProfileIntent(p)) {
      return 'Your profile helps me tailor recommendations. You can update it on the Profile page. Share your skills or interests here, and I can suggest roles too!';
    }

    if (p.includes('apply') || p.includes('application')) {
      return 'To apply, open an internship card and tap “Apply on PMIS.” Make sure your resume is updated. Need suggestions? Just say “recommend internships”.';
    }

    if (p.includes('hello') || p.includes('hi') || p.includes('hey')) {
      return 'Hello! 👋 I can suggest internships, review your profile, and guide you through applications. What would you like help with today?';
    }

    return 'I can help with recommendations, your profile, and how to apply. Try: “recommend internships in Delhi for data analysis.”';
  }

  const send = async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', content: msg }]);
    setLoading(true);
    const wantsRecs = isRecIntent(msg);

    try {
      // Ask backend first
      const res = await chatbotAsk(msg, { lang });
      const answer = res?.answer;

      if (wantsRecs) {
        // If backend also returned recs, prefer them; else fetch via our localRecommend
        const recs = Array.isArray(res?.recommendations) && res.recommendations.length
          ? res.recommendations
          : await localRecommend();
        const recText = formatRecs(recs);
        setMessages(m => [...m, { role: 'assistant', content: (answer ? answer + '\n\n' : '') + recText }]);
      } else if (isProfileIntent(msg)) {
        // Add a helpful hint to navigate to profile
        const hint = '\n\nTip: Update details on the Profile page for better recommendations.';
        setMessages(m => [...m, { role: 'assistant', content: (answer || localAnswer(msg)) + hint }]);
      } else {
        setMessages(m => [...m, { role: 'assistant', content: answer || localAnswer(msg) }]);
      }
    } catch {
      // Backend not available — local fallback
      if (wantsRecs) {
        const recs = await localRecommend();
        const recText = formatRecs(recs);
        setMessages(m => [...m, { role: 'assistant', content: recText }]);
      } else {
        setMessages(m => [...m, { role: 'assistant', content: localAnswer(msg) }]);
      }
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
            <div style={{display:'flex', gap:8}}>
              <a className="btn secondary" href="/recommendations">Recommendations</a>
              <a className="btn secondary" href="/profile">Profile</a>
              <button className="btn secondary" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>
          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'end' : 'start', maxWidth: '90%' }}>
                <div className="card" style={{ background: m.role === 'user' ? 'var(--bg-secondary)' : 'var(--bg-primary)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.role === 'user' ? 'You' : 'Assistant'}</div>
                  <div style={{ whiteSpace:'pre-wrap' }}>{m.content}</div>
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
              aria-label="assistant input"
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
