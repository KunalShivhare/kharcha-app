import GroupList from '@/src/components/groups/groupList';
import MemberList from '@/src/components/members/mebersList';
import { Layout } from '@/src/components/themes/globalStyles';
import { useTheme } from '@/src/components/themes/hooks';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '@/src/utilities';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

const { height } = Dimensions.get('window');

enum MODAL_VARIANT {
  Bottom = 'bottom',
  Center = 'center',
}
type VariantType = MODAL_VARIANT.Center | MODAL_VARIANT.Bottom;

export type ICustomModalProps = {
  children: (componentId: string, closeModal?: () => void) => JSX.Element;
  title?: string;
  componentId: string;
  showHeader?: boolean;
  childStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  noScrollView?: boolean;
  cancelOnOutsideClick?: boolean;
  onDismiss?: Function;
  parentContainer: StyleProp<ViewStyle>;
  containerStyle: StyleProp<ViewStyle>;
  disableWrapperTouches?: boolean;
  disableHardwareBackButton?: boolean;
  Navigation: any;
  variant?: VariantType;
  hideClose?: boolean;
  componentKey?: string;
};

const CustomModal = () => {
  const animationState = useRef(new Animated.Value(height)).current;
  const childHeight = useRef(0);
  const { colors } = useTheme();
  const { params } = useRoute();
  const props = params as ICustomModalProps;
  const navigation = useAuthorizeNavigation();
  const theme = useTheme();

  useEffect(() => {
    handleAndroidBackButton(onBackPress);
    animation();

    return () => {
      removeAndroidBackButtonHandler(onBackPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animation = (dismiss = false) => {
    Animated.timing(animationState, {
      duration: 100,
      toValue: dismiss ? height : childHeight.current,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onBackPress = () => {
    const { disableHardwareBackButton } = props;
    if (disableHardwareBackButton) {
      return true;
    }
    closeModal();
    return true;
  };

  const closeModal = async () => {
    const { componentId, onDismiss } = props;
    navigation?.goBack();
    onDismiss && onDismiss();
  };

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { height: LayoutHeight } = nativeEvent?.layout;
    if (!childHeight.current) {
      childHeight.current = LayoutHeight;
    }
  };

  const {
    children,
    childStyle,
    componentId,
    cancelOnOutsideClick,
    noScrollView,
    parentContainer,
    containerStyle,
    disableWrapperTouches = false,
    variant,
    hideClose = false,
    componentKey,
  } = props;

  const contentStyle = [
    style.container,
    { paddingBottom: 0 },
    { backgroundColor: theme.colors.primaryColor },
    childStyle,
  ];

  const renderChildren = () => {
    switch (componentKey) {
      case 'GroupList':
        return <GroupList closeModal={closeModal} />;
      case 'MemberList':
        return <MemberList closeModal={closeModal} {...props} />;
      default:
        return null; // Handle cases where no valid key is passed
    }
  };

  return (
    <ThemeWrapper
      style={{
        backgroundColor: colors.overlay,
      }}
    >
      {
        <TouchableOpacity
          style={[
            Layout.container,
            parentContainer,
            variant === MODAL_VARIANT.Center ? style.centerModal : style.bottomModal,
          ]}
          activeOpacity={1}
          onPress={() => {
            cancelOnOutsideClick && closeModal();
          }}
          disabled={disableWrapperTouches}
        >
          {!hideClose && (
            <Pressable
              onPress={closeModal}
              style={[style.wrapper, { backgroundColor: theme.colors.primaryColor }]}
            >
              <AntDesign name="close" size={16} color={theme.colors.primaryText} />
            </Pressable>
          )}
          <TouchableWithoutFeedback style={contentStyle} disabled={disableWrapperTouches}>
            <Animated.View
              onLayout={onLayout}
              style={[...contentStyle, { transform: [{ translateY: animationState }] }]}
            >
              {noScrollView ? (
                <View style={[Layout.container, containerStyle]}>{renderChildren()}</View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                  {renderChildren()}
                </ScrollView>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      }
    </ThemeWrapper>
  );
};

CustomModal.defaultProps = {
  showHeader: true,
  title: '',
  childStyle: null,
  headerStyle: null,
  noScrollView: false,
  disableWrapperTouches: false,
  variant: MODAL_VARIANT.Bottom,
};

export default CustomModal;

const style = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    maxHeight: '85%',
    minHeight: '30%',
  },
  bottomModal: {
    justifyContent: 'flex-end',
  },
  centerModal: {
    justifyContent: 'center',
  },
  topView: {
    flex: 0,
    zIndex: 100,
  },
  wrapper: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 32,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
