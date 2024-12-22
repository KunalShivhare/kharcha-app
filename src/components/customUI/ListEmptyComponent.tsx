import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const ListEmptyComponent = () => {
  const emptyUrl = require('../../assets/lottie/empty.json');
  return (
    <View style={styles.lottieViewContainer}>
      <Text style={styles.font}>No Activities, Try splitting the expense.</Text>
      <LottieView
        style={{
          height: 100,
          width: '100%',
        }}
        loop={true}
        autoPlay
        resizeMode="contain"
        source={emptyUrl}
      />
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  lottieViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 200,
  },
  font: { color: 'white' },
});
