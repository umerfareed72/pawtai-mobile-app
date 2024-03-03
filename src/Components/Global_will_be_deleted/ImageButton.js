import React, { memo } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView, 
    TouchableOpacity,
    ImageBackground,
    Button
} from "react-native";

import {Colors,Constants,Fonts,Images} from "../../Theme/"

const ImageButton = ({...props}) => (
    <ImageBackground 
        imageStyle={{borderRadius:5}} 
        source={props.imageSrc} 
        style={styles.imageContainer} 
        > 
        <TouchableOpacity onPress={props.buttonOnPress}>
            <Text style={styles.buttonText}>{props.buttonText}{Constants.FONT_TEXT}</Text>
        </TouchableOpacity>
    </ImageBackground>
);

export default ImageButton;

const styles = {
    imageContainer:{
        width: '100%', 
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        margi:5
    },

    buttonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: Fonts.LeagueSpartan,
      },
};
