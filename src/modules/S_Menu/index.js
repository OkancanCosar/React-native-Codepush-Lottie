import React from "react";
import { Text, View } from "react-native";

const S_Menu = props => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> MENU SCREEN </Text>
      <Text> Okancan COŞAR </Text>
      <Text> https://www.linkedin.com/in/okancancosar </Text>
      <Text
        onPress={() => {
          props.navigation.goBack();
        }}>
        Go back
      </Text>
    </View>
  );
};

export { S_Menu };
