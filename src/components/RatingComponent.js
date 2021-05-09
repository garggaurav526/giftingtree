import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function RatingComponent(props) {

    const getAverage = (total, reviews) => {
        var num = total / reviews / 5;
        return num.toFixed(1);
    }
    const getColor = (total, reviews) => {
        var num = total / reviews / 5;
        num = Number(num);
        if(num >= 4){
            return "#5cb85c"
        }else if(num >= 3 && num < 4){
            return "#f0ad4e"
        }else{
            return "#d9534f"
        }
    }
    return (
        <View style={styles.row}>
            <View style={styles.col}>
                <View>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <View style={[styles.ratingBox, { backgroundColor: getColor(props.total, props.reviews) }]}>
                            <Text style={{ color: '#fff' }}>{getAverage(props.total, props.reviews)}</Text>
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <Icon style={{ marginLeft: 5 }} color={'#fff'} name="ios-star-sharp" size={12} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 10 }}>
                            <Text>{props.reviews} ratings</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginTop: 10

    },
    col: {
        flexDirection: "column"
    },
    ratingBox: {
        borderRadius: 25,
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
