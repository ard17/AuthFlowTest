import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { Button, Spacer } from '../../components';
import Storage from '../../utils/storage';

import WelcomeStyles from './styles';

const WelcomeScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState();

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
    // handleLogout();
  };

  const handleLogout = async () => {
    const listUser = await Storage.getItem('auth');
    await Storage.setItem(
      'auth',
      listUser.map(v => {
        if (v.isLogin) {
          return { ...v, isLogin: false };
        } else {
          return v;
        }
      }),
    );
  };

  const getDataAuth = async () => {
    const data = await Storage.getItem('auth');
    const activeUser = data.find(v => v.isLogin);
    setCurrentUser(activeUser);
  };

  useEffect(() => {
    getDataAuth();
  });

  return (
    <View style={WelcomeStyles.container}>
      {currentUser ? (
        <>
          <Text style={WelcomeStyles.title}>Welcome {currentUser?.email}!</Text>
          <Button title={'Logout'} onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text style={WelcomeStyles.title}>Welcome to Your App!</Text>
          <Button title={'Register'} onPress={handleRegister} />
          <Spacer height={15} />
          <Button title={'Login'} onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

export default WelcomeScreen;
