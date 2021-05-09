import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Circle, Svg } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomInput from '../components/CustomInput';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import BottomBar from '../components/BottomBar';
import { HomeServices } from "../components/Services/Home.services";
import CustomButton from '../components/CustomButton';
import Lightbox from 'react-native-lightbox';
import Loader from "../components/Sys/Loader"
const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
const homeServices = new HomeServices()

export default function UserProfile(props) {
    const [userData, setUserData] = React.useState("");
    const [isLoader, setIsLoader] = React.useState(false);

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
                setIsLoader(false);
            },
            (error) => {
                setIsLoader(false);
                console.log("error.response.status", error);
            }
        );
    }

    const customLightBox = (e) => {
        return <Image source={{ uri: userData.image }} style={{ width: width, height: '100%' }} />
    }

    return (<>
        {isLoader ?
            <Loader />
            : <>
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
                            <TouchableOpacity>
                                {userData.image && userData.image != "" ?
                                    <View style={styles.icon}>
                                        <Lightbox underlayColor="#00BFA5" backgroundColor="#00BFA5" renderContent={customLightBox} navigator={props.navigator}>
                                            <Image source={{ uri: userData.image }} style={styles.icon} />
                                        </Lightbox>
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
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.email}>{userData.email}</Text>
                        <Text style={styles.email}>{userData.phone}</Text>
                        <CustomButton text={"Edit Profile"} enabled={true} btnAction={() => navigateScreen("EditProfile")} />
                        <CustomButton text={"Add Address"} enabled={true} btnAction={() => navigateScreen("Address")} />
                        <CustomButton text={"My Orders"} enabled={true} btnAction={() => navigateScreen("Orders")} />
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
