import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { capitalize, hp } from '@/helper/common';
import { theme } from '@/constants/theme';

type SectionViewProps = {
  title: string;
  content: any;
};

const SectionView = ({ title, content }: SectionViewProps) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {title === 'Image_type' ? 'Type' : title}
      </Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRow = ({
  data,
  filterName,
  filters,
  setFilters,
}: any) => {
  const onSelect = (item: any) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: any, index: number) => {
          let isActive = filters && filters[filterName]?.includes(item);
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';
          let color = isActive ? 'white' : theme.colors.neutral(0.8);
          return (
            <Pressable
              key={item}
              style={[styles.outlinedButton, { backgroundColor }]}
              onPress={() => onSelect(item)}
            >
              <Text style={[styles.outlinedButtonText, { color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};
export const ColorFilter = ({ data, filterName, filters, setFilters }: any) => {
  const onSelect = (item: any) => {
    setFilters({ ...filters, [filterName]: item });
  };
  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item: any, index: number) => {
          let isActive = filters && filters[filterName]?.includes(item);
          let borderColor = isActive ? theme.colors.neutral(0.4) : 'white';

          return (
            <Pressable key={item} onPress={() => onSelect(item)}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: '600',
    color: theme.colors.neutral(0.8),
  },
  flexRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: theme.radius.xs,
    borderWidth: 1,
    borderColor: theme.colors.grayBg,
    borderCurve: 'continuous',
  },
  outlinedButtonText: {
    color: theme.colors.neutral(0.8),
    fontSize: hp(1.5),
  },
  color: {
    width: 40,
    height: 30,
    borderRadius: theme.radius.sm - 3,
    borderCurve: 'continuous',
  },
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: 'continuous',
  },
});

export default SectionView;
