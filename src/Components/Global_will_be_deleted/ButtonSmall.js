import { View } from 'native-base';
import React, { memo } from 'react';
import {
    Text,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import {Colors,Constants,Fonts,Images} from "../../Theme/"

const ImageButton = ({...props}) => (
        <TouchableOpacity onPress={props.buttonOnPress} style={{...styles.buttonContainer,marginLeft:props.marginLeft?props.marginLeft:0}}> 
            <Text style={styles.buttonText}>{props.buttonText}{Constants.FONT_TEXT}</Text>
        </TouchableOpacity>
);

export default ImageButton;

const styles = {
    buttonContainer:{
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        backgroundColor:Colors.themeColor,
        paddingTop: 3,
        paddingHorizontal: 10,
        marginVertical:10
    },

    buttonText: {
        color: 'white',
        fontSize: 13,
        alignSelf: 'center',
        fontFamily: Fonts.LeagueSpartan,
      },
};
