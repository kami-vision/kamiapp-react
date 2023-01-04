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
      </div>
      <div className="detail"></div>
    </div>
  )
}

const SkuBox = ({ planList, maxSavePrice, handleSelect }) => {
  const [activeKey, setActiveKey] = useState("0")
  const [visible, setVisible] = useState(false)

  const handleChange = (value) => {
    handleSelect(value)
    setActiveKey(value)
  }

  return (
    <div className="sku-box">
      <JumboTabs activeKey={activeKey} onChange={handleChange}>
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
