import axiosInstance from '@/src/axios';
import LargeButton from '@/src/components/buttons/largeButton';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import LoadingDots from '@/src/components/loading';
import DismissKeyboard from '@/src/HOCs/DismissKeyboard';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { useUnauthorizeNavigation } from '@/src/navigators/navigators';
import { COLORS } from '@/src/providers/theme.style';
import { useUser } from '@/src/providers/UserContext';
import { resize } from '@/src/utils/deviceDimentions';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
  const navigation = useUnauthorizeNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUser();
  const handleOnPressLogin = async () => {
    setLoading(true);
    try {
      updateUser({ email: email });
      const response = await axiosInstance.post('/api/auth/login', {
        email: email,
      });
      if (response.status !== 200) {
        console.log('🚀 ~ handleVerifyOTP ~ response?.data?.error:', response?.data?.error);
      } else {
        setLoading(false);
        navigation.navigate('OTPVerification');
      }
    } catch (error: any) {
      console.log('🚀 ~ handleVerifyOTP ~ error?.response:', error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeWrapper>
      <DismissKeyboard>
        <View style={[styles.mainContainer]}>
          <Header title={'Login'} />
          <View style={styles.loginFormContainer}>
            <View style={styles.loginFormFieldContainer}>
              <InputField
                placeholder="Email or phone number"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.loginfooterContainer}>
              <View>
                <LargeButton
                  title={
                    loading ? (
                      <LoadingDots dotColor="#fff" dotSize={12} duration={400} />
                    ) : (
                      `Send OTP`
                    )
                  }
                  onPress={handleOnPressLogin}
                />
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
    </ThemeWrapper>
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
