import React from 'react';
import { Text, View } from 'react-native';
import * as yup from 'yup';

import { Form } from '../../components';
import Storage from '../../utils/storage';

import RegisterStyles from './styles';

const RegisterScreen = ({ navigation }) => {
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

  const validation = {
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required')
      .test('unique-email', 'Email is already in use', async value => {
        try {
          await checkEmailUniqueness(value);
          return true;
        } catch (error) {
          return false;
        }
      }),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, and one symbol',
      ),
  };

  const checkEmailUniqueness = async value => {
    const data = await Storage.getItem('auth');
    const isDuplicateEmail = data.some(v => v.email === value);

    if (isDuplicateEmail) {
      throw new yup.ValidationError('Email is already in use', value, 'email');
    }
  };
  const handleSubmit = values => {
    navigation.navigate('OTP', values);
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.formTitle}>Create your Account</Text>
      <Form
        initialValues={{
          email: '',
          password: '',
        }}
        fields={fields}
        validation={validation}
        buttonTitle={'Sign up'}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default RegisterScreen;
