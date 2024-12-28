import LargeButton from '@/src/components/buttons/largeButton';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import { useTheme } from '@/src/components/themes/hooks';
import DismissKeyboard from '@/src/HOCs/DismissKeyboard';
import { useUnauthorizeNavigation } from '@/src/navigators/navigators';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

const Login = () => {
  const navigation = useUnauthorizeNavigation();
  const theme = useTheme();
  const handleOnPressLogin = () => {
    navigation.navigate('OTPVerification');
  };
  return (
    <DismissKeyboard>
      <View style={[styles.mainContainer, { backgroundColor: theme.colors.primaryColor }]}>
        <StatusBar backgroundColor={theme.colors.primaryColor} barStyle={'light-content'} />
        <Header title={'Login'} />
        <View style={styles.loginFormContainer}>
          <View style={styles.loginFormFieldContainer}>
            <InputField placeholder="Email or phone number" />
            <InputField
              placeholder="Password"
              autoCapitalize="none"
              spellCheck={false}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.loginfooterContainer}>
            <View>
              <LargeButton title="Login" onPress={handleOnPressLogin} />
            </View>
            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpText}>
                {`Don't have and account? `}
                {/* <Link href={"/signup"} style={styles.signUp}>{`Sign Up`}</Link> */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loginFormContainer: {
    marginTop: resize(56),
    padding: resize(16),
    gap: resize(27),
  },
  loginFormFieldContainer: {
    gap: resize(24),
  },
  loginfooterContainer: {
    gap: resize(27),
  },
  green100: {
    color: COLORS.green100,
  },
  checkbox: {
    borderColor: COLORS.green100,
  },
  signUpTextContainer: {
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: resize(16),
    fontWeight: '500',
    lineHeight: resize(20),
    color: '#91919F',
  },
  signUp: {
    color: COLORS.green100,
    textDecorationLine: 'underline',
  },
});
