import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../components/CustomButton";
import BottomBar from "../components/BottomBar";
import DrawerMenu from "../components/DrawerMenu";
import MugImage from '../assets/img/mug.jpeg';
import ChocolateImage from '../assets/img/chocolate.jpeg'
import FlowerImage from '../assets/img/flower.jpeg'
import GiftingImage from '../assets/img/gifting.jpeg'
import GiftsImage from '../assets/img/gifts.jpeg'

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function Home({navigation}) {

    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("left");

    const handleClickCategory = (type) =>{
        navigation.navigate("CategoryItemView", {
            navigationData: {
                categoryName: type
            },
        });
    }


    return (
        <>
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View>
                            <Text style={styles.homePageHeader} >
                                Gifting Category
                            </Text>
                            <View style={styles.btnMainBox}>
                                <CustomButton btnStyle={styles.btnCategory} text="Frames" />
                                <CustomButton btnStyle={styles.btnCategory} text="FootWear" />
                                <CustomButton btnStyle={styles.btnCategory} text="Earphone" />
                                <CustomButton btnStyle={styles.btnCategory} text="Watches" />
                                <CustomButton btnStyle={styles.btnCategory} text="Gifting Boxes" />
                                <CustomButton btnStyle={styles.btnCategory} text="Mugs" />
                            </View>
                            <View style={styles.imgBox}>
                                <TouchableOpacity onPress={() => handleClickCategory("Mug")}  >
                                    <Image source={MugImage} style={styles.imgStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleClickCategory("Chocolate")}  >
                                    <Image source={ChocolateImage} style={styles.imgStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleClickCategory("Flower")}  >
                                    <Image source={FlowerImage} style={styles.imgStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleClickCategory("Gifting")}  >
                                    <Image source={GiftingImage} style={styles.imgStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleClickCategory("Gifts")}  >
                                    <Image source={GiftsImage} style={styles.imgStyle} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar active={'Home'} navigation={navigation} />
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    },
    homePageHeader: {
        fontWeight: "600",
        fontSize: RFPercentage(4),
        textAlign: "center",
        marginTop: 20
    },
    btnMainBox: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    btnCategory: {
        color: "#00BFA5",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#00BFA5",
        width: "auto",
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 50,
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 3,
        paddingBottom: 3,
    },
    main: {
        backgroundColor: '#fff',
        height: height,
        width: width,
        position:'relative',
    },
    imgBox: {
        marginTop: 30
    },
    loginMain: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    submain: {
        width: vw * 98,
    },
    imgStyle: {
        width: "100%",
        borderRadius: 3,
        marginTop: 25

    }
});
