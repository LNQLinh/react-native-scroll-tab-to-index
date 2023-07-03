import React, { useRef, useState } from "react"
import {
  FlatList,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text
} from "react-native"
import { color } from "./color"
import configs from "./configs"
import type { TextStyle } from "react-native"

const CONTAINER: ViewStyle = {
  flex: 1,
}

export interface ScrollIntoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  styleInto?: StyleProp<ViewStyle>
  styleTextInto?:StyleProp<TextStyle>
  dataHeader: any
  children: React.ReactNode
  dataLengthView: any
}

/**
 * Describe your component here
 */
export const ScrollInto = function ScrollInto(props: ScrollIntoProps) {
  const { styleInto, dataLengthView, dataHeader, children ,styleTextInto} = props
  const styles = Object.assign({}, CONTAINER, styleInto)

  const ref = useRef<any>(null)
  const refHead = useRef<any>(null)
  const [indexCurrent, setIndexCurrent] = useState(0)

  //scroll đến vị trí của title
  const scrollToIndex = (indexCurrent:any) => {
    setIndexCurrent(indexCurrent)
    refHead.current.scrollToIndex({ animated: true, index: indexCurrent, viewPosition: 0.5 })
  }

  const getItemLayout = (data:any, index:any) => {
    if(data){}
    return {
      length: configs.windowWidth / 3.5 - 20,
      offset: (configs.windowWidth / 3.5) * index,
      index,
    }
  }

  // xử lý scroll đến từng vị trí
  const scrollHandler = (index:any) => {
    if (dataLengthView.length >= index) {
      ref.current.scrollTo({
        x: 0,
        y: dataLengthView[index - 1],
        animated: true,
      })
    }
  }

  // xử lý scroll
  const handleScroll = (event:any) => {
    // console.log("event", event.nativeEvent.contentOffset.y)
    //tìm vị trí trùng
    const dtIndex = dataLengthView.findIndex((e:any) => e <= event.nativeEvent.contentOffset.y)
    // console.log("data index ", dtIndex)
    // nếu vị trí bằng 0 thì thực hiện câu điều kiện if để scroll theo từng title, còn không bằngg thì
    if (dtIndex == 0) {
      for (let i = 0; i < dataLengthView.length; i++) {
        if (dataLengthView[i] <= event.nativeEvent.contentOffset.y + 20) {
          scrollToIndex(i)
        }
      }
    }
    //console.log("indesx", indexCurrent)
  }

  //console.log("indexcurrent", indexCurrent)

  return (
    <View style={styles}>
      <View>
        <FlatList
          ref={refHead}
          data={dataHeader}
          keyExtractor={(_, index) => `${index}`}
          horizontal
          // lâý ra kích thước của  item
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={
                indexCurrent != index
                  ? BTN_TYPE
                  : [BTN_TYPE, { borderBottomWidth: 1, borderColor: color.mainColor }]
              }
              onPress={() => {
                scrollToIndex(index)
                scrollHandler(index + 1)
              }}
            >
              <Text style={[indexCurrent == index && { color: color.mainColor },styleTextInto]} >{item.tile}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView
        ref={ref}
        // scroll
        onScroll={handleScroll}
        decelerationRate={0.2}
        scrollEventThrottle={16}
      >
        {children}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  )
}

const BTN_TYPE: ViewStyle = {
  marginHorizontal: 16,
  paddingVertical: 10,
}
