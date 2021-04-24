import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomLabel from '../components/CustomLabel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CustomButton from '../components/CustomButton';
import { authServices } from "../components/Services/Auth";
import Loader from '../components/Sys/Loader'

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function Login({ navigation }) {
    const [emailOrPhone, setEmailOrPhone] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorEmail, setErrorEmail] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")
    const [isLoader, setIasLoader] = React.useState(false);


    const login = () => {
        if (!emailOrPhone) {
            setErrorEmail("Please enter email")
        }
        if (!password) {
            setErrorPassword("Please enter password")
        }

        if (emailOrPhone && password) {
            // if (password.length > 6) {
                // setIasLoader(true);

                authServices.userLogin(emailOrPhone, password)
                    .then(async (data) => {
                        alert("asdsadas");
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
            // }else{
            //     setErrorPassword("Please enter atleast 6 digit")
            // }
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
                        <CustomLabel text="Welcome" />
                        <Text style={styles.signTxt}>Sign in to continue!</Text>
                        <CustomInput placeholder="Email or phone" type="default" value={emailOrPhone} onChange={setEmailOrPhone} error={errorEmail} onKeyPress={setErrorEmail} />
                        <CustomInput placeholder="Password" type="default" value={password} onChange={setPassword} error={errorPassword} onKeyPress={setErrorPassword} />
                        <CustomButton text="Login" enabled={true} btnAction={login} />

                    </View>
                    <View style={{ flexDirection: 'row', position: 'absolute', bottom: 50, width: '100%', justifyContent: 'center' }}>
                        <Text>I'm a new user </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} ><Text style={{ color: 'red' }}> Sign up</Text></TouchableOpacity>
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
        position: 'relative'
    },
    signTxt: {
        color: "#aaa"
    },
    main: {
        backgroundColor: '#fff',
        height: height,
        width: width,
    },
})
