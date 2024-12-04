import React, { useRef, useState } from "react"
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native"
import { resize } from "../../utils/deviceDimentions"
import { COLORS } from "../../providers/theme.style"

interface InputFieldProps extends TextInputProps {
  containerStyle?: ViewStyle
}

const InputField: React.FC<InputFieldProps> = ({
  containerStyle,
  ...textInputProps
}) => {
  const [input, setInput] = useState<string>("")
  const inputRef = useRef<TextInput>(null)

  return (
    <View style={[styles.textInputContainer, containerStyle]}>
      <TextInput
        ref={inputRef}
        value={input}
        // @ts-ignore
        style={styles.textInput(Boolean(input.length))}
        onChangeText={(input) => setInput(String(input))}
        placeholder="Type something"
        placeholderTextColor={"#91919F"}
        {...textInputProps}
      />
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  textInputContainer: {},
  // @ts-ignore
  textInput: (isInputFilled: boolean) => ({
    borderWidth: 1,
    borderColor: isInputFilled ? COLORS.light100 : "#91919F",
    padding: 0,
    borderRadius: 16,
    paddingVertical: resize(8),
    paddingHorizontal: resize(16),
    height: resize(56),
  }),
})
