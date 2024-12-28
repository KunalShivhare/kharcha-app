import React from 'react';
import { StatusBar, View, ViewStyle } from 'react-native';
import { Layout } from '../components/themes/globalStyles';
import { useTheme } from '@/src/components/themes/hooks';

const ThemeWrapper = ({ children, style }: { children: React.ReactElement; style?: ViewStyle }) => {
  const theme = useTheme();
  return (
    <View style={[Layout.container, { backgroundColor: theme.colors.primaryColor }, style]}>
      <StatusBar backgroundColor={theme.colors.primaryColor} barStyle={'light-content'} />
      {children}
    </View>
  );
};

export default ThemeWrapper;
