import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
       <GestureHandlerRootView style={{flex: 1}}>
           <StatusBar
          animated={true}
          backgroundColor="#142950"
          barStyle="light-content"
        />
         <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Second" component={SecondScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
       </GestureHandlerRootView>
    )
}
export default Navigation;