import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // 关键导入
import Backend from "i18next-http-backend"; // 用于加载 json 文件（可选）
import LanguageDetector from "i18next-browser-languagedetector";
import enUSTranslation from "@/locales/en_us/translation.json";
import zhHansTranslation from "@/locales/zh_hans/translation.json";
import zhHantTranslation from "@/locales/zh_hant/translation.json";
if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: "zh_CN",
      debug: true,
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
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    });
}

export default i18n;
