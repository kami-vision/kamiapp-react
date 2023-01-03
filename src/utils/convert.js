import {getPlatform, getAppName} from './getCommonInfo'


const yihome = 1
const kami = 3
const neutral = 2 ; 
const neutral_ape = 4

//yihome=1; kami=3; neutral = neutral_ape= 2
export function serviceType(appName){
  switch(appName){
    case 'yihome':
      return yihome;break;
    case 'kami':
      return kami; break;
    case 'neutral': // iot
      return neutral;
    case 'neutral_ape': // 猿人
        return neutral_ape
    default :
      return yihome;
  }
}

const androidYihomeToChannel = 96 //142
const androidNeutralApeToChannel = 167   //86 
const androidIotToChannel = 167  // 86
const androidKamiToChannel = 97  // 148
const iosYihomeToChannel = 59 // 143  
const iosIotChannel =85   // 85 
const iosNeutralApeChannel = 85  // 85
const iosKamiChannel = 87    // 149   
const androidDeviceType = 1
const iosDeviceType = 2

//yihome=1; kami=3; neutral = neutral_ape= 2
export function channelStatus(){
  let deviceType = getPlatform() == 'ios' ? 2 : 1   
  let serviceType = getAppName()
  if(deviceType == androidDeviceType){   // 1:andron ;  2: ios
    switch(serviceType){   
      case yihome:
      case 'yihome':
        return androidYihomeToChannel;break;
      case kami:
        case 'kami':
        return androidKamiToChannel; break;
        case neutral:
        case 'neutral':
          return androidIotToChannel; break;
        case neutral_ape:
        case 'neutral_ape':
          return androidNeutralApeToChannel; break;
      default : 
        return 0;
    }
  }else if(deviceType == iosDeviceType){
    switch(serviceType){   
      case yihome:
      case 'yihome':
        return iosYihomeToChannel;break;
      case kami:
      case 'kami':
        return iosKamiChannel; break;
      case neutral:
      case 'neutral':
        return iosIotChannel; break;
      case neutral_ape:
      case 'neutral_ape':
        return iosNeutralApeChannel; break
      default :
        return 0;
    }
  }
}

export function proChannelStatus(){
  const deviceType = getPlatform() == 'ios' ? 2 : 1   
  const appName = getAppName()
  if(deviceType == 1){
    switch(appName){   
      case 'yihome':
        return 188;
      case 'kami':
        return 189;
      default : 
        return 0;
    }
  }else if(deviceType == 2){
    switch(appName){   
      case 'yihome':
        return 186;
      case 'kami':
        return 187;
      default :
        return 0;
    }
  }
}

export function e911ChannelStatus(deviceType, appName){
  if(deviceType == 1){   // 1:andron ;  2: ios
    switch(appName){   
      case 'yihome':
        return 56;break;
      case 'kami':
        return 56; break;
      case 'neutral':
        return 130; break;
      case 'neutral_ape':
        return 130; break;
      default : 
        return 0;
    }
  }else if(deviceType == 2){
    switch(appName){   
      case 'yihome':
        return 55;break;
      case 'kami':
        return 55; break;
      case 'neutral':
        return 129; break;
      case 'neutral_ape':
        return 129; break
      default :
        return 0;
    }
  }
}


export function getLocale(){
  let resLan = 'en'
  const lan = window.navigator.language
  const lanArr=['da','de','en','es','fi','it','ja','nb','nl','pl','pt','sv','zh']
  lanArr.forEach(item=>{
    if(lan.indexOf(item) > -1){
      resLan = item
    }
  })
  return  [resLan]
}


// export default{
//   serviceType,
//   channelStatus
const iosYihomeActivityToChannel = 153 //137
const iosIotActivityToChannel = 155 //140
const AndroidYihomeActivityToChannel = 152 //136
const AndroidIotActivityToChannel = 154 //141

export function activityChannelStatus(){
   let deviceType = getPlatform() == 'ios' ? 2 : 1   
   let serviceType = getAppName()
  if(deviceType == androidDeviceType){
    switch(serviceType){   
      case 'yihome':
        return AndroidYihomeActivityToChannel;break;
      case 'kami':
        return AndroidYihomeActivityToChannel; break;
      case 'neutral':
      case 'neutral_ape':
        return AndroidIotActivityToChannel;
      default : 
        return 0;
    }
  }else if(deviceType == iosDeviceType){
    switch(serviceType){   
      case 'yihome':
        return iosYihomeActivityToChannel; break;
      case 'kami':
        return iosYihomeActivityToChannel; break;
      case 'neutral':
      case 'neutral_ape':
        return iosIotActivityToChannel;
      default :
        return 0;
    }
  }
}


//ios 更多套餐 channel
export function getIosMoreSkuChannel(platform){
  switch(platform){
    case 'yihome':
      return 98;
    case 'kami':
      return 99; 
    case 'neutral':
      return 100;
    case 'neutral_ape':
        return 101
    case 'yilife':
      return 164
    default :
      return 101;
  }
}

// 东南亚 channel

const iosYihomeSGToChannel = 157 
const iosIotSGToChannel = 159 
const AndroidYihomeSGToChannel = 156 
const AndroidIotSGToChannel = 168


export function SGChannelStatus(){
  let deviceType = getPlatform() == 'ios' ? 2 : 1   
  let serviceType = getAppName()
 if(deviceType == androidDeviceType){
   switch(serviceType){   
     case 'yihome':
       return AndroidYihomeSGToChannel;
     case 'kami':
       return AndroidYihomeSGToChannel; 
     case 'neutral':
     case 'neutral_ape':
       return AndroidIotSGToChannel;
     default : 
       return 0;
   }
 }else if(deviceType == iosDeviceType){
   switch(serviceType){   
     case 'yihome':
       return iosYihomeSGToChannel; 
     case 'kami':
       return iosYihomeSGToChannel; 
     case 'neutral':
     case 'neutral_ape':
       return iosIotSGToChannel;
     default :
       return 0;
   }
 }
}

export function SGYILifeChannelStatus(){
  let deviceType = getPlatform() == 'ios' ? 2 : 1   
 if(deviceType == 1){
  return 162;
 }else if(deviceType == 2){
  return 163;
 }
}

// yilife 斋月活动
export function ramadanActivityChannelStatus(){
  let deviceType = getPlatform() == 'ios' ? 2 : 1   
 if(deviceType == androidDeviceType){
   return 165
 }else if(deviceType == iosDeviceType){
   return 166
 }
}
