import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Circle, Svg } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../components/CustomInput';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BottomBar from '../components/BottomBar';
import { HomeServices } from "../components/Services/Home.services";
import CustomButton from '../components/CustomButton';
import Lightbox from 'react-native-lightbox';
import { RNS3 } from 'react-native-s3-upload';
import Loader from "../components/Sys/Loader";
import { launchCamera, launchImageLibrary, ImagePicker } from 'react-native-image-picker';
const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
const homeServices = new HomeServices()

export default function EditProfile(props) {
    const [userData, setUserData] = React.useState("");
    const [isLoader, setIsLoader] = React.useState(false);
    const [profileImg, setProfileImage] = React.useState("");
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [nameError, setNameError] = React.useState("")
    const [emailError, setEmailError] = React.useState("")
    const [phoneError, setPhoneError] = React.useState("")

    React.useEffect(() => {
        setIsLoader(true);
        getUserData();
    }, []);

    const navigateScreen = (screen) => {
        props.navigation.navigate(screen, {
            navigationData: {
                data: "",
            },
        });
    }

    const getUserData = async () => {
        await homeServices.getUserData().then(
            (data) => {
                setUserData(data.data.data)
                setName(data.data.data.name)
                setEmail(data.data.data.email)
                setPhone(data.data.data.phone)
                setProfileImage(data.data.data.image)
                setIsLoader(false);
            },
            (error) => {
                setIsLoader(false);
                console.log("error.response.status", error);
            }
        );
    }

    const handleSave = async () => {
        setIsLoader(true);
        var payload = {
            image: profileImg,
            name: name,
            email: email,
            phone: phone
        }
        await homeServices.setUserData(payload).then(
            (data) => {
                console.log("updateddd", data)
                setIsLoader(false);
            },
            (error) => {
                setIsLoader(false);
                console.log("error.response.status", error);
            }
        );
    }

    const alertConfirmation = () => {
        Alert.alert(
            "Choose Image",
            "Select Option:",
            [
                {
                    text: "Camera",
                    onPress: () => handleCamera()
                },
                {
                    text: "Gallery",
                    onPress: () => handleLibrary(),
                }
            ]
        );
    }

    const handleCamera = () => {
        var options = {
            mediaType: 'photo'
        }
        launchCamera(options, function (response) {
            var file = {
                uri: response.uri,
                name: response.fileName,
                type: "image/png"
            }
            uploadImageToS3(file)
        });
    }
    const handleLibrary = () => {
        var options = {
            mediaType: 'photo'
        }
        launchImageLibrary(options, function (response) {
            console.log("sdf", response);
            var file = {
                uri: response.uri,
                name: response.fileName,
                type: "image/png"
            }
            uploadImageToS3(file)
        })
    }

    const uploadImageToS3 = (file) => {
        setIsLoader(true)
        const options = {
            keyPrefix: "img/",
            bucket: "gifting-tree",
            region: "ap-south-1",
            accessKey: "AKIAXIHDO3JANDGTMCHB",
            secretKey: "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",
            successActionStatus: 201
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201){
                setIsLoader(false)
                throw new Error("Failed to upload image to S3");
            }
            console.log("upload response",response.status)
            setProfileImage(response.body.postResponse.location)
            getUserData();
        });

    }

    return (<>
        {isLoader ?
            <Loader />
            :
            <>
                <ScrollView style={styles.scrollViewMain}>
                    <View style={styles.main}>
                        <Svg height={height - 573} width={width}>
                            <Circle
                                cx={width / 2}
                                cy={`-${950 - height}`}
                                r={height / 2}
                                fill="#00BFA5"
                                stroke="#00BFA5"
                                strokeWidth="2"
                            />
                        </Svg>
                        <View style={styles.iconBox}>
                            <TouchableOpacity onPress={alertConfirmation}>
                                {userData.image && userData.image != "" ?
                                    <View style={styles.icon}>
                                        <Image source={{ uri: userData.image }} style={styles.icon} />
                                    </View>
                                    : <View style={styles.icon}>
                                        <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                                            <Icon name="user-circle-o" size={100} color="#00BFA5" />
                                        </View>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileInput}>
                        <CustomInput type="default" placeholder="Name" value={name} onChange={setName} onKeyPress={setNameError} error={nameError} style={styles.input} iconName={"ios-person"} />
                        <CustomInput type="default" placeholder="Email" value={email} onChange={setEmail} onKeyPress={setEmailError} error={emailError} iconName={"ios-mail"} />
                        <CustomInput type="numeric" placeholder="Phone" value={phone} onChange={setPhone} onKeyPress={setPhoneError} error={phoneError} iconName={"ios-call"} />
                        <CustomButton text={"Save"} enabled={true} btnAction={() => handleSave()} />
                    </View>
                </ScrollView>
                <BottomBar active={'profile'} navigation={props.navigation} />
            </>
        }
    </>
    )
}

const styles = StyleSheet.create({
    main: {
        position: 'relative',
    },
    scrollViewMain: {
        backgroundColor: '#fff',
        height: height,
        width: width,
    },
    iconBox: {
        position: 'absolute',
        width: width,
        bottom: -40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        backgroundColor: '#fff',
        borderRadius: 107 / 2,
        width: 107,
        height: 107,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    profileInput: {
        marginTop: 60,
        marginHorizontal: 15
    },
    name: {
        textAlign: 'center',
        fontSize: RFPercentage(3),
        fontWeight: 'bold'
    },
    email: {
        textAlign: 'center',
        marginTop: 7,
        color: '#aaa'
    }
})
