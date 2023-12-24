import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { Button, Input, Spacer } from '../../components';
import Storage from '../../utils/storage';

import OTPScreenStyles from './styles';

const OTPScreen = ({ navigation }) => {
  const route = useRoute();
  const otpLength = 6;
  const otpRef = useRef([]);
  const [OTPCode, setOTPCode] = useState([]);
  const [timer, setTimer] = useState(30);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (index, text) => {
    if (text && text.length > 0 && index < otpLength - 1) {
      otpRef.current[index + 1].focus();
    } else {
      otpRef.current[index].blur();
    }
    otpRef.current[index].current = text;
    setOTPCode([...OTPCode, text]);
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0) {
      otpRef.current[index - 1].clear();
      otpRef.current[index - 1].focus();
    }
    setOTPCode(OTPCode.slice(0, index - 1));
  };

  const handlePressIn = index => {
    for (let i = otpLength; i >= index; i--) {
      otpRef.current[i]?.clear();
    }
    setOTPCode(OTPCode.slice(0, index));
    setIsError(false);
  };

  const saveData = async () => {
    const data = await Storage.getItem('auth');
    await Storage.setItem(
      'auth',
      data
        ? [...data, { ...route.params, isLogin: false }]
        : [{ ...route.params, isLogin: false }],
    );
  };

  const handleSubmit = () => {
    if (OTPCode.length !== otpLength) {
      otpRef.current[OTPCode.length].focus();
    } else {
      if (OTPCode.join('') === '111111') {
        saveData();
        navigation.navigate('Login');
      } else {
        setIsError(true);
      }
    }
  };

  const handleResendOTP = () => {
    setTimer(30);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={OTPScreenStyles.container}>
      <Text style={OTPScreenStyles.title}>OTP Verification</Text>
      <Text style={OTPScreenStyles.subTitle}>
        Enter OTP Sent to {route.params.email}
      </Text>
      <Input.OTPInput
        otpLength={otpLength}
        otpRef={otpRef}
        OTPCode={OTPCode}
        setOTPCode={setOTPCode}
        handleInputChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handlePressIn={handlePressIn}
        isError={isError}
      />
      <Spacer height={20} />
      <Button
        title={'Verify'}
        onPress={handleSubmit}
        disabled={OTPCode.length !== otpLength}
        buttonStyle={OTPScreenStyles.verifyButton}
      />
      <Spacer height={20} />
      <View style={OTPScreenStyles.wrapper}>
        <Text style={OTPScreenStyles.resendText}>Didn't you receive OTP?</Text>
        <Spacer width={5} />
        <Button
          title={timer || 'Resend OTP'}
          buttonStyle={OTPScreenStyles.resendButton}
          textStyle={OTPScreenStyles.resendButtonText}
          onPress={handleResendOTP}
        />
      </View>
    </View>
  );
};

export default OTPScreen;
