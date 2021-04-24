import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default function DrawerMenu() {
    return (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button
                title="Close drawer"
                onPress={() => drawer.current.closeDrawer()}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
