import camera_icon from "../../../assets/camera_icon.png"
import time_icon from "../../../assets/time_icon.png"
import record_icon from "../../../assets/record.png"
import phone_icon from "../../../assets/phone.png"
import alarm_icon from "../../../assets/alarm.png"
import smart_icon from "../../../assets/smart.png"

const Description = ({ skuObj, isAppleTestAccount, region }) => {
  return (
    <div className="block">
      {skuObj.discount && isAppleTestAccount != 1 ? <div className="discound-banner">ON SALE</div> : null}
      <div className="header-content">
        <div className="header-title">{skuObj.remarks}</div>
        <div className="line"></div>
        {skuObj.serviceCycle == 36 ? (
          <div className="price">
            <p className="month">
              $ <span>{skuObj.yearPrice}</span> /3 Yr
            </p>
            {skuObj.discount && skuObj.priceOriginal > skuObj.yearPrice && isAppleTestAccount != 1 ? (
              <p className="original-price">Was $ {skuObj.priceOriginal}</p>
            ) : null}
            <p className="year">Equals to ${skuObj.monthPrice} per month</p>
          </div>
        ) : null}
        {skuObj.serviceCycle == 12 ? (
          <div className="price">
            <p className="month">
              $ <span>{skuObj.yearPrice}</span> /Yr
            </p>
            {skuObj.discount && skuObj.priceOriginal > skuObj.yearPrice && isAppleTestAccount != 1 ? (
              <p className="original-price">Was $ {skuObj.priceOriginal}</p>
            ) : null}
            <p className="year">Equals to ${skuObj.monthPrice} per month</p>
          </div>
        ) : null}
        {skuObj.serviceCycle == 1 ? (
          <div className="price">
            <p className="month">
              $ <span>{skuObj.monthPrice}</span> /Mo
            </p>
            {skuObj.discount && skuObj.priceOriginal > skuObj.monthPrice && isAppleTestAccount != 1 ? (
              <p className="original-price">Was $ {skuObj.priceOriginal}</p>
            ) : null}
            {skuObj.savePrice ? <p className="year">Save ${skuObj.savePrice} when you pay yearly</p> : null}
          </div>
        ) : null}
      </div>
      <div className="detail">
        <ul>
          <li>
            <img src={camera_icon} />
            {skuObj.serviceMax || 0} camera
          </li>
          <li>
            <img src={time_icon} />
            {skuObj.serviceLoop || 0} days history
          </li>
          <li>
            <img style={{ paddingTop: "4px" }} src={record_icon} />

            {skuObj.serviceType == 1 ? (
              <span style={{ position: "relative" }}>
                <span>
                  Continuous 24/7 video recording <sup>1</sup>{" "}
                </span>
              </span>
            ) : (
              <span> Records entire motion</span>
            )}
          </li>
          {region == "USA" ? (
            <li>
              <img src={phone_icon} />
              <span> Premium phone support</span>
            </li>
          ) : null}

          {skuObj.type == 5 ? (
            <li>
              <img src={alarm_icon} />

              <span style={{ position: "relative" }}>
                <span style={{ color: "#ff0037" }}>24/7 Emergency Service</span>
              </span>
            </li>
          ) : null}
          <li>
            <img src={smart_icon} />
            <span style={{ position: "relative" }}>
              Smart AI detections*
              <br />
              <span className="span-small">*only available on select cameras</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Description
