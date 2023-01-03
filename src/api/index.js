import axios from "axios";

import bestLoading from '../../src/utils/bestLoading';
import { getHost, getUserInfo } from '../../src/utils/getCommonInfo';
import createHmac from "create-hmac";
import base64 from "base64-js";
// import Notify from "vant/lib/notify";

const headerOptions = {
	headers: {
		"Content-Type": "text/html,application/json",
	},
};

// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use((config) => {
	// config.headers["_pid"] = "123";
	//delete config.headers["Access-Control-Request-Headers"];

	bestLoading("showLoading");
	return config;
});

// 添加响应拦截器
axios.interceptors.response.use(
	function(response) {
		// var code = response.data.code;
		bestLoading("dismissLoading");
		const res = response.data;
		if (res.code === 20000 && res.code == 20200) {
			return response;
		} else if (res.code === 60101) {
			return response;
		} else {
			// Notify(res.msg)
			return response;
		}
	},
	function(error) {
		// 对响应错误做点什么
		bestLoading("dismissLoading");

		// Notify('status:' + error.response.status)
		if (error.response) {
		//	Notify("status:" + error.response.status);
		} else {
		//	Notify("Network Error");
		}
		return Promise.reject(error);
	}
);

export function getParamStr(params, isV4, isReturnObj = false) {
	let tokenInfo = params.secret
		? { token: params.token, tokensecret: params.secret }
		: getUserInfo();
	let token = tokenInfo.token;
	let secret = tokenInfo.tokensecret;
	let str = params ? objectToStr(params, isV4) : "";
	let encodedParams = params ? encodeParams(params) : "";
	let hmac = hmacSHA1(token, secret, str);

	if (isReturnObj) {
		return {
			hmac: hmac,
			str: "hmac=" + encodeURIComponent(hmac) + "&" + encodedParams,
		};
	} else {
		return "hmac=" + encodeURIComponent(hmac) + "&" + encodedParams; //encodeURIComponent(hmac)
	}
}

const createSign = (key, str) => {
	var hmac = createHmac("sha1", Buffer.from(key));
	hmac.update(str);
	const res = hmac.digest();
	hmac.end();
	return res;
};

export function hmacSHA1(token, secret, str) {
	return base64.fromByteArray(createSign(token + "&" + secret, str));
}

export function objectToStr(data = {}, isV4) {
	//var data = Object.entries(data);
	var arr = [];
	var keys = [];
	if (isV4) {
		keys = Object.keys(data);
	} else {
		keys = Object.keys(data).sort();
	}
	for (var i = 0, n = keys.length, key; i < n; ++i) {
		key = keys[i];
		if (typeof data[key] == "object") {
			arr.push(key + "=" + JSON.stringify(data[key]));
		} else {
			arr.push(key + "=" + data[key]);
		}
	}
	return arr.join("&") || "";
}

export function encodeParams(data = {}) {
	//var data = Object.entries(data);
	var arr = [];
	var keys = Object.keys(data).sort();
	for (var i = 0, n = keys.length, key; i < n; ++i) {
		key = keys[i];
		if (typeof data[key] == "object") {
			arr.push(key + "=" + encodeURIComponent(JSON.stringify(data[key])));
		} else {
			arr.push(key + "=" + encodeURIComponent(data[key]));
		}
	}
	return arr.join("&") || "";
}

/**
 * GET请求方法
 * @param {String} url 请求地址
 * @param {json} json 请求参数
 */
export function getData(url, json) {
	if (!json) {
		json = {};
	}
	let paramStr = getParamStr(json, url.indexOf("v4") > -1);
	let _host = getHost();
	let allUrl = _host + url + "?" + paramStr;
	return axios
		.get(allUrl, headerOptions)
		.then((res) => res.data)
		.catch((error) => error);
}

export function requestData(url, params, bodyInfos) {
	if (!bodyInfos) {
		bodyInfos = {};
	}
	let paramStr = getParamStr(params);
	let _host = params.host || getHost();
	let allUrl = _host + url + ""; //+ paramStr;
	return axios
		.post(allUrl, paramStr)
		.then((res) => res.data)
		.catch((error) => error);
}

export function putData(url, params, bodyInfos) {
	if (!bodyInfos) {
		bodyInfos = {};
	}
	let paramStr = getParamStr(params, false, true);

	let _host = getHost();
	let allUrl = _host + url + "?" + paramStr.str;
	bodyInfos.hmac = paramStr.hmac;
	return axios
		.put(allUrl, bodyInfos)
		.then((res) => res.data)
		.catch((error) => error);
}

export function postData(url, params, bodyInfos) {
  if (!bodyInfos) {
    bodyInfos = {};
  }
  let paramStr = getParamStr(params,false,true);
  let _host = getHost();
  let allUrl = _host + url;
  bodyInfos.hmac = paramStr.hmac
  return axios
    .post(allUrl,bodyInfos)
    .then(res => res.data)
    .catch(error => error);
}



// 打点用
export function getDateOnEvent(params) {
	let resParamsStr = JSON.stringify({
		data: [
			{
				c: params.name,
				t: "e",
				ts: new Date().getTime(),
				userid: params.userid,
			},
		],
	});
	let _host = "https://logus.xiaoyi.com";
	let allUrl = _host + "?data=" + resParamsStr;
	return axios
		.get(allUrl, headerOptions)
		.then((res) => res.data)
		.catch((error) => error);
}
// Klaviyo统计
export function getKlaviyoEvent(params) {
	let resParamsStr = window.btoa(
		unescape(encodeURIComponent(JSON.stringify(params)))
	);
	let _host = "https://a.klaviyo.com/api/track";
	const klaviyoParams = {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};
	// get方式
	let allUrl = _host + "?data=" + resParamsStr;
	return axios
		.get(allUrl, klaviyoParams)
		.then((res) => res.data)
		.catch((error) => error);
}
