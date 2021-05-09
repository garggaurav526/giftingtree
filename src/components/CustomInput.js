import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function CustomInput(props) {
    return (
        <View style={{position:'relative'}}>
            <TextInput keyboardType={props.type} style={[props.style, styles.inputText,{paddingLeft:props.iconName && props.iconName != "" ? 45 : 10}]} placeholder={props.placeholder} value={props.value} secureTextEntry={props.secureTextEntry} onChangeText={(text) => props.onChange(text)} onKeyPress={() => props.onKeyPress("")}  />
            {props.iconName && props.iconName != "" &&
            <Icon name={props.iconName} color="#00BFA5" size={24} style={styles.icon} />
            }
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
    },
    icon:{
        position:'absolute',
        top:32,
        left:10,
    }
})
