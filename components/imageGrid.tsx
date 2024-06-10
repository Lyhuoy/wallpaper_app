import { StyleSheet, View } from 'react-native';
import { MasonryFlashList } from '@shopify/flash-list';
import React from 'react';
import ImageCard from './imageCard';
import { getColumnCount, wp } from '@/helper/common';

type ImageGridProps = {
  images: any;
  router: any;
};
const ImageGrid = ({ images, router }: ImageGridProps) => {
  const columns = getColumnCount();
  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        contentContainerStyle={styles.listContainerStyles}
        numColumns={columns}
        renderItem={({ item, index }: any) => (
          <ImageCard
            item={item}
            index={index}
            columns={columns}
            router={router}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyles: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;
