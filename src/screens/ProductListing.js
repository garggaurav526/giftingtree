import React, { useRef, useState, useEffect } from "react";
import {  StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import photoFrame1 from '../assets/img/frame1.jpg'
import photoFrame2 from '../assets/img/frame2.jpg'
import photoFrame3 from '../assets/img/frame3.jpg'
import photoFrame4 from '../assets/img/frame4.jpg'
import IconWishlist from 'react-native-vector-icons/dist/Ionicons';
import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";
import { HomeServices } from "../components/Services/Home.services";
import BackgroundHeading from '../components/BackgroundHeading';
import Header from "../components/Header";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100
;
const homeServices = new HomeServices()

function ProductListing(props) {
	const [productList, setProductList] = useState([]);
    const [shortByFilter, setShortByFilter]= React.useState("")
    const[activePage, setActivePage] = React.useState(1)

    var getDataAlert = async () => {
        try {
            const value = await props.route.params.navigationData
            console.log(value)
            if (value.subCategoryID !== null) {
                getProductList(value.subCategoryID, activePage)
                // getCategoryItemList(value.categoryName)
            }
        } catch (e) {
            // error reading value
            console.log("sfgf", e)
        }
    }

    useEffect(() => {
        getDataAlert()
    }, [props.navigation]);

    const getProductList = async (id, activePage) => {
        await homeServices.getProductList(id, activePage).then(
            (data) => {
                setProductList(data.data.data.data);
                
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

    return (
        <>
            <Header navigation={props.navigation}/>
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View>
                            <View style={styles.row}>
                                
                                {
                                    productList.length>0 &&
                                    productList.map((item,i) =>{
                                        return <>
                                        <View style={styles.col}>
                                            <TouchableOpacity  onPress={()=> handleClickOnProduct(item.id)}>
                                                <View style={styles.imgView}>
                                                    <Image source={{ uri: JSON.parse(item.image)[0] }} style={styles.subCategoryImg}/>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.productListDetail}>
                                            <Text style={styles.subCategorystyle}>{item.name}</Text>
                                            <Text style={styles.productDesc}>{item.description.substr(0, 20)}...</Text>
                                            <View style={styles.row}>
                                                <Text style={styles.productPrice}>₹{item.price}</Text>
                                                <IconWishlist name={item.wishlist ? "ios-heart" : "ios-heart-outline" } size={25} style={{textAlign:'center'}} color={item.wishlist ? "#00BFA5" : '#535766'} />

                                            </View>
                                            </View>

                                        </View>
                                        </>
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[styles.row, {paddingTop: 10, backgroundColor: "#fff"}]}>
                            <View style={styles.colum}>
                                    <DropDownPicker
                                        items={[
                                            {label: 'SORT', value: 'sort', icon: () => <Icon name="sort" size={18} color="#000" />, hidden: true},
                                            {label: 'Whats new', value: 'new'},
                                            {label: 'Price- low to high', value: 'lowToHigh'},
                                            {label: 'Price- high to low', value: 'highToLow'},
                                        ]}
                                        defaultValue={"sort"}
                                        containerStyle={{height: 40}}
                                        style={{backgroundColor: '#fff'}}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{backgroundColor: '#fff'}}
                                        onChangeItem={item => setShortByFilter(item.value)}
                                    />
                                </View>
                                <View style={styles.colum}>
                                    <DropDownPicker
                                        items={[
                                            {label: 'FILTER', value: 'filter', icon: () => <Icon name="filter-outline" size={18} color="#000" />, hidden: true},
                                            {label: 'Whats new', value: 'new'},
                                            {label: 'Price- low to high', value: 'lowToHigh'},
                                            {label: 'Price- high to low', value: 'highToLow'},
                                        ]}
                                        defaultValue={"filter"}
                                        containerStyle={{height: 40}}
                                        style={{backgroundColor: '#fff'}}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{backgroundColor: '#fff'}}
                                        onChangeItem={item => setShortByFilter(item.value)}
                                    />
                                </View>
                            </View>
        </>
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
        justifyContent: 'center',
    },
    submain: {
        width: vw * 98,
    },

    row:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'space-between',
        backgroundColor: "#fff"
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
    colum:{
        width: vw * 48,
        marginBottom: 10,
        marginTop: 10,
    },
    imgView:{
        shadowColor: '#333333b5',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 7,
        elevation: 3,
        height: 250
    },
    subCategoryImg:{
        width: '100%',
        height: '100%',
        borderRadius: 7,
        resizeMode: "cover",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    subCategorystyle: {
        fontWeight: "bold",
        color: "#282c3f",
    },
    productPrice:{
        fontWeight: "bold",
        color: "#00BFA5"
    },
    productDesc:{
        color: "#53576694",
        marginTop: 2,
        marginBottom: 2
    },
    productListDetail:{
        paddingLeft: 7,
        paddingRight: 7,
        marginTop: 10
    }
});
