import React, { useEffect, useState } from "react"
import { JumboTabs, Button, Popup } from "antd-mobile"
import { useTranslation } from "react-i18next"
import Description from "./Description"
import "./plan.scss"
import dsBridge from "../../../utils/dsbridge"
import {
  getCloudProductList,
  getServiceList,
  setOrderCreateToken,
  generateOrder,
  createOrderByServiceCode,
  getTrial,
} from "../../../api/cloudbuy"
import { getIsAppImplementFunc } from "../../../utils/getCommonInfo"
const SkuList = ({
  planList,
  handleSelect,
  selectedPlan,
  isAppleTestAccount,
  userInfo,
  deviceType,
  activeSubscription,
  existOrder,
  appPlatform
}) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [payMethodShow, setPayMethodShow] = useState(false)
  const isGoogePurchase = getIsAppImplementFunc("getGooglePurchases:") == 1

  const clickBuy = () => {
    if (activeSubscription) {
      setVisible(true)
    } else {
      confirmBuy()
    }
  }
  const gotoBuy=()=>{
    if(deviceType==1) {
      setVisible(false)
      setPayMethodShow(true)
    }else {
      confirmBuy()
    }
    
  }
  const confirmBuy = () => {
    const params = {
      seq: 1,
      userId: userInfo.userId,
      token: userInfo.token,
      secret: userInfo.secret,
    }
    setOrderCreateToken(params).then((json) => {
      const plan = planList[selectedPlan]
      if (json.code == 20000) {
        const orderCreateToken = json.data
        const obj = {
          currency: plan.currency,
          orderCreateToken: orderCreateToken,
          appSystem: deviceType == 2 ? 1 : deviceType == 1 ? 2 : 3,
          userId: userInfo.userId,
          region: userInfo.region,
          country: plan.country,
          appPlatform: appPlatform,
          channel: plan.channel,
          payAmount: (plan.productPriceReal + "").replace(".", ""),
          skuId: plan.skuId,
        }
        generateOrder(obj)
          .then((res) => {
            if (res.code == "20000") {
              const orderCode = res.data?.orderCode
              if (deviceType == 2 && isAppleTestAccount == 0) {
                const paymentJsonIos = {
                  orderCode: orderCode,
                  product_id: plan.productId,
                  productIAPId: plan.identifier,
                  isSubscriptionPayment: plan.flag,
                  price: plan.productPriceReal,
                }
                dsBridge.call("confirmPay", JSON.stringify(paymentJsonIos))
              }
              if (deviceType == 2 && isAppleTestAccount == 0) {
                console.log("测试账号！！")
              }

            } else if (res.code == "60018") {
              alert(t("h5_cloud_buy_toastTokenExpire"))
              setTimeout((_) => {
                location.reload()
              }, 100)
            } else {
              //this.secendClick = false;
              //Recharge failed. Please try again
            }
          })
          .catch((_) => {
            this.secendClick = false
          })
      }
    })
  }

  return (
    <div className="sku-box">
      <JumboTabs activeKey={selectedPlan || "0"} onChange={handleSelect}>
        {planList?.map((item, index) => {
          return (
            <JumboTabs.Tab
              description={
                <Description skuObj={item} isAppleTestAccount={isAppleTestAccount} region={userInfo.region} />
              }
              key={index}
            >
              <div className="btnwrapper">
                <div className="price">$ {item.serviceCycle == 1 ? item.monthPrice : item.yearPrice}</div>
                <div className="button" color="primary" fill="solid" onClick={clickBuy}>
                  BUY NOW
                </div>
              </div>
            </JumboTabs.Tab>
          )
        })}
      </JumboTabs>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        bodyStyle={{ height: "40vh", borderTopLeftRadius: "48px", borderTopRightRadius: "48px" }}
      >
        <div className="pop-head">{t("h5_cloud_buy_active_plan_exist_title")}</div>
        <div className="pop-subhead">{t("h5_cloud_buy_active_plan_exist_message")}</div>
        <div>
          <Button color="primary" onClick={gotoBuy}>
            {t("h5_cloud_buy_active_plan_exist_confirm")}
          </Button>
          <Button onClick={() => setVisible(false)}>{t("h5_cloud_buy_active_plan_exist_cancel")}</Button>
        </div>
      </Popup>
      <Popup
        visible={payMethodShow}
        onMaskClick={() => {
          setPayMethodShow(false)
        }}
        bodyStyle={{ height: "40vh", borderTopLeftRadius: "48px", borderTopRightRadius: "48px" }}
      >
        <div className="pop-head">card list</div>
        <div className="pop-subhead">paypal</div>
        <div>

        </div>
      </Popup>
    </div>
  )
}

export default SkuList
