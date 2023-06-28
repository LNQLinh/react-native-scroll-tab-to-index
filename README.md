# react-native-scroll-tab-to-index

HN

## Installation

```sh
npm install react-native-scroll-tab-to-index

yarn install react-native-scroll-tab-to-index
```
## Modal

<img src="src/Image/demo.gif" height="400px" style="margin-left:10px" />

## Usage

```js
import * as React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { ScrollTab } from 'react-native-scroll-tab-to-index';

const $text: TextStyle = {
  color: 'blue',
  fontSize: 20,
  margin: 16,
};

const $textTwo: TextStyle = {
  color: 'red',
  fontSize: 16,
  margin: 16,
};

const DATA_MENU = [
  {
    id: 1,
    tile: 'Title 1',
    option: [
      'Option 1',
      <View>
        <Text style={$textTwo}>Option 2</Text>
      </View>,
      <View>
        <Text style={$text}>Option 3</Text>
      </View>,
    ],
  },
  {
    id: 2,
    tile: 'Title 2',
    option: [
      'Option 1',
      <View>
        <Text style={$textTwo}>Option 2</Text>
      </View>,
      <View>
        <Text style={$text}>Option 3</Text>
      </View>,
    ],
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollTab onPressItem={(value) => {}} dataMenu={DATA_MENU} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
