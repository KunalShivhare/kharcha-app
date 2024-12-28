import AppIntroSlider from '@/src/components/appIntroSlider/appIntroSlider';
import LargeButton from '@/src/components/buttons/largeButton';
import { useTheme } from '@/src/components/themes/hooks';
import { useUnauthorizeNavigation } from '@/src/navigators/navigators';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

const Onboarding = () => {
  const navigation = useUnauthorizeNavigation();
  const theme = useTheme();
  const handleGetStartedOnPress = () => {
    navigation.navigate('Signup');
  };
  const handleLoginOnPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryColor }]}>
      <StatusBar backgroundColor={theme.colors.primaryColor} barStyle={'light-content'} />
      <AppIntroSlider />
      <View style={styles.doubleCTAContainer}>
        <LargeButton
          title={'Get Started'}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: COLORS.light100,
          }}
          onPress={handleGetStartedOnPress}
        />
        <LargeButton
          title={'Login'}
          onPress={handleLoginOnPress}
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doubleCTAContainer: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: resize(10),
    marginBottom: resize(16),
    gap: 10,
    marginHorizontal: resize(16),
  },
});
