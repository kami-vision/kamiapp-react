let showLoadingSign = false
let dismissLoadingSign = false
let loadingTimeout= null
export default function bestLoading(funName){
  if(funName == 'dismissLoading'){
    if(!dismissLoadingSign){
      dismissLoadingSign = true
      loadingTimeout = window.setTimeout(()=>{
        console.log(funName)
       // dsBridge.call(funName)
        showLoadingSign = false
        dismissLoadingSign = false
        loadingTimeout = null
      },1000)
    }
  }else{
    if(loadingTimeout){
      window.clearTimeout(loadingTimeout)
      dismissLoadingSign = false
    }
    if(!showLoadingSign){
      console.log(funName)
    //  dsBridge.call(funName)
      showLoadingSign = true
    }
  }
}
