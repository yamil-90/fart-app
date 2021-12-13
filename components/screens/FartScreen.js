import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Audio } from "expo-av";





export default function FartScreen() {
  const [position] = useState(new Animated.Value(-15));
  const [code, setCode] = useState([]);
  const [unlock, setUnlock]= useState(false)
  const pressed = useRef(false);


  const playSoundAsync = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(
        require('../../assets/sounds/fart01.mp3')
      );
      await sound.playAsync();
    } catch (err) {
      console.log(err)
    }
  }
  const handleButtonDown = () => {

    pressed.current = true
    // console.log('fart in');
    playSoundAsync();
    Animated.timing(position, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }

  const handleButtonUp = () => {
    if (pressed.current) {
      changeCode('.')
    }
    pressed.current = false;
    // console.log('fart out');
    Animated.timing(position, {
      toValue: -13,
      duration: 50,
      useNativeDriver: false,
    }).start();

  }

  const changeCode = (value) => {
    // console.log(code);
    let newCode = code;
    if (code.length === 4 || code.length === 7 || code.length === 11) {
      setCode([...code, ' ', value])
      newCode.push(' ',value)
    } else if (code.length >= 13) {
      setCode([]);
      newCode=[]
    }
    else {
      setCode([...code, value])
      newCode.push(value)
    }

    if (compareCode(newCode)) {
      setUnlock(true)
    }
  }
  const compareCode = (array) => {
    const arrayTemplate = [".", ".", "-", ".", " ", ".", "-", " ", ".", "-", "."," ","-"];
    if (!array) {
      // console.log('false not array');
      return false;
    }
    if (array.length !== arrayTemplate.length){
    // console.log('false lenght');
      return false;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i] !==arrayTemplate[i]){
        // console.log('false content');
        return false;
      }
    }
    return true;
  }

  const handleLongPress = () => {
    changeCode('-')
    pressed.current = false
    const loop = () => {
      // console.log(pressed.current)
      if (pressed.current) {
        playSoundAsync()
      } else {
        clearInterval(timer)
      }
    }
    const timer = setInterval(loop, 500)

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{unlock ? 'true' : 'false'}</Text>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPressIn={handleButtonDown}
        onPressOut={handleButtonUp}
        onLongPress={handleLongPress}
      >
        <View style={styles.button}>
          <View style={styles.thickness}>
            <Animated.View
              style={[styles.topButton, { top: position }]}>
              <Text style={styles.white}>Fart</Text>
            </Animated.View>

          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.code}>

        <Text>{code}</Text>


      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:10
  },
  button: {
    width: 180,
    height: 100,
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 16
  },
  thickness: {
    width: '100%',
    height: '100%',
    backgroundColor: 'darkred',
    borderRadius: 16
  },
  topButton: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  code:{
    bottom:0,
    position:'absolute'
  }
})