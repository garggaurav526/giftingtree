import React, { useRef, useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MugImage from '../assets/img/mug.jpeg';
import ChocolateImage from '../assets/img/chocolate.jpeg'
import FlowerImage from '../assets/img/flower.jpeg'
import GiftingImage from '../assets/img/gifting.jpeg'
import GiftsImage from '../assets/img/gifts.jpeg'
import photoFrame1 from '../assets/img/frame1.jpg'
import photoFrame2 from '../assets/img/frame2.jpg'
import photoFrame3 from '../assets/img/frame3.jpg'
import photoFrame4 from '../assets/img/frame4.jpg'

import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
// import { HomeServices } from "../components/Services/Home.services";
import BackgroundHeading from '../components/BackgroundHeading';
import BottomBar from "../components/BottomBar";
import Header from "../components/Header";

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
    ;
// const homeServices = new HomeServices()

function CategoryItemView(props) {
    const [categoryName, setCategoryName] = React.useState("")

    useEffect(() => {
        getDataAlert()
    }, []);

    var getDataAlert = async () => {
        try {
            const value = await props.navigation.getParam("navigationData");
            console.log(value)
            if (value.categoryName !== null) {
                setCategoryName(value.categoryName)
                // getCategoryItemList(value.categoryName)
            }
        } catch (e) {
            // error reading value
            console.log("sfgf", e)
        }
    }

    const images = [
        MugImage,
        ChocolateImage,
        FlowerImage,
        GiftingImage,
        GiftsImage
    ]
    const subCategoryImage = [
        {
            image: photoFrame1,
            subCatgoryName: "Name Frame",
            id: "1"
        },
        {
            image: photoFrame2,
            subCatgoryName: "Birthday Frame",
            id: "2"
        },
        {
            image: photoFrame3,
            subCatgoryName: "Couple Frame",
            id: "3"
        },
        {
            image: photoFrame4,
            subCatgoryName: "Single Frame",
            id: "4"
        }
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

    return (
        <>
        <Header navigation={props.navigation}/>
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View>
                            <BackgroundHeading text={categoryName} />
                            <ImageSliderComponent
                                isButton={true}
                                height={vh * 35}
                                images={images}
                            />
                            <View style={styles.row}>
                                {
                                    subCategoryImage.length > 0 &&
                                    subCategoryImage.map((item, i) => {
                                        return <>
                                            <View style={styles.col}>
                                                <Text style={styles.subCategorystyle}>{item.subCatgoryName}</Text>
                                                <TouchableOpacity onPress={() => handleClickOnSubCategory(item.id)}>
                                                    <Image source={item.image} style={styles.subCategoryImg} />
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
            <BottomBar active={'Category'} navigation={props.navigation} />
        </>
    )
}
export default (CategoryItemView)


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
    categoryNameHeader: {
        fontWeight: "600",
        fontSize: RFPercentage(4),
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between'
    },
    col: {
        width: vw * 46,
        marginBottom: 10,
        marginTop: 10
    },
    subCategoryImg: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 20,
        width: '100%',
        height: 300,
        resizeMode: "stretch",
        alignSelf: 'center',
    },
    subCategorystyle: {
        fontWeight: "bold",
        fontSize: RFPercentage(2),
        marginBottom: 10
    }
});
