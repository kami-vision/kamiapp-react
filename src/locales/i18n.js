import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "./en/index.json";
import fr from "./fr/index.json";
import de from "./de/index.json";
import it from "./it/index.json";
import pl from "./pl/index.json";
import pt from "./pt/index.json";
import ru from "./ru/index.json";
import es from "./es/index.json";
import tr from "./tr/index.json";
import id from "./id/index.json";
import vi from "./vi/index.json";
import zh_cn from "./zh_CN/index.json";
import zh_tw from "./zh_TW/index.json";
import uk from "./uk_UA/index.json";
import CustomFormatter from "./customFormatter";

Vue.use(VueI18n);
let lang =
	(navigator.language || navigator.browserLanguage).toLowerCase() || "en";
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
lang = lang.includes("zh")
	? lngs.includes(lang.replace("-", "_"))
		? lang.replace("-", "_")
		: "zh_cn"
	: lang.substring(0, 2);
localStorage.setItem("locale", lang);
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

// i18n 国际化多语言实现
const i18n = new VueI18n({
	locale: localStorage.getItem("locale")
		? localStorage.getItem("locale").toLowerCase()
		: "en", // 语言标识
	fallbackLocale: "en",
	silentTranslationWarn: true,
	formatter: new CustomFormatter(),
	messages: {
		en,
		fr,
		de,
		it,
		pl,
		pt,
		ru,
		es,
		tr,
		id,
		vi,
		zh_cn,
		zh_tw,
		uk,
	},
	dateTimeFormats: dTfrmt,
});

export default i18n;
