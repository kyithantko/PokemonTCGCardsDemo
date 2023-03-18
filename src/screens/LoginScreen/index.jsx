import * as React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text>Login Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('home')}>
        LOGIN
      </Button>
    </View>
  );
};

export default LoginScreen;
