import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { Text } from '@/src/components/text';
import { VStack } from '@/src/components/customUI/VStack';
import { gap, Layout, margin, padding } from '@/src/components/themes/globalStyles';
import { HStack } from '@/src/components/customUI/HStack';
import { AuthorizeNavigationProp } from '@/src/navigators/authorizeStack';
import { useGroupStore } from '@/src/stores/groupStore';
import { faker } from '@faker-js/faker/.';
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '@/src/components/themes/hooks';
import { resize } from '@/src/utils/deviceDimentions';
import Header from '@/src/components/header/header';
import Separator from '@/src/components/customUI/Separator';
import { useGroupSetting } from './hooks';

const GroupSetting = () => {
  const { params } = useRoute<AuthorizeNavigationProp<'GroupDetails'>>();
  const { groupId } = params;
  const { currentGroup, onEditGroup, onAddPeople } = useGroupSetting({
    groupId: groupId,
  });
  const theme = useTheme();

  return (
    <ThemeWrapper>
      <>
        <Header title="Group Setting" />
        <VStack style={[padding.b16]}>
          <HStack style={[padding.h16, Layout.alignCenter]}>
            <VStack>
              <Image
                source={{ uri: currentGroup?.avatar ?? faker.image.avatar() }}
                style={{ height: 80, width: 80, resizeMode: 'contain', borderRadius: 15 }}
              />
            </VStack>
            <VStack style={[padding.h16, Layout.justifyCenter, gap.g10, Layout.container]}>
              <Text variant={'heading4_bold'} fontColor="white">
                {currentGroup?.name}
              </Text>
            </VStack>
            <Pressable onPress={onEditGroup}>
              <AntDesign name={'edit'} color={theme.colors.primaryText} size={resize(24)} />
            </Pressable>
          </HStack>
          <Separator customStyle={margin.v16} />
          <VStack style={[padding.h16]}>
            <Text variant="label2_regular">Group members</Text>
            <Pressable onPress={onAddPeople}>
              <HStack style={Layout.alignCenter}>
                <VStack style={padding.v20}>
                  <AntDesign name={'adduser'} color={theme.colors.primaryText} size={resize(24)} />
                </VStack>
                <VStack style={padding.l16}>
                  <Text variant={'label2_regular'} fontColor="white">
                    Add people to group
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </>
    </ThemeWrapper>
  );
};

export default GroupSetting;

const styles = StyleSheet.create({});
