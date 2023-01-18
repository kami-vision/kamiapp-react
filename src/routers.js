import React, { useEffect, useState } from "react"
import { useLocation, Navigate } from "react-router-dom";
import DemoPhone from './utils/demoPhone'
import Cloudbuy from "./pages/cloudbuy/index"
import AddCard from "./pages/cloudbuy/addCard"
import ManageCamera from "./pages/manageCamera/index"
import Orders from "./pages/orders/index"
import CloudRenew from "./pages/cloudbuy/renew"
import BabyGuide from "./pages/babyGuide/index"
import BabyGuideDetail from "./pages/babyGuide/detail"
import { useTranslation } from "react-i18next"

const defaultObj = new DemoPhone().defaultObj ;
import { isAppleTestAccount, getPlatform, getAppName, getUserInfo, getHost } from "./utils/getCommonInfo"

const commonProps = {
  isAppleTestAccount: isAppleTestAccount()||0,
  deviceType: getPlatform() == 'Android' ? 1 : 2,
  appPlatform: getAppName()||defaultObj.appPlatform,
  userInfo: getUserInfo()||defaultObj,
  host: getHost()||defaultObj.host,
}
const CommonRoute = ({Route,title,staticTitle})=>{
  const location = useLocation();
  const {t} = useTranslation()
  useEffect(() => {
    title ? document.title = t(title) : document.title = staticTitle
  },[location]);
  return (
    <>
      <Route commonProps={commonProps}></Route>
    </>
  )
}

const routes = [
  {
    path: "/",
    element: <CommonRoute Route={Cloudbuy} staticTitle={'Kami Cloud Plans'}/>
  },
  {
    path: "/cloudbuy",
    element: <Cloudbuy commonProps={commonProps} />,
  },
  {
    path: "/manageCamera",
    element: <CommonRoute Route={ManageCamera} title={'h5_manageCamera_pageName'}/>
  },
  {
    path: "/orders",
    element: <CommonRoute Route={Orders} commonProps={commonProps} />,
  },
  {
    path: "/cloudRenew",
    element: <CommonRoute Route={CloudRenew} commonProps={commonProps} />,
  },
  {
    path: "/babyGuide",
    element: <CommonRoute Route={BabyGuide} commonProps={commonProps} />,
  },
  {
    path: "/babyDetail",
    element: <CommonRoute Route={BabyGuideDetail} commonProps={commonProps} />,
  },
  {
    path: "/addCard",
    element: <CommonRoute Route={AddCard} staticTitle={'Add card'}/>
  },
  
  // {
  //   path: "/orderDetail",
  //   element: <CommonRoute Route={AddCard} commonProps={commonProps} />,
  // },
  // {
  //   path: "/onceActive",
  //   element: <CommonRoute Route={AddCard} commonProps={commonProps} />,
  // },
  // {
  //   path: "/cloudRenew",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/serviceList",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/cardList",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/securityManagePlan",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/e911Buy",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/proSecurityBuy",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/serviceIntro",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/e911Faq",
  //   element: <CommonRoute Route={AddCard}/>,
  // },
  // {
  //   path: "/e911Disconnect",
  //   element: <CommonRoute Route={AddCard}/>
  // }
  
]

// https://kamiapp.kamihome.com/#/cloudBuy
// https://kamiapp.kamihome.com/#/manageCamera
// https://kamiapp.kamihome.com/#/orders
// https://kamiapp.kamihome.com/#/orderDetail?orderCode=
// https://kamiapp.kamihome.com/#/onceActive?
// https://kamiapp.kamihome.com/#/cloudRenew
// https://kamiapp.kamihome.com/#/serviceList
// https://kamiapp.kamihome.com/#/cardList
// https://kamiapp.kamihome.com/#/securityManagePlan
// https://kamiapp.kamihome.com/#/e911Buy
// https://kamiapp.kamihome.com/#/proSecurityBuy

// https://kamiapp.kamihome.com/#/babyGuide
// https://kamiapp.kamihome.com/#/serviceIntro
// https://kamiapp.kamihome.com/#/e911Faq
// https://kamiapp.kamihome.com/#/e911Disconnect

export default routes
