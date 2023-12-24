import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ButtonStyles from './styles';

const Button = ({ onPress, title, buttonStyle, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        ButtonStyles.button,
        { backgroundColor: disabled ? '#737373' : '#007AFF' },
        buttonStyle,
      ]}
      disabled={disabled}>
      <Text style={[ButtonStyles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
