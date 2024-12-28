import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import LargeButton from '@/src/components/buttons/largeButton';
import Header from '@/src/components/header/header';
import InputField from '@/src/components/inputs/inputField';
import { useAuth } from '@/src/providers/AuthProvider';
import { COLORS } from '@/src/providers/theme.style';
import { resize, deviceWidth } from '@/src/utils/deviceDimentions';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';

const OTPVerification = () => {
  const [otp, setOtp] = useState<string>('');
  const { signIn } = useAuth();

  useEffect(() => {
    if (Number(otp.length) === 4) {
      console.log('OTP verified!');
      signIn();
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
                maxLength={4}
                keyboardType="decimal-pad"
                value={otp}
                onChangeText={(text) => setOtp(text)}
              ></InputField>

              {Array.from({ length: 4 }).map((item, index) => {
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
          <LargeButton title="Verify" />
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
  },
  email: {
    color: COLORS.green100,
  },
  resendOTPContainer: {
    marginTop: resize(24),
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
