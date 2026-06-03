import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import initReactI18next from "i18next-browser-languagedetector";
import { HelloPage } from "./views/hello";
import enUSTranslation from "./locales/en_us/translation.json";
import zhHansTranslation from "./locales/zh_hans/translation.json";
import zhHantTranslation from "./locales/zh_hant/translation.json";
import "./App.css";

function I18n() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "zh_CN",
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      resources: {
        //English United States variant
        en_US: { translation: enUSTranslation },
        //简体中文(通用)
        zh_CN: { translation: zhHansTranslation },
        zh_SG: { translation: zhHansTranslation },
        zh_MY: { translation: zhHansTranslation },
        //繁體中文(通用)
        zh_HK: { translation: zhHantTranslation },
        zh_TW: { translation: zhHantTranslation },
      },
    });
}

export function App() {
  I18n();
  return <HelloPage />;
}
