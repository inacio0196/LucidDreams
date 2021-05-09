import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Pages
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';

// Stack
const AuthStack = createStackNavigator();

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
    <AuthStack.Navigator initialRouteName='Login'>
      <AuthStack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name='SignUp'
        component={SignUp}
        options={horizontalAnimation}
      />
      {/* <AuthStack.Screen
        name='Login'
        component={Login}
        options={({ navigation }) => ({
          title: null,
          headerTintColor: '#fff',
          headerShown: false,
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
