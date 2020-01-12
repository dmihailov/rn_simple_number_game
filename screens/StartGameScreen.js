import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import EnhancedNumber from '../components/EnhancedNumber';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton';

import { isSmallDevice } from '../utils';
import { FontSizes } from '../constants/default-style';

const { winWidth, winHeight } = Dimensions.get('window');

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const inputTextHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number',
                'Number should be a number between 0 and 99',
                [{ text: 'Okay', onPress: resetInputHandler, style: 'destructive' }]
            );
            return;
        }

        Keyboard.dismiss();
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(parseInt(enteredValue));
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.numberCard}>
                <BodyText>You Selected</BodyText>
                <EnhancedNumber number={selectedNumber} />
                <View style={styles.startGameButtonContainer}>
                    <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
                </View>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position">
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <TitleText>Start a New Game!</TitleText>
                        <Card style={styles.card}>
                            <BodyText>Select a Number</BodyText>
                            <TextInput
                                style={styles.input}
                                maxLength={2}
                                multiline={false}
                                autoCorrect={false}
                                keyboardType='number-pad'
                                onChangeText={inputTextHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonsContainer}>
                                <View style={styles.buttonContainer}>
                                    <MainButton style={styles.confirmButton} onPress={resetInputHandler}>Reset</MainButton>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <MainButton onPress={confirmInputHandler}>Confirm</MainButton>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: isSmallDevice() ? 10 : 20
    },
    card: {
        width: 300,
        maxWidth: '95%'
    },
    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        width: '45%'
    },
    input: {
        margin: 20,
        borderColor: '#E5E5E5',
        borderBottomWidth: 1,
        textAlign: 'center',
        width: 40,
        fontSize: isSmallDevice() ? FontSizes.primaryBodySmall : FontSizes.primaryBody
    },
    numberCard: {
        marginTop: isSmallDevice() ? 15 : 30,
        padding: isSmallDevice() ? 15 : 20,
        width: 200,
        maxWidth: '60%'
    },
    startGameButtonContainer: {
        width: '100%'
    },
    confirmButton: {
        backgroundColor: Colors.primary
    }
});

export default StartGameScreen;