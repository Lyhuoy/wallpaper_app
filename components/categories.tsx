import { StyleSheet, FlatList, Text, View, Pressable } from 'react-native';
import React from 'react';
import { data } from '@/constants/data';
import { hp, wp } from '@/helper/common';
import { theme } from '@/constants/theme';
import Animated, { FadeInRight } from 'react-native-reanimated';

type CategoriesProps = {
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
};

const Categories = ({
  activeCategory,
  handleChangeCategory,
}: CategoriesProps) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};

const CategoryItem = ({
  title,
  index,
  isActive,
  handleChangeCategory,
}: any) => {
  let color = isActive ? 'white' : theme.colors.neutral(0.8);
  let backgroundColor = isActive ? theme.colors.neutral(0.8) : 'white';
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={[styles.categoryTitle, { backgroundColor }]}
        onPress={() => handleChangeCategory(isActive ? '' : title)}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  categoryTitle: {
    padding: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
  },
  title: {
    color: theme.colors.neutral(0.6),
    fontSize: hp(1.8),
    fontWeight: '500',
  },
});

export default Categories;
