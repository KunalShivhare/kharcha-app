import ProgressBar from '@/src/components/animated/progressBar';
import Button from '@/src/components/buttons/button';
import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import EmptyScreen from '@/src/components/empty/emptyScreen';
import Header from '@/src/components/header/header';
import { Text } from '@/src/components/text';
import { gap, Layout, padding } from '@/src/components/themes/globalStyles';
import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import { faker } from '@faker-js/faker/.';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useGroups } from './hooks';
import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { useRoute } from '@react-navigation/native';
import { AuthorizeNavigationProp } from '@/src/navigators/authorizeStack';
import { AntDesign } from '@expo/vector-icons';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';

const GroupDetails = () => {
  const { params } = useRoute<AuthorizeNavigationProp<'GroupDetails'>>();
  const { groupId } = params;
  const { owed, own, onSettleUp, onViewDetails, onBalance, onAdd, groupData, expenseData } =
    useGroups({
      groupId,
    });
  const navigation = useAuthorizeNavigation();
  const SettingElement = () => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('GroupSetting', {
            groupId: groupId,
          })
        }
      >
        <AntDesign name="setting" size={resize(32)} color="white" />
      </Pressable>
    );
  };
  return (
    <ThemeWrapper>
      <View style={[Layout.container]}>
        <Header title={groupData?.name ?? 'Group'} customRightElement={<SettingElement />} />

        <VStack style={styles.groupCardContainer}>
          <HStack>
            <VStack>
              <Image source={{ uri: faker.image.avatar() }} style={styles.groupIcon} />
            </VStack>
            <VStack style={styles.groupInfoContainer}>
              <HStack style={styles.justifyBetween}>
                <VStack>
                  <Text variant={'label4_regular'} fontColor="#979797" style={styles.texWhite}>
                    Total Owed
                  </Text>
                  <Text
                    variant={'label1_regular'}
                    fontColor="#1CC29F"
                    style={styles.paddingT10}
                  >{`+$${owed}`}</Text>
                </VStack>
                <VStack>
                  <Text variant={'label4_regular'} fontColor="#979797" style={styles.texWhite}>
                    Total Owe
                  </Text>
                  <Text
                    variant={'label1_regular'}
                    fontColor={COLORS.orange}
                    style={[styles.texWhite, styles.paddingT10]}
                  >{`-$${own}`}</Text>
                </VStack>
              </HStack>
              <ProgressBar
                owed={owed}
                own={own}
                style={{
                  marginTop: resize(8),
                }}
              />
            </VStack>
          </HStack>
          <HStack style={[styles.justifyBetween, styles.paddingT10]}>
            <Button type="Primary" size="short" title="Settle up" onPress={onSettleUp} />
            <Button
              type="Secondary"
              size="short"
              title="View Details"
              onPress={onViewDetails}
              customStyle={styles.backgroundTransparent}
            />
            <Button
              type="Secondary"
              size="short"
              title="Balance"
              onPress={onBalance}
              customStyle={styles.backgroundTransparent}
            />
          </HStack>
        </VStack>
        {expenseData?.length ? (
          <VStack style={[padding.h16, padding.v16]}>
            <HStack style={[Layout.spaceBetween, Layout.alignCenter, padding.b24]}>
              <Text variant={'heading3_semibold'} fontColor="white">
                Expenses
              </Text>
              <Button
                type="Secondary"
                title="+ Add"
                textVariant="label3_regular"
                customStyle={styles.customStyle}
                color="#1CC29F"
                size={'short'}
                textStyle={{ ...padding.r2, ...Layout.alignSelfCenter }}
                onPress={() => onAdd(groupId)}
              />
            </HStack>
            {expenseData.map((expense: any) => {
              return (
                <HStack key={expense?.id} pb={16}>
                  <VStack>
                    <Image
                      source={{ uri: expense?.avatar }}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'contain',
                        borderRadius: 50,
                      }}
                    />
                  </VStack>
                  <VStack style={[Layout.container, padding.h16, gap.g4]}>
                    <Text variant={'heading4_bold'} fontColor="white">
                      {expense?.description}
                    </Text>
                    {expense?.expenseType === 'LENT' ? (
                      <Text variant={'label2_medium'} fontColor="#979797">
                        {`You paid ₹${expense?.amount}`}
                      </Text>
                    ) : (
                      <Text variant={'label2_medium'} fontColor="#979797">
                        {`${expense?.paidByUser?.firstName ?? String(expense?.paidByUser?.name).split(' ')[0]} paid ₹${expense?.amount}`}
                      </Text>
                    )}
                  </VStack>
                  <VStack style={[Layout.justifyFlexEnd, Layout.alignFlexEnd, gap.g4]}>
                    <Text variant={'label2_medium'} fontColor="#979797">
                      Dec, 09
                    </Text>
                    {expense?.expenseType === 'LENT' ? (
                      <Text variant={'heading4_bold'} fontColor="#ACE4D6">
                        {`₹ ${expense?.totalLent}`}
                      </Text>
                    ) : (
                      <Text variant={'heading4_bold'} fontColor={'rgb(241, 109, 76)'}>
                        {`₹ ${expense?.totalOwed}`}
                      </Text>
                    )}
                  </VStack>
                </HStack>
              );
            })}
          </VStack>
        ) : (
          <>
            <EmptyScreen showButton buttonTitle={'+ Add Expense'} onPress={() => onAdd(groupId)} />
          </>
        )}
      </View>
    </ThemeWrapper>
  );
};

export default GroupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupCardContainer: {
    backgroundColor: COLORS.dark50,
    margin: 16,
    padding: 10,
    borderRadius: 15,
  },
  groupIcon: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  groupInfoContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  texWhite: {
    color: 'white',
  },
  paddingT10: {
    paddingTop: 10,
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
  },
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
