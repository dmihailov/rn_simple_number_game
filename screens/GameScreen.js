import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList, ScrollView, Dimensions } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import Card from '../components/Card';
import EnhancedNumber from '../components/EnhancedNumber';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import { FontSizes, Fonts } from '../constants/default-style';
import { isSmallDevice } from '../utils';

const generateRandomBetween = (min, max, excluded) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const nbr = Math.round(Math.random() * (max - min)) + min;

  if (nbr === excluded) {
    return generateRandomBetween(min, max, excluded);
  } else {
    return nbr;
  }
};

const renderListItem = (seqNum, guessNumber, index, itemsCount) => {
  let margin = { marginTop: index > 0 ? (isSmallDevice() ? 8 : 15) : 0 }
  margin = index !== itemsCount - 1 ? margin : {};

  return (
    <View style={{ ...styles.listItemContainer, ...margin }}>
      <Text style={styles.listItemText}>#{seqNum}</Text>
      <Text style={styles.listItemText}>{guessNumber}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  let flatListRef = useRef(null);
  let lowerBoundary = useRef(1);
  let upperBoundary = useRef(99);
  const initialValue = generateRandomBetween(lowerBoundary.current, upperBoundary.current, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialValue);
  const [pastGuesses, setPastGuesses] = useState([initialValue.toString()]);
  const [inPortraitMode, setInPortraitMode] = useState(Dimensions.get('window').width < Dimensions.get('window').height);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, props.userChoice, props.onGameOver]);

  useEffect(() => {
    flatListRef.current.scrollToIndex({ animated: true, index: "0" });
  }, [currentGuess]);

  useEffect(() => {
    const updateLayout = () => {
      setInPortraitMode(Dimensions.get('window').width < Dimensions.get('window').height)
    };

    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const nextGuessHandler = (direction) => {
    if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie', 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower') {
      upperBoundary.current = currentGuess;
    } else {
      lowerBoundary.current = currentGuess + 1;
    }
    const nextGuess = generateRandomBetween(lowerBoundary.current, upperBoundary.current, currentGuess);
    setCurrentGuess(nextGuess);
    setPastGuesses(currPastGuesses => [nextGuess.toString(), ...currPastGuesses]);
  };

  let InteractionContent;
  if (inPortraitMode) {
    InteractionContent =
      <View style={{ ...styles.container, padding: 0 }}>
        <EnhancedNumber number={currentGuess} />
        <Card style={styles.card}>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <SimpleLineIcons name='arrow-down' size={isSmallDevice() ? 20 : 25} />
              </MainButton>
            </View>
            <View style={styles.buttonContainer}>
              <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <SimpleLineIcons name='arrow-up' size={isSmallDevice() ? 20 : 25} />
              </MainButton>
            </View>
          </View>
        </Card>
      </View>;
  } else {
    InteractionContent =
      <Card style={styles.cardLandscape}>
          <View style={styles.buttonContainerLandscape}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <SimpleLineIcons name='arrow-down' size={isSmallDevice() ? 20 : 25} />
            </MainButton>
          </View>
          <EnhancedNumber number={currentGuess} />
          <View style={styles.buttonContainerLandscape}>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <SimpleLineIcons name='arrow-up' size={isSmallDevice() ? 20 : 25} />
            </MainButton>
          </View>
      </Card>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TitleText>Opponent's Guess</TitleText>
        {InteractionContent}
        <View style={styles.listContainer}>
          <FlatList
            data={pastGuesses}
            renderItem={(item) => renderListItem(pastGuesses.length - item.index, item.item, item.index, pastGuesses.length)}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={styles.list}
            ref={(ref) => { flatListRef.current = ref; }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: isSmallDevice() ? 10 : 20
  },
  card: {
    marginTop: isSmallDevice() ? 10 : 15,
    width: 300,
    maxWidth: '95%',
    padding: isSmallDevice() ? 15 : 20,
    paddingHorizontal: isSmallDevice() ? 15 : 30,
  },
  cardLandscape: {
    marginTop: isSmallDevice() ? 10 : 15,
    width: 600,
    maxWidth: '90%',
    padding: isSmallDevice() ? 15 : 20,
    paddingHorizontal: isSmallDevice() ? 15 : 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  buttonContainer: {
    width: '45%'
  },
  buttonContainerLandscape: {
    width: 180,
    maxWidth: '40%'
  },
  listItemContainer: {
    marginTop: isSmallDevice() ? 8 : 15,
    padding: isSmallDevice() ? 6 : 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1
  },
  list: {
    justifyContent: 'flex-start',
    flexGrow: 1
  },
  listContainer: {
    flex: 1,
    width: isSmallDevice() ? '85%' : '70%',
    paddingTop: isSmallDevice() ? 15 : 30,
    paddingBottom: isSmallDevice() ? 10 : 20
  },
  listItemText: {
    fontSize: isSmallDevice() ? FontSizes.primaryBodySmall : FontSizes.primaryBody,
    fontFamily: Fonts.primaryNormal
  }
});

export default GameScreen;