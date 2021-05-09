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


export default function Logout(props) {
	const { signOut } = React.useContext(AuthContext)
	const handleSignOut = () => {
		signOut()
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
