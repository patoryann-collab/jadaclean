import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importe tes fichiers de traduction
import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';
import roTranslation from './locales/ro.json'; // Si tu l'as déjà

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ro',
    resources: {
      ro: { translation: roTranslation },
      en: { translation: enTranslation },
      fr: { translation: frTranslation }
       // Ajoute ici
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;