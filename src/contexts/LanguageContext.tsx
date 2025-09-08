// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  translate: (ko: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
    // 선택된 언어를 로컬 스토리지에 저장
    localStorage.setItem('preferred-language', language === 'ko' ? 'en' : 'ko');
  }, [language]);

  const translate = useCallback((ko: string, en: string) => {
    return language === 'ko' ? ko : en;
  }, [language]);

  return (
      <LanguageContext.Provider value={{ language, toggleLanguage, translate }}>
        {children}
      </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}