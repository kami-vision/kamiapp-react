import React, { useEffect, useState } from "react"
import { JumboTabs ,Button } from "antd-mobile"
import './plan.css'
const Description = ({value}) => {
  return (
    <div className="block">
     
      <div className="header">
        {value.remarks}
      </div><div className="detail"></div>
   </div>
  )
  
}
const BuyButton =({price})=>{
  console.log('%c [ price ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', price)
  return (
     <><div className="btnwrapper"><div>$ {price/100}</div><Button color='primary' fill='solid'>
     BUY NOW
   </Button></div></>
  )
}
const SkuBox = (props) => {
  const planList = props.planList
  console.log("%c [ props ]-3", "font-size:13px; background:pink; color:#bf2c9f;", props)
  return (
    <div className="sku-box">
      <JumboTabs>
        {
        planList?.map((item,index) => {
          return <JumboTabs.Tab  description={<Description value={item}/>} key={index}> <BuyButton price={item.price}/> </JumboTabs.Tab>
        })
        }
      </JumboTabs>
    </div>
  )
}

export default SkuBox
