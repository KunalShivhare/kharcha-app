import { COLORS } from '@/src/providers/theme.style';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { FlatList, StyleSheet, Text, TextProps, View } from 'react-native';
import { HStack } from './HStack';
import Separator from './Separator';
import { VStack } from './VStack';
type FeatureIconProps = {
  name: string;
  size: number;
  color: string;
} & Partial<TextProps>;

type SubFeature = {
  heading: string;
  subHeading: string;
  icon: React.ReactElement<FeatureIconProps> | string;
};

type Feature = {
  name: string;
  subList: SubFeature[];
};

type FeaturesListProps = {
  featuresList: Feature[];
};

const AccountList = ({ featuresList }: FeaturesListProps) => {
  const renderSubFeature = ({ item }: { item: SubFeature }) => (
    <HStack>
      <View style={[styles.center, styles.iconContainer]}>
        {typeof item?.icon === 'string' ? <Text>{item?.icon}</Text> : item?.icon}
      </View>
      <HStack style={[styles.center, styles.subList]}>
        <View>
          <Text style={styles.font}>{item?.heading}</Text>
          <Text style={styles.subHeading}>{item?.subHeading}</Text>
        </View>
        <AntDesign style={styles.alignSelf} name="right" size={16} color={COLORS.primary} />
      </HStack>
    </HStack>
  );
  const renderItem = ({ item }: { item: Feature }) => {
    return (
      <VStack style={{ paddingVertical: 8 }}>
        <Text style={[styles.font, styles.featureName]}>{item?.name}</Text>
        <FlatList
          data={item?.subList}
          keyExtractor={(_, subIndex) => `${item?.name}-${subIndex}`}
          renderItem={renderSubFeature}
        />
      </VStack>
    );
  };
  return (
    <VStack>
      <FlatList
        data={featuresList}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator />}
      />
    </VStack>
  );
};

export default AccountList;

const styles = StyleSheet.create({
  featureName: {
    fontSize: 16,
    marginVertical: 4,
  },
  alignSelf: { alignSelf: 'center' },
  subList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
    flex: 1,
  },
  font: {
    color: 'white',
  },
  center: {
    justifyContent: 'center',
  },
  iconContainer: {
    paddingVertical: 12,
  },
  subHeading: {
    color: COLORS.dark25,
  },
});
