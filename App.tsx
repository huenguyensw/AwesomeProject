import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
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
