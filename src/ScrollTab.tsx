import * as React from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import { ScrollInto } from './scrollInto';
import { color } from './color';
import type { TextStyle } from 'react-native';

const $container: ViewStyle = {
  minHeight: '100%',
  backgroundColor: color.white,
  paddingBottom: 16,
  maxHeight: '100%',
};



export interface ScrollTabProps {
  styleInto?: StyleProp<ViewStyle>
  styleTextInto?:StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleViewTitle?: StyleProp<ViewStyle>
  onPressItem: (value: any) => void;
  dataMenu: any;
}


export const ScrollTab = function ScrollTab(props: ScrollTabProps) {
  const [dataSourceCords, setDataSourceCords] = React.useState<Array<number>>([]);
  const { style, onPressItem, dataMenu, styleTitle,styleViewTitle,styleInto,styleTextInto } = props;
  const styles = Object.assign({}, $container, style);
  const stylesTitle = Object.assign({}, $title, styleTitle);
  const stylesViewTitle = Object.assign({}, $viewTitle, styleViewTitle);

  return (
    <View style={styles}>
      <ScrollInto dataHeader={dataMenu} dataLengthView={dataSourceCords} styleInto={styleInto} styleTextInto={styleTextInto}>
        {dataMenu.map((item: any, index: number) => {
          return (
            <View
              key={index}
              onLayout={(event) => {
                // lấy ra vị của view
                const layout = event.nativeEvent.layout;
                dataSourceCords[index] = layout.y;
                // set vào mảng
                setDataSourceCords(dataSourceCords);
              }}
            >
              <View style={stylesViewTitle}>
                <Text style={[stylesTitle]}>{item.tile}</Text>
              </View>
              {item.option.map((title: any, indexOption: any) => (
                <TypeSelect
                  key={indexOption}
                  title={title}
                  onSelect={() => onPressItem(title)}
                />
              ))}
            </View>
          );
        })}
      </ScrollInto>
    </View>
  );
};

interface TypeSelectProps {
  title?: string;
  onSelect?: () => void;
  active?: boolean;
}
export const TypeSelect = (props: TypeSelectProps) => {
  const { title, onSelect } = props;
  return (
    <>
      <TouchableOpacity onPress={onSelect}>
        {React.isValidElement(title) ? (
          title
        ) : (
          <Text style={$textSelect}>{title}</Text>
        )}
      </TouchableOpacity>
      <View style={{ height: 1, backgroundColor: color.backgroundSoft }} />
    </>
  );
};

const $textSelect: TextStyle = {
  fontSize: 14,
  color: color.neutral700,
  flex: 1,
  margin: 16,
};
const $viewTitle: ViewStyle = {
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 8,
  backgroundColor: color.backgroundSoft,
};
const $title: TextStyle = {
  fontSize: 18,
  color: color.neutral600,
};
