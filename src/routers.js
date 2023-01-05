import React from "react"
import Cloudbuy from "./pages/cloudbuy/index"
import ManageCamera from "./pages/manageCamera/index"
import DemoPhone from './utils/demoPhone'
const defaultObj = new DemoPhone().defaultObj ;
console.log('%c [ defaultObj ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', defaultObj)
import { isAppleTestAccount, getPlatform, getAppName, getUserInfo, getHost } from "./utils/getCommonInfo"
const commonProps = {
  isAppleTestAccount: isAppleTestAccount()||0,
  deviceType: getPlatform() == 'Android' ? 1 : 2,
  appName: getAppName()||defaultObj.appPlatform,
  userInfo: getUserInfo()||defaultObj,
  host: getHost()||defaultObj.host,
}
const routes = [
  {
    path: "/",
    element: <Cloudbuy commonProps={commonProps} />,
  },
  {
    path: "/cloudbuy",
    element: <Cloudbuy commonProps={commonProps} />,
  },
  {
    path: "/manageCamera",
    element: <ManageCamera commonProps={commonProps} />,
  },
]
export default routes
