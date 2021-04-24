import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function CustomInput(props) {
    return (
        <View>
            <TextInput keyboardType={props.type} style={styles.inputText} placeholder={props.placeholder} value={props.value} secureTextEntry={props.secureTextEntry} onChangeText={(text) => props.onChange(text)} onKeyPress={() => props.onKeyPress("")}  />
            
            {props.error ?
                <Text style={styles.errorMeg}>{props.error}</Text>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputText:{
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 8,
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15
        
    },
    errorMeg:{
        color: "#d14"
    }
})
