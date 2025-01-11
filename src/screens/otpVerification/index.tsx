import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import axiosInstance from '@/src/axios';
import LargeButton from '@/src/components/buttons/largeButton';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import LoadingDots from '@/src/components/loading';
import { useAuth } from '@/src/providers/AuthProvider';
import { useUser } from '@/src/providers/UserContext';
import { COLORS } from '@/src/providers/theme.style';
import { deviceWidth, resize } from '@/src/utils/deviceDimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { email } = useUser();

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      console.log(email, otp);
      const response = await axiosInstance.post('/api/auth/verify-otp', {
        email: email,
        otp,
      });
      if (response.status !== 200) {
        console.log('🚀 ~ handleVerifyOTP ~ response?.data?.error:', response?.data?.error);
      } else {
        const token = response.data.token;
        if (!token) {
          throw new Error('Token is not present');
        }
        await AsyncStorage.setItem('token', token);
        setLoading(false);
        signIn();
      }
    } catch (error: any) {
      console.log('🚀 ~ handleVerifyOTP ~ error?.response:', error?.response?.data?.error);
      setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Number(otp.length) === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  return (
    <ThemeWrapper>
      <View style={[styles.mainContainer]}>
        <Header title="Verification" />
        <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView behavior={'height'}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Enter your Verification Code</Text>
            </View>
            <View style={styles.otpContainer}>
              <InputField
                style={styles.otpInput}
                maxLength={6}
                keyboardType="decimal-pad"
                value={otp}
                onChangeText={(text) => setOtp(text)}
              ></InputField>

              {Array.from({ length: 6 }).map((item, index) => {
                return (
                  <View key={index} style={styles.otpBox}>
                    {!otp[index] ? (
                      <Text style={styles.dot}></Text>
                    ) : (
                      <Text style={styles.otp}>{otp[index]}</Text>
                    )}
                  </View>
                );
              })}
            </View>
            {error && (
              <Text style={{ color: 'white', fontSize: 20, paddingHorizontal: 20 }}>{error}</Text>
            )}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>04:59</Text>
            </View>
            <View style={styles.emailContiner}>
              <Text style={styles.emailText}>
                We send verification code to your email
                <Text style={styles.email}>{` ema*****@gmail.com. `}</Text>
                You can check your inbox.
              </Text>
            </View>
            <View style={styles.resendOTPContainer}>
              <Text style={styles.resendOTPText}>{`I didn't received the code? Send again`}</Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.verifyButtonContainer}>
          <LargeButton
            title={
              loading ? <LoadingDots dotColor="#fff" dotSize={12} duration={400} /> : `Verify OTP`
            }
            onPress={handleVerifyOTP}
          />
        </View>
      </View>
    </ThemeWrapper>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: resize(16),
    bottom: resize(16),
  },
  titleContainer: {
    marginTop: resize(210),
    paddingHorizontal: 20,
  },
  title: {
    fontSize: resize(36),
    fontWeight: '500',
    lineHeight: resize(40),
    color: COLORS.light100,
  },
  otpContainer: {
    marginTop: resize(44),
    gap: resize(10),
    paddingVertical: resize(20),
    flexDirection: 'row',
  },
  otpInput: {
    width: deviceWidth * 0.6,
    // borderWidth: 1,
    // borderColor: "white",
    position: 'absolute',
    // padding: resize(20),
    height: resize(50),
    opacity: 0,
    zIndex: 999,
  },
  otpBox: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: resize(40),
    height: resize(40),
  },
  dot: {
    height: resize(24),
    width: resize(24),
    borderRadius: 50,
    backgroundColor: COLORS.light100,
  },
  otp: {
    fontSize: resize(32),
    lineHeight: resize(40),
    fontWeight: '700',
    alignSelf: 'center',
    color: 'white',
  },
  timerContainer: {
    marginTop: resize(46),
    paddingHorizontal: 20,
  },
  timerText: {
    color: COLORS.green100,
    fontSize: resize(18),
    fontWeight: '600',
    lineHeight: resize(22),
  },
  emailContiner: { marginTop: resize(16) },
  emailText: {
    color: COLORS.light100,
    fontSize: resize(16),
    fontWeight: '500',
    lineHeight: resize(20),
    paddingHorizontal: 20,
  },
  email: {
    color: COLORS.green100,
  },
  resendOTPContainer: {
    marginTop: resize(24),
    paddingHorizontal: 20,
  },
  resendOTPText: {
    color: COLORS.green100,
    fontSize: resize(16),
    fontWeight: '500',
    lineHeight: resize(20),
    textDecorationLine: 'underline',
  },
  verifyButtonContainer: {
    marginHorizontal: resize(16),
    marginBottom: resize(16),
  },
});
