# Lottie handbook

[offical lottie-react-native](https://yarnpkg.com/package/lottie-react-native)

#### Install lottie package in the project

```bash
$    yarn add lottie-react-native
$    npx react-native link lottie-react-native
```

#### Usage

[Example primitive component](../src/components/primitives/Lottie.js)

```js
import LottieView from "lottie-react-native";

<LottieView source={require("pathtojson")} autoPlay loop />;
```
