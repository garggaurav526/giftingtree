import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
import { HomeServices } from "../components/Services/Home.services";
import RatingComponent from "../components/RatingComponent";

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
    ;
const homeServices = new HomeServices()

function ProductDetail(props) {
    const [isActiveBtn, setIsActiveBtn] = React.useState("Cart")
    const [productImageList, setProductImageList] = React.useState([])
    const [productDetail, setProductDetail] = React.useState()
    const [productId, setProductId] = React.useState()
    const [wishlistActive, setWishlistActive] = React.useState(false)
    const [distinctRating, setDistinctRating] = React.useState({})

    useEffect(() => {
        getDataAlert()
        getDistinctRating()
    }, []);

    var getDataAlert = async () => {
        try {
            const value = await props.route.params.navigationData
            console.log(value)
            if (value.productId !== null) {
                setProductId(value.productId)
                getProductDetail(value.productId)
            }
        } catch (e) {
            // error reading value
            console.log("sfgf", e)
        }
    }

    const getDistinctRating = async () => {
        await homeServices.getDistinctRating(productId).then(
            (data) => {
                if (data.data) {
                    setDistinctRating(data.data.data)
                }
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    }

    const getProductDetail = async (id) => {
        await homeServices.getProductDetail(id).then(
            (data) => {
                if (data.data.image) {
                    setProductImageList(JSON.parse(data.data.image))
                }
                setWishlistActive(data.data.wishlist)
                setProductDetail(data.data)
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    }

    const handleAddWishlist = async () => {
        if (!wishlistActive) {
            await homeServices.handleAddWishlist(productId).then(
                (data) => {
                    setWishlistActive(true)
                },
                (error) => {
                    console.log("error.response.status", error);
                }
            );
        } else {
            await homeServices.handleDeleteWishlist(productId).then(
                (data) => {
                    setWishlistActive(false)
                },
                (error) => {
                    console.log("error.response.status", error);
                }
            );
        }
    }

    return (<>
        <ScrollView style={styles.main}>
            <View style={styles.loginMain}>
                <View style={styles.submain}>
                    <View>
                        <ImageSliderComponent
                            isButton={true}
                            height={vh * 60}
                            images={productImageList}
                            interval={5000}
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>{productDetail && productDetail.name}</Text>
                        <Text style={styles.description}>{productDetail && productDetail.description}</Text>
                        <Text style={styles.productPrice}>₹ {productDetail && productDetail.price}</Text>
                        {distinctRating.reviews > 0 &&
                            <RatingComponent total={distinctRating.sum} reviews={distinctRating.reviews} />
                        }
                    </View>

                    <View style={styles.borderBottom}></View>

                    <View style={[styles.container, { width: vw * 80 }]}>
                        <Text style={styles.productDetailText}>PRODUCT DETAIL</Text>
                        <Text style={{ lineHeight: 18 }}>{productDetail && productDetail.description}</Text>
                        {
                            productDetail &&
                            productDetail.size &&
                            <>
                                <Text style={{ lineHeight: 28, fontWeight: "bold" }}>Size</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {JSON.parse(productDetail.size).map((size) => {
                                        return <>
                                            <Text style={{ borderWidth: 1, borderColor: "#ddd", padding: 2, paddingLeft: 5, paddingRight: 5 }}>{size.value}</Text>
                                        </>
                                    })}
                                </View>

                            </>
                        }
                        {
                            productDetail &&
                            productDetail.color &&
                            <>
                                <Text style={{ lineHeight: 28, fontWeight: "bold" }}>Color</Text>
                                <View style={{ flexDirection: "row", }}>
                                    {JSON.parse(productDetail.color).map((color) => {
                                        return <>
                                            <View style={{ backgroundColor: color.value, width: 30, height: 30, borderRadius: 50, borderWidth: 1, borderColor: "#ddd", marginRight: 10 }}></View>
                                        </>
                                    })}
                                </View>

                            </>
                        }
                        {
                            productDetail &&
                            productDetail.video &&
                            <>
                                <Text style={{ lineHeight: 28, fontWeight: "bold", marginTop: 10 }}>Video URL</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: "#00BFA5" }}>{productDetail.video}</Text>
                                </TouchableOpacity>
                            </>
                        }

                    </View>
                    <View style={styles.borderBottom}></View>

                </View>
            </View>
        </ScrollView>
        <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff", color: "#000" }]}
                onPress={handleAddWishlist}
            >
                <Icon name={wishlistActive ? "ios-heart" : "ios-heart-outline"} size={30} style={wishlistActive ? { color: "#00BFA5" } : { color: "#000" }} />
                <View style={{ flexDirection: "column", justifyContent: "center", marginLeft: 6 }}>
                    <Text style={wishlistActive ? { color: "#00BFA5" } : { color: "#000" }}>
                        Wishlist
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#00BFA5", color: "#fff" }]}

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
        marginBottom: 20
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
    borderBottom: {
        borderBottomColor: "#dddddd7a",
        borderBottomWidth: 1,
        marginTop: 20
    },
    productDetailText: {
        color: "#00BFA5",
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 5
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
    },
    productPrice: {
        fontWeight: "bold",
        color: "#00BFA5"
    },
});
