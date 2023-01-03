import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd-mobile'
import  SkuBox  from './components/SkuBox'
import { getCloudProductList } from '../../api/cloudbuy'

const Cloudbuy = ({commonProps})=> {
  return (
    <>
    <div>
      <Tabs color="primary">
        <Tabs.Tab title='YEARLY' key='yearly'>
          <SkuBox />
        </Tabs.Tab>
        <Tabs.Tab title='MONTHLY' key='monthly'>
          MONTHLY
        </Tabs.Tab>
      </Tabs>
    </div>
    </>
  )
}

export default Cloudbuy