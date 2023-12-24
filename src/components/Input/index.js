import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Button from '../Button';
import InputStyles, { OTPInputStyles } from './styles';
import { Spacer } from '../Spacer';

const Input = ({ fieldName, placeholder, onChangeText, onBlur, value }) => {
  const [secureText, SetSecureText] = useState(
    fieldName?.toLowerCase()?.includes('password'),
  );

  const onPress = () => SetSecureText(!secureText);

  return (
    <View style={InputStyles.input}>
      <TextInput
        style={{ width: secureText ? '80%' : '100%' }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureText}
      />
      {fieldName?.toLowerCase()?.includes('password') && (
        <Button
          title={secureText ? 'show' : 'hide'}
          buttonStyle={InputStyles.button}
          textStyle={InputStyles.buttonText}
          onPress={onPress}
        />
      )}
    </View>
  );
};

const OTPInput = ({
  otpLength,
  otpRef,
  handleInputChange,
  handleKeyPress,
  handlePressIn,
  isError,
}) => {
  const inputs = Array(otpLength).fill(0);

  return (
    <>
      <View style={OTPInputStyles.container}>
        {inputs.map((_, index) => (
          <TextInput
            key={index}
            style={[
              OTPInputStyles.input,
              { borderColor: isError ? 'red' : '#000' },
            ]}
            maxLength={1}
            keyboardType="numeric"
            ref={input => (otpRef.current[index] = input)}
            onChangeText={text => handleInputChange(index, text)}
            onKeyPress={({ nativeEvent }) => {
              handleKeyPress(index, nativeEvent.key);
            }}
            onPressIn={() => handlePressIn(index)}
          />
        ))}
      </View>
      {isError && (
        <>
          <Spacer height={10} />
          <Text style={OTPInputStyles.errorText}>
            Invalid OTP. Please recheck and enter.
          </Text>
        </>
      )}
    </>
  );
};

Input.OTPInput = OTPInput;

export default Input;
