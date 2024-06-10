import { Text, StyleSheet, View, Pressable } from 'react-native';
import React, { useMemo } from 'react';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { capitalize, hp } from '@/helper/common';
import { theme } from '@/constants/theme';
import SectionView, { ColorFilter, CommonFilterRow } from './fliterView';
import { data } from '@/constants/data';

type FilterModalProps = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  filters: any;
  applyFilters: () => void;
  resetFilters: () => void;
  setFilters: any;
};

const FilterModal = ({
  bottomSheetModalRef,
  filters,
  applyFilters,
  resetFilters,
  setFilters,
}: FilterModalProps) => {
  const snapPoints = useMemo(() => ['75%'], []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filter Modal</Text>
          {Object.keys(section).map((sectionName, index) => {
            const Section = section[sectionName];
            let sectionData = data.filters[sectionName];
            let title = capitalize(sectionName);

            return (
              <Animated.View
                key={sectionName}
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
              >
                <SectionView
                  title={title}
                  content={Section({
                    data: sectionData,
                    filters,
                    setFilters,
                    filterName: sectionName,
                  })}
                />
              </Animated.View>
            );
          })}
          <Animated.View
            style={styles.buttons}
            entering={FadeInDown.delay(500).springify().damping(11)}
          >
            <Pressable style={styles.resetButton} onPress={resetFilters}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={applyFilters}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({ animatedIndex, style }: any) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });
  const containerStyles = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];
  return (
    <Animated.View style={containerStyles}>
      <BlurView intensity={25} style={StyleSheet.absoluteFill} tint="dark" />
    </Animated.View>
  );
};

const section: any = {
  order: (props: any) => <CommonFilterRow {...props} />,
  orientation: (props: any) => <CommonFilterRow {...props} />,
  image_type: (props: any) => <CommonFilterRow {...props} />,
  colors: (props: any) => <ColorFilter {...props} />,
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 15,
    // width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: '500',
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  applyButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.8),
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.neutral(0.03),
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    borderWidth: 2,
    borderColor: theme.colors.grayBg,
  },
  buttonText: {
    fontSize: hp(2.2),
  },
});

export default FilterModal;
