import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image } from 'react-native'
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerMenu from './DrawerMenu';
const { width, height } = Dimensions.get('window');

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function Header(props) {
    const isDrawerOpen = useIsDrawerOpen();
    const openDrawer = () => {
        props.navigation.openDrawer();
    }

    return (
        <View style={{ width: '100%', backgroundColor: '#fff', height: 60, flexDirection: 'column', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ marginLeft: 20, flexDirection: 'column', justifyContent: 'center' }} onPress={openDrawer}>
                    <Icon name={isDrawerOpen ? 'menu' : 'menu-outline'} style={{ width: '100%', textAlign: 'center', fontSize: RFPercentage(5.5), marginRight: 5, marginTop: -3, color: isDrawerOpen ? '#00BFA5' : '#000' }} />
                </TouchableOpacity>
                <View style={{width:'30%',flexDirection:'row',justifyContent:'center'}}>
                    <Image
                        source={require('../assets/img/GiftingTreeLogo.png')}
                        style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    />
                    <View style={{justifyContent: "center", flexDirection: "column", marginLeft: 5}}>
                        <Text style={{fontWeight: "bold", fontSize: RFPercentage(2.7)}}>Gifting Tree</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ marginRight: 20 ,flexDirection: 'column', justifyContent: 'center'}} onPress={() => props.navigation.navigate("Search")}>
                    <Icon name={props.activeScreen == "Search" ? 'search' : 'search-outline'} style={{ width: '100%', textAlign: 'center', fontSize: RFPercentage(5), marginRight: 5, color: props.activeScreen == "Order" ? '#00BFA5' : '#000' }} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ marginRight: 20,flexDirection: 'column', justifyContent: 'center' }} onPress={() => props.navigation.navigate("Profile")}>
                    <Icon name={props.activeScreen == "Profile" ? 'person' : 'person-outline'} style={{ width: '100%', textAlign: 'center', fontSize: RFPercentage(5), marginRight: 5, color: props.activeScreen == "Order" ? '#00BFA5' : '#000' }} />
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerMenu: {
        width: vw * 80,
        minHeight: 200,
        position: 'absolute',
        top: 30,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'red'
    }
})
