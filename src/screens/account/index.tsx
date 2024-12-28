import AccountList from '@/src/components/customUI/AccountList';
import AvatarWithLabel from '@/src/components/customUI/AvatarWithLabel';
import { HStack } from '@/src/components/customUI/HStack';
import Separator from '@/src/components/customUI/Separator';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import { Layout } from '@/src/components/themes/globalStyles';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { COLORS } from '@/src/providers/theme.style';
import { useSelfStore } from '@/src/stores/selfStore';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Account = () => {
  const { self } = useSelfStore();

  const featuresList = [
    {
      name: 'Additions',
      subList: [
        {
          heading: 'Scan QR Code',
          subHeading: 'Use QR Code to add a friend',
          icon: <Ionicons name="qr-code" size={28} color={COLORS.primary} />,
        },
        {
          heading: 'Get Premium',
          subHeading: 'Unlock the premium with 25% discount',
          icon: <Ionicons name="diamond" size={28} color={COLORS.primary} />,
        },
        {
          heading: 'Logout',
          subHeading: 'Logout from the app',
          icon: <Ionicons name="qr-code" size={28} color={COLORS.primary} />,
        },
        {
          heading: 'Get Premium',
          subHeading: 'Unlock the premium with 25% discount',
          icon: <Ionicons name="diamond" size={28} color={COLORS.primary} />,
        },
      ],
    },
    {
      name: 'Additions',
      subList: [
        {
          heading: 'Scan QR Code',
          subHeading: 'Use QR Code to add a friend',
          icon: <Ionicons name="qr-code" size={28} color={COLORS.primary} />,
        },
        {
          heading: 'Get Premium',
          subHeading: 'Unlock the premium with 25% discount',
          icon: <Ionicons name="diamond" size={28} color={COLORS.primary} />,
        },
      ],
    },
    {
      name: 'Application',
      subList: [
        {
          heading: 'Logout',
          subHeading: 'Logout from the app',
          icon: <Ionicons name="qr-code" size={28} color={COLORS.primary} />,
        },
        {
          heading: 'Get Premium',
          subHeading: 'Unlock the premium with 25% discount',
          icon: <Ionicons name="diamond" size={28} color={COLORS.primary} />,
        },
      ],
    },
  ];
  return (
    <ThemeWrapper>
      <View style={Layout.container}>
        <Header title="Account" />
        <ScrollView>
          <VStack style={styles.container}>
            <HStack style={styles.labelContainer}>
              <AvatarWithLabel uri={self?.image} label={self?.name} subLabel={self?.email} />
              <Feather name="edit" size={24} color={COLORS.primary} />
            </HStack>
            <Separator />
            <AccountList featuresList={featuresList} />
          </VStack>
        </ScrollView>
      </View>
    </ThemeWrapper>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  labelContainer: { justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  flex1: {
    flex: 1,
  },
});
