import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptTranslations from './locales/pt/translations.json';
import enTranslations from './locales/en/translations.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                translation: ptTranslations,
            },
            en: {
                translation: enTranslations,
            },
        },
        fallbackLng: 'pt',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
