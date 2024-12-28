import { Image, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { faker } from '@faker-js/faker/.';
import { HStack } from '../customUI/HStack';
import { VStack } from '../customUI/VStack';
import { Text } from '../text';
import Button from '../buttons/button';
import { useGroupStore } from '@/src/stores/groupStore';
import { gap, Layout, padding } from '../themes/globalStyles';
import { useShallow } from 'zustand/react/shallow';
import { useGroups } from '@/src/screens/groups/hooks';
import EmptyScreen from '../empty/emptyScreen';
import { useContactStore } from '@/src/stores/contactStore';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useTheme } from '../themes/hooks';

const GroupList = (props: any) => {
  const navigation = useAuthorizeNavigation();
  const [groups, groupLength] = useGroupStore(
    useShallow((state) => [state.groups, state.groups.length])
  );
  const theme = useTheme();
  const contacts = useContactStore((state) => state.contacts);
  const { onPressGroupCard } = useGroups();

  const onAdd = () => {
    if (contacts.length) {
      navigation.navigate('ContactList', {
        headerTitle: 'New Group',
        navigateToScreen: 'CreateGroup',
      });
    } else {
      navigation.navigate('CreateGroup');
    }
  };

  const renderHeader = ({ showButton }: { showButton: boolean }) => {
    return (
      <HStack style={[Layout.spaceBetween, Layout.alignCenter]}>
        <Text variant={'heading3_semibold'} fontColor={theme.colors.primaryText}>
          Groups
        </Text>
        {showButton && (
          <Button
            type="Secondary"
            title="+ Add"
            textVariant="label3_regular"
            customStyle={styles.customStyle}
            color="#1CC29F"
            size={'short'}
            textStyle={{ ...padding.r2, ...Layout.alignSelfCenter }}
            onPress={onAdd}
          />
        )}
      </HStack>
    );
  };

  return (
    <VStack flex={1} style={[padding.t24, padding.h16]}>
      {groupLength ? (
        <VStack>
          {renderHeader({
            showButton: true,
          })}
          {groups?.map((group: any) => {
            return (
              <Pressable key={group?.id} onPress={() => onPressGroupCard(group)}>
                <HStack style={padding.t16}>
                  <VStack>
                    <Image
                      source={{ uri: group?.avatar ?? faker.image.avatar() }}
                      style={{ height: 80, width: 80, resizeMode: 'contain', borderRadius: 15 }}
                    />
                  </VStack>
                  <VStack style={[padding.h16, Layout.justifyCenter, gap.g10]}>
                    <Text variant={'heading4_bold'} fontColor="white">
                      {group?.name}
                    </Text>

                    <Text variant={'label2_regular'} fontColor={'#ACE4D6'}>
                      {}
                    </Text>
                  </VStack>
                </HStack>
              </Pressable>
            );
          })}
        </VStack>
      ) : (
        <VStack flex={1}>
          {renderHeader({
            showButton: false,
          })}
          <EmptyScreen showButton buttonTitle="+ Create Group" onPress={onAdd} />
        </VStack>
      )}
    </VStack>
  );
};

export default GroupList;

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
});
