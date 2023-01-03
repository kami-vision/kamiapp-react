// import util from '../utils/util'
// const host="http://apidoc.xiaoyi.com"
import { getData, requestData, putData, postData } from "./index";
import {getLocale} from '../utils/convert'
import { getBasicInfoFromApp, isAppleTestAccount } from '../utils/getCommonInfo'
// import Notify from 'vant/lib/notify';
// import { Dialog } from 'vant';

import {getIosMoreSkuChannel} from '../utils/convert';
import axios from "axios";
function Notify () {
    console.log('Notify')
}
function Dialog() {
    console.log('Dialog')
}
function objToEmapty(obj){
  for(let index in obj){
    if(!obj[index]){
      delete obj[index]
    }
  }
  return obj
}
// 获取服务商品列表
export function getCloudProductList(json) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    type:json.type || 1, // 1-云存；3-E911；4-smartservice
    channel:json.channel,
    country:basicData.country
  }
  console.log('json.type =' + json.type)
  if((basicData.deviceInfo != 'Android') && (isAppleTestAccount() == 1) && json.type != 3 ){
    tParam.channel = getIosMoreSkuChannel(basicData.appPlatform)
  }
  return getData("/orderpay/v8/product/list", tParam);
}

// 获取服务商品详情
export function getCloudProductDetailBySkuId(json) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    skuId:json.skuId,
    country:basicData.country
  }
  return getData("/orderpay/v8/product/detail", tParam);
}

// 购买云存前 生成token 防止重复点击或者重复生成订单
export function setOrderCreateToken() {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
  }
  return getData("/orderpay/v8/createToken", tParam);
}


// 生成订单
export function generateOrder(json) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    country: basicData.country,
    appPlatform: basicData.appPlatform,
    // 系统类型（1：ios，2：android，3：h5，4：pc）
    appSystem: (basicData.deviceInfo == 'ios') ? 1 : 2,
    channel:json.channel,
    currency:json.currency,
    skuId:json.skuId,
    token:json.orderCreateToken,
  }
  if (json && json.payAmount) tParam.payAmount = json.payAmount;
  if (json && json.uid) tParam.uid = json.uid || "";
  const data = requestData("/orderpay/v8/createOrder", tParam, {});
  data.then(json=>{
    console.log(json)

    if(json.code == 60058){
      Dialog.alert({
        title: 'Woah! Hold up… ',
        message: 'You are already subscribed to e911 service. Please choose any other plan.',
        confirmButtonText:'Ok'
      });
    }
  })

  return data
}

// one-time discount
export function discountCode(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
		country: basicData.country,
		appPlatform: basicData.appPlatform,
    discountCode: json.discountCode
  }
	return getData("/orderpay/v8/discount/discountcode/validate", tParam);
}

//paypal支付
export function toPayByPalpal(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    orderCode:json.orderCode,
    productName:json.productName
  }
  if (json.discountCode) tParam.discountCode = json.discountCode;
  return requestData("/orderpay/v8/paypal/createPlan", tParam, {});
}

//cardpay支付
export function toPayByCard(json ={} ) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    orderCode:json.orderCode,
    productName:json.productName
  }
  return requestData(
    "/orderpay/v8/paypal/creditCard/pay",
    tParam,
    {}
  );
}


//cardpay支付
export function renewOrder(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    beforeOrderCode:json.orderCode
  }

  const data =  requestData("/orderpay/v8/renewalOrder", tParam, {});
  data.then(json=>{
    console.log(json)
    if(json.code == 60058){
      Dialog.alert({
        title: 'Woah! Hold up… ',
        message: 'You are already subscribed to e911 service. Please choose any other plan.',
        confirmButtonText:'Ok'
      });
    } else if(json.code == 60127){
      Dialog.alert({
        title: 'Woah! Hold up… ',
        message: 'The current package is not available for continuance,please purchase again',
        confirmButtonText:'Ok'
      });
    }
  })

  return data
}
// paypal  本地支付 发起支付
export function createTransaction(json = {}) {
  // let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:json.userid, //basicData.userid,
    region:json.region, //basicData.region,
    orderCode:json.orderCode,
    fundingSource:json.fundingSource,
    token:json.token,
    secret:json.secret,
    host: json.host
  }

  const data =  requestData("/orderpay/v8/paypal/createtransaction", tParam, {});
  return data
}

// paypal 本地支付 更新交易结果
export function excuteTransaction(json = {}) {
  // let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:json.userid,
    region: json.region,
    orderCode:json.orderCode,
    token:json.token,
    secret:json.secret,
    host: json.host,
    captureId:json.captureId
  }

  const data =  requestData("/orderpay/v8/paypal/excutetransaction", tParam, {});
  return data
}



// 判断登录账户是否已经购买云存订单 iso账户
export function checkExistOrderIos(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    uid: json.uid
  }
  return getData(
    "/orderpay/v5/orderpayment/anyorderwithactivesub",
    tParam
  );
}

// 根据用户和uid绑定检查是否已经使用云存
export function checkUserCloudServiceByUid(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    uid: json.uid
  }

  return getData(
    "/orderpay/v5/orderpayment/anyorderwithactivesub/uid",
    tParam
  );
}


// 服务码通道
export function createOrderByServiceCode(json) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatfrom: basicData.appPlatform,
    chargeCardPwd: json.serviceCode,
    country:basicData.country,
    appSystem: (basicData.deviceInfo == 'ios') ? 1 : 2
  }
  const dataJson =  requestData("/orderpay/v8/charge/card/active", tParam, {});
  // dataJson.then(res=>{
  //   if(res.code == '60129' ){
  //     Notify(' This code can only be used in US')
  //   } else if(res.code == '60058'){
  //     Notify('You are already subscribed to e911 service. Please choose any other plan.')
  //   }
  // })
  return dataJson

}

// 一键激活 获取设备云存服务信息根据uid
export function getInfoByDevice(json) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatform: basicData.appPlatform,
    country:basicData.country,
    uid: json.uid,
  }

  return getData("/orderpay/v8/judge/equipment/active", tParam);
}

// 一键激活设备云存服务
export function createOrderByDevice(json) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatfrom: basicData.appPlatform,
    country:basicData.country,
    uid: json.uid,
    appSystem: (basicData.deviceInfo == 'ios') ? 1 : 2
  }

  return requestData("/orderpay/v8/device/active", tParam, {});
}

// 获取订单列表
export function getOrderList(json) {
  let basicData = getBasicInfoFromApp()
  if(basicData.appPlatform == 'yihome' || basicData.appPlatform == 'kami' ){
    basicData.appPlatform = 'yihome,kami'
  }
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatform: basicData.appPlatform,
    country:basicData.country,
    page: json.page || 1,
    pageSize: json.pageSize || 1000
  }
  if (json && json.startFrom) tParam.startTime = json.startFrom;
  if (json && json.endTo) tParam.endTime = json.endTo;

  return getData("/orderpay/v8/list", tParam);
}
// 获取订单详情
export function getOrderDetail(json) {
  let basicData = getBasicInfoFromApp()
  if(basicData.appPlatform == 'yihome' || basicData.appPlatform == 'kami' ){
    basicData.appPlatform = 'yihome,kami'
  }
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatform: basicData.appPlatform,
    orderCode: json.orderCode,
    country:basicData.country,
    type: json.type || 1
  }
  return getData("/orderpay/v8/detail", tParam );
}

// 取消订单
export function cancelOrder(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatform: basicData.appPlatform,
    ordercode: json.orderCode,
    paymenttype: json.paymentType
  }
  if(json.reason) tParam.reason = json.reason;

  return putData(
    "/orderpay/v5/orderpayment/order/cancel",
    tParam,
    {},
  );
}


// 是否是新用户
export function getTrial(json = {}) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    appPlatform: basicData.appPlatform,
    country:basicData.country
  }
  return getData(     // trial 1-新用户 0-非新用户   subscription 1-无订阅中订单  0-有订阅订单
    "/orderpay/v8/getTrial",
    tParam,
  );
}

/**
 * stripe 支付
 * 
 */
// 创建自动订阅
export function createCustomer(json ){
  let basicData = getBasicInfoFromApp()
  let tParam={
    paymentMethod:json.paymentMethod,
    // email:json.email,
    userid:basicData.userid,
    orderCode:json.orderCode,
    region:basicData.region,
    planId:json.planId,
    seq:1,
    locale:getLocale(),
    appPlatform: basicData.appPlatform,
  }
  if (json.discountCode) tParam.discountCode = json.discountCode;
  const resPut = putData("/orderpay/v8/stripe/pay/subscriptions/create", tParam,tParam);
  resPut.then(json=>{
    // if(json.code === 60101){
    //   const currency = json.msg.split('currency ')[1].split(';')[0]
    //   let str = 'Your account has been subscribed to the service in ' + currency　+　' , you cannot subscribe to the service in other currencies, please change back to ' + currency +' or create a new account'
    //   console.log(str)
    //   Notify(str)
    // } else 
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resPut
}

// 创建一次性订阅
export function createStripePay(json ){
  let basicData = getBasicInfoFromApp()
  let tParam={
    paymentMethod:json.paymentMethod,
    // email:json.email,
    userid:basicData.userid,
    orderCode:json.orderCode,
    region:basicData.region,
    seq:1,
    locale:getLocale(),
    appPlatform: basicData.appPlatform,
  }
  const resPut = putData("/orderpay/v8/stripe/pay/create", tParam,tParam);
  resPut.then(json=>{
    // if(json.code === 60101){
    //   const currency = json.msg.split('currency ')[1].split(';')[0]
    //   let str = 'Your account has been subscribed to the service in ' + currency　+　' , you cannot subscribe to the service in other currencies, please change back to ' + currency +' or create a new account'
    //   console.log(str)
    //   Notify(str)
    // } else 
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resPut
}

// 获取卡的信息
export function getCard(){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  const resData = getData("/orderpay/v8/stripe/pay/subscriptions/card", tParam);
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  
  return resData
}
// 取消stripe 订阅
export function cancelGoogleSubscription(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    orderCode:json.orderCode,
    seq:1,
    appPlatform: basicData.appPlatform,
		productId: json.productId
  }
  if(json.chooseReason) tParam.chooseReason = json.chooseReason;
  if(json.reason) tParam.reason = json.reason;
  const resData = postData("/orderpay/v8/google/play/subscription/cancel", tParam, tParam);
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData
}
// 取消stripe 订阅
export function cancelSubscription(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    orderCode:json.orderCode,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  if(json.chooseReason) tParam.chooseReason = json.chooseReason;
  if(json.reason) tParam.reason = json.reason;
  const resData = requestData("/orderpay/v8/stripe/pay/subscriptions/cancel", tParam,{});
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData

}

// 取消 paypal 订阅
export function cancelPaypalSubscription(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    orderCode:json.orderCode,
    seq:1,
    appPlatform: basicData.appPlatform
  }
  if(json.chooseReason) tParam.chooseReason = json.chooseReason;
  if(json.reason) tParam.reason = json.reason;
  const resData = requestData("/orderpay/v8/paypal/cancelSubscribe", tParam,{});
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData

}

// 设置默认卡
export function setDefaultCard(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    paymentMethod :json.paymentMethod,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  const resData = requestData("/orderpay/v8/stripe/pay/card/default", tParam,{});
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData
}
// 添加卡
export function addCard(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    paymentMethod :json.paymentMethod,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  const resData = requestData("/orderpay/v8/stripe/pay/card/add", tParam,{});
  resData.then(json=>{
    console.log('cardAdd = ' +  json)
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData
}
// 修改卡
export function updateCard(json){
  let basicData = getBasicInfoFromApp()
  let Param={
    userid:basicData.userid,
    region:basicData.region,
    country:basicData.country,
    name:json.name,
    line1:json.address,
    city :json.city,
    email: json.email,
    // phone :json.phone,
    state :json.state,
    paymentMethod :json.paymentMethod,
    postalCode :json.postalCode,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  let tParam = objToEmapty(Param)
  const resData =  requestData("/orderpay/v8/stripe/pay/card/update", tParam,{});
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData
}
// 删除卡
export function CardDetele(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    paymentMethod :json.paymentMethod,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  const resData = requestData("/orderpay/v8/stripe/pay/card/delete", tParam,{});
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  return resData
}
// 获取 stripe  public key
export function getStripePayKey(){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    seq:1,
    appPlatform: basicData.appPlatform,
  }
  const resData = getData("/orderpay/v8/stripe/pay/key", tParam);
  resData.then(json=>{
    if (json.code !== 20000){
      const msg = JSON.parse(json.msg)
      Notify(msg.error.message)
    }
  })
  
  return resData
}

// 获取用户服务列表
export function getServiceList(json={}) {
  let basicData = getBasicInfoFromApp()
  if(basicData.appPlatform == 'yihome' || basicData.appPlatform == 'kami' ){
    basicData.appPlatform = 'yihome,kami'
  }
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    seq:1,
    appPlatform: basicData.appPlatform,
    businessTypes:json.businessTypes
  }
  
  return getData(`/vas/v8/cloud/service`,tParam); 
}

// 获取设备列表
export function getCameraList(id) {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    region:basicData.region,
    userid:basicData.userid,
    // region: basicData.region,
    timestamp:new Date().getTime()
  }
  return getData(`/vas/v8/cloud/deviceList`,tParam);
}

export function getDeviceList(json){
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
  }
  return getData("/v4/devices/list",tParam);

}

// 绑定设备
export function bindDevice(json){
  let basicData = getBasicInfoFromApp()
  let tParam={
    userid:basicData.userid,
    region:basicData.region,
    businessOrderCode: json.orderCode,
    devUid: json.ids,
    state: 1,
    seq:1
  }
  const resData = putData(`/vas/v8/cloud/setBindNew`, tParam,tParam);
  resData.then(json=>{
    if(json.code == 50053){
      Dialog.alert({
        message: json.msg,
        confirmButtonText:'Ok'
      });
    } else if (json.code !== 20000){
      Notify(json.msg)
    }
  })
  return resData
}

// 获取登录code

export function getOauthCode(json){
  let basicData = getBasicInfoFromApp()
  let tParam = {
    userid :basicData.userid,
    seq: 1,
    timestamp:new Date().getTime()
  }
  return getData("/v4/users/oauth/code",tParam);

}

// 获取用户转移code
export function getTransferCode(json){
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid :basicData.userid
  }
  return getData("/v2/user/transfer/code",tParam);
}

// 通过skuId 获取sku 详情
export function getSkuDetail(json){
  let basicData = getBasicInfoFromApp()
  let tParam = {
    userid: basicData.userid,
    appPlatform: json.appPlatform ? json.appPlatform : basicData.appPlatform,
    appSystem: json.appSystem ? json.appSystem : basicData.deviceInfo == 'ios' ? 1 : 2, 
    seq: 1,
    skuId: json.skuId
  }
  return getData("/orderpay/v8/order/sku/info",tParam);

}

// 升降级
// 生成订单
export function upDowngrade(json) {
  // 0-初始；1-降级；2-升级
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    country: basicData.country,
    appPlatform: basicData.appPlatform,
    // 系统类型（1：ios，2：android，3：h5，4：pc）
    appSystem: (basicData.deviceInfo == 'ios') ? 1 : 2,
    channel:json.channel,
    currency:json.currency,
    skuId:json.skuId,
    token:json.token,
    upDownOrderCode:json.upDownOrderCode,
    orderGrade :json.orderGrade,
    payAmount:json.payAmount
  }
  const data = requestData("/orderpay/v8/order/updowngrade", tParam, {});
  return data
}

// email
export function getUserEmail() {
  let basicData = getBasicInfoFromApp()
  let tParam = {
    seq: 1,
    userid:basicData.userid
  }
  const data = getData("/v4/users/prop", tParam, {});
  return data
}

// send email
export function sendEmailTo(json) {
  const name = json.name || json.email.split('@')[0];
  let tags = [
    "app_cancellation",
    json.reason
  ];
  process.env.NODE_ENV !== 'production' && tags.push('TEST_ONLY');
  const ticket = {
    "requester": { "name": name, "email": json.email },
    "subject": json.subject,
    "priority": "urgent",
    "tags": tags,
    "comment": {
      "body": json.body
    }
  };
  return axios.post(`${process.env.nodeAPI}/yiweb/zendesk/ticket`, ticket);
}

// discount API calls
export function getDiscount(orderCode, payType) {
  let basicData = getBasicInfoFromApp();
  let params = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    orderCode: orderCode,
    payType: payType
  };
  return getData("/orderpay/v8/discount/cancel/percentage", params);
}
export function emailDiscountCode(json) {
  let basicData = getBasicInfoFromApp();
  let params = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    sendMail: true,
    orderCode: json.orderCode
  };
  return requestData("/orderpay/v8/discount/discountcode", params);
}
export function discountSubscription(orderCode) {
  let basicData = getBasicInfoFromApp();
  let params = {
    seq: 1,
    userid:basicData.userid,
    region: basicData.region,
    orderCode: orderCode,
    appSystem: 2,
    appPlatform: basicData.appPlatform
  };
  return requestData("/orderpay/v8/discount/subscription", params, {});
}
