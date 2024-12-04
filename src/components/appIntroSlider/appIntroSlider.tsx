import React, { useRef, useState } from "react"
import { Animated, FlatList, StyleSheet, View } from "react-native"
import { resize } from "../../utils/deviceDimentions"
import AppIntroSliderItem from "./appIntroSliderItem"
import AppIntroSliderPagination from "./appIntroSliderPagnination"
import data from "./data"

const AppIntroSlider = () => {
  const [index, setIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event)
  }

  const handleOnViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    const newIndex =
      (viewableItems && viewableItems[0] && viewableItems[0]?.index) || index
    setIndex(newIndex)
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 30,
  }).current

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <AppIntroSliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />
      <AppIntroSliderPagination data={data} scrollX={scrollX} index={index} />
    </View>
  )
}

export default AppIntroSlider

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatList: {
    paddingTop: resize(90),
  },
})
