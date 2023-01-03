
// import { Toast } from "vant";
export function sum(num) {
  var sum = 0;
  for (var i = 0; i < num.length; i++) {
    sum += num[i];
  }
  return sum;
}

export function zipSum(a, b) {
  var al = a.length,
    bl = b.length;
  if (al && bl) {
    var newArray = [];
    for (var i = 0; i < Math.max(al, bl); i++) {
      newArray[i] = (a[i] || 0) + (b[i] || 0);
    }
    return newArray;
  } else {
    if (al) return a;
    else if (bl) return b;
    else return [];
  }
}

export function getQueryString(href, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&#]*)(&|$|#)", "i");
  var r = href
    .substring(href.indexOf("?"))
    .substr(1)
    .match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export function changeValue(url, name, value) {
  var newUrl = "";
  var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
  var tmp = name + "=" + value;
  if (url.match(reg) != null) {
    newUrl = url.replace(eval(reg), tmp);
  } else {
    if (url.match("[?]")) newUrl = url + "&" + tmp;
    else newUrl = url + "?" + tmp;
  }
  return newUrl;
}

/**
 * @param {String} numerator todaySum
 * @param {String} denominator lastdaySum
 * @returns {Object} {text: STRING, up: BOOLEAN, down: BOOLEAN}
 */
export function percentage(today, yesterday, gap = false) {
  var json = {};
  if (today == yesterday) {
    if (today) {
      json.text = 0;
    } else {
      json.text = "--";
    }
  } else {
    if (today && !yesterday) {
      json.text = "--";
      json.up = true;
    } else if (!today && yesterday) {
      json.text = "100%";
      json.down = true;
    } else {
      if (gap) {
        var n = Math.ceil(today - yesterday);
      } else {
        var n = Math.ceil(((today - yesterday) / yesterday) * 100);
      }
      json.text = Math.abs(n) + "%";
      json.up = n > 0;
      json.down = n < 0;
    }
  }
  return json;
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;
    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

export function throttle(fn, delay, mustRunDelay) {
  var timer = null;
  var t_start;
  return function() {
    var context = this,
      args = arguments,
      t_curr = +new Date();
    clearTimeout(timer);
    if (!t_start) {
      t_start = t_curr;
    }
    if (t_curr - t_start >= mustRunDelay) {
      fn.apply(context, args);
      t_start = t_curr;
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    }
  };
}
export function timestampToTimeCode(timestamp1, isShowH) {
  timestamp1 = parseInt(timestamp1);
  var date = new Date(timestamp1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear();
  var M =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var h;
  // alert(date.getHours())
  if (date.getHours() < 10) {
    h = "0" + date.getHours() + ":" + m + " AM";
  } else if (date.getHours() >= 10 && date.getHours() < 13) {
    h = date.getHours() + ":" + m + " AM";
  } else if (date.getHours() >= 13 && date.getHours() < 22) {
    h = "0" + (date.getHours() - 12) + ":" + m + " PM";
  } else if (date.getHours() >= 22) {
    h = date.getHours() - 12 + ":" + m + " PM";
  }
  // alert(h)
  if (!isShowH) {
    return Y + "/" + M + "/" + D + " " + h;
  } else {
    return D + "/" + M + "/" + Y;
  }
}
//开始时间戳转化（安卓）
export function timestampToTime(timestamp1) {
  var date = new Date(timestamp1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "/";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var h;
  // alert(date.getHours())
  if (date.getHours() < 10) {
    h = "0" + date.getHours() + ":" + m + " am";
  } else if (date.getHours() >= 10 && date.getHours() < 13) {
    h = date.getHours() + ":" + m + " am";
  } else if (date.getHours() >= 13 && date.getHours() < 22) {
    h = "0" + (date.getHours() - 12) + ":" + m + " pm";
  } else if (date.getHours() >= 22) {
    h = date.getHours() - 12 + ":" + m + " pm";
  }
  // alert(h)
  return Y + M + D + " " + h;
}

//结束时间戳转化（安卓）
export function timestampToEndTime(timestamp1, num) {
  var date = new Date(timestamp1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var date1 = new Date(date.setDate(date.getDate() + 1));
  var dated = new Date(date1.setMonth(date1.getMonth() + num));
  var Y = dated.getFullYear() + "/";
  var M =
    (dated.getMonth() + 1 < 10
      ? "0" + (dated.getMonth() + 1)
      : dated.getMonth() + 1) + "/";
  var D = dated.getDate() < 10 ? "0" + dated.getDate() : dated.getDate();
  return Y + M + D + " 07:59 am";
}

//时间格式处理(英文)：Feb 5, 2019, 3:35 PM
export function formatTimeStampEN(timestamp, onlyDay, month, day) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  if (month) {
    let temp = new Date(timestamp);
    temp.setMonth(temp.getMonth() + month);
    temp.setDate(temp.getDate() + 1);
    date = temp;
  } else if (day) {
    let temp = new Date(timestamp);
    temp.setDate(temp.getDate() + day);
    date = temp;
  }
  var dayStrArr = date.toDateString().split(" ");
  var dayStr = dayStrArr[1] + " " + dayStrArr[2] + ", " + dayStrArr[3] + ",";
  if (onlyDay) return dayStrArr[1] + " " + dayStrArr[2] + ", " + dayStrArr[3];
  var h = date.getHours();
  //var m = date.getMinutes();
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var result = "";
  if (h < 13) {
    result = dayStr + " " + h + ":" + m + " AM";
  } else {
    result = dayStr + " " + (h - 12) + ":" + m + " PM";
  }
  return result;
}

//时间格式处理(英文)：Feb 5, 2019, 3:35 PM
export function formatTimeStampENSelfType(timestamp, selfType, selfYearType) {
  timestamp = parseInt(timestamp);
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

  var dayStrArr = date.toDateString().split(" ");
  var dayStr = dayStrArr[1] + selfType + dayStrArr[2] + (selfYearType || selfType) + dayStrArr[3];

  return dayStr;
}

//时间格式处理(中文)：2019.02.05, 下午3:35
export function formatTimeStampCN(timestamp, onlyDay) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var dayStrArr = date.toJSON().split("T");
  var dayStr = date.toLocaleDateString(); //dayStrArr[0].replace(/\-/g, ".");

  if (onlyDay) return date.toLocaleDateString(); //dayStrArr[0].replace(/\-/g, "/");

  var h = date.getHours();
  // var m = date.getMinutes();
  var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var result = "";
  if (h < 13) {
    result = dayStr + " 上午" + h + ":" + m;
  } else {
    result = dayStr + " 下午" + (h - 12) + ":" + m;
  }
  return result;
}

// 获取设备型号
export function getServieTypeFromDid(did) {
  let secCode = did.slice(1, 2);
  if (secCode != "F") {
    switch (secCode) {
      case "0":
        return "H12";
      case "1":
        return "H15";
      case "2":
        return "H18";
      case "3":
        return "H19";
      case "4":
        return "H21";
      case "5":
        return "H20";
      case "6":
        return "M10";
      case "7":
        return "Y18";
      case "8":
        return "Y20";
      case "9":
        return "Y21";
      case "A":
        return "M20";
      case "B":
        return "H22";
      case "C":
        return "H30";
      case "D":
        return "D11";

      case "E":
        return "Y10";
      default:
        return "未知";
    }
  } else {
    let sixSevenCode = did.slice(5, 7);
    // 设备太多了 就不一一列出来的 了；
    switch (sixSevenCode) {
      case "27":
        return "W102";
      case "1A":
        return "W10";
      case "33":
        return "D201";
      case "64":
        return "W12GA";
      case "66":
        return "W102S";
      default:
        return "其它";
    }
  }
}

export function replaceString(str, arr) {
  for (let i = 0; i < arr.length; i++) {
    str = str.replace("%s", arr[i]);
  }
  return str;
}

function selectText(textbox, startIndex, stopIndex) {
  if (textbox.createTextRange) {
    //ie
    const range = textbox.createTextRange();
    range.collapse(true);
    range.moveStart("character", startIndex); //起始光标
    range.moveEnd("character", stopIndex - startIndex); //结束光标
    range.select(); //不兼容苹果
  } else {
    //firefox/chrome
    textbox.setSelectionRange(startIndex, stopIndex);
    textbox.focus();
  }
}

export function copyString(str, wait) {
  if (!str) {
    window.setTimeout(() => {
      // Toast.fail("copy fail,Please try again");
    }, wait);
    return;
  }
  wait = wait || 0;
  const textString = str || "测试用";
  let input = document.createElement("input");
  input.id = "copy-input";
  input.readOnly = "readOnly"; // 防止ios聚焦触发键盘事件
  input.style.position = "absolute";
  input.style.left = "-1000px";
  input.style.zIndex = "-1000";
  document.body.appendChild(input);
  input.value = textString;
  // ios必须先选中文字且不支持 input.select();
  selectText(input, 0, textString.length);
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    window.setTimeout(() => {
      // Toast.success("copy success");
    }, wait);
  } else {
    window.setTimeout(() => {
      // Toast.fail("copy fail,Please try again");
    }, wait);
  }
  input.blur();
  document.body.removeChild(input);
}

// 倒计时
export function countDown(time) {
  let nowtime = new Date(), //获取当前时间
    endtime = new Date(time);
  let lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
    day = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
    hour = Math.floor((lefttime / (1000 * 60 * 60)) % 24), //计算小时数
    minutes = Math.floor((lefttime / (1000 * 60)) % 60), //计算分钟数
    seconds = Math.floor((lefttime / 1000) % 60); //计算秒数
  day = day > 0 ? day : "0";
  hour = hour > 9 ? hour : "0" + hour;
  minutes = minutes > 9 ? minutes : "0" + minutes;
  seconds = seconds > 9 ? seconds : "0" + seconds;
  return [day, hour, minutes, seconds]; //返回倒计时的字符串
}

// 版本号比对
export function versionCompare(curV, reqV) {
  var arr1 = curV.toString().split(".");
  var arr2 = reqV.toString().split("."); //将两个版本号拆成数字
  var minL = Math.min(arr1.length, arr2.length);
  var pos = 0; //当前比较位
  var diff = 0; //当前为位比较是否相等
  var flag = false; //逐个比较如果当前位相等则继续比较下一位
  while (pos < minL) {
    diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
    if (diff >= 0) {
      flag = true;
      console.log("新版本");
      break;
    } else {
      flag = false;
      break;
    }
  }
  return flag;
}

export function getModifiedDate(days) {
  const d = new Date();
  return d.setDate(d.getDate() + days);
}

// time in microseconds
export function setLocalStorage(name, value, time = null) {
  const d = new Date();
  localStorage.setItem(
    name,
    JSON.stringify(time ? {
      v: value,
      t: d.setTime(d.getTime() + time),
    } : {
      v: value
    })
  );
}

export function getLocalStorage(name, ret = null) {
  const strData = localStorage.getItem(name);
  const data = strData ? JSON.parse(strData) : null;
  const d = new Date();
  if (data && data.t && data.t < d.getTime()) {
    deleteLocalStorage(name);
  }
  return data ? (!data.t || data.t >= d.getTime()) ? data.v : ret : ret;
}

export function deleteLocalStorage(name) {
  localStorage.removeItem(name);
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

Object.defineProperty(Number.prototype, 'percentage', {
  value: function(v) {
    return this - (this * v / 100);
  },
  enumerable: false
});

export function getPayType(payType) {
	switch (payType) {
		case 10:
			return "alipay";
		case 20:
			return "wechat";
		case 30:
		case 31:
			return "paypal";
		case 40:
		case 41:
			return "apple";
		case 60:
			return "free";
		case 80: 
			return "google";
		default:
			return "stripe";
	}
}

export function isNonGooglePay(subs) {
  if (subs.length) {
    let active = subs.filter(e => e.serviceStatus === 20);
    return active.length ? getPayType(active[0].payType) : false; 
  } else {
    return false
  }
}
