import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import photoFrame1 from '../assets/img/frame1.jpg'
import photoFrame2 from '../assets/img/frame2.jpg'
import photoFrame3 from '../assets/img/frame3.jpg'
import photoFrame4 from '../assets/img/frame4.jpg'
import Icon from 'react-native-vector-icons/dist/Feather';
import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
import { HomeServices } from "../components/Services/Home.services";
import BackgroundHeading from '../components/BackgroundHeading';
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import { AuthContext } from "../components/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
    ;
const homeServices = new HomeServices()

function Card(props) {
    const [cartList, setCartList] = React.useState([])
    const { cardProductItem, removeCartProductItem } = React.useContext(AuthContext)

    useEffect(() => {
        // getDataAlert()
        getCardList()
    }, []);

    var getDataAlert = async () => {
        // try {
        //     const value = await props.navigation.getParam("navigationData");
        //     console.log(value)
        //     if (value.subCategoryID !== null) {
        //         // getCategoryItemList(value.categoryName)
        //     }
        // } catch (e) {
        //     // error reading value
        //     console.log("sfgf", e)
        // }
    }

    const getCardList = async () => {
        try {
            let cardListing = await AsyncStorage.getItem('__gifting_tree_cart_item');
            var cartData = JSON.parse(cardListing);
            setCartList(cartData)
        }
        catch (error) {
            alert(error)
        }
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

    const addProduct = async (item) => {
        await cardProductItem(item)
        await getCardList();
    }

    const removeProduct = async (item) => {
        await removeCartProductItem(item);
        await getCardList();
    }

    const handleClickDeleteFromWishlist = (id) => {
        deleteProductWishlist(id)
    }

    const calculatePrice = (price,quantity) => {
        var result = price * quantity;
        return result;
    }

    const handleTotalPrice = () => {
        var finalPrice = 0
        if(cartList.length> 0){
            cartList.map((item) => {
                finalPrice += item.price * item.quantity
            })
        }
        return finalPrice
    }

    return (
        <>
            <Header navigation={props.navigation} />
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View>
                            <View style={styles.row}>
                                {
                                    cartList.length > 0 &&
                                    cartList.map((item) => {
                                        return <View style={styles.itemView}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={styles.imgView}>
                                                    <Image source={{ uri: JSON.parse(item.image)[0] }} style={styles.imgCard} />
                                                </View>
                                                <View style={{ width: vw * 50, flexDirection: 'column', justifyContent: 'center' }}>
                                                    <View >
                                                        <Text style={{fontWeight: "bold"}}>{item.name}</Text>
                                                        <Text style={styles.productPrice}>₹ {calculatePrice(item.price,item.quantity)}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                                    <View>
                                                        <TouchableOpacity onPress={() => addProduct(item)}>
                                                            <Icon name={"plus"} size={20} style={styles.btn} />
                                                        </TouchableOpacity>
                                                        <View>
                                                            <Text style={styles.quantity}>{item.quantity}</Text>
                                                        </View>
                                                        <TouchableOpacity onPress={() => removeProduct(item)}>
                                                            <Icon name={"minus"} size={20} style={styles.btn} />

                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.checkoutBackground}>
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontWeight: "bold", fontSize: RFPercentage(3)}}>
                        Total:
                    </Text>
                    <Text style={styles.productPriceTotal}>
                    ₹{handleTotalPrice()}
                    </Text>
                </View>
                
                <View style={styles.btnCheckout}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('Checkout')}>
                        <Text style={{color: "#fff"}}>
                            Checkout
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </>
    )
}
export default (Card)


const styles = StyleSheet.create({

    main: {
        backgroundColor: '#f7f7f7',
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

    row: {
        flexDirection: "row",
        justifyContent: 'center',
        flexWrap:'wrap'
    },
    itemView: {
        width: vw * 90,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12
    },
    imgView: {
        width: vw * 20,
        // height: "50%"
    },
    btn: {
        color: '#000',
        // backgroundColor:'#00BFA5',
        backgroundColor: '#a1dbf5',
        borderRadius: 26 / 2,
        padding: 3
    },
    imgCard: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2
        // height: "100%"
    },
    quantity: {
        textAlign: 'center',
        fontSize: RFPercentage(2.3)
    },
    productPrice: {
        fontWeight: "bold",
        color: "#00BFA5"
    },
    productPriceTotal:{
        fontWeight: "bold",
        color: "#00BFA5",
        fontSize: RFPercentage(3),
        marginLeft: 15
    },
    checkoutBackground:{
        flexDirection: "row",
        width: vw * 99,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: "space-between",
        marginBottom: 10
    },
    btnCheckout:{
        width: vw * 30,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor:"#00BFA5",
        borderColor: "#00BFA5",
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        
    }
});
