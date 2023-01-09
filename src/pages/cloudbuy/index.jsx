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
  const [selectedPlan, setSelectedPlan] = useState('')
  const [maxSavePrice, setMaxSavePrice] = useState("")
  const isGoogePurchase = getIsAppImplementFunc('getGooglePurchases:') == 1
  const isAllowGoogle = getIsAppImplementFunc('getGooglePlayBilling:') == 1
  const existOrder = false
  useEffect(() => {
    if(deviceType==2) {
     dsBridge.call("getIOSPrices",getCloudList)
    }else {
      getCloudList()
    // dsBridge.call("getGooglePrices",getCloudList)
    }
   // 
  }, [])
  useEffect(() => {
    setMaxSavePrice(calcMaxSave(0))
  }, [monthlyList])

  const getCloudList = (e) => {
    const params = { type: 1,channel: userInfo.region == "SG" ? SGChannelStatus() : channelStatus(deviceType, serviceType(appName)),}
    getCloudProductList(params).then((json) => {
      const list = e?JSON.parse(e):null
      filterPlanList(json?.data?.productsDtos || [],list)
    })
  }

  const filterPlanList = (data,e) => {
    let yearly = []
    let monthly = []
    data.forEach((item, index) => {
      if (item.serviceCycle == 1) {
        if(e) {
          const arr = e.filter(v=>v.tripartiteProductIdentifier==item.tripartiteProductIdentifier)
          arr[0]&&arr[0].price&&(item.price = arr[0].price)
        }else{
          
        }
        monthly.push(item)
      } else {
        if(e) {
          const arr = e.filter(v=>v.tripartiteProductIdentifier==item.tripartiteProductIdentifier)
          arr[0]&&arr[0].price&&(item.price = arr[0].price)
        }
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
    setSelectedPlan(e)
    setMaxSavePrice(calcMaxSave(e))
  }
  const calcMaxSave = (e)=>{
    let save
    monthlyList[e] &&
      yearlyList[e] &&
      (save = ((monthlyList[e]?.price / 100) * 12 - yearlyList[e]?.price / 100).toFixed(2))
      return save
  }
  return (
    <>
      <Tabs color="primary">
        <Tabs.Tab title="YEARLY" key="yearly">
          <Title>
            All yearly plans come with an extended <br />
            18 month hardware warranty for FREE
          </Title>
          <SkuBox planList={yearlyList} handleSelect={handleSelect} selectedPlan={selectedPlan}/>
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
          <SkuBox planList={monthlyList} maxSavePrice={maxSavePrice} handleSelect={handleSelect} selectedPlan={selectedPlan}/>
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default Cloudbuy
