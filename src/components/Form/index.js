import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FromStyles from './styles';
import Button from '../Button';
import Input from '../Input';

const Form = ({
  initialValues,
  fields,
  validation,
  handleSubmit,
  buttonTitle,
}) => {
  const validationSchema = yup.object().shape(validation);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <View>
      {fields.map((field, index) => (
        <View key={index}>
          <Input
            fieldName={field.name}
            style={FromStyles.input}
            placeholder={field.placeholder}
            onChangeText={formik.handleChange(field.name)}
            onBlur={formik.handleBlur(field.name)}
            value={formik.values[field.name]}
          />
          {formik.touched[field.name] && formik.errors[field.name] ? (
            <Text style={{ color: 'red' }}>{formik.errors[field.name]}</Text>
          ) : null}
        </View>
      ))}
      <Button
        title={buttonTitle}
        buttonStyle={FromStyles.button}
        onPress={formik.handleSubmit}
      />
    </View>
  );
};

export default Form;
