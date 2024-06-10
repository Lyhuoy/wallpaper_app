import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';
import { getImageSize, wp } from '@/helper/common';
import { theme } from '@/constants/theme';

type ImageCardProps = {
  item: any;
  index: number;
  columns: number;
  router: any;
};

const ImageCard = ({ item, index, columns, router }: ImageCardProps) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };
  const getImageHeight = () => {
    let { imageHeight, imageWidth } = item;
    return { height: getImageSize(imageHeight, imageWidth) };
  };

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: 'home/image', params: { ...item } })
      }
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={item.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBg,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});

export default ImageCard;
