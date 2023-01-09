import React, { useEffect, useState } from "react"
import { JumboTabs, Button, Popup } from "antd-mobile"
import Description from './Description'
import "./plan.css"


const SkuBox = ({ planList, handleSelect, selectedPlan, isAppleTestAccount, region }) => {
  const [visible, setVisible] = useState(false)

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
                <Button color="primary" fill="solid" onClick={() => setVisible(true)}>
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
