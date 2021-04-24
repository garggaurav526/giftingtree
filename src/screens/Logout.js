import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../components/Context'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  
  
export default function Logout(props) {
    const { signOut } = React.useContext(AuthContext)
    return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => signOut()} />
        </DrawerContentScrollView>
      );
}

