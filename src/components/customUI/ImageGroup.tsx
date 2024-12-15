import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const ImageGroup = ({ images }) => {
  // Ensure only the first three images are displayed
  const displayedImages = images.slice(0, 3);

  return (
    <View style={styles.container}>
      {displayedImages.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={[styles.image, index > 0 && styles.overlap]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25, // Makes images circular
    borderWidth: 2,
    borderColor: 'white', // Optional: Add a border for clarity
  },
  overlap: {
    marginLeft: -15,
  },
});

export default ImageGroup;
