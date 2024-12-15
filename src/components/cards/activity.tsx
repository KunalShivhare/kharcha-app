import { COLORS } from '@/src/providers/theme.style';
import { resize } from '@/src/utils/deviceDimentions';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ImageGroup from '../customUI/ImageGroup';
import { Text } from '../text';
import Tag from './tag';

const ActivityCard = () => {
  const images = [
    'https://picsum.photos/200',
    'https://picsum.photos/200',
    'https://picsum.photos/200',
  ];
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.avatarLabelRow}>
          <Image style={styles.image} source={require('../../../assets/user.png')} />
          <View style={styles.activityContainer}>
            <Text fontColor="white" style={[styles.textWhite, styles.activityHeading]}>
              PDC Printout
            </Text>
            <Text fontColor="rgb(229, 229, 231)" style={[styles.activitySubHeading]}>
              You added
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Tag type="lent" size="short" title="Settled" showPointer />
            <Text
              variant={'heading3_bold'}
              fontColor="white"
              style={[styles.textWhite, styles.amount]}
            >
              $30.00
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.userGroup}>
          <Text fontColor="rgb(229, 229, 231)" variant="label3_regular">
            06:47 PM Dec 14, 2024
          </Text>
          <ImageGroup images={images} />
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  container: { padding: 12, height: resize(172) },
  innerContainer: {
    padding: 16,
    flex: 1,
    backgroundColor: '#383b3f',
    borderRadius: 20,
  },
  avatarLabelRow: { flexDirection: 'row' },
  activityContainer: { flex: 1, alignItems: 'flex-start', padding: 12 },
  image: { width: 80, height: 80 },
  textWhite: {
    color: 'white',
  },
  activityHeading: { fontSize: 16, fontWeight: '700' },
  activitySubHeading: { fontSize: 16, fontWeight: '300' },
  amount: {
    flex: 1,
    alignSelf: 'center',
  },
  separator: { height: 2, marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 20 },
  userGroup: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
