import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import React, { Component, useEffect, useState } from 'react'
import { View, Text, StatusBar, Dimensions, Image, Button, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from "./src/components/Context";
import Header from './src/components/Header'


import Login from './src/screens/Login'
import SignUp from './src/screens/SignUp'
import Home from './src/screens/Home'
import HeaderOption from './src/components/HeaderOption';
import CategoryItemView from './src/screens/CategoryItemView';
import ProductListing from './src/screens/ProductListing';
import ProductDetail from './src/screens/ProductDetail';
import Logout from './src/screens/Logout';
import WishList from './src/screens/WishList';
import UserProfile from './src/screens/UserProfile';
import EditProfile from './src/screens/EditProfile';


const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const Auth = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeDrawer = createDrawerNavigator();

class LogoTitle extends React.Component {
  render() {
    return (<View style={{ width: '100%' }}>
      <Image
        source={require('./src/assets/img/GiftingTreeLogo.png')}
        style={{ height: 50, width: '100%', resizeMode: 'contain' }}
      /></View>
    );
  }
}


const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home" component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="CategoryItemView" component={CategoryItemView}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="WishList" component={WishList}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="UserProfile" component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ProductListing" component={ProductListing}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ProductDetail" component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EditProfile" component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  )
}

const HomeDrawerScreen = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen
        name="ProductDetail" component={ProductDetail}
        options={
          {
            drawerLabel: "Product Detail",
            drawerIcon: ({ tintColor }) => <Icon name={'heart'} size={30} color={tintColor} />
          }
        }
      />
    </HomeDrawer.Navigator>
  )
}

export default (props) => {
  const [isLoading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    try {
      const value =  AsyncStorage.getItem('giftingTreeSSoToken')
      if (value !== null) {
        setUserToken('asdf');
      } 
    } catch (e) {
      setUserToken(null);
    }
  }, [])

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setLoading(false);
        setUserToken('asdf');
      },
      signUp: () => {
        setLoading(false);
        setUserToken('asdf');
      },
      signOut: () => {
        setLoading(false);
        setUserToken(null);
      }
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <View>
      <StatusBar translucent backgroundColor='transparent' />
      <View style={{ height: height, width: width, position: 'relative' }}>
        <Image
          style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
          source={require('./src/assets/img/GiftingTreeLogo.png')}
        />
      </View>
    </View>;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {!userToken ? (
          <Auth.Navigator>
            <Auth.Screen name="Login" component={Login}
              options={{
                headerShown: false,
                headerTitle: props => <LogoTitle {...props} />,
                headerStyle: {
                  backgroundColor: '#6C0AC7',
                },
              }}
            />
            <Auth.Screen name="SignUp" component={SignUp}
              options={{
                headerShown: false,
                headerTitle: props => <LogoTitle {...props} />,
                headerStyle: {
                  backgroundColor: '#6C0AC7',
                },
              }}
            />
          </Auth.Navigator>
        ) : (
          <Drawer.Navigator drawerContent={props => <Logout {...props} />}>
            <Drawer.Screen name="Shop" component={HomeStackScreen}
              options={
                {
                  drawerLabel: "Shop",
                  drawerIcon: ({ tintColor }) => <Icon name={'home'} size={30} color={tintColor} />
                }
              }
            />
          </Drawer.Navigator>
          // <Auth.Navigator>
          //   <Auth.Screen name="Home" component={HomeStackScreen}
          //     options={{
          //       headerTitle: props => <Header value={props} />,
          //       headerShown: false,
          //       headerStyle: {
          //         backgroundColor: '#6C0AC7',
          //       },
          //     }}
          //   />
          // </Auth.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}