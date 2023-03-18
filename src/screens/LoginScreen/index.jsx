import * as React from 'react';
import {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {COLOURS} from '../../theme/paper';

export default function Test({navigation}) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const login = async () => {
    setToggle(true);
    if (username && password) {
      setLoading(true);
      await new Promise(resolve => setTimeout(() => resolve(), 2000));
      setLoading(false);
      navigation.navigate('home');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f8f8f8',
      }}>
      <View style={{alignItems: 'center'}}>
        <Text variant="headlineMedium">Pokemon TCG Marketplace</Text>
        <TextInput
          label="User Name"
          value={username}
          mode="outlined"
          onChangeText={text => setUserName(text)}
          outlineColor={COLOURS.buttonColor}
          style={{width: '90%', marginTop: 50}}
        />
        {!username && toggle && (
          <Text
            style={{
              alignSelf: 'flex-start',
              marginLeft: 22,
              marginTop: 3,
              color: 'red',
            }}>
            Name is required.
          </Text>
        )}
        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          onChangeText={text => setPassword(text)}
          outlineColor={COLOURS.buttonColor}
          style={{width: '90%', marginTop: 20}}
          secureTextEntry={true}
        />
        {!password && toggle && (
          <Text
            style={{
              alignSelf: 'flex-start',
              marginLeft: 22,
              marginTop: 3,
              color: 'red',
            }}>
            Name is required.
          </Text>
        )}
      </View>
      <Button
        onPress={login}
        loading={loading}
        disabled={loading}
        mode="contained"
        labelStyle={{
          color: '#ffffff',
          fontSize: 16,
        }}
        uppercase={false}
        style={{
          width: '90%',
          borderRadius: 10,
          backgroundColor: COLOURS.buttonColor,
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        LOG IN
      </Button>
    </View>
  );
}
