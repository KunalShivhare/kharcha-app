import { Image, View } from 'react-native';
import React from 'react';
import { faker } from '@faker-js/faker/.';
import { HStack } from '../customUI/HStack';
import { VStack } from '../customUI/VStack';
import { Text } from '../text';
import Button from '../buttons/button';
import { COLORS } from '@/src/providers/theme.style';
import { AntDesign } from '@expo/vector-icons';
import { resize } from '@/src/utils/deviceDimentions';
import { router } from 'expo-router';
import { useGroupStore } from '@/src/stores/groupStore';
import { padding } from '../themes/globalStyles';

const GroupList = ({}) => {
  const groups = useGroupStore((state) => state.groups);

  const onAdd = () => {
    router.push('/groups/createGroup');
  };
  return (
    <VStack
      style={{
        paddingHorizontal: 16,
        paddingTop: 24,
      }}
    >
      <HStack
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text variant={'heading3_semibold'} fontColor="white">
          Groups
        </Text>
        <Button
          type="Secondary"
          title="Add"
          textVariant="label3_regular"
          customStyle={{
            borderColor: '#1CC29F',
            borderRadius: 8,
            height: 'auto',
            paddingVertical: 2,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          color="#1CC29F"
          size={'short'}
          textStyle={{
            paddingRight: 2,
            alignSelf: 'center',
          }}
          onPress={onAdd}
          customRightElement={<AntDesign name={'plus'} size={resize(10)} color="#1CC29F" />}
        />
      </HStack>
      {groups.map((group: any) => {
        return (
          <HStack style={padding.t16} key={group?.id}>
            <VStack>
              <Image
                source={{ uri: group?.avatar ?? faker.image.avatar() }}
                style={{ height: 80, width: 80, resizeMode: 'contain', borderRadius: 15 }}
              />
            </VStack>
            <VStack
              style={{
                paddingHorizontal: 16,
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <Text variant={'heading4_bold'} fontColor="white">
                {group?.name}
              </Text>

              <Text variant={'label2_regular'} fontColor={'#ACE4D6'}>
                {}
              </Text>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default GroupList;
