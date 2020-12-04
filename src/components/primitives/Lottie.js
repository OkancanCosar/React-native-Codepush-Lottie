import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const Lottie = props => {
  const { Data, style } = props;
  if (!Data) return <View />;

  return <LottieView style={style} source={Data.src} autoPlay loop={Data.loop} />;
};

export { Lottie };
