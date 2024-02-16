import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ containerStyle, ...rest }) => {
  return (
    <TextInput
      style={[styles.textInput, containerStyle]}
      placeholderTextColor="#999999"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#F7FAFB',
    borderRadius: 25,
    borderColor: '#CCCCCC',
    borderWidth:1,
    padding: 10,
    fontSize: 16,
    width: 300, 
  },
});

export default CustomTextInput;
