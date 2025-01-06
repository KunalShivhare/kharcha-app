import { Image, Pressable, View } from 'react-native';
import React from 'react';
import { Text } from '@/src/components/text';
import { HStack } from '@/src/components/customUI/HStack';
import { Layout, padding, gap } from '@/src/components/themes/globalStyles';
import { faker } from '@faker-js/faker/.';
import { MaterialIcons } from '@expo/vector-icons';

const PaidByList = ({
  selectedUser,
  users,
  componentId,
  closeModal,
  onPress,
}: {
  selectedUser: any;
  users: [];
  componentId?: string;
  closeModal?: () => void;
  onPress?: (user: any) => void;
}) => {
  return (
    <View style={gap.g16}>
      <HStack
        style={[
          Layout.container,
          padding.l16,
          padding.r16,
          gap.g10,
          Layout.alignCenter,
          Layout.spaceBetween,
        ]}
        key={selectedUser?.phoneNumber}
      >
        <HStack style={[Layout.alignCenter, gap.g10]}>
          <Image
            source={{ uri: faker.image.avatar() }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 50,
            }}
          />
          <Text variant="label3_regular" fontColor="white">
            {selectedUser?.name}
          </Text>
        </HStack>
        <MaterialIcons name="check" size={30} color={'green'} />
      </HStack>
      {users.map((user: any) => {
        if (selectedUser?.phoneNumber !== user?.phoneNumber) {
          return (
            <Pressable
              onPress={() => {
                onPress && onPress(user);
                closeModal && closeModal();
              }}
              key={user?.phoneNumber}
            >
              <HStack
                style={[
                  Layout.container,
                  padding.l16,
                  padding.r16,
                  gap.g10,
                  Layout.alignCenter,
                  Layout.spaceBetween,
                ]}
                key={user?.phoneNumber}
              >
                <HStack style={[Layout.alignCenter, gap.g10]}>
                  <Image
                    source={{ uri: faker.image.avatar() }}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                    }}
                  />
                  <Text variant="label3_regular" fontColor="white">
                    {user?.name}
                  </Text>
                </HStack>
                {selectedUser?.phoneNumber === user?.phoneNumber && (
                  <MaterialIcons name="check" size={30} color={'green'} />
                )}
              </HStack>
            </Pressable>
          );
        }
      })}
    </View>
  );
};

export default PaidByList;
