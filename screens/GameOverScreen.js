import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import { Fonts } from '../constants/default-style';
import Colors from '../constants/colors';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import { isSmallDevice } from '../utils';

const GameOverScreen = (props) => {
    const [inPortraitMode, setInPortraitMode] = useState(Dimensions.get('window').width < Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setInPortraitMode(Dimensions.get('window').width < Dimensions.get('window').height)
        };

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const imageContainerAdd = inPortraitMode ? styles.imageContainerPortrait : styles.imageContainerLandscape;

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game Is Over!</TitleText>
                <View style={{...styles.imageContainer, ...imageContainerAdd}}>
                    <Image resizeMode='cover' style={styles.image} source={require('../assets/images/number-game-image.jpg')} />
                </View>
                <View style={styles.summaryContainer}>
                    <BodyText style={styles.summaryText}>
                        Your phone needed <Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                <MainButton onPress={props.onStartNewGame}>Start New Game</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: isSmallDevice() ? 10 : 20
    },
    highlight: {
        fontFamily: Fonts.primaryBold,
        color: Colors.accent
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderColor: 'black',
        borderWidth: 2,
        overflow: 'hidden'
    },
    imageContainerPortrait: {
        width: isSmallDevice() ? Dimensions.get('window').width * 0.7 : 250,
        maxWidth: 250,
        height: isSmallDevice() ? Dimensions.get('window').width * 0.7 : 250,
        maxHeight: 250,
        borderRadius: isSmallDevice() ? (Dimensions.get('window').width * 0.7) / 2 : 125,
    },
    imageContainerLandscape: {
        width: 250,
        height: 250,
        borderRadius: 125,
    },
    summaryContainer: {
        width: 300,
        maxWidth: '90%',
        marginVertical: isSmallDevice() ? 15 : 30
    },
    summaryText: {
        textAlign: 'center'
    }
});

export default GameOverScreen;