import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity, Dimensions } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import DrawerMenu from "../components/DrawerMenu";
const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;
export default function Home() {
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState("left");
    const changeDrawerPosition = () => {
        if (drawerPosition === "left") {
            setDrawerPosition("right");
        } else {
            setDrawerPosition("left");
        }
    };

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={drawerPosition}
            renderNavigationView={DrawerMenu}
        >
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Drawer on the {drawerPosition}!
        </Text>
                <Button
                    title="Change Drawer Position"
                    onPress={() => changeDrawerPosition()}
                />
                <Text style={styles.paragraph}>
                    Swipe from the side or press button below to see it!
        </Text>
                <Button
                    title="Open drawer"
                    onPress={() => drawer.current.openDrawer()}
                />
            </View>
        </DrawerLayoutAndroid>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    }
});
