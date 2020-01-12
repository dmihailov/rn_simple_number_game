import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import { isSmallDevice } from '../utils';
import { FontSizes } from '../constants/default-style'

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: isSmallDevice() ? 75 : 90,
        backgroundColor: Platform.OS === 'android' ? Colors.accent : 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: Platform.OS === 'android' ? 0 : 1,
        borderColor: Platform.OS === 'android' ? 'transparent' : '#ccc'
    },
    title: {
        color: Platform.OS === 'android' ? '#ffffff' : Colors.accent,
        fontSize: isSmallDevice() ? FontSizes.primaryHeaderSmall : FontSizes.primaryHeader,
        marginBottom: isSmallDevice() ? 12 : 20
    }
});

export default Header;