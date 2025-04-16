import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'

const width = Dimensions.get('window').width
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const fuwu = () => {
  const data = [
    { title: '轮播图1', text: '这是第一张轮播图' },
    { title: '轮播图2', text: '这是第二张轮播图' },
    { title: '轮播图3', text: '这是第三张轮播图' },
  ]

  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < data.length - 1) {
        flatListRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true
        })
      } else {
        flatListRef.current.scrollToIndex({
          index: 0,
          animated: true
        })
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [currentIndex])

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  )

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: width - 20 }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default fuwu