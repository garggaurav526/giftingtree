import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomLabel from '../components/CustomLabel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from '../components/CustomButton';
import Loader from '../components/Sys/Loader'
import { authServices } from "../components/Services/Auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function SignUp({navigation}) {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [passwordConfirm, setPasswordConfirm] = React.useState("")
    const [nameError, setNameError] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [phoneError, setPhoneError] = React.useState("")
    const [passwordError, setPasswordError] = React.useState("")
    const [passwordConfirmError, setPasswordConfirmError] = React.useState("")
    const [isLoader, setIasLoader] = React.useState(false);

    const SignUp =() =>{
        console.log("hello this is nikita")
        if(!name){
            setNameError("Please enter name")
        }
         if(!email){
            setEmailError("Please enter email")
        }
         if(!password){
            setPasswordError("Please enter password")
        }
         if(!phone){
            setPhoneError("Please enter phone")
        }
        //  if(password === passwordConfirm){
        //     setPasswordConfirmError("Password is not match")
        // }

        if(name && email && phone && password && passwordConfirm) {
            
            // if(password.length < 6){
            //     setErrorPassword("Please enter atleast 6 digit")
                var user ={
                    name: name,
                    password: password,
                    email: email,
                    phone: phone,
                }
            // setIasLoader(true);
            authServices.userSignUp(name, phone, email, password)
                .then(async (data) => {

                    if (data.success) {
                        setIasLoader(false);
                        console.log("dataapi_token", data)
                        if (data && data.api_token ) {
                            try {
                                await AsyncStorage.setItem("giftingTreeSSoToken", data.api_token);
                                navigation.navigate('Home')
                            } catch (e) {
                                // setErrorMesg("Something went wrong !!! ")
                                // saving error
                            }
                        }
                    } else {
                        setIasLoader(false);
                        // setErrorMesg("Email or Password is wrong !!!")
                    }
                })
                .catch(function (error) {
                    setIasLoader(false);
                    console.log(error);
                });
        }
    }
    return (
        <ScrollView style={styles.main}>

        {isLoader &&
            <Loader />
        }
        <View style={styles.loginMain}>
            <View style={styles.submain}>
                <View>
                    <CustomLabel text="Create Account" />
                    <Text style={styles.signTxt}>Sign up to get started!</Text>
                    <CustomInput type="default" placeholder="Name" value={name} onChange={setName}  onKeyPress={setNameError} error={nameError} />
                    <CustomInput type="default" placeholder="Email" value={email} onChange={setEmail} onKeyPress={setEmailError} error={emailError} />
                    <CustomInput type="numeric" placeholder="Phone" value={phone} onChange={setPhone} onKeyPress={setPhoneError} error={phoneError} />
                    <CustomInput type="default" placeholder="Password" value={password} onChange={setPassword} secureTextEntry={true} onKeyPress={setPasswordError} error={passwordError} />
                    <CustomInput type="default" placeholder="Confirm Password" value={passwordConfirm} onChange={setPasswordConfirm} secureTextEntry={true} onKeyPress={setPasswordConfirmError} error={passwordConfirmError} />
                    <CustomButton text="SignUp" enabled={true} btnAction={SignUp} />

                </View>
                <View style={{flexDirection:'row',position:'absolute',bottom:50,width:'100%',justifyContent:'center'}}>
                    <Text>I'm already registered </Text>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')} ><Text style={{color:'red'}}> Sign in</Text></TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loginMain: {
        width: width,
        height: height,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    submain: {
        width: vw * 90,
        height: height,
        flexDirection: 'column',
        justifyContent: 'center',
        position:'relative'
    },
    signTxt:{
        color: "#aaa"
    },
    main: {
        backgroundColor: '#fff',
        height: height,
        width: width,
    },
})
