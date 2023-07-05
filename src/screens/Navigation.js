import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './login/AuthNavigation';

const Navigation = () => {
  return (
   <NavigationContainer>
       <AuthNavigation/>
   </NavigationContainer>
  )
}

export default Navigation