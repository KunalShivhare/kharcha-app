import AccountList from '@/src/components/customUI/AccountList';
import AvatarWithLabel from '@/src/components/customUI/AvatarWithLabel';
import { HStack } from '@/src/components/customUI/HStack';
import Separator from '@/src/components/customUI/Separator';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import { COLORS } from '@/src/providers/theme.style';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { faker } from '@faker-js/faker/.';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Account = () => {
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
  ];
  return (
    <View style={styles.flex1}>
      <Header title="Account" />
      <VStack style={styles.container}>
        <HStack style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <AvatarWithLabel
            uri={faker.image.avatar()}
            label="Rishabh Parsediya"
            subLabel="parsediyarishabh@gmail.com"
          />
          <Feather name="edit" size={24} color={COLORS.primary} />
        </HStack>
        <Separator />
        <AccountList featuresList={featuresList} />
      </VStack>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  flex1: {
    flex: 1,
  },
});
