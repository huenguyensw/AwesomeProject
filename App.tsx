import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Home from './components/Home';


const App = () => {
  
  
  return (
    <View style={styles.container}>
      <Home />
    </View>
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
