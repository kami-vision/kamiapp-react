import React, { useEffect, useState } from "react"
import { JumboTabs, Button, Popup } from "antd-mobile"
import Description from './Description'
import "./plan.css"


const SkuBox = ({ planList, handleSelect, selectedPlan, isAppleTestAccount, region, appPlatform,deviceType}) => {
  console.log('%c [ appPlatform ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', deviceType)
  const [visible, setVisible] = useState(false)
  const gotoBuy= ()=>{
    if(appPlatform==1) {
        setVisible(true)
    }else {
      
    }
  
  }
  return (
    <div className="sku-box">
      <JumboTabs activeKey={selectedPlan || "0"} onChange={handleSelect}>
        {planList?.map((item, index) => {
          return (
            <JumboTabs.Tab
              description={<Description skuObj={item} isAppleTestAccount={isAppleTestAccount} region={region}/>}
              key={index}
            >
              <div className="btnwrapper">
                <div>$ {item.serviceCycle==1?item.monthPrice:item.yearPrice}</div>
                <Button color="primary" fill="solid" onClick={() => gotoBuy(item)}>
                  BUY NOW
                </Button>
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
        <div className="pop-head">You Already Have a Kami Cloud Plan</div>
      </Popup>
    </div>
  )
}

export default SkuBox
