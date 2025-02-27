import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات الترجمة
import translationAR from './locales/ar.json';
import translationEN from './locales/en.json';

i18n
  .use(LanguageDetector)
  .init({
    resources: {
      ar: { translation: translationAR },
      en: { translation: translationEN }
    },
    fallbackLng: 'ar', // اللغة الافتراضية
    debug: true,
    interpolation: {
      escapeValue: false // react already escapes values
    }
  });

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// قياس أداء التطبيق
reportWebVitals(console.log);
