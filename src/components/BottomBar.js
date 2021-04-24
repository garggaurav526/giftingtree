import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/dist/Ionicons';
const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
export default function BottomBar(props) {
    

    const navigateSceen = (screen) => {
        props.navigation.navigate(screen, {
            navigationData: {
            },
        });
    }

    return (
        <View style={styles.bottomNav}>
            <View style={{ width: vw * 75 }}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={()=>navigateSceen('Home')} style={styles.iconBox}>
                        <Icon name={props.active  ==="Home" ? "ios-home" :"ios-home-outline" } size={30} style={{textAlign:'center'}} color={props.active=="Home"?'#00BFA5':'#000'} />
                        <Text style={{textAlign: "center",color:props.active=="Home"?'#00BFA5':'#000'}}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigateSceen('CategoryItemView')} style={styles.iconBox}>
                        <Icon name={props.active  ==="Category" ? "ios-grid" :"ios-grid-outline" } size={30} style={{textAlign:'center'}} color={props.active=="Category"?'#00BFA5':'#000'} />
                        <Text style={{textAlign: "center",color:props.active=="Category"?'#00BFA5':'#000'}}>Category</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigateSceen('Home')} style={styles.iconBox}>
                        <Icon name={props.active  ==="Wishlist" ? "ios-heart" :"ios-heart-outline" } size={30} style={{textAlign:'center'}} color={props.active=="Wishlist"?'#00BFA5':'#000'} />
                        <Text style={{textAlign: "center",color:props.active=="Wishlist"?'#00BFA5':'#000'}}>Wishlist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>navigateSceen('Home')} style={styles.iconBox}>
                        <Icon name={props.active  ==="Cart" ? "ios-cart" :"ios-cart-outline" } size={30} style={{textAlign:'center'}} color={props.active=="Cart"?'#00BFA5':'#000'} />
                        <Text style={{textAlign: "center",color:props.active=="Cart"?'#00BFA5':'#000'}}>Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNav: {
        height: 60,
        width: width,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    iconBox: {
        textAlign:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})
