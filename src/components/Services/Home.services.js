import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "../Sys/config";
var baseUrl = global.platformURI;

var getData = async () => {
    try {
        const value = await AsyncStorage.getItem('giftingTreeSSoToken')
        if (value !== null) {
            return value
        }
    } catch (e) {
        // error reading value
    }
}

export class HomeServices {

    constructor() {
        axios.interceptors.request.use(
            async function (config) {
                let token = await getData()
                config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error) => {
                console.log("error.response.status", error);
                return error;
            }
        );
    }



    async getMainCategoryList() {
        return axios
            .get(`${baseUrl}categories?page=all`)
            .then((res) => res.data);
    }
    async getSubCategoryList(id) {
        return axios
            .get(`${baseUrl}sub-categories/${id}?page=all`)
            .then((res) => res.data);
    }
    async getCategoryWithSubCategoryList() {
        return axios
            .get(`${baseUrl}categories-sub-all`)
            .then((res) => res.data);
    }
    async getProductList(id, page) {
        return axios
            .get(`${baseUrl}categories-item/${id}?page=${page}`)
            .then((res) => res.data);
    }
    async getProductDetail(id) {
        return axios
            .get(`${baseUrl}product/${id}`)
            .then((res) => res.data);
    }
    async handleAddWishlist(id) {
        console.log("dfhjhfsdj", id)
        var payload ={
            product_id: id
        }
        return axios
            .post(`${baseUrl}wishlist/add`,  payload)
            .then((res) => res.data);
    }
    async handleDeleteWishlist(id) {
        return axios
            .delete(`${baseUrl}wishlist/${id}`)
            .then((res) => res.data);
    }
    async getDistinctRating(id) {
        return axios
            .get(`${baseUrl}rating-distinct?product_id=${id}`)
            .then((res) => res.data);
    }

    async getWishListData() {
        return axios
            .get(`${baseUrl}wishlist`)
            .then((res) => res.data);
    }

    async getUserData() {
        return axios
            .get(`${baseUrl}user`)
            .then((res) => res.data);
    }

    async setUserData(payload) {
        return axios
            .post(`${baseUrl}user-update`,  payload)
            .then((res) => res.data);
    }

    

    // getVendorList(payload) {
    //     return axios
    //         .post(`${baseUrl}chop/user/selected-vendor`, payload)
    //         .then((res) => res.data);

    // }


}