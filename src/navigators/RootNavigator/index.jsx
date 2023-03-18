import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
