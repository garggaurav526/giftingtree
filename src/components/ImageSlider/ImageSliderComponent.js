import React, { useRef, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { Button, SafeAreaView, Text, View, TouchableHighlight, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'

const { width, height } = Dimensions.get('window');
const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100

export default function ImageSliderComponent(props) {
  // const images = [
  //   'https://placeimg.com/640/640/nature',
  //   'https://placeimg.com/640/640/people',
  //   'https://placeimg.com/640/640/animals',
  //   'https://placeimg.com/640/640/beer',
  // ];

  const onImage = (obj) => {
    alert(obj)
  }

  return (
    <>
      <SliderBox
        images={props.images}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        // imageLoadingColor="#00BFA5"
        onCurrentImagePressed={index => onImage(index)}
        sliderBoxHeight={props.height ? props.height : vh * 30}
        interval={props.interval ? props.interval : 3000}
        dotColor="#fff"
        inactiveDotColor="#90A4AE"
        autoplay
        circleLoop
      />
    </>
  );
}


const styles = StyleSheet.create({


});