import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './welcomeScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from '../HomeScreen';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import Profile from '../Profile';
import Order from '../Order';



const AuthNavigation = () => {

    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='welcome'>
        <Stack.Screen name='welcome' component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='signup' component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name='signin' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name='home' component={HomeScreen} options={{headerShown:false}}/>
        {/* <Stack.Screen name='products' component={Product} options={{headerShown:false}}/> */}
        <Stack.Screen name="forgotpassword" component={ForgotPassword} options={{headerShown:false}}/>
        <Stack.Screen name="changepassword" component={ChangePassword} options={{headerShown:false}}/>
        <Stack.Screen name="profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="order" component={Order} options={{headerShown:false}}/>
        {/* <Stack.Screen name='cart' component={Cart} options={{headerShown:false}}/> */}
    </Stack.Navigator>
  )
}

export default AuthNavigation