# Navigation handbook

[offical react-navigation](https://yarnpkg.com/package/react-navigation)

#### Install navigation packages in the project

```bash
$    yarn add react-native-gesture-handler @react-navigation/native @react-navigation/stack
$    yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

#### Usage

[Example component](../src/App.js)

```js
import "react-native-gesture-handler";
import React from "react";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { S_Login, S_Menu } from "./modules";

enableScreens();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="S_Login" screenOptions={{ gestureEnabled: true, headerShown: false }}>
        <Stack.Screen name="S_Login" component={S_Login} />
        <Stack.Screen name="S_Menu" component={S_Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
```
