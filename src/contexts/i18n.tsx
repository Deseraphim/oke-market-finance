import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

interface Translations {
  [key: string]: string;
}

interface I18nContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${language}.json`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(error);
        // Fallback to English if the selected language fails to load
        if (language !== 'en') {
          setLanguage('en');
        }
      }
    };

    fetchTranslations();
  }, [language]);

  const t = useMemo(() => (key: string): string => {
    return translations[key] || key;
  }, [translations]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};
