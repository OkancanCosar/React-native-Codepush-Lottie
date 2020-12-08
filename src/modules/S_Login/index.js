import React from "react";
import { Text, View } from "react-native";

const S_Login = props => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> LOGIN SCREEN </Text>
      <Text> Okancan COŞAR </Text>
      <Text> https://www.linkedin.com/in/okancancosar </Text>
      <Text
        onPress={() => {
          props.navigation.navigate("S_Menu");
        }}>
        Go to Menu
      </Text>
    </View>
  );
};
export { S_Login };
