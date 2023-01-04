import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider, ErrorBlock } from 'antd-mobile'
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
let lang =(navigator.language || navigator.browserLanguage).toLowerCase() || "en";
console.log('%c [ lang ]-21', 'font-size:13px; background:pink; color:#bf2c9f;', lang)
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
const locals = [
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
]
lang = lang.includes("zh")? lngs.includes(lang.replace("-", "_"))	? lang.replace("-", "_")	: "zh_cn": lang.substring(0, 2);
  console.log('%c [ lang ]-43', 'font-size:13px; background:pink; color:#bf2c9f;', lang)

ReactDOM.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>,
  document.getElementById('root')
);

