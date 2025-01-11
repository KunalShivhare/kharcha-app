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
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type errors = { name: string; email: string; phoneNumber: string };
const INITIAL_STATE = {
  name: '',
  email: '',
  phoneNumber: '',
};

const Signup = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const navigation = useUnauthorizeNavigation();
  const { updateUser } = useUser();
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: errors = INITIAL_STATE;

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Mobile number is required';
    } else if (!/^\d+$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = 'Mobile number must contain only digits';
    }

    setErrors(newErrors);
    console.log('Object.keys(newErrors).length', Object.keys(newErrors).length);
    for (const key of Object.keys(errors)) {
      if (errors[key] !== '') {
        return false;
      }
    }
    return true;
  };

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleOnPressSignUp = async () => {
    const validated = validate();
    if (!validated) {
      return;
    }
    updateUser(form);
    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/auth/signup', {
        email: form.email,
        name: form.name,
        phoneNumber: form.phoneNumber,
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
          <Header title={'Sign Up'} />
          <View style={styles.signUpFormContainer}>
            <View style={styles.signUpFormFieldContainer}>
              <InputField
                placeholder="Name"
                value={form.name}
                onChangeText={(text) => handleChange('name', text)}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              <InputField
                placeholder="Email"
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <InputField
                placeholder="Mobile Number"
                keyboardType="decimal-pad"
                value={form.phoneNumber}
                onChangeText={(text) => handleChange('phoneNumber', text)}
              />
              {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

              {/* <InputField
                placeholder="Password"
                autoCapitalize="none"
                spellCheck={false}
                secureTextEntry={true}
              /> */}
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
                <LargeButton
                  title={
                    loading ? (
                      <LoadingDots dotColor="#fff" dotSize={12} duration={400} />
                    ) : (
                      `Sign Up`
                    )
                  }
                  onPress={handleOnPressSignUp}
                />
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
  errorText: {
    color: 'red',
  },
});
