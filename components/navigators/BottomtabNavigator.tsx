import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import MyLibrary from '../screens/MyLibrary';
import MyProfile from '../screens/MyProfile';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();


const BottomtabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveBackgroundColor: '#282c3d',
      tabBarInactiveBackgroundColor:'#282c3d',
      tabBarShowLabel: false,
    }}>
      <Tab.Screen 
        name='Home' 
        component={Home} 
        options={{
        headerShown: false,
        
        tabBarIcon: ({color, size}) =>{
          return (
            <Image source={require('../../assets/home.png')} alt='Home logo'/>
          )
          }
      }}/>
      <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>{
            return (
              <Image source={require('../../assets/loupe.png')} alt='Home logo'/>
            )
            }
        }}/>
      
      <Tab.Screen 
        name='Library' 
        component={MyLibrary} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>{
            return (
              <Image source={require('../../assets/digital-library.png')} alt='Home logo'/>
            )
            }
        }}/>
      <Tab.Screen 
        name='Profile' 
        component={MyProfile} 
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) =>{
            return (
              <Image source={require('../../assets/user.png')} alt='Home logo'/>
            )
            }
        }}/>

    </Tab.Navigator>
  )
}

export default BottomtabNavigator
