import React from 'react';
import { View, StyleSheet } from 'react-native';

import { isSmallDevice } from '../utils';

const Card = (props) => {
    const { style } = props;
    return (
        <View style={{...styles.container, ...style}}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: isSmallDevice() ? 15 : 20,
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 2 },
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        elevation: 2
    }
});

export default Card;