import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LandingScreen from './screens/LandingScreen'
import * as Font from 'expo-font';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const[isAppReady, setIsAppReady] = useState(false)

  async function setup(){
    await Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
    });
    setFontLoaded(true)
    setIsAppReady(true)
  }

  // another variation of component did mount since there are no dependecies 
  useEffect(() => {
    setup()
  },[])

  return (
    <View style={styles.container}>
      {isAppReady ? <LandingScreen /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
