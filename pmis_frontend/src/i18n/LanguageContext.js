import React, { createContext, useContext, useMemo, useState } from 'react';

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  availableLangs: ['en', 'hi', 'ta', 'te', 'bn', 'mr'],
});

export function LanguageProvider({ children }) {
  const defaultLang = process.env.REACT_APP_DEFAULT_LANG || 'en';
  const [lang, setLang] = useState(defaultLang);
  const value = useMemo(() => ({ lang, setLang, availableLangs: ['en', 'hi', 'ta', 'te', 'bn', 'mr'] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
