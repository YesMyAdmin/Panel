import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import initReactI18next from 'i18next-browser-languagedetector'

function I18n() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)  
    .init({
      fallbackLng: 'zh_CN',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        //English United States variant
        en_US: { translation: require('./locales/en_us/translation.json') },
        //简体中文(通用)
        zh_CN: { translation: require('./locales/zh_hans/translation.json') },
        zh_SG: { translation: require('./locales/zh_hans/translation.json') },
        zh_MY: { translation: require('./locales/zh_hans/translation.json') },
        //繁體中文(通用)
        zh_HK: { translation: require('./locales/zh_hant/translation.json') },
        zh_TW: { translation: require('./locales/zh_hant/translation.json') },
      },
    });
}

export function App() {
  I18n()
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}
