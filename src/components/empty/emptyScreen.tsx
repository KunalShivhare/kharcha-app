import React from 'react';
import LottieView from 'lottie-react-native';
import { VStack } from '../customUI/VStack';
import { padding, Layout } from '../themes/globalStyles';
import Button from '../buttons/button';
import { Text } from '../text';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

const EmptyScreen = ({
  onPress,
  buttonTitle,
  showButton,
  lottieViewStyle,
}: {
  onPress?: () => void;
  buttonTitle?: string;
  showButton?: boolean;
  lottieViewStyle?: StyleProp<ViewStyle>;
}) => {
  const emptyUrl = require('../../assets/lottie/empty.json');
  return (
    <VStack flex={1} style={[Layout.justifyCenter, Layout.alignCenter, padding.b50]}>
      <LottieView
        style={[styles.lottieView, lottieViewStyle]}
        loop={true}
        autoPlay
        resizeMode="contain"
        source={emptyUrl}
      />
      <Text fontColor="white">Oops! Nothing here</Text>
      {showButton && (
        <Button
          type="Secondary"
          title={buttonTitle ?? '+ Add'}
          textVariant="label3_regular"
          customStyle={{ ...styles.customStyle, marginTop: 10 }}
          color="#1CC29F"
          size={'short'}
          textStyle={{ ...padding.r2, ...Layout.alignSelfCenter }}
          onPress={onPress && onPress}
        />
      )}
    </VStack>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  customStyle: {
    borderColor: '#1CC29F',
    borderRadius: 8,
    height: 'auto',
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lottieView: {
    height: 150,
    width: 150,
  },
});
