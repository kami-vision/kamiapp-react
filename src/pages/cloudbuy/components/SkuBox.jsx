import React, { useEffect, useState } from "react"
import { JumboTabs, Button, Popup } from "antd-mobile"
import "./plan.css"
const Description = ({ value }) => {
  return (
    <div className="block">
      <div className="header-content">
        <div className="header">{value.remarks}</div>
        <div className="line"></div>
        <div className="price">
          $<span> {value.price / 100} </span>/{value.serviceCycle == 1 ? "Mo" : "Yr"}
        </div>
        {value.serviceCycle == 36?
        <div className="price" >
          <p><span>{value.yearPrice}</span> /3 Yr</p>$ 
          { value.discount&& (value.priceReal > value.yearPrice) && isAppleTestAccount != 1? <p >Was $<span>{ value.priceReal}</span> </p>:null}
          <p >Equals to ${value.monthPrice} per month</p>
        </div>:null}
 


      </div>
      <div className="detail"></div>
    </div>
  )
}

const SkuBox = ({ planList, maxSavePrice, handleSelect, selectedPlan }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="sku-box">
      <JumboTabs activeKey={selectedPlan||'0'} onChange={handleSelect}>
        {planList?.map((item, index) => {
          return (
            <JumboTabs.Tab description={<Description value={item} />} key={index}>
              <div className="btnwrapper">
                <div>$ {item.price / 100}</div>
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
