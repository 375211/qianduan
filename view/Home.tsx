import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, Animated, FlatList } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type CarouselItem = {
  id: number;
  title: string;
  image: string;
}

const { width: screenWidth } = Dimensions.get('window');

const Home = ({ navigation }:{navigation:any}) => {
  const [carouselItems] = useState<CarouselItem[]>([
    { id: 1, title: '社区活动', image: 'https://picsum.photos/600/300' },
    { id: 2, title: '环境整治', image: 'https://picsum.photos/600/300' },
    { id: 3, title: '文化建设', image: 'https://picsum.photos/600/300' },
  ]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < carouselItems.length - 1) {
        if(flatListRef.current){
          flatListRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
        }
      } else {
        if(flatListRef.current){
           flatListRef.current.scrollToIndex({
          index: 0,
          animated: true,
        });
        }
      }
    }, 3000);

    return () => clearInterval(timer)
  }, [currentIndex, carouselItems.length]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderCarouselItem = ({ item }: { item: CarouselItem }) => (
    <View style={[styles.carouselItem, { width: screenWidth - 40 }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.carouselImage}
        resizeMode="contain"
      />
      <View style={styles.carouselTitleContainer}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle} onPress={()=>navigation.navigate('Login')}>城市花园</Text>
      </View>

      {/* 轮播图 */}
      <View style={[styles.carouselContainer]}>
        <AnimatedFlatList
          ref={flatListRef}
          data={carouselItems}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          renderItem={renderCarouselItem}
        />
      </View>

      {/* 公告栏 */}
      <View style={styles.noticeBar}>
        <Icon name="campaign" size={24} color="#FF6B6B" />
        <Text style={styles.noticeText} onPress={()=>{navigation.navigate('PassQRcode')}}>1号元水管改造，停供水12小时</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>更多</Text>
        </TouchableOpacity>
      </View>

      {/* 常用服务 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>常用服务</Text>
        <View style={styles.serviceGrid}>
          <ServiceItem icon="assignment" title="楼盘表" />
          <ServiceItem icon="autorenew" title="巡更" />
          <ServiceItem icon="build" title="维修处理" />
          <ServiceItem icon="feedback" title="投诉建议" />
          <ServiceItem icon="vpn-key" title="远程开门" />
          <ServiceItem icon="people" title="访客管理" />
          <ServiceItem icon="qr-code" title="扫码审核" />
          <ServiceItem icon="more-horiz" title="更多" onPress={() => navigation.navigate('More')} />
        </View>
      </View>

      {/* 社区生活 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>社区生活</Text>
        <View style={styles.communityGrid}>
          <CommunityItem title="和生活" />
          <CommunityItem title="智品商城" />
        </View>
      </View>
    </ScrollView>
  );
};

const ServiceItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.serviceItem} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={28} color="#4A90E2" />
    </View>
    <Text style={styles.serviceTitle}>{title}</Text>
  </TouchableOpacity>
);

const CommunityItem = ({ title }) => (
  <TouchableOpacity style={styles.communityItem}>
    <View style={styles.communityImagePlaceholder}></View>
    <Text style={styles.communityTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  carouselContainer: {
    marginVertical: 15,
    height: 180,
    marginHorizontal: 15,
  },
  carouselItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    width: screenWidth - 30,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  carouselTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  carouselTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noticeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
  },
  noticeText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  moreText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  serviceItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#F0F7FF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 1,
  },
  serviceTitle: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  communityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  communityItem: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  communityImagePlaceholder: {
    width: '100%',
    height: 130,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 12,
  },
  communityTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
});

export default Home