import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import { COLORS } from '../../providers/theme.style';
import { resize } from '../../utils/deviceDimentions';
import { useAuth } from '@/src/providers/AuthProvider';
import { useAuthorizeNavigation, useUnauthorizeNavigation } from '@/src/navigators/navigators';

const Header: React.FC<{
  title: string;
  titleStyle?: TextStyle;
  onPressback?: () => void;
  showBackButton?: boolean;
  customRightElement?: ReactElement;
}> = ({ title, titleStyle, onPressback, showBackButton = true, customRightElement }) => {
  const { isAuthenticated } = useAuth();
  const navigation = isAuthenticated ? useAuthorizeNavigation() : useUnauthorizeNavigation();
  const handleOnPressBackButton = () => {
    if (onPressback) {
      onPressback();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        {showBackButton ? (
          <Pressable style={styles.backButtonContainer} onPress={handleOnPressBackButton}>
            <AntDesign name="arrowleft" size={resize(32)} color="white" />
          </Pressable>
        ) : (
          <View style={styles.flex10Percent}></View>
        )}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
        {customRightElement ? (
          <View style={[styles.flex10Percent, styles.customRightElementContainer]}>
            {customRightElement}
          </View>
        ) : (
          <View style={styles.flex10Percent}></View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: resize(64),
    justifyContent: 'center',
  },
  headerSubContainer: {
    height: resize(32),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: resize(16),
  },
  flex10Percent: {
    flex: 0.1,
  },
  backButtonContainer: {
    flex: 0.1,
  },
  customRightElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: resize(64),
  },
  title: {
    color: COLORS.light100,
    fontSize: resize(18),
    lineHeight: resize(22),
    fontWeight: '600',
  },
});
