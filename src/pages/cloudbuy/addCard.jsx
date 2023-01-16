import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useTranslation } from "react-i18next"
import { addCard, setDefaultCard, getStripePayKey, getCard } from "../../api/cloudbuy"
import {  Button } from "antd-mobile"
const AddCard = ({ commonProps }) => {
  const { t } = useTranslation()
  const [publicKey, setPublicKey] = useState("")
  const billingDetails = {
    email: "",
    name: "",
    city: "",
    address: "",
    postalCode: "",
    state: "",
  }
  useEffect(() => {
    getStripePayKey().then((res) => {
      if (res.code == 20000) {
        setPublicKey(res.data)
        stripeElements(res.data)
      }
    })
  }, [])
  const stripeElements = async (publicKey) => {
    const stripe = await loadStripe(publicKey)
    const elementStyles = {
      base: {
        color: "#000000",
        fontWeight: 600,
        fontFamily: "Quicksand, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",

        ":focus": {
          color: "#424770",
        },

        "::placeholder": {
          color: "#ddd",
        },

        ":focus::placeholder": {
          color: "#CFD7DF",
        },
      },
      invalid: {
        color: "#f00",
        ":focus": {
          color: "#FA755A",
        },
        "::placeholder": {
          color: "#FFCCA5",
        },
      },
    }

    let elementClasses = {
      focus: "focus",
      invalid: "invalid",
    }

    let elements = stripe.elements({
      locale: "auto",
    })

    let cardNumber = elements.create("cardNumber", {
      style: elementStyles,
      classes: elementClasses,
    })
    cardNumber.mount("#card-number")

    let cardExpiry = elements.create("cardExpiry", {
      style: elementStyles,
      classes: elementClasses,
    })
    cardExpiry.mount("#card-expiry")

    let cardCvc = elements.create("cardCvc", {
      style: elementStyles,
      classes: elementClasses,
    })
    cardCvc.mount("#card-cvc")
    // this.cardNumber = cardNumber;
    // this.cardExpiry = cardExpiry;
    // this.cardCvc = cardCvc;
  }
  const createPaymentMethodAndCustomer=()=>{}
  console.log("%c [ commonProps ]-4", "font-size:13px; background:pink; color:#bf2c9f;", commonProps)
  return (
    <>
      <div class="stripe-pay">
        <div class="card-information-box">
          <p>{t("h5_stripe_card_info")}</p>
          <form>
            <div class="stage">
              <p>{t("h5_stripe_card_number")}</p>
              <div id="card-number" class="field empty self"></div>
            </div>
            <div class="stage-box">
              <div class="tage-b-left">
                <p>{t("h5_stripe_card_expdate")}</p>
                <div id="card-expiry" class="field empty third-width self"></div>
              </div>
              <div class="tage-b-right">
                <p>{t("h5_stripe_card_cvc")}</p>
                <div id="card-cvc" class="field empty third-width self"></div>
              </div>
            </div>
          </form>
        </div>
        <div style={{height:'5px'}}></div>
        <div class="stage-box" >
        <div class="tage-b-left" >
          <p>{t('h5_stripe_card_name')} </p>
          <input class="self" type="text" placeholder={t('h5_stripe_card_typehere')} value={billingDetails.name}  />
        </div>
        <div class="tage-b-right" >
          <p>{t('h5_stripe_card_zip')} </p>
          <input class="self" placeholder={t('h5_stripe_card_typehere')} value={billingDetails.postalCode}  />
        </div>
      </div>
        <div class="footer">
          <div class="radio">
            {/* <van-checkbox
					value="checked"
					checked-color="#15C7C5"
					:disabled="card === 0"
					class="save-card"
					>{{ $t("h5_stripe_card_esavedefault") }}
				</van-checkbox> */}
          </div>
          <Button
            onClick={() => createPaymentMethodAndCustomer}
            style={{borderRadius: '8px'}}
            color="primary"
          >
            {t("h5_stripe_card_save")}
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddCard
