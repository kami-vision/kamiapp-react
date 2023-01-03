export default class DemoPhone{
  constructor() {
    const U3529382 = createUserInfo(
      "3529382",
      "44cdbb75e37beb3f9613194ff0e24dfb",
      "57ad781552aacebe2eab52174636639c"
    );
    const defaultObj = {
      uid: "",
      region: "USA",
      country: "US",
      countryArr: [],
      currencySymbol: {},
      seq: 1,
      appPlatform: "yihome",
      host: "http://test-api.us.xiaoyi.com" //  'https://gw-us-kamihome.dev.kamicloud.net'
    };
    this.defaultObj = Object.assign(defaultObj, U3529382);
  }
  getPlatform(){
    let u = window.navigator.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIOS ? 'ios' : 'Android'
  }
  getAppName(){
    return this.defaultObj.appPlatform
  }
  getUserInfo(){
    return this.defaultObj
  }
  getHost(){
    return this.defaultObj.host 
  }
  isAppleTestAccount(){
    return 0; 
  }

}
function createUserInfo(uid, token, secretToken) {
	return {
		userId: uid,
		userid: uid,
		token: token,
		tokenSecret: secretToken,
		tokensecret: secretToken,
	};
}

