import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import Colors from '../constants/colors';
import { FontSizes, Fonts } from '../constants/default-style';
import { isSmallDevice } from '../utils';

const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={styles.text}>{props.children}</Text>    
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: isSmallDevice() ? 10 : 20,
        paddingVertical: isSmallDevice() ? 8 : 12,
        backgroundColor: Colors.accent,
        borderRadius: isSmallDevice() ? 8 : 12
    },
    text: {
        fontSize: isSmallDevice() ? FontSizes.primaryBodySmall : FontSizes.primaryBody,
        fontFamily: Fonts.primaryNormal,
        color: 'white',
        textAlign: 'center'
    }
});

export default MainButton;