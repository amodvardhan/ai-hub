/**
 * i18next configuration for multilingual support
 * Supports language detection and resource loading
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enValidation from './locales/en/validation.json';
import enMessages from './locales/en/messages.json';

import frCommon from './locales/fr/common.json';
import frValidation from './locales/fr/validation.json';
import frMessages from './locales/fr/messages.json';

/**
 * i18next resources configuration
 */
const resources = {
    en: {
        common: enCommon,
        validation: enValidation,
        messages: enMessages,
    },
    fr: {
        common: frCommon,
        validation: frValidation,
        messages: frMessages,
    },
};

/**
 * Initialize i18next
 */
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        defaultNS: 'common',
        fallbackLng: 'en',
        supportedLngs: ['en', 'fr'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
