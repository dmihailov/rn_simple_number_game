import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [guessRounds, setGuessRounds] = useState(0);
  const [prerequisitesLoaded, setPrerequisitesLoaded] = useState(false);

  if(!prerequisitesLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setPrerequisitesLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const goToInitialScreen = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if(guessRounds > 0) {
    content = <GameOverScreen numOfRounds={guessRounds} userNumber={userNumber} onStartNewGame={goToInitialScreen}/>;
  }

  return (
    <SafeAreaView style={styles.container}>
        <Header title="Guess Number Game"/>
        {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
