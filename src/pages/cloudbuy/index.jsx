import React, { useEffect, useState } from "react"
import { Tabs, DotLoading } from "antd-mobile"
import SkuBox from "./components/SkuBox"
import styled from "styled-components"
import dsBridge from "../../utils/dsbridge"
import { useTranslation } from "react-i18next";

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
const Title = styled.div`
  font-size: 12px;
  margin-top: 18px;
`
const Cloudbuy = ({ commonProps }) => {
  const { t } = useTranslation();
  const { isAppleTestAccount, deviceType, appPlatform, userInfo } = commonProps
  const [yearlyList, setYearlyList] = useState([])
  const [monthlyList, setMonthlyList] = useState([])
  const [selectedPlan, setSelectedPlan] = useState("")
  const [maxSavePrice, setMaxSavePrice] = useState("")
  const isGoogePurchase = getIsAppImplementFunc("getGooglePurchases:") == 1
  const isAllowGoogle = getIsAppImplementFunc("getGooglePlayBilling:") == 1
  const discountPercentage = window.localStorge?.getItem("discountPercentage") || ""
  const [existOrder, setExistOrder] = useState(false)
  const [isFreeUse, setIsFreeUse] = useState(true)
  useEffect(() => {
    getOnTrialState(() => getPrice())
    //
  }, [])
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
      if (item.serviceCycle == 1) {
        if (e) {
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
        monthly.push(item)
      } else {
        if (e) {
          // year price
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
  // 查看用户是否有试用权限
  const getOnTrialState = (cb) => {
    const params = {country: userInfo.country, appPlatform: appPlatform}
    getTrial(params).then((json) => {
      // trial 1-新用户 0-非新用户   subscription 1-无订阅中订单  0-有订阅订单
      if (json.code == "20000") {
        // 查看用户是否新用户
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

  return (
    <>
      <Tabs color="primary">
        <Tabs.Tab title="YEARLY" key="yearly">
          <Title>
            All yearly plans come with an extended <br />
            18 month hardware warranty for FREE
          </Title>
          <SkuBox
            planList={yearlyList}
            handleSelect={(e) => setSelectedPlan(e)}
            selectedPlan={selectedPlan}
            isAppleTestAccount={isAppleTestAccount}
            region={userInfo.region}
          />
        </Tabs.Tab>
        <Tabs.Tab title="MONTHLY" key="monthly">
          {maxSavePrice ? (
            <Title className="save">
              Save up to
              <span>
                {selectedPlan ? getCurrencyCode(selectedPlan.realCurrency) : "$"} {maxSavePrice}{" "}
              </span>
              when you pay yearly <br />
              and get an extended 18 month hardware warranty FREE
            </Title>
          ) : null}
          <SkuBox
            planList={monthlyList}
            handleSelect={(e) => setSelectedPlan(e)}
            selectedPlan={selectedPlan}
            isAppleTestAccount={isAppleTestAccount}
            region={userInfo.region}
          />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default Cloudbuy
