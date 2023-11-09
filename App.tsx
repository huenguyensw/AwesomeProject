import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Home from './components/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import BottomtabNavigator from './components/navigators/BottomtabNavigator';

const App = () => {
  
  
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <BottomtabNavigator/>
      {/* <Home /> */}
    </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // justifyContent: 'center', 
    // alignItems: 'center',
  },
})
