import React from 'react';
import FartScreen from './FartScreen';
import {View} from 'react-native';

const HomeScreen =({navigation})=>{
return(
    <View style={{flex:1}}>
        <FartScreen navigation={navigation}/>
    </View>
)
}
export default HomeScreen;