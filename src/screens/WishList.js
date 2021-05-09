import React, { useRef, useState, useEffect } from "react";
import {  StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import photoFrame1 from '../assets/img/frame1.jpg'
import photoFrame2 from '../assets/img/frame2.jpg'
import photoFrame3 from '../assets/img/frame3.jpg'
import photoFrame4 from '../assets/img/frame4.jpg'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
import { HomeServices } from "../components/Services/Home.services";
import BackgroundHeading from '../components/BackgroundHeading';
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
;
const homeServices = new HomeServices()

function WishList(props) {
    const [wishlist, setWishlist]= React.useState("")

    useEffect(() => {
        getDataAlert()
        getWishListData()
    }, []);

    var getDataAlert = async () => {
        try {
            const value = await props.navigation.getParam("navigationData");
            console.log(value)
            if (value.subCategoryID !== null) {
                // getCategoryItemList(value.categoryName)
            }
        } catch (e) {
            // error reading value
            console.log("sfgf", e)
        }
    }

    const getWishListData = async () => {
        await homeServices.getWishListData().then(
            (data) => {
                if (data.data) {
                    setWishlist(data.data.data.data)
                }
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    }

    const handleClickOnProduct = (id) => {
        props.navigation.navigate("ProductDetail", {
            navigationData: {
                productId: id
            },
        });
    }

    const deleteProductWishlist = async (id) => {
        await homeServices.handleDeleteWishlist(id).then(
            (data) => {
                getWishListData()
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    }

    const handleClickDeleteFromWishlist = (id) => {
        deleteProductWishlist(id)
    }

    return (
        <>
            <Header navigation={props.navigation}/>
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View>
                            <View style={styles.row}>
                                {
                                    wishlist.length>0 &&
                                    wishlist.map((item,i) =>{
                                        return <>
                                        <View style={styles.col}>
                                            <View>
                                                <TouchableOpacity onPress={() => handleClickDeleteFromWishlist(item.product.id)}>
                                                <Icon name="ios-close-circle-sharp" size={30} style={styles.closeIcon} />
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity  onPress={()=> handleClickOnProduct(item.id)}>
                                                <View style={styles.imgView}>
                                                    <Image source={{ uri: JSON.parse(item.product.image)[0] }} style={styles.subCategoryImg}/>
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={styles.subCategorystyle}>{item.product.name}</Text>
                                            <Text style={styles.subCategorystyleDescription}>{item.product.description.substr(0, 20)}...</Text>
                                            <TouchableOpacity style={styles.btn}>
                                            <Text style={{color: "#00BFA5" }}>
                                                        Move to Cart
                                                    </Text>
                                            </TouchableOpacity>
                                        </View>
                                        </>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar active={'Wishlist'} navigation={props.navigation} />

        </>
    )
}
export default (WishList)


const styles = StyleSheet.create({

    main: {
        backgroundColor: '#fff',
        height: height,
        width: width,
    },
    loginMain: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    submain: {
        width: vw * 98,
    },

    row:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'space-between'
    },
    col:{
        width: vw * 48,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#ddd",
        paddingBottom: 5
    },
    imgView:{
        shadowColor: '#333333b5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 7,
        elevation: 3,
    },
    subCategoryImg:{
        width: '100%',
        height: 250,
        borderRadius: 7,
        resizeMode: "cover",
        // alignSelf: 'center',

    },
    subCategorystyle: {
        fontWeight: "bold",
        color: "#000",
        marginTop: 10
    },
    subCategorystyleDescription:{
        color: "#53576694",
        marginBottom: 20,

    },
    btn: {
        borderTopWidth: 1,
        borderColor: "#ddd",
        textAlign: "center",
        justifyContent: "center",
        color: "#00BFA5",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 8,
        backgroundColor: "#fff"
    },
    closeIcon:{
        color: "#565968"
    }
});
