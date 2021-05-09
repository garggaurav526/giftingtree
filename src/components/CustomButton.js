import React from 'react'
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CustomButton(props) {
    return (
        <View>
            <TouchableOpacity onPress={() => props.enabled ? props.btnAction() : null}  >
                <Text style={[styles.btn,props.btnStyle,{marginTop: props.marginTop == "none" ? 0: 20}]}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: "#00BFA5",
        padding: 15,
        color: "#fff",
        borderRadius: 10,
        textAlign: "center"
    }
})
