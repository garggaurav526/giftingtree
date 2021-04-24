import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import photoFrame1 from '../assets/img/frame1.jpg'
import photoFrame2 from '../assets/img/frame2.jpg'
import photoFrame3 from '../assets/img/frame3.jpg'
import photoFrame4 from '../assets/img/frame4.jpg'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
// import { HomeServices } from "../components/Services/Home.services";
import BackgroundHeading from '../components/BackgroundHeading';

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
    ;
// const homeServices = new HomeServices()

function ProductDetail(props) {
    const [isActiveBtn, setIsActiveBtn] = React.useState("Cart")

    useEffect(() => {
        getDataAlert()
    }, []);

    var getDataAlert = async () => {
        try {
            const value = await props.navigation.getParam("navigationData");
            console.log(value)
            if (value.productId !== null) {
                // setCategoryName(value.categoryName)
                // getCategoryItemList(value.categoryName)
            }
        } catch (e) {
            // error reading value
            console.log("sfgf", e)
        }
    }

    const images = [
        photoFrame1,
        photoFrame2,
        photoFrame1,
        photoFrame1,
        photoFrame1
    ]

    const getCategoryItemList = async () => {
        // await homeServices.getCategoryItemList().then(
        //     (data) => {
        //         // setAppData(data)
        //     },
        //     (error) => {
        //         console.log("error.response.status", error);
        //     }
        // );
    }

    const handleClickOnSubCategory = (id) => {
        props.navigation.navigate("ProductListing", {
            navigationData: {
                subCategoryID: id
            },
        });
    }

    return (<>
        <ScrollView style={styles.main}>
            <View style={styles.loginMain}>
                <View style={styles.submain}>
                    <View>
                        <ImageSliderComponent
                            isButton={true}
                            height={vh * 60}
                            images={images}
                            interval={4000}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Title</Text>
                        <Text style={styles.description}>Description of this product</Text>
                        <Text style={{ marginTop: 4 }}>₹ 1000</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff", color: "#000" }]}
            >
                <Icon name={isActiveBtn === "Wishlist" ? "ios-heart" : "ios-heart-outline"} size={30} style={isActiveBtn === "Wishlist" ? { color: "#fff" } : { color: "#000" }} />
                <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 6 }}>
                    <Text style={isActiveBtn === "Wishlist" ? { color: "#fff" } : { color: "#000" }}>
                        Wishlist
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style=
                {
                    [styles.btn,
                    { backgroundColor: "#00BFA5", color: "#fff" }
                    ]
                }
            >
                <Icon name={isActiveBtn === "Cart" ? "ios-cart" : "ios-cart-outline"} size={30} style={isActiveBtn === "Cart" ? { color: "#fff" } : { color: "#000" }} />
                <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 6 }}>
                    <Text style={isActiveBtn === "Cart" ? { color: "#fff" } : { color: "#000" }}>
                        Add to Cart
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </>
    )
}
export default (ProductDetail)


const styles = StyleSheet.create({

    main: {
        backgroundColor: '#fff',
        height: height,
        width: width,
    },
    loginMain: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    submain: {
        width: vw * 98,
    },
    description: {
        color: "#7b838b",
    },
    title: {
        color: "#000",
        marginTop: 10,
        fontWeight: "bold",
        fontSize: RFPercentage(2.5),
        marginTop: 10
    },
    container: {
        marginHorizontal: vw * 4,
    },
    btn: {
        width: vw * 50,
        borderWidth: 1,
        borderColor: "#bbb",
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 6,

    },
    btnContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        textAlign: "center",
    },
    colorWhite: {
        color: "#fff"
    }
});
