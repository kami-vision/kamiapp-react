import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
import en from "./locales/en/index.json";
import fr from "./locales/fr/index.json";
import de from "./locales/de/index.json";
import it from "./locales/it/index.json";
import pl from "./locales/pl/index.json";
import pt from "./locales/pt/index.json";
import ru from "./locales/ru/index.json";
import es from "./locales/es/index.json";
import tr from "./locales/tr/index.json";
import id from "./locales/id/index.json";
import vi from "./locales/vi/index.json";
import zh_cn from "./locales/zh_CN/index.json";
import zh_tw from "./locales/zh_TW/index.json";
import uk from "./locales/uk_UA/index.json";

const resources = {
    en: { translation: en},
    fr: { translation: fr},
    de: { translation: de},
    it: { translation: it},
    pl: { translation: pl},
    pt: { translation: pt},
    ru: { translation: ru},
    es: { translation: es},
    tr: { translation: tr},
    id: { translation: id},
    vi: { translation: vi},
    zh_cn: { translation: zh_cn},
    zh_tw: { translation: zh_tw},
    uk: { translation: uk},
}

let lang = (navigator.language || navigator.browserLanguage).toLowerCase() || "en";
const lngs = [
	"en",
	"fr",
	"de",
	"it",
	"pl",
	"pt",
	"ru",
	"es",
	"tr",
	"id",
	"vi",
	"zh_cn",
	"zh_tw",
	"uk",
];
lang = lang.includes("zh")? lngs.includes(lang.replace("-", "_"))
		? lang.replace("-", "_")
		: "zh_cn"
	: lang.substring(0, 2);
localStorage.setItem("locale", lang);
console.log('%c [ lang ]-74', 'font-size:13px; background:pink; color:#bf2c9f;', lang)
const dTfrmt = {};
for (let lng of lngs) {
	dTfrmt[lng] = {
		short: {
			year: "numeric",
			month: "short",
			day: "numeric",
		},
		long: {
			year: "numeric",
			month: "long",
			day: "numeric",
			weekday: "long",
			hour: "numeric",
			minute: "numeric",
		},
	};
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang || 'en',
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;