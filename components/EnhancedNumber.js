import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

import { isSmallDevice } from '../utils';

const EnhancedNumber = (props) => {
    return (
        <View style={styles.enhancedNumberContainer}>
            <Text style={styles.enhancedNumberText}>{props.number}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    enhancedNumberContainer: {
        margin: isSmallDevice() ? 10 : 15,
        padding: isSmallDevice() ? 8 : 12,
        borderWidth: 2,
        borderColor: Colors.accent,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    enhancedNumberText: {
        fontSize: isSmallDevice() ? 18 : 20,
        color: Colors.accent,
        fontWeight: 'bold'
    },
});

export default EnhancedNumber;