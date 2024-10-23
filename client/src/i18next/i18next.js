import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import CustomBackend from './CustomBackend'; 

// Initialize i18next
i18n
  .use(CustomBackend) 
  .use(initReactI18next) 
  .init({
    fallbackLng: 'en', 
    debug: true, 
    detection: {
      order: ['queryString', 'cookie'], 
      cache: ['cookie'], 
    },
    interpolation: {
      escapeValue: false, 
    },
    preload: ['en', 'ar', 'tr'], 
    // Optional: Configure namespaces for better organization
    ns: ['translation'], 
    defaultNS: 'translation', 
  });

export default i18n;
