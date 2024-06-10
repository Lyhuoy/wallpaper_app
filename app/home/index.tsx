import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EvilIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { hp, wp } from '@/helper/common';
import { theme } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import Categories from '@/components/categories';
import { apiCall } from '@/api';
import ImageGrid from '@/components/imageGrid';
import _, { debounce } from 'lodash';
import FilterModal from '@/components/filterModal';
import { useRouter } from 'expo-router';

var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchRef = useRef<TextInput>(null);
  const [activeCategory, setActiveCategory] = useState<any>('');
  const [images, setImages] = useState<any>([]);
  const [search, setSearch] = useState('');
  const modalRef = useRef<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const [isFetchingImages, setIsFetchingImages] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchImages();
  }, []);

  const handleChangeCategory = (cat: any) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params: any = {
      page,
      ...filters,
    };
    if (cat) params.category = cat;
    fetchImages(params, false);
  };

  const clearThisFilter = (key: string) => {
    let newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
    page = 1;
    setImages([]);
    let params: any = {
      page,
      ...newFilters,
    };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);
  };

  const fetchImages = async (
    params: { page: number; q?: string } = { page: 1 },
    append = true
  ) => {
    setIsFetchingImages(true);
    let res = await apiCall(params);

    if (res) {
      if (append) {
        setImages([...images, ...res]);
      } else {
        setImages([...res]);
      }
    }
    setIsFetchingImages(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text }, false);
    }
    if (_.isEmpty(text)) {
      page = 1;
      searchRef?.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page }, false);
    }
  };

  const handleSearchDebounce = useCallback(debounce(handleSearch, 500), []);

  const openFilterModal = () => {
    modalRef.current?.present();
  };
  const closeFilterModal = () => {
    modalRef.current?.close();
  };

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFilterModal();
  };
  const resetFilters = () => {
    setFilters(null);
    closeFilterModal();
  };

  const handleScroll = (event: any) => {
    const containerHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeigh = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = containerHeight - scrollViewHeigh;

    if (scrollOffset >= bottomPosition + 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        page += 1;
        let params: any = {
          page,
          ...filters,
        };
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, true);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  const handleScrollUp = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <StatusBar style="inverted" />
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openFilterModal}>
          <FontAwesome6 name="bars-staggered" size={24} color="black" />
        </Pressable>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <EvilIcons
              name="search"
              size={24}
              color={theme.colors.neutral(0.9)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            placeholderTextColor={theme.colors.neutral(0.3)}
            style={styles.searchInput}
            onChangeText={handleSearchDebounce}
            ref={searchRef}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch('')}
            >
              <Ionicons
                name="close-outline"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
        {filters && Object.keys(filters).length > 0 ? (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {Object.keys(filters).map((key, index) => {
                return (
                  <View key={index} style={styles.filterItem}>
                    {key === 'colors' ? (
                      <View
                        style={[
                          styles.filterColor,
                          { backgroundColor: filters[key] },
                        ]}
                      ></View>
                    ) : (
                      <Text style={styles.filterItemText}>{filters[key]}</Text>
                    )}

                    <Pressable
                      style={styles.filterCloseIcon}
                      onPress={() => clearThisFilter(key)}
                    >
                      <Ionicons
                        name="close-outline"
                        size={14}
                        color={theme.colors.neutral(0.9)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : null}
        <View>
          <ImageGrid images={images} router={router} />

          <View
            style={{
              paddingVertical: 20,
            }}
          >
            {isFetchingImages && <ActivityIndicator size="large" />}
          </View>
        </View>
      </ScrollView>
      <FilterModal
        bottomSheetModalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: theme.radius.lg,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    borderWidth: 1,
    borderColor: theme.colors.neutral(0.1),
  },
  searchIcon: {
    padding: 6,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.neutral(0.9),
    fontSize: hp(2),
    paddingVertical: 8,
  },
  closeIcon: {
    marginLeft: 10,
    backgroundColor: theme.colors.neutral(0.1),
    padding: 6,
    borderRadius: 50,
  },
  categories: {},
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBg,
    flexDirection: 'row',
    borderRadius: theme.radius.xs,
    padding: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
  },
  filterItemText: {
    fontSize: hp(1.9),
    color: theme.colors.neutral(0.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 4,
    borderRadius: 7,
  },
  filterColor: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});

export default HomeScreen;
