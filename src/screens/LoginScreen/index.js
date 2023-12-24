import React from 'react';
import { Text, View } from 'react-native';

import { Form } from '../../components';
import Storage from '../../utils/storage';

import LoginStyles from './styles';

const LoginScreen = ({ navigation }) => {
  const fields = [
    {
      name: 'email',
      placeholder: 'Email',
    },
    {
      name: 'password',
      placeholder: 'Password',
    },
  ];

  const handleSubmit = async values => {
    const data = await Storage.getItem('auth');
    const user = values;
    const matchedUser = data.some(
      ({ isLogin, ...v }) => JSON.stringify(v) === JSON.stringify(user),
    );
    await Storage.setItem(
      'auth',
      data.map(v => {
        if (v.email === user.email) {
          return { ...v, isLogin: true };
        } else {
          return v;
        }
      }),
    );
    if (matchedUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.formTitle}>Login to your Account</Text>
      <Form
        initialValues={{
          email: '',
          password: '',
        }}
        fields={fields}
        buttonTitle={'Sign in'}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default LoginScreen;
