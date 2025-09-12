import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { getText } from './i18n/texts';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import Internships from './pages/Internships';
import { ChatbotWidget } from './components/ChatbotWidget';

/**
 * Top navigation without routing: switches in-page sections.
 */
function Navbar({ onToggleTheme, theme, current, onChangeSection }) {
  const { lang, setLang, availableLangs } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);

  const navBtn = (id, label) => (
    <button
      className="nav-link"
      onClick={() => onChangeSection(id)}
      aria-current={current === id ? 'page' : undefined}
      style={{
        background: current === id ? 'var(--border-color)' : 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {label}
    </button>
  );

  return (
    <nav className="navbar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'}}>
        <span className="nav-brand" style={{ fontWeight: 700 }}>PMIS</span>
        {navBtn('onboarding', t.nav.onboarding)}
        {navBtn('profile', t.nav.profile)}
        {navBtn('recommendations', t.nav.recommendations)}
        {navBtn('internships', t.nav.internships)}
        {navBtn('assistant', `🤖 ${t.nav.assistant}`)}
      </div>
      <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        <select
          aria-label="language selector"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)'}}
        >
          {availableLangs.map(l => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

function MainSections({ current, setCurrent }) {
  // Render selected section; assistant is always available via right panel
  const [isNarrow, setIsNarrow] = useState(false);
  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 360px', gap: 16 }}>
      {/* Left content area */}
      <div>
        {current === 'onboarding' && <Onboarding navigateTo={setCurrent} />}
        {current === 'profile' && <Profile />}
        {current === 'recommendations' && <Recommendations />}
        {current === 'internships' && <Internships />}
        {current === 'assistant' && (
          <div className="container">
            <h2 style={{ marginTop: 0 }}>Assistant</h2>
            <div className="helper">Chat with the assistant on the right panel. It stays visible while you browse.</div>
          </div>
        )}
      </div>

      {/* Right-side persistent assistant panel (moves below on mobile due to grid) */}
      <div className="assistant-panel">
        <PersistentChatPanel onNavigate={setCurrent} />
      </div>
    </div>
  );
}

function PersistentChatPanel({ onNavigate }) {
  // Reuse ChatbotWidget, but we need it docked in a fixed panel instead of floating
  // We will render the widget content expanded and hide the floating FAB via CSS override in this panel.
  return (
    <div className="assistant-card" style={{
      position: 'sticky',
      top: 76,
      alignSelf: 'start',
      border: '1px solid var(--border-color)',
      borderRadius: 12,
      background: 'var(--bg-primary)',
      minHeight: 420,
      maxHeight: 'calc(100vh - 100px)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <DockedChatbot onNavigate={onNavigate} />
    </div>
  );
}

function DockedChatbot({ onNavigate }) {
  // A minimal docked version that leverages ChatbotWidget UI but always open and without FAB
  // To avoid code duplication, we implement a simplified inline chat window referencing similar styles.
  const { lang } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi! I’m your PMIS assistant. Ask for recommendations or anything about your profile. 😊' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Import API lazily to avoid circular dependencies in this file
  const api = React.useRef(null);
  useEffect(() => {
    import('./services/api').then(mod => (api.current = mod));
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', content: msg }]);
    setLoading(true);

    // lightweight intent checks
    const wantsRecs = /recommend|suggest|internship|rec/i.test(msg);
    const wantsProfile = /profile|skill|interest|resume|cv|location/i.test(msg);

    try {
      const res = await api.current.chatbotAsk(msg, { lang });
      const answer = res?.answer;
      if (wantsRecs) {
        let recs = Array.isArray(res?.recommendations) && res.recommendations.length ? res.recommendations : [];
        if (!recs.length) {
          try {
            const [profile, list] = await Promise.all([
              api.current.getProfile().catch(() => ({})),
              api.current.listInternships({}).catch(() => []),
            ]);
            const { rankInternships } = await import('./utils/recommender');
            recs = rankInternships(profile || {}, list || [], 5);
          } catch {
            recs = [];
          }
        }
        const formatted = (recs || []).slice(0, 5).map((it, i) => {
          const url = it.url || it.pmisUrl || 'https://internship.aicte-india.org/';
          const org = it.organization ? ` • ${it.organization}` : '';
          const loc = it.location ? ` • ${it.location}` : '';
          return `${i + 1}. ${it.title}${org}${loc}\nApply: ${url}`;
        }).join('\n');
        setMessages(m => [...m, { role: 'assistant', content: (answer ? answer + '\n\n' : '') + (formatted || 'No matches found right now.') }]);
      } else {
        const fallback = wantsProfile
          ? 'Tip: Update details on the Profile section for better recommendations.'
          : 'I can help with recommendations, your profile, and how to apply.';
        setMessages(m => [...m, { role: 'assistant', content: answer || fallback }]);
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'I could not reach the server. Try asking for recommendations or updating your profile.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="chat-header" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <strong>🤖 {t.assistant.title}</strong>
        <div style={{display:'flex', gap:8}}>
          <button className="btn secondary" onClick={() => onNavigate('recommendations')}>Recommendations</button>
          <button className="btn secondary" onClick={() => onNavigate('profile')}>Profile</button>
        </div>
      </div>
      <div className="chat-body" style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'end' : 'start', maxWidth: '95%' }}>
            <div className="card" style={{ background: m.role === 'user' ? 'var(--bg-secondary)' : 'var(--bg-primary)' }}>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{m.role === 'user' ? 'You' : 'Assistant'}</div>
              <div style={{ whiteSpace:'pre-wrap' }}>{m.content}</div>
            </div>
          </div>
        ))}
        {loading && <div className="helper">Assistant is typing…</div>}
      </div>
      <div className="chat-input" style={{ borderTop: '1px solid var(--border-color)' }}>
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
  );
}

// PUBLIC_INTERFACE
function AppShell() {
  /** Main app shell with single-page layout, theme, language and a persistent assistant panel. */
  const [theme, setTheme] = useState('light');
  const [section, setSection] = useState('onboarding'); // onboarding | profile | recommendations | internships | assistant

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <>
      <Navbar onToggleTheme={toggleTheme} theme={theme} current={section} onChangeSection={setSection} />
      <main style={{ padding: 16, maxWidth: 1200, margin: '0 auto' }}>
        <MainSections current={section} setCurrent={setSection} />
      </main>
      {/* Hide floating widget as persistent panel is present */}
      <div style={{ display: 'none' }}>
        <ChatbotWidget />
      </div>
    </>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** App wrapped with LanguageProvider */
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

export default App;
