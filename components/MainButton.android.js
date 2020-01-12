import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import Colors from '../constants/colors';
import { FontSizes, Fonts } from '../constants/default-style';
import { isSmallDevice } from '../utils';

const MainButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={props.onPress}>
                <View style={{ ...styles.button, ...props.style }}>
                    <Text style={styles.text}>{props.children}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: isSmallDevice() ? 8 : 12,
        overflow: 'hidden'
    },
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