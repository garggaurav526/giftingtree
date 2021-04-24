// import axios from 'react-native-axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import "../Sys/config";
// var baseUrl = global.platformURI;

// var getData = async () => {
//     try {
//         const value = await AsyncStorage.getItem('giftingTreeSSoToken')
//         if (value !== null) {
//             return value
//         }
//     } catch (e) {
//         // error reading value
//     }
// }

// export class HomeServices {

//     constructor() {
//         axios.interceptors.request.use(
//             function (config) {
//                 let token = getData()
//                 config.headers.Authorization = `Bearer ${token}`;
//                 return config;
//             },
//             (error) => {
//                 console.log("error.response.status", error);
//                 return error;
//             }
//         );
//     }



//     async getCategoryItemList() {
//         return axios
//             .get(`${baseUrl}categories-item/11`)
//             .then((res) => res.data);

//     }

//     getVendorList(payload) {
//         return axios
//             .post(`${baseUrl}chop/user/selected-vendor`, payload)
//             .then((res) => res.data);

//     }


// }