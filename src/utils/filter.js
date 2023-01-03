
// console.log(process.env,'-----------env-----------')
// export const stripePublicKey = process.env.stripePublicKey 


function converSubscribestatus(status){
    switch(status){
      case 10:
        return 'Initial';
      case 20:
        return 'Auto Renewal ON';
      case 30:
        return 'Plan Canceled';
      case 40:
        return 'Auto charge failed';
      case 50:
        return 'Expired';
      default: return 'None';
    }
}



export default{
  converSubscribestatus
}