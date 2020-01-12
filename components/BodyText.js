import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FontSizes, Fonts } from '../constants/default-style';
import { isSmallDevice } from '../utils';
 
const BodyText = (props) => {
    return (
        <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: isSmallDevice() ? FontSizes.primaryBodySmall : FontSizes.primaryBody,
        fontFamily: Fonts.primaryNormal
    }
});

export default BodyText;
