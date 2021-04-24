import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React, { Component, useEffect } from 'react'
import { View, Text, StatusBar, Dimensions, Image, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import HeaderOption from './src/components/HeaderOption';
import CategoryItemView from './src/screens/CategoryItemView';
import ProductListing from './src/screens/ProductListing';
import ProductDetail from './src/screens/ProductDetail';
// import ProductView from './src/component/screen/ProductView'
// import Cart from './src/component/screen/Cart'
// import Notifications from './src/component/screen/Notifications'
// import Profile from './src/component/screen/Profile'
// import Orders from './src/component/screen/Orders'
// import ForgetPassword from './src/component/screen/ForgetPassword'
// import Location from './src/component/screen/Location'
// import Category from './src/component/screen/Category'
// import Address from './src/component/screen/Address'


const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

// const Main = () => {
//   return (
//     <NavigationContainer>
//       <Index />
//     </NavigationContainer>
//   );
// };
const headerOption = () => {
  //   const logOut = async () => {
  //     Alert.alert(
  //         "Logout",
  //         "Are you sure want to logout ?",
  //         [
  //             {
  //                 text: "No",
  //                 onPress: () => console.log("Cancel Pressed"),
  //                 style: "cancel"
  //             },
  //             { text: "Yes", onPress: () => confirmLogout() }
  //         ],
  //         { cancelable: false }
  //     );
  // }

  const logOut = async () => {
      try {
          await AsyncStorage.removeItem('giftingTreeSSoToken')
          navigation.navigate("Login")
      } catch (e) {
          // remove error
      }
  }
  return <View>
          <TouchableOpacity onPress={() => logOut()}>
            <Text style={{ color: "#000" }}>Logout</Text>
          </TouchableOpacity>
        </View>
}

const AppStack = createStackNavigator(
  {
    Home: Home,
    CategoryItemView: CategoryItemView,
    ProductListing: ProductListing,
    ProductDetail: ProductDetail,
    // Profile: Profile,
    // Orders: Orders,
    // Location: Location,
    // Category: Category,
    // Address:Address,
  },
  {
    defaultNavigationOptions: {
      title: headerOption(),
      headerShown: true
    }
  }
);
const AuthStack = createStackNavigator(
  { 
    Login: Login, 
    SignUp: SignUp, 
    // ForgetPassword: ForgetPassword
  },
  {
    defaultNavigationOptions: {
      title: '',
      headerShown: false
    }
  }
);

const navigator = createSwitchNavigator(
  {
    AuthLoading: App,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


function App({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      getToken();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('giftingTreeSSoToken')
      if (value !== null) {
        navigation.navigate("Home")
      } else {
        navigation.navigate("Login")
      }
    } catch (e) {
      navigation.navigate("Login")
    }
  }

  return (
    <View>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={{ height: height, width: width, position: 'relative' }}>
        <Image
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
          source={require('./src/assets/img/GiftingTreeLogo.png')}
        />
      </View>
    </View>
  );
}

export default createAppContainer(navigator);
