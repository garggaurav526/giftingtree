import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AuthContext } from '../components/Context'
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Logout(props) {
	const { signOut } = React.useContext(AuthContext)
	const handleSignOut = async() => {
		try {
			await AsyncStorage.removeItem("giftingTreeSSoToken");
			signOut()
		} catch (e) {
			// setErrorMesg("Something went wrong !!! ")
			// saving error
		}
	}

	return (
		<DrawerContentScrollView {...props}>
			<View>

			</View>
			<DrawerItemList {...props} />
			<TouchableOpacity onPress={() => handleSignOut()} style={styles.iconBox}>
				<Icon name={"ios-exit"} size={30} style={{ textAlign: 'center' }} color={'#aaa'} />
				<View style={{flexDirection:'column',justifyContent:'center',marginLeft:35}}>
					<Text style={{ textAlign: "center", color: '#000' }}>Logout</Text>
				</View>
			</TouchableOpacity>
		</DrawerContentScrollView>
	);
}
const styles = StyleSheet.create({
	iconBox: {
		textAlign: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 5,
		marginHorizontal: 10
	},
})
