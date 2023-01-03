// import { firebaseAnalytics } from "../../src/firebaseConfig";
// import { brazeAnalytics } from "./getCommonInfo";

// export function integrateAnalytic(name, params = null, num = 2) {
//   switch (num) {
//     case 0:
//       params ? firebaseAnalytics.logEvent(name, params) : firebaseAnalytics.logEvent(name)
//       return;
//     case 1:
//       params ? brazeAnalytics(name, params) : brazeAnalytics(name)
//       return;
//     default:
//       if (params) {
//         firebaseAnalytics.logEvent(name, params);
//         brazeAnalytics(name, params);
//       } else {
//         firebaseAnalytics.logEvent(name);
//         brazeAnalytics(name);
//       }
//     return;
//   }
// }
