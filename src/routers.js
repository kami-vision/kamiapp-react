import React from "react"
import Cloudbuy from "./pages/cloudbuy/index"
import ManageCamera from "./pages/manageCamera/index"

import { isAppleTestAccount, getPlatform, getAppName, getUserInfo, getHost } from "./utils/getCommonInfo"
const commonProps = {
  isAppleTestAccount: isAppleTestAccount(),
  deviceType: getPlatform() == 'Android' ? 1 : 2,
  appName: getAppName(),
  userInfo: getUserInfo(),
  host: getHost()
}
const routes = [
  {
    path: "/",
    element: <></>
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
