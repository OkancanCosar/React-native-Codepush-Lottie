import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Assets } from "@assets";
import { Lottie } from "../primitives/Lottie";
import { height } from "../styles/GStyles";

const UpdateApp = props => {
  const { Message, Info, Anim } = props.Data;

  return (
    <View style={styles.container}>
      <Lottie Data={Anim} style={styles.lottie} />
      <View style={styles.textContainer}>
        <Text style={styles.messageText}> {Message} </Text>
        <Text style={styles.infoText}> {Info} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  lottie: {
    height: height / 3,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  messageText: {
    textAlign: "center",
  },
  infoText: {
    textAlign: "center",
  },
});

const AnimEnums = {
  SEARCHING: { src: Assets.Anims.Searching, loop: true },
  CANCELLED: { src: Assets.Anims.Cancelled, loop: false },
  UPDATING: { src: Assets.Anims.Updateing, loop: true },
  WAITING_RESPONSE: { src: Assets.Anims.WaitingResponse, loop: true },
  COMPLETED: { src: Assets.Anims.Success, loop: false },
};

export { UpdateApp, AnimEnums };
