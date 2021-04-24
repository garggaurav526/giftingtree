import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import backgorundHeading from '../assets/img/heading-background.png'

export default function BackgroundHeading(props) {
    return (
        <View>
            <ImageBackground source={backgorundHeading} style={styles.img} >
            <Text style={styles.heading}>{props.text}</Text>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width: "100%",
        height: 60,
        flex: 1,
        resizeMode: "cover",
        flexDirection:'column',
        justifyContent: "center",
        marginBottom:10
        // backgroundColor:'#FFFFE0'
    },
    heading:{
        color: "#fff",
        fontSize: RFPercentage(4),
        fontWeight: "bold",
        textAlign: "center",
    }
})
