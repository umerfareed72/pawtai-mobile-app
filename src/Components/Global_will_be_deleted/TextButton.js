import React, { memo } from 'react';
import {
    Text,
    View,
} from "react-native";

import {Colors,Constants,Fonts,Images} from "../../Theme/"

const TextButton = ({...props}) => (
        <View style={styles.buttonContainer} >
            <Text style={{...styles.buttonText, color:props.textColor}}>{props.buttonText}</Text>
        </View>
);

export default TextButton;

const styles = {
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
    },

    buttonText: {
        fontFamily: Fonts.LeagueSpartan,
        alignSelf: 'center',
        fontSize: 18,
        marginTop:5
      },
};
