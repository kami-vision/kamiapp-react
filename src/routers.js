import React from 'react';
import Cloudbuy from './pages/cloudbuy/index'
import ManageCamera from './pages/manageCamera/index'
const commonProps = { isAndroid: true }
const routes = [
  {
    path: "/"
  },
  {
    path: "/cloudbuy",
    element: <Cloudbuy commonProps={commonProps} />
  },
  {
    path: "/cloudbuy",
    element: <Cloudbuy commonProps={commonProps} />
  },
  {
    path: "/manageCamera",
    element: <ManageCamera commonProps={commonProps} />
  },
  
];
export default routes