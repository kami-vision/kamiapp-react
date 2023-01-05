import React, { useEffect, useState } from "react"
import { Tabs, DotLoading } from "antd-mobile"
import SkuBox from "./components/SkuBox"
import styled from "styled-components"
import dsBridge from "../../utils/dsbridge"
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
  font-size: 12px
`
const Cloudbuy = ({ commonProps }) => {
  const { isAppleTestAccount, deviceType, appName, userInfo } = commonProps
  const [yearlyList, setYearlyList] = useState([])
  const [monthlyList, setMonthlyList] = useState([])
  const [selectedPlan, setSelectedPlan] = useState({})
  const [maxSavePrice, setMaxSavePrice] = useState("")
  const isGoogePurchase = getIsAppImplementFunc('getGooglePurchases:') == 1
  const isAllowGoogle = getIsAppImplementFunc('getGooglePlayBilling:') == 1
  const existOrder = true
  useEffect(() => {
    if(deviceType==2) {
     // const iosPrices = dsBridge.call("getIOSPrices")||'';
    
    }else {
     //const googlePrices = dsBridge.call('getGooglePrices')||''
    }
    getCloudList()
  }, [])
  // useEffect(() => {
  //   handleSelect('0')
  // }, [monthlyList])
  
  const getCloudList = () => {
    const params = {
      type: 1,
      channel: userInfo.region == "SG" ? SGChannelStatus() : channelStatus(deviceType, serviceType(appName)),
    }
    getCloudProductList(params).then((json) => {
      console.log('%c [ json ]-47', 'font-size:13px; background:pink; color:#bf2c9f;', json)
      filterPlanList(json?.data?.productsDtos || [])
    })
  }

  const filterPlanList = (data) => {
    console.log('%c [ data ]-52', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    let yearly = []
    let monthly = []
    data.forEach((item, index) => {
      if (item.serviceCycle == 1) {
        monthly.push(item)
      } else {
        yearly.push(item)
      }
    })
    if(deviceType==2 && existOrder) {
      monthly = monthly.filter((item) => item.isAutoFlag)
      yearly = yearly.filter((item) => item.isAutoFlag)
    }
    if(deviceType==2 && !existOrder) {
      monthly = monthly.filter((item) => !item.isAutoFlag)
      yearly = yearly.filter((item) => !item.isAutoFlag)
    }
    monthly.sort((a, b) => {
      return b.price - a.price
    })
    yearly.sort((a, b) => {
      return b.price - a.price
    })
    setMonthlyList(monthly)
    setYearlyList(yearly)
  }

  const getCurrencyCode = (currency) => {
    let defaultInfo = defaultCommonInfo()
    return defaultInfo.currencySymbol[currency] || "$"
  }
  const handleSelect = (e) => {
    let save
    monthlyList[e] &&
      yearlyList[e] &&
      (save = ((monthlyList[e]?.price / 100) * 12 - yearlyList[e]?.price / 100).toFixed(2))
    setMaxSavePrice(save)
  }
  return (
    <>
      <Tabs color="primary">
        <Tabs.Tab title="YEARLY" key="yearly">
          <Title>
            All yearly plans come with an extended <br />
            18 month hardware warranty for FREE
          </Title>
          <SkuBox planList={yearlyList} handleSelect={handleSelect} />
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
          <SkuBox planList={monthlyList} maxSavePrice={maxSavePrice} handleSelect={handleSelect} />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default Cloudbuy
