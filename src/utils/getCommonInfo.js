import dsbridge from "./dsbridge";
import DemoPhone from './demoPhone'
// import Notify from "vant/lib/notify";
//import i18n from "../lang/i18n";

// 获取用户信息 userid token tokensecret region country
export function getUserInfo() {
	const tmep = callMethod("getUserInfo");
	return tmep;
}

// 获取平台   返回数据： 平台字符串（Android,ios）
export function getPlatform() {
	return callMethod("getPlatform");
}

// 获取appName  返回数据： （String类型，目前支持的参数如下： yihome iot）
export function getAppName() {
	return callMethod("getAppName");
}

// 获取所有的基础信息
export function getBasicInfoFromApp() {
	let userInfo = getUserInfo();
	let deviceInfo = getPlatform();
	let appPlatform = getAppName();
	const obj = Object.assign({}, userInfo, {
		deviceInfo: deviceInfo,
		appPlatform: appPlatform,
	});
	return obj;

	/***
   * 这里返回参数有：列如
   *  {
   *    userid	用户ID
        token	用户登陆Token
        tokensecret	用户登陆Token secret
        region	用户地区
        country	用户国家
   *    deviceInfo: 设备  ； 列：Android. ios
   *    appPlatform: app名称 ；　列： yihome、neutral_ape、neutral、kami
   * }
   */
}

// 获取host
export function getHost() {
	return callMethod("getHost");
}

export function IsIOS() {
	return getPlatform() == "ios";
}

// 获取native 端是否有方法
export function getIsAppImplementFunc(funName, isRunning) {
	let androidfunName = funName.split(":")[0];
	if (!IsIOS()) {
		funName = androidfunName;
	}
	const res = dsBridge.call("getIsAppImplementFunc", funName); // 返回 0 null 1(有)
	if (res == "1" && isRunning) {
		dsBridge.call(androidfunName);
	} else if (isRunning) {
		// 没有
		// Notify({
		// 	type: "warning",
		// 	message: i18n.tc("h5_cloudService_kamiBaby_update"),
		// });
	}
	return res;
}

//ios 获取测试账号     1-是测试账号  0-非测试账号
export function isAppleTestAccount() {
	return callMethod("isAppleTestAccount");
}

// 聊天chatbot
export function showChatbot(str) {
	return dsBridge.call("showChatbot", str);
}

// device info
export function getDeviceInfo() {
	return dsBridge.call("getDeviceInfo");
}

// 是否展示 navigation

export function hiddenNavigation(str) {
	//str:  0 hiden, 1 show
	return dsBridge.call("hiddenNavigation", str);
}

// 0 hide | 1 show
export function hideTitleBar(str) {
	if (getIsAppImplementFunc("hideTitleBar:") == 1) {
		return dsBridge.call("hideTitleBar", str);
	}
}

export function closeCurrentPage(redir = false, ext = false) {
	dsBridge.call("closeCurrentPage");
	redir &&
		dsBridge.call(
			"startNewPage",
			ext
				? redir
				: `${window.location.origin}${
						window.location.href.match(/appH5/i) ? "/apph5" : ""
				  }/#/${redir}`
		);
}

export function showCancelPlanPage() {
	if (getIsAppImplementFunc("showCancelPlanPage:")) {
		return dsBridge.call("showCancelPlanPage");
	}
}

export function getUSSupportNumber() {
	return 8559345264;
}

export function openMailApp() {
	if (getIsAppImplementFunc("openMailApp:")) {
		return dsBridge.call("openMailApp");
	}
}

export function getIsAndroidVersion() {
	if (!IsIOS() && getIsAppImplementFunc("getVersionCode")) {
		const versionCode = dsBridge.call("getVersionCode");
		let versionArr = versionCode ? versionCode.split("_") : [];
		switch(versionArr[0]) {
			case "yihome":
			return parseInt(versionArr[1]) >= 311;
			case "kami":
			return parseInt(versionArr[1]) >= 103;
			default:
				return false;
		}
	}
	return false;
}

export function showZendeskChat() {
	if (getIsAppImplementFunc("openChatSupport:")) {
		return dsbridge.call("openChatSupport");
	}
}

export function brazeAnalytics(name, params = {}) {
	if (getIsAppImplementFunc("brazeAnalytics:") == 1) {
		dsbridge.call("brazeAnalytics", JSON.stringify({
			name,
			parameters: params
		}))
	}
}

export function brazeLogPurchase(params = {}) {
	if (getIsAppImplementFunc("brazeLogPurchase:") == 1) {
		dsbridge.call("brazeLogPurchase", JSON.stringify({
			productId: params.productId,
			currencyCode: params.currencyCode,
			price: params.price
		}))
	}
}

export function getGooglePurchases() {
	return getIsAppImplementFunc("getGooglePurchases:") == 1
	? dsbridge.call("getGooglePurchases") : false;
}

function callMethod(name) {
	const backData = dsBridge.call(name);
	if(!backData) {
	  var instance = new DemoPhone() ;
	  return Reflect.get(instance, name).call(instance)
	}
	let resData = backData
	try {
		resData = JSON.parse(backData);
	} catch (err) {}
	return resData;
}
