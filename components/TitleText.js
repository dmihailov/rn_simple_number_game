import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FontSizes, Fonts } from '../constants/default-style';

import { isSmallDevice } from '../utils';
 
const TitleText = (props) => {
    return (
        <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: isSmallDevice() ? FontSizes.primaryTitleSmall : FontSizes.primaryTitle,
        fontFamily: Fonts.primaryBold,
        marginBottom: isSmallDevice() ? 10 : 20
    }
});

export default TitleText;
