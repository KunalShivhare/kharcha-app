import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export interface ImageGroupProps {
  images: string[];
  imageHeight?: number;
  imageWidth?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

const ImageGroup = ({
  images,
  imageHeight,
  imageWidth,
  borderRadius,
  borderWidth,
  borderColor,
}: ImageGroupProps) => {
  const displayedImages = images.slice(0, 3);

  const imageStyle = () => {
    return {
      height: imageHeight || 40,
      width: imageWidth || 40,
      borderRadius: borderRadius || 25,
      borderWidth: borderWidth || 1,
      borderColor: borderColor || 'white',
    };
  };

  return (
    <View style={styles.container}>
      {displayedImages.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={[imageStyle(), index > 0 && styles.overlap]}
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
  overlap: {
    marginLeft: -15,
  },
});

export default ImageGroup;
