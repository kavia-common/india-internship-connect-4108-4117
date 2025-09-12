import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import Internships from './pages/Internships';
import ChatbotPage from './pages/ChatbotPage';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { getText } from './i18n/texts';
import { ChatbotWidget } from './components/ChatbotWidget';

function Navbar({ onToggleTheme, theme }) {
  const { lang, setLang, availableLangs } = useLanguage();
  const t = useMemo(() => getText(lang), [lang]);

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
        <Link to="/" className="nav-brand" style={{ fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
          PMIS
        </Link>
        <Link to="/onboarding" className="nav-link">{t.nav.onboarding}</Link>
        <Link to="/profile" className="nav-link">{t.nav.profile}</Link>
        <Link to="/recommendations" className="nav-link">{t.nav.recommendations}</Link>
        <Link to="/internships" className="nav-link">{t.nav.internships}</Link>
        <Link to="/assistant" className="nav-link">🤖 {t.nav.assistant}</Link>
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

// PUBLIC_INTERFACE
function AppShell() {
  /** Main app shell with routing and shared UI (navbar, theme, language). */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <Router>
      <Navbar onToggleTheme={toggleTheme} theme={theme} />
      <main style={{ padding: 16, maxWidth: 980, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" replace />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/assistant" element={<ChatbotPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
      <ChatbotWidget />
    </Router>
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
