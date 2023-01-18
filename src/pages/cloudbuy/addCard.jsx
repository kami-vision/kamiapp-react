import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { useTranslation } from "react-i18next"
import { addCard, setDefaultCard, getStripePayKey, getCard } from "../../api/cloudbuy"
import {  Button } from "antd-mobile"
const AddCard = ({ commonProps }) => {
  const { t } = useTranslation()
  const [publicKey, setPublicKey] = useState("")
  const [cardName, setCardName] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [cardNumber, setCarNumber] = useState("")
  const [cardInfo,setCardInfo] = useState()
  const [stripe, setStripe] = useState()
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
      console.log('%c [ res ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      if (res.code == 20000) {
        // setPublicKey(res.data)
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
    setCardInfo(cardNumber)
    setStripe(stripe)
    // this.cardNumber = cardNumber;
    console.log('%c [ cardNumber ]-93', 'font-size:13px; background:pink; color:#bf2c9f;', cardNumber)
    // this.cardExpiry = cardExpiry;
    // this.cardCvc = cardCvc;
  }
  const createPaymentMethodAndCustomer = ()=> {
    if (!postalCode) {
      alert("The Zip code cannot be empty");
      return;
    }
    let billing_details = {
      address: {
        postal_code: postalCode,
      }
    }
    if(cardName) billing_details.name = cardName
     //测试用： 4000000000003063  (需要二次验证的卡；)； 4242424242424242 （不需要二次验证的卡）
    //dsBridge.call("showLoading");
    stripe
      .createPaymentMethod("card", cardInfo, {
        billing_details: billing_details,
      })
      .then(function(result) {
        console.log('%c [ result ]-113', 'font-size:13px; background:pink; color:#bf2c9f;', result)
        
        if (result.error) {
          // 这里处理错误
          // self.$toast(result.error.message);
          // self.dsBridge.call("dismissLoading");
        } else {
          //self.addCard(result.paymentMethod.id);
        }
      });
  }

  return (
    <>
      <div >
        <div >
          <p>{t("h5_stripe_card_info")}</p>
          <form>
            <div>
              <p>{t("h5_stripe_card_number")}</p>
              <div id="card-number" ></div>
            </div>
            <div>
              <div>
                <p>{t("h5_stripe_card_expdate")}</p>
                <div id="card-expiry"></div>
              </div>
              <div>
                <p>{t("h5_stripe_card_cvc")}</p>
                <div id="card-cvc" ></div>
              </div>
            </div>
          </form>
        </div>
        <div style={{height:'5px'}}></div>
        <div>
        <div >
          <p>{t('h5_stripe_card_name')} </p>
          <input type="text" placeholder={t('h5_stripe_card_typehere')} onChange={(e)=>{setCardName(e)}} />
        </div>
        <div >
          <p>{t('h5_stripe_card_zip')} </p>
          <input placeholder={t('h5_stripe_card_typehere')}  onChange={(e)=>{setPostalCode(e)}}  />
        </div>
      </div>
        <div >
          <div>
            {/* <van-checkbox
					value="checked"
					checked-color="#15C7C5"
					:disabled="card === 0"
					class="save-card"
					>{{ $t("h5_stripe_card_esavedefault") }}
				</van-checkbox> */}
          </div>
          <Button
            onClick={createPaymentMethodAndCustomer}
            style={{borderRadius: '8px'}}
            color="primary"
          >
            {t("h5_stripe_card_save")}jjjjj
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddCard
