import CryptoJS from "crypto-js";

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse("1234567890123456");

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function decrypt(word, keyStr, ivStr) {
  let key = KEY;
  let iv = IV;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let base64 = CryptoJS.enc.base64.parse(word);
  let src = CryptoJS.enc.base64.stringify(base64);

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding
  });

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

/**
 * 获取图片的Blob值 url callback
 *
 */
//
export function getImageBlob(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (this.status == 200) {
      if (cb) cb(this.response);
    }
  };
  xhr.send();
}
