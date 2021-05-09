import React, {  useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../components/CustomButton";
import BottomBar from "../components/BottomBar";
import Header from "../components/Header";
import { HomeServices } from "../components/Services/Home.services";
import Carousel from 'react-native-snap-carousel';
import ImageSliderComponent from "../components/ImageSlider/ImageSliderComponent";

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const homeServices = new HomeServices()

export default function Home({ navigation }) {

    const [categoryList, setCategoryList] = useState([])
    const [categoryListImage, setCategoryListImage] = useState([])

    const handleClickCategory = (id, name) => {
        navigation.navigate("CategoryItemView", {
            navigationData: {
                categoryId: id,
                categoryName: name
            },
        });
    }

    useEffect(() => {
        getCategoryWithSubCategoryList();
    }, [navigation]);

    const getCategoryWithSubCategoryList = async () => {
        await homeServices.getCategoryWithSubCategoryList().then(
            (data) => {
                setCategoryList(data.data.data.data)
                var tempArr=[]
                if(data.data.data.data.length>0){
                    data.data.data.data.map((item) => {
                        tempArr.push(item.image)
                    })
                    setCategoryListImage([...tempArr])
                }
                
            },
            (error) => {
                console.log("error.response.status", error);
            }
        );
    }

    const handleClickSubCategory = (id) => {
        navigation.navigate("ProductListing", {
            navigationData: {
                subCategoryID: id
            },
        });
    }

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => handleClickSubCategory(item.id)}  >
                <View style={styles.slide}>
                    <Image source={{ uri: item.image }} style={styles.imgStyle} />
                    <View style={styles.textSubCategory}>
                        <Text style={styles.titleSub}>{ item.name }</Text>
                        <Text style={styles. descriptionSub} >{item.description}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    return (
        <>
            <Header navigation={navigation} />
            <ScrollView style={styles.main}>
                <View style={styles.loginMain}>
                    <View style={styles.submain}>
                        <View>
                            {/* <Text style={styles.homePageHeader} >
                                Gifting Category
                            </Text>
                            <View style={styles.btnMainBox}>
                                {
                                    categoryList.length > 0 &&
                                    categoryList.map((item) => {
                                        return <>
                                            <CustomButton btnStyle={styles.btnCategory} text={item.name} onClick={() => handleClickCategory(item.id, item.name)} />

                                        </>
                                    })
                                }
                            </View> */}
                            <View>
                                <ImageSliderComponent
                                    isButton={true}
                                    height={vh * 35}
                                    images={categoryListImage}
                                />
                            </View>
                            
                            <View style={styles.imgBox}>
                                {
                                    categoryList.length > 0 &&
                                    categoryList.map((item) => {
                                        return <>
                                            {/* <TouchableOpacity onPress={() => handleClickCategory(item.id, item.name)}  >
                                                <Image source={{ uri: item.image }} style={styles.imgStyle} />
                                            </TouchableOpacity> */}
                                            <View style={{marginBottom: 20, backgroundColor: "#ebebeb52", paddingBottom: 20, paddingTop: 20}}>
                                                <View style={styles.categoryStyle}>
                                                    <Text style={styles.categoryNameTitle}>{item.name}</Text>
                                                    
                                                    <View style={{flexDirection: "column", justifyContent:"center"}}>
                                                        <CustomButton marginTop = {"none"} btnStyle={styles.btnSeeAll} text={
                                                            item.sub_categories.length>0 ? "View All" : "View"
                                                        } onClick={() => handleClickCategory(item.id, item.name)} />
                                                    </View>
                                                    
                                                </View>
                                                <View>
                                                    {
                                                        item.sub_categories.length>0 ?
                                                        <Carousel
                                                            // ref={(c) => { this._carousel = c; }}
                                                            loop={true}
                                                            loopClonesPerSide={10}
                                                            data={item.sub_categories}
                                                            renderItem={_renderItem}
                                                            sliderWidth={width}
                                                            layout={'default'}
                                                            itemWidth={vw*60}
                                                            
                                                        />
                                                        :
                                                        <View style={{
                                                            paddingHorizontal: 10
                                                        }}>

                                                        <TouchableOpacity onPress={() => handleClickCategory(item.id, item.name)}  >
                                                            <Image source={{ uri: item.image }} style={[styles.imgStyle, {borderRadius: 7, borderBottomLeftRadius: 7, borderBottomRightRadius: 7}]} />
                                                        </TouchableOpacity> 
                                                        </View>
                                                    }
                                                    
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
    btnSeeAll:{
        width: vw*25,  
        color: "#00BFA5",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#00BFA5",
        padding: 8,
        borderRadius: 5,
        margin: 0
    },
    main: {
        backgroundColor: '#fff',
        height: height,
        width: width,
        position: 'relative',
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
        marginTop: 25,
        height: 200,
        borderColor: "#ddd",
        borderWidth: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    titleSub:{
        textAlign: "center",
        color: "#fff",
        fontSize: RFPercentage(3)
    },
    descriptionSub: {
        textAlign: "center",
        color: "#fff"
    },
    textSubCategory:{
        backgroundColor: "#00BFA5",
        color: "#fff",
        padding: 10,
        borderRadius: 3,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    slide:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 15,
    },
    categoryNameTitle: {
        fontSize: RFPercentage(3),
        borderBottomWidth: 2,
        borderBottomColor: "#00BFA5"
    },
    categoryStyle:{
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
    }
});
