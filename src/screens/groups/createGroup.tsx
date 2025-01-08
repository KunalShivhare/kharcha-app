import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import Header from '@/src/components/header/header';
import { VStack } from '@/src/components/customUI/VStack';
import { HStack } from '@/src/components/customUI/HStack';
import { faker } from '@faker-js/faker/.';
import InputField from '@/src/components/inputs/inputField';
import { resize } from '@/src/utils/deviceDimentions';
import Button from '@/src/components/buttons/button';
import { useGroups } from './hooks';
import { COLORS } from '@/src/providers/theme.style';
import { gap, Layout } from '@/src/components/themes/globalStyles';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { AuthorizeNavigationProp } from '@/src/navigators/authorizeStack';
import { useRoute } from '@react-navigation/native';

const CreateGroup = () => {
  const { params } = useRoute<AuthorizeNavigationProp<'CreateGroup'>>();
  const { groupTypes, groupName, setGroupName, onDonePress, selectedGroupType, setGroupType } =
    useGroups(params || {});
  const imageURL = useMemo(() => faker.image.avatar(), []);

  return (
    <ThemeWrapper>
      <View style={Layout.container}>
        <Header title="Create a Group" />
        <VStack flex={1}>
          <HStack style={[Layout.alignCenter, gap.g10]} p={16}>
            <Image
              source={{ uri: imageURL }}
              style={{ height: 60, width: 60, resizeMode: 'contain' }}
            />

            <VStack style={Layout.container}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                }}
              >
                Group Name
              </Text>
              <InputField
                value={groupName}
                onChangeText={setGroupName}
                style={{
                  padding: 0,
                  borderBottomWidth: 2,
                  borderBottomColor: 'white',
                  color: COLORS.light100,
                }}
              />
            </VStack>
          </HStack>
          <VStack>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                padding: 16,
              }}
            >
              Type
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  paddingHorizontal: 10,
                }}
              ></View>
              {groupTypes.map((item) => {
                return (
                  <Pressable
                    key={item.name}
                    style={{
                      paddingVertical: resize(6),
                      paddingHorizontal: resize(32),
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: selectedGroupType === item.name ? COLORS.orange : 'white',
                      borderWidth: 1,
                      marginRight: resize(16),
                    }}
                    onPress={() => setGroupType(item.name)}
                  >
                    <Text
                      style={{
                        color: selectedGroupType === item.name ? COLORS.orange : 'white',
                      }}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </VStack>
        </VStack>
        <VStack
          style={[
            {
              padding: 10,
              bottom: 10,
            },
          ]}
        >
          <Button
            type="Primary"
            size="long"
            title="Done"
            onPress={onDonePress}
            customStyle={{
              backgroundColor: '#1CC29F',
              borderWidth: 0,
            }}
          />
        </VStack>
      </View>
    </ThemeWrapper>
  );
};

export default CreateGroup;
