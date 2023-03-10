import React, { useEffect, useState } from "react"
import { Tabs, DotLoading } from "antd-mobile"
import SkuList from "./components/SkuList"
import styled from "styled-components"
import dsBridge from "../../utils/dsbridge"
import { useTranslation } from "react-i18next"

import {
  getCloudProductList,
  getServiceList,
  setOrderCreateToken,
  generateOrder,
  createOrderByServiceCode,
  getTrial,
} from "../../api/cloudbuy"
import { serviceType, channelStatus, SGChannelStatus } from "../../utils/convert"
import defaultCommonInfo from "../../utils/defaultCommonInfo"
import { getIsAppImplementFunc } from "../../utils/getCommonInfo"

const Wrapper = styled.div`
padding-bottom: 80px;
`
const Title = styled.div`
  font-size: 12px;
  margin-top: 18px;
`
const IntroWrapper = styled.div`
  padding: 10px 12px 0px;
  text-align: center;
`
const Cvr = styled.div``
const CvrTitle = styled.div`
  color: #00BAAD;
  text-decoration: underline;
`
const ShadowBox = styled.div`
  background: #ffffff;
`
const IosIntro = styled.div`
  font-size: 12px;
  color: grey;
`
const Redeem = styled.div`
  box-shadow: 0px 2px 8px 0px rgba(27, 27, 78, 0.16);
  border-radius: 6px;
`
const GoogleIntro = styled.div``
const Cloudbuy = ({ commonProps }) => {
  const { t } = useTranslation()
  const { isAppleTestAccount, deviceType, appPlatform, userInfo } = commonProps
  const [yearlyList, setYearlyList] = useState([])
  const [monthlyList, setMonthlyList] = useState([])
  const [selectedPlan, setSelectedPlan] = useState("")
  const [maxSavePrice, setMaxSavePrice] = useState("")
  const isAllowGoogle = getIsAppImplementFunc("getGooglePlayBilling:") == 1
  const discountPercentage = window.localStorge?.getItem("discountPercentage") || ""
  const [existOrder, setExistOrder] = useState(false)
  const [isFreeUse, setIsFreeUse] = useState(true)
  const [activeSubscription, setActiveSubscription] = useState(false)
  const [motionOrCvr, setMotionOrCvr] = useState("motion")
  const [redeem, setRedeem] = useState({
    showLayer: false,
    serviceCode: "",
  })
  useEffect(() => {
    getServices()
    getOnTrialState(() => getPrice())
  }, [])
  const getServices = ()=> {
    getServiceList({ businessTypes: "1,3" }).then((json) => {
      const subscribeList = json.data;
      if (json.code == 20000) {
        json.data.map((e) => {
          const uidList = e.uidList || [];
          const activeSubscription = (e.subscribeStatus === 20 && uidList.length < e.deviceMaxCnt && (e.payType != 100))
          setActiveSubscription(activeSubscription)
        });
      }
    });
  }
  const getPrice = () => {
    if (deviceType == 2) {
      dsBridge.call("getIOSPrices", getCloudList)
    } else {
      getCloudList()
      // dsBridge.call("getGooglePrices",getCloudList)
    }
  }

  const getCloudList = (e) => {
    const params = {
      type: 1,
      channel: userInfo.region == "SG" ? SGChannelStatus() : channelStatus(deviceType, serviceType(appPlatform)),
    }
    getCloudProductList(params).then((json) => {
      const list = e ? JSON.parse(e) : null
      filterPlanList(json?.data?.productsDtos || [], list)
    })
  }

  const filterPlanList = (data, e) => {
    let yearly = []
    let monthly = []

    data.forEach((item, index) => {
      item.currencySymbol =e?getCurrencyCode(e.currencyCode): getCurrencyCode(item.currency)
      if (item.serviceCycle == 1) {
        if (e) {
          item.currency = e.currencyCode || item.currency
          // month price
          const arr = e.filter((v) => v.tripartiteProductIdentifier == item.tripartiteProductIdentifier)
          if (arr[0] && arr[0].price) {
            item.monthPrice = arr[0].price
            item.yearPrice = arr[0].price * 12
          }
          discountPercentage && (item.monthPrice = ((1 - (discountPercentage * 1) / 100) * arr[0].price).toFixed(2))
          discountPercentage && (item.yearPrice = ((1 - (discountPercentage * 1) / 100) * arr[0].price * 12).toFixed(2))
        } else {
          item.monthPrice = ((item.price - item.discount) / 100).toFixed(2)
          item.yearPrice = ((12 * (item.price - item.discount)) / 100).toFixed(2)
          discountPercentage && (item.monthPrice = ((1 - (discountPercentage * 1) / 100) * item.price).toFixed(2))
          discountPercentage && (item.yearPrice = ((1 - (discountPercentage * 1) / 100) * item.price * 12).toFixed(2))
        }
        item.priceOriginal = (item.price / 100).toFixed(2)
        item.productPriceReal = item.monthPrice
        monthly.push(item)
      } else {
        if (e) {
          // year price
          item.currency = e.currencyCode || item.currency
          const arr = e.filter((v) => v.tripartiteProductIdentifier == item.tripartiteProductIdentifier)
          if (arr[0] && arr[0].price) {
            item.monthPrice = arr[0].price / 12
            item.yearPrice = arr[0].price
          }
          discountPercentage && (item.monthPrice = (((1 - discountPercentage / 100) * arr[0].price) / 12).toFixed(2))
          discountPercentage && (item.yearPrice = ((1 - discountPercentage / 100) * arr[0].price).toFixed(2))
        } else {
          item.monthPrice = ((item.price - item.discount) / 1200).toFixed(2)
          item.yearPrice = ((item.price - item.discount) / 100).toFixed(2)
          discountPercentage && (item.monthPrice = (((1 - discountPercentage / 100) * item.price) / 12).toFixed(2))
          discountPercentage && (item.yearPrice = ((1 - discountPercentage / 100) * item.price).toFixed(2))
        }
        item.priceOriginal = (item.price / 100).toFixed(2)
        item.productPriceReal = item.yearPrice
        yearly.push(item)
      }
    })
    if (deviceType == 2 && existOrder) {
      monthly = monthly.filter((item) => item.isAutoFlag)
      yearly = yearly.filter((item) => item.isAutoFlag)
    }
    if (deviceType == 2 && !existOrder) {
      monthly = monthly.filter((item) => !item.isAutoFlag)
      yearly = yearly.filter((item) => !item.isAutoFlag)
    }
    monthly.sort((a, b) => {
      return b.price - a.price
    })
    yearly.sort((a, b) => {
      return b.price - a.price
    })

    let maxSavePriceMotion = 0
    monthly.forEach((item, index) => {
      item.savePrice = ((monthly[index]?.price / 100) * 12 - yearly[index]?.price / 100).toFixed(2)
      if (parseInt(item.savePrice) > parseInt(maxSavePriceMotion)) {
        maxSavePriceMotion = item.savePrice
      }
      return item
    })
    setMaxSavePrice(maxSavePriceMotion)
    setMonthlyList(monthly)
    setYearlyList(yearly)
  }
  // ?????????????????????????????????
  const getOnTrialState = (cb) => {
    const params = { country: userInfo.country, appPlatform: appPlatform }
    getTrial(params).then((json) => {
      // trial 1-????????? 0-????????????   subscription 1-??????????????????  0-???????????????
      if (json.code == "20000") {
        // ???????????????????????????
        if (json.data && json.data.trial) {
          setIsFreeUse(true)
        } else {
          setIsFreeUse(false)
        }
        if (json.data && !json.data.subscription) {
          setExistOrder(true)
        } else {
          setExistOrder(false)
        }
      }
    })
    cb()
  }
  const getCurrencyCode = (currency) => {
    let defaultInfo = defaultCommonInfo()
    return defaultInfo.currencySymbol[currency] || "$"
  }
  const popShowFun = (e) => {}
  const toCvrInof = () => {}
  const handlerShowPromo = () => {}
  const handlerShowRedeemLayer = () => {
    setRedeem({ showLayer: true, serviceCode: "" })
  }
  const handlerCloseDiscount = () => {}
  const handlerLink = (e) => {}
  const handlerRedeemLayerClose = (e) => {}
  const handlerRedeemLayerSubmit = () => {}
  const currency = selectedPlan ? getCurrencyCode(selectedPlan.realCurrency) : "$"
  const closeSrc = "../../assets/cloudList/close.png"
  return (
    <Wrapper>
      <Tabs color="primary">
        <Tabs.Tab title={t("h5_cloudBuy_yearly")} key="yearly">
          <Title>{t("h5_cloud_warranty")}</Title>
          <SkuList
            planList={yearlyList}
            handleSelect={(e) => setSelectedPlan(e)}
            selectedPlan={selectedPlan}
            isAppleTestAccount={isAppleTestAccount}
            userInfo={userInfo}
            deviceType={deviceType}
            activeSubscription={activeSubscription}
            existOrder = {existOrder}
            appPlatform={appPlatform}
          />
        </Tabs.Tab>
        <Tabs.Tab title={t("h5_cloudBuy_monthly")} key="monthly">
          {maxSavePrice ? (
            <Title
              className="save"
              dangerouslySetInnerHTML={{
                __html: t("h5_cloud_save_max_font", { currency: currency, price: maxSavePrice }),
              }}
            ></Title>
          ) : null}
          <SkuList
            planList={monthlyList}
            handleSelect={(e) => setSelectedPlan(e)}
            selectedPlan={selectedPlan}
            isAppleTestAccount={isAppleTestAccount}
            userInfo={userInfo}
            deviceType={deviceType}
            activeSubscription={activeSubscription}
            existOrder = {existOrder}
            appPlatform={appPlatform}
          />
        </Tabs.Tab>
      </Tabs>
      <IntroWrapper>
        <Cvr>
          <CvrTitle>
            {motionOrCvr == "motion" ? <span onClick={popShowFun(1)}>{t("h5_what_is_CVR")}</span> : null}
          </CvrTitle>

          <p className="introduce-cvr">?? {t("h5_CVR_recording_not_support")}</p>
          {motionOrCvr !== "motion" ? (
            <div className="introduce-text">
              *Limitations for
              <span onClick={toCvrInof}>battery powered cameras</span> apply.
            </div>
          ) : null}
        </Cvr>

        {deviceType == 2 ? (
          <IosIntro>
            {!existOrder ? (
              <p>
                {t("h5_cloud_buy_agreementIOS")}
                <br />
                <span onClick={handlerLink(0)}>{t("XYRegister_1447845904_70")}</span> |{" "}
                <span onClick={handlerLink(1)}>{t("h5_cloud_buy_linkPolicy")}</span>
              </p>
            ) : (
              <div>
                <p className="title">{t("h5_cloud_buy_productSelectedExistOrder")}</p>
                <p>{t("h5_cloud_buy_productExistOrderIOSIntroYIIOT")}</p>
              </div>
            )}
          </IosIntro>
        ) : null}

        <Redeem>
          {deviceType == 1 && !discountPercentage && userInfo.region != "SG" ? (
            <div className="redeem-div" onClick={handlerShowPromo}>
              <p>{t("h5_redeem_promo_code")}</p>
            </div>
          ) : null}
          <div className="redeem-div" onClick={handlerShowRedeemLayer}>
            <p>{t("h5_cloud_buy_androidServiceCode")}</p>
          </div>
          {deviceType == 1 && discountPercentage ? (
            <div className="redeem-discount">
              <p>{discountPercentage}% discount applied</p>
              {/* <img onClick={handlerCloseDiscount} src={closeSrc} width="12" /> */}
            </div>
          ) : null}
          {deviceType == 2 ? (
            <div className="redeem-info">
              <p>{t("h5_cloud_redeem_info")}</p>
            </div>
          ) : null}
        </Redeem>
        {isAllowGoogle ? (
          <GoogleIntro>
            Your Google Play Account will be charged{" "}
            {selectedPlan && selectedPlan.realCurrency ? getCurrencyCode(selectedPlan.realCurrency) : "$"}
            {selectedPlan && selectedPlan.productPriceShow}
            each {tab} once the free trial ends. Subscription automatically renews unless auto-renew is turned off at
            least 24-hours before the end of the current billing cycle. You can manage your subscription and turn off
            auto-renew from your Google Play settings.
            <p>
              <span onClick={handlerLink(0)}>{t("XYRegister_1447845904_70")}</span> |{" "}
              <span onClick={handlerLink(1)}>{t("h5_cloud_buy_linkPolicy")}</span>
            </p>
          </GoogleIntro>
        ) : null}
        <div className="jump-link-wrap">
          {deviceType == 2 && existOrder ? (
            <p onClick={handlerLink(1)}>
              <span>
                <a onClick={handlerLink(0)}>{t("XYRegister_1447845904_70")}</a> &
                <a onClick={handlerLink(1)}>{t("h5_cloud_buy_linkPolicy")}</a>
              </span>
              {/* <em><van-icon name="arrow" /> </em> */}
            </p>
          ) : null}
        </div>
        {redeem.showLayer ? (
          <div class="redeem-layer">
            <div class="layer-inner">
              <p class="layer-span">{t("h5_cloud_buy_serviceCodeLayerLabel")}</p>
              <p class="layer-span">{t("h5_cloud_buy_serviceCodeLayerTitle")}</p>
              <div class="layer-input-item">
                <input type="text" maxlength="18" class="layer-input" value={redeem.serviceCode} />
              </div>
              <div class="layer-button-box">
                <div class="btn-layer" onClick={handlerRedeemLayerClose}>
                  {t("h5_cloud_common_btnCancel")}
                </div>
                <div class="btn-layer" onClick={handlerRedeemLayerSubmit}>
                  {t("h5_cloud_common_btnSubmit")}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </IntroWrapper>
    </Wrapper>
  )
}

export default Cloudbuy
