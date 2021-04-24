import React, { useRef, useState, useEffect } from "react";
import {  StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import photoFrame1 from '../assets/img/frame1.jpg'
import photoFrame2 from '../assets/img/frame2.jpg'
import photoFrame3 from '../assets/img/frame3.jpg'
import photoFrame4 from '../assets/img/frame4.jpg'

import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
// import { HomeServices } from "../components/Services/Home.services";
import BackgroundHeading from '../components/BackgroundHeading';

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
;
// const homeServices = new HomeServices()

function ProductListing(props) {
    const [categoryName, setCategoryName]= React.useState("")

    useEffect(() => {
        getDataAlert()
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

    const subCategoryImage=[
        {
            image: photoFrame1,
            subCatgoryName: "Name Frame",
            shortDescription: "This is awesome image",
            id: "1"
        },
        {
            image: photoFrame2,
            subCatgoryName: "Birthday Frame",
            shortDescription: "This is awesome image",
            id: "2"
        },
        {
            image: photoFrame3,
            subCatgoryName: "Couple Frame",
            shortDescription: "This is awesome image",
            id: "3"
        },
        {
            image: photoFrame4,
            subCatgoryName: "Single Frame",
            shortDescription: "This is awesome image",
            id: "4"
        },
    ]

    const handleClickOnProduct = (id) => {
        props.navigation.navigate("ProductDetail", {
            navigationData: {
                productId: id
            },
        });
    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.loginMain}>
                <View style={styles.submain}>
                    <View>
                        <View style={styles.row}>
                            {
                                subCategoryImage.length>0 &&
                                subCategoryImage.map((item,i) =>{
                                    return <>
                                    <View style={styles.col}>
                                        <TouchableOpacity  onPress={()=> handleClickOnProduct(item.id)}>
                                            <View style={styles.imgView}>
                                                <Image source={item.image} style={styles.subCategoryImg}/>
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={styles.subCategorystyle}>{item.subCatgoryName}</Text>
                                        <Text style={styles.subCategorystyleDescription}>{item.shortDescription}</Text>

                                    </View>
                                    </>
                                })
                            }
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
export default (ProductListing)


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
        width: vw * 46,
        marginBottom: 10,
        marginTop: 10
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
        color: "#7b838b",
        marginBottom: 20,

    }
});
