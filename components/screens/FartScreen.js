import React, {useState} from 'react';
import { Text, View, Animated } from 'react-native';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Audio } from "expo-av";





export default function FartScreen() {
  const [position] = useState(new Animated.Value(-15))
  
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
  const handleButtonDown=()=>{
    console.log('fart in');
    playSoundAsync();
    Animated.timing(position,{
      toValue: 0,
      duration:50,
      useNativeDriver: false,
    }).start()
  }

  const handleButtonUp=()=>{
    console.log('fart out');
    Animated.timing(position, {
      toValue: -13,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        fart
      </Text> */}
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPressIn={handleButtonDown}
        onPressOut={handleButtonUp}
        onLongPress={()=>console.log('long')}
      >
      <View style={styles.button}>
        <View style={styles.thickness}>
          <Animated.View 
          style={[styles.topButton, {top:position}]}>
            <Text style={styles.white}>Fart</Text>
          </Animated.View>

        </View>
      </View>
      </TouchableWithoutFeedback>
      
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
  },
  button: {
    width: 180,
    height: 100,
    padding:10, 
    backgroundColor:'grey',
    borderRadius: 16
  },
  thickness:{
    width:'100%', 
    height:'100%', 
    backgroundColor:'darkred',
    borderRadius: 16
  },
  topButton:{
    width:'100%', 
    height:'100%', 
    backgroundColor:'red',
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
})