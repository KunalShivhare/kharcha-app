import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import Checkbox from 'expo-checkbox';
import LargeButton from '@/src/components/buttons/largeButton';
import InputField from '@/src/components/inputs/inputField';
import DismissKeyboard from '@/src/HOCs/DismissKeyboard';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import Header from '@/src/components/header/header';
import { useUnauthorizeNavigation } from '@/src/navigators/navigators';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';

const Signup = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const navigation = useUnauthorizeNavigation();
  const handleOnPressSignUp = () => {
    navigation.navigate('OTPVerification');
  };
  return (
    <ThemeWrapper>
      <DismissKeyboard>
        <View style={[styles.mainContainer]}>
          <Header title={'Sign Up'} />
          <View style={styles.signUpFormContainer}>
            <View style={styles.signUpFormFieldContainer}>
              <InputField placeholder="Mobile Number" keyboardType="decimal-pad" />
              <InputField placeholder="Email" />
              <InputField
                placeholder="Password"
                autoCapitalize="none"
                spellCheck={false}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.signUpfooterContainer}>
              <View style={styles.signUpAgreementContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? COLORS.green100 : undefined}
                />
                <View style={styles.signUpAgreementTextContainer}>
                  <Text style={styles.signUpAgreementText}>
                    {`By signing up, you agree to the `}
                    <Text style={styles.green100}>{`Terms of Service and Privacy Policy`}</Text>
                  </Text>
                </View>
              </View>
              <View>
                <LargeButton title="Sign Up" onPress={handleOnPressSignUp} />
              </View>
              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>
                  {`Already have an account? `}
                  {/* <Link href={"/login"} style={styles.login}>{`Login`}</Link> */}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </DismissKeyboard>
    </ThemeWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  signUpFormContainer: {
    marginTop: resize(56),
    padding: resize(16),
    gap: resize(27),
  },
  signUpFormFieldContainer: {
    gap: resize(24),
  },
  signUpfooterContainer: {
    gap: resize(27),
  },

  signUpAgreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpAgreementTextContainer: {
    paddingHorizontal: resize(8),
  },
  signUpAgreementText: {
    color: COLORS.light100,
    fontWeight: '500',
    fontSize: resize(14),
    lineHeight: resize(18),
  },
  green100: {
    color: COLORS.green100,
  },
  checkbox: {
    borderColor: COLORS.green100,
  },
  loginTextContainer: {
    justifyContent: 'center',
  },
  loginText: {
    fontSize: resize(16),
    fontWeight: '500',
    lineHeight: resize(20),
    color: '#91919F',
  },
  login: {
    color: COLORS.green100,
    textDecorationLine: 'underline',
  },
});
