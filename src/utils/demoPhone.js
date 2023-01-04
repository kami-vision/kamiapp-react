export default class DemoPhone{
  constructor() {
    const U3529382 = createUserInfo(
      "3529382",
      "44cdbb75e37beb3f9613194ff0e24dfb",
      "57ad781552aacebe2eab52174636639c"
    );
    const U3380510 = createUserInfo(
      "3380510",
      "37599bd5ca0ae18c38a74973959363ff",
      "1501a77aae508d749e6e8792c271604e"
    );
  
    const U4092534 = createUserInfo(
      "4092534",
      "bf1938ca947bbc6d91c63115c11311c9",
      "60c4b96ccb999ac368adfc230fa9febf"
    );
  
    const U4333090 = createUserInfo(
      "4333090",
      "17416e19cb12999552baa7c2d721c431",
      "049c82905c8f8cc4a26fd2a945e625c7"
    )
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

