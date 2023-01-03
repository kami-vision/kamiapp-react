import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd-mobile'
import  SkuBox  from './components/SkuBox'
import { getCloudProductList, getServiceList, setOrderCreateToken, generateOrder, createOrderByServiceCode, getTrial } from '../../api/cloudbuy'
import { serviceType, channelStatus, SGChannelStatus } from '../../utils/convert'
import defaultCommonInfo from '../../utils/defaultCommonInfo'
import bestLoading from '../../utils/bestLoading'

const Cloudbuy = ({commonProps})=> {
  const { isAppleTestAccount, deviceType, appName, userInfo } = commonProps
  const [yearlyList, setYearlyList] = useState([])
  const [monthlyList, setMonthlyList] = useState([])
  const [selectedPlan, setSelectedPlan] = useState({})
  const [maxSavePrice, setMaxSavePrice] = useState('')
  useEffect(()=>{
    getCloudList()
  },[])
  const getCloudList = ()=> {
    bestLoading('dismissLoading')
    const params = {
      type: 1,
      channel: userInfo.region == 'SG' ? SGChannelStatus() : channelStatus(deviceType, serviceType(appName))
    }
    getCloudProductList(params).then((json) => {
      filterPlanList(json?.data?.productsDtos || [])
    })
  }

  const filterPlanList = (data)=> {
    const yearly = []
    const monthly = []
    data.map((item,index)=>{
      if(item.serviceCycle==1) {
        monthly.push(item)
      }else {
        yearly.push(item)
      }
    })
    setMonthlyList(monthly)
    setYearlyList(yearly)
  }
  const getCurrencyCode =  (currency)=> {
    let defaultInfo = defaultCommonInfo()
    return defaultInfo.currencySymbol[currency] || '$'
  }
  return (
    <>
    <div>
      <Tabs color="primary">
        <Tabs.Tab title='YEARLY' key='yearly'>

        <div className="introduce-cloud">
          All yearly plans come with an extended <br />
          18 month hardware warranty for FREE
        </div>
          <SkuBox planList={yearlyList}/>
        </Tabs.Tab>
        <Tabs.Tab title='MONTHLY' key='monthly'>
        {maxSavePrice?<div className="save" >
          Save up to
          <span>{selectedPlan ? getCurrencyCode(selectedPlan.realCurrency) : '$' } { maxSavePrice} </span>
          when you pay yearly <br />and get an extended 18 month hardware warranty FREE
        </div>:null}
          <SkuBox planList={monthlyList}/>
        </Tabs.Tab>
      </Tabs>
    </div>
    </>
  )
}

export default Cloudbuy