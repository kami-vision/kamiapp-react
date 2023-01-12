import React, { useEffect, useState } from "react"
import { JumboTabs, Button, Popup, Mask } from "antd-mobile"
import { useTranslation } from "react-i18next"
import Description from "./Description"
import "./plan.scss"
import dsBridge from "../../../utils/dsbridge"
import styled from "styled-components"
import {
  getCloudProductList,
  getServiceList,
  setOrderCreateToken,
  generateOrder,
  createOrderByServiceCode,
  getTrial,
} from "../../../api/cloudbuy"
import { getIsAppImplementFunc } from "../../../utils/getCommonInfo"

const Row = styled.div`
  margin: 10px 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 8px;
  height: 50px;
  font-weight: 600;
  div {
    margin-left: 24px;
    margin-right: 20px;
    width: 30px;
    height: 50px;
    background-size: contain;
  }
`
const CardInfo = styled.div`
  background: #ffffff;
  width: 100%;
  color: #000000;
  min-height: 300px;
  position: fixed;
  bottom: 0;
`
const Title = styled.div`
text-align: center;
`
const SubTitle = styled.div`
color: grey;
`
const PaymantHead = styled.div`
text-align: center;
`
const RowWrapper = styled.div`
padding: 0 10px 30px 10px !important;
`
const Payment = ({ visible, confirmBuy, deviceType, setVisible }) => {
  const { t } = useTranslation()
  const [maskShow, SetMaskShow] = useState(false)
  const [step, setStep] = useState(1)
  const gotoBuy = () => {
    if (deviceType == 1) {
      setStep(2)
    } else {
      confirmBuy()
    }
  }
  return (
    <>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        bodyStyle={{ height: "40vh", borderTopLeftRadius: "48px", borderTopRightRadius: "48px" }}
      >
        {step == 1 ? (
          <div>
            <Title>{t("h5_cloud_buy_active_plan_exist_title")}</Title>
            <SubTitle>{t("h5_cloud_buy_active_plan_exist_message")}</SubTitle>
            <Button color="primary" onClick={gotoBuy}>
              {t("h5_cloud_buy_active_plan_exist_confirm")}
            </Button>
            <Button onClick={() => setVisible(false)}>{t("h5_cloud_buy_active_plan_exist_cancel")}</Button>
          </div>
        ) : (
          <>
            <PaymantHead>
              <h4>{t("h5_cloud_buy_payment_header")}</h4>
              <p>{t("h5_cloud_buy_payment_subHeader")}</p>
            </PaymantHead>
            <RowWrapper>
            <Row
              className="btn-card"
              onClick={() => {
                setVisible(false)
                SetMaskShow(true)
              }}
            >
              <div></div> Credit & Debit Card
            </Row>
            <Row className="btn-paypal">
              <div></div> Paypal
            </Row>
            <Row className="btn-gpay">
              <div></div> Google Pay
            </Row>
            </RowWrapper>
          </>
        )}
      </Popup>
      <Mask
        visible={maskShow}
        onMaskClick={() => {
          SetMaskShow(false)
        }}
      >
        <CardInfo>Subscription - Standard</CardInfo>
      </Mask>
    </>
  )
}

export default Payment
