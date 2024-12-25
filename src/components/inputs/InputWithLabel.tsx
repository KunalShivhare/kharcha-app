import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

interface InputWithLabelProps {
  member: string;
  amount: string;
  onChange: (value: string) => void;
  currencySymbol?: string;
  keyboardType?: TextInputProps['keyboardType'];
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  member,
  amount,
  onChange,
  labelStyle,
  inputStyle,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{member}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        value={amount}
        onChangeText={onChange}
        placeholder={`0.00`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
});

export default InputWithLabel;
