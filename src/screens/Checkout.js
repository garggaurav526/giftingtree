import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions,Pressable,Alert, Image, Modal, ScrollView } from 'react-native'
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
import { RadioButton } from 'react-native-paper';
import { AuthContext } from "../components/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
    ;
const homeServices = new HomeServices()

function Checkout(props) {
    const [paymentMethod, setPaymentMethod] = React.useState("")
    const [addressModal, setAddressModal] = React.useState(false)
    const { cardProductItem, removeCartProductItem } = React.useContext(AuthContext)

    useEffect(() => {
        // getDataAlert()
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

    return (
        <>
            <Header navigation={props.navigation} />
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View style={styles.selectAddressView}>
                            <View style={styles.btnAddAddress}>
                                <TouchableOpacity onPress={() => setAddressModal(!addressModal)}>
                                    <Text style={{ color: "#fff" }}>
                                        Select Address
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <RadioButton.Group onValueChange={newValue => setPaymentMethod(newValue)} value={paymentMethod}>
                            <TouchableOpacity onPress={() => { setPaymentMethod("cod") }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton value="cod" />
                                <Text>Cash On Delivery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setPaymentMethod("upi") }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton value="upi" />
                                <Text>UPI</Text>
                            </TouchableOpacity>
                        </RadioButton.Group>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={addressModal}
                onRequestClose={() => {
                    setAddressModal(!addressModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default (Checkout)


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
    selectAddressView: {
        width: vw * 99,
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 40,
        paddingBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#00BFA5"
    },
    btnAddAddress: {
        width: vw * 50,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#00BFA5",
        borderColor: "#00BFA5",
        textAlign: "center",
        justifyContent: "center",
        color: "#fff",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
    }
});
