import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function CustomLabel(props) {
    return (
        <View>
            <Text style={styles.label}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontSize: RFPercentage(5),
    }
})
