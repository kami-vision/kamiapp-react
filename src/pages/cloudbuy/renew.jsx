import React, { useEffect, useState } from "react"

const CloudRenew = ({}) => {
    const currentProduct = {originalProductPrice:12,serviceMax:333}
    const handlerGotoPay = ()=>{}
  return (
    <>
      <section class="renew-container">
        <div class="renew-box">
          <h2>Your Current Plans</h2>
          <div class="product-box">
            <div class="price-box">
              {currentProduct.discount?<p  class="del-price-box">
                {/* Was {getCurrencyCode(currentProduct.currency)} */}
                <span class="del">{currentProduct.originalProductPrice}</span>
              </p>:null}
              <span class="price">
                {/* <em class="unit">{getCurrencyCode(currentProduct.realCurrency)}</em>
                {currentProduct.productPrice || 0} */}
              </span>
            </div>
            <div class="product-ge"></div>
            <p class="content">
              <em>{currentProduct.serviceMax || 1}</em>
              {/* {$t("h5_cloud_buy_productContentStr2")} */}
            </p>
            <p class="content">
              {/* <em>{currentProduct.serviceLoop || 30}-Day</em> */}
              <br />
              Recording Loop
            </p>
            <p class="content">
              {/* {currentProduct.serviceType == 1 ? $t("h5_cloud_buy_productCVR") : $t("h5_cloud_buy_productMotion")} */}
            </p>
          </div>
        </div>
        <div class="btn-box" onClick={handlerGotoPay}>
          {/* {$t("h5_cloud_buy_btnPay")} */}
        </div>
      </section>
    </>
  )
}

export default CloudRenew
