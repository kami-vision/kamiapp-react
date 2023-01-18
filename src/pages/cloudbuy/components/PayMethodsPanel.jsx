import React, { useEffect, useState } from "react"
import {  Button, Popup, Mask } from "antd-mobile"
import { useTranslation } from "react-i18next"
import { useNavigate } from 'react-router-dom';
import Description from "./Description"
import "./plan.scss"
import dsBridge from "../../../utils/dsbridge"
import styled from "styled-components"
import {getModifiedDate} from './../../../utils/util'
import {
  setOrderCreateToken,
  generateOrder,
  createOrderByServiceCode,
  toPayByPalpal,
  toPayByCard,
  getCard,
  createCustomer,
  getOrderDetail,
  getStripePayKey,
  createStripePay
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
const CardInner = styled.div`
  padding: 20px 20px 30px 20px;
  h4 {
    color: #00baad;
  }
`
const Title = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`
const SubTitle = styled.div`
  color: grey;
  margin: 10px auto 20px;
`
const PaymantHead = styled.div`
  text-align: center;
`
const RowWrapper = styled.div`
  padding: 0 10px 30px 10px !important;
`
const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-weight: 600;
`
const Payment = ({ visible, confirmBuy, deviceType, setVisible, plan }) => {
  const history = useNavigate()
  const { t } = useTranslation()
  const [maskShow, SetMaskShow] = useState(false)
  const [step, setStep] = useState(1)
  const [cardsList, setCardsList] = useState([])
  const [selectedCard, setSelectedCard] = useState({})
  useEffect(()=>{
    getCard().then((res)=>{
      setCardsList(res?.data?.cards||[])
    })
  },[])
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
        <CardInfo>
          <CardInner>
            <h4>{t("h5_cloud_buy_subscription") + (plan.remarks ? " - " + plan.remarks.toLowerCase() : "")}</h4>
            {plan.free & (deviceType != 2) ? (
              <FlexRow>
                <span>{t("h5_cloud_buy_starting") + " " + t("h5_cloud_buy_today")}</span>
                <span>
                  {plan.freeDays +
                    "-" +
                    (plan.freeDays > 1 ? t("h5_cloud_buy_days") : t("h5_cloud_buy_day")) +
                    " " +
                    t("h5_cloud_buy_trial")}
                </span>
              </FlexRow>
            ) : null}
            <FlexRow>
            <span>{
							t("h5_cloud_buy_starting") +
								" " +
								(plan.free
									? (getModifiedDate(plan.freeDays), "short",(localStorage.getItem('locale') ))
									: t("h5_cloud_buy_today")) 
						}</span>
						<span>{
							plan.currencySymbol +
								(plan.discountPrice ? plan.discountPrice : plan.totalPrice) +
								"/" +
								(plan.serviceTime === 12
									? t("h5_cloud_buy_year")
									: t("h5_cloud_buy_month"))
						}</span>
            </FlexRow>
            select your card
            {cardsList?.map((item)=>{
              return (
                <div onClick={()=>{setSelectedCard(item)}}>Visa  **** ***** ****{item.last4}</div>
              )
            })}
            <Button onClick={()=>{history('/addCard')}}>Add new card</Button>
            <Button color="primary">Purchase</Button>
          </CardInner>
        </CardInfo>
      </Mask>
    </>
  )
}

export default Payment
