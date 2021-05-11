import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
// Pages
import Home from '../pages/Home';
import DreamHistory from '../pages/DreamHistory';
import RegisterDream from '../pages/RegisterDream';

// Stack
const AuthStack = createStackNavigator();

// Transition animation
const horizontalAnimation = {
  headerShown: false,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// AuthRoutes
const AuthRoutes = () => {
  return (
    <AuthStack.Navigator initialRouteName='Home'>
      <AuthStack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name='DreamHistory'
        component={DreamHistory}
        options={horizontalAnimation}
      />
      <AuthStack.Screen
        name='RegisterDream'
        component={RegisterDream}
        options={horizontalAnimation}
      />
      {/* <AuthStack.Screen
        name='Settings'
        component={Settings}
        options={horizontalAnimation}
      /> */}
      {/* <AuthStack.Screen
        name='FirstAcess'
        component={FirstAcess}
        options={({ navigation }) => ({
          title: '',
          headerTintColor: '#fff',
          headerTransparent: true,
          gestureDirection: 'horizontal',
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS 
          },
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            >
              <Ionicons name='ios-arrow-back' style={styles.backButton} size={35} color='#FFF' />
            </TouchableOpacity>
          ),
        })}
      /> */}
    </AuthStack.Navigator>
  )
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 25
  }
})

export default AuthRoutes;
