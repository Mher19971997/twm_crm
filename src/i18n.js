import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Загружает переводы с сервера
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Подключаем к react-i18next
  .init({
    fallbackLng: 'en', // Язык по умолчанию
    supportedLngs: ['en', 'am'], // Список поддерживаемых языков
    interpolation: {
      escapeValue: false, // React сам защищен от XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к файлам переводов
    },
  });

export default i18n;
