import React, { useState, useEffect } from "react";
import { Platform, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { PERMISSIONS, RESULTS, requestMultiple, checkMultiple } from "react-native-permissions";

import { height } from "../components/styles/GStyles";
import { Strings } from "../components/strings";
import { Assets } from "@assets";
import { Lottie } from "../components/primitives/Lottie";

const TIMEOUT = 2000;
const AnimEnums = {
  CANCELLED: { src: Assets.Anims.Cancelled, loop: false },
  WAITING_RESPONSE: { src: Assets.Anims.WaitingResponse, loop: true },
  COMPLETED: { src: Assets.Anims.Success, loop: false },
};
const AllPerms =
  Platform.OS == "ios"
    ? [
        PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
        PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
        PERMISSIONS.IOS.CALENDARS,
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.CONTACTS,
        PERMISSIONS.IOS.FACE_ID,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.MEDIA_LIBRARY,
        PERMISSIONS.IOS.MICROPHONE,
        PERMISSIONS.IOS.MOTION,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        PERMISSIONS.IOS.REMINDERS,
        PERMISSIONS.IOS.SIRI,
        PERMISSIONS.IOS.SPEECH_RECOGNITION,
        PERMISSIONS.IOS.STOREKIT,
      ]
    : Platform.OS == "android"
    ? [
        //   PERMISSIONS.ANDROID.ACCEPT_HANDOVER,
        //   PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        //   PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        //   PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        //   PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
        //   PERMISSIONS.ANDROID.ADD_VOICEMAIL,
        //   PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS,
        PERMISSIONS.ANDROID.BODY_SENSORS,
        PERMISSIONS.ANDROID.CALL_PHONE,
        PERMISSIONS.ANDROID.CAMERA,
        //   PERMISSIONS.ANDROID.GET_ACCOUNTS,
        //   PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS,
        //   PERMISSIONS.ANDROID.READ_CALENDAR,
        //   PERMISSIONS.ANDROID.READ_CALL_LOG,
        //   PERMISSIONS.ANDROID.READ_CONTACTS,
        //   PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        //   PERMISSIONS.ANDROID.READ_PHONE_NUMBERS,
        //   PERMISSIONS.ANDROID.READ_PHONE_STATE,
        //   PERMISSIONS.ANDROID.READ_SMS,
        //   PERMISSIONS.ANDROID.RECEIVE_MMS,
        //   PERMISSIONS.ANDROID.RECEIVE_SMS,
        //   PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH,
        //   PERMISSIONS.ANDROID.RECORD_AUDIO,
        //   PERMISSIONS.ANDROID.SEND_SMS,
        //   PERMISSIONS.ANDROID.USE_SIP,
        //   PERMISSIONS.ANDROID.WRITE_CALENDAR,
        //   PERMISSIONS.ANDROID.WRITE_CALL_LOG,
        //   PERMISSIONS.ANDROID.WRITE_CONTACTS,
        //   PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]
    : [];

const checkPermRes = result => {
  let isAllGranted = true;
  for (const key in result) {
    if (result[key] !== RESULTS.GRANTED) isAllGranted = false;
  }
  return isAllGranted;
};

const C_Permission = props => {
  const [PRM, setPRM] = useState({ Message: "", ShowButton: false, Anim: "" });

  const moveNextScreen = () => props.navigation.reset({ index: 0, routes: [{ name: "S_Login" }] });

  const requestPermissions = () => {
    requestMultiple(AllPerms).then(requestResult => {
      if (checkPermRes(requestResult)) {
        setPRM({
          Anim: AnimEnums.COMPLETED,
          Message: Strings.AppPermissions.PermsGranted,
          ShowButton: false,
        });

        setTimeout(() => {
          setPRM({ Message: "", ShowButton: false, Anim: "" });
          moveNextScreen();
        }, TIMEOUT);
      } else {
        setPRM({
          Anim: AnimEnums.CANCELLED,
          Message: Strings.AppPermissions.NeedAllGranted,
          ShowButton: true,
        });
      }
    });
  };

  useEffect(() => {
    checkMultiple(AllPerms).then(checkResult => {
      if (checkPermRes(checkResult)) moveNextScreen();
      else {
        setPRM({
          Anim: AnimEnums.WAITING_RESPONSE,
          Message: Strings.AppPermissions.NeedSomePerms,
          ShowButton: false,
        });
        requestPermissions();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Lottie Data={PRM?.Anim} style={styles.lottie} />
      <View style={styles.textContainer}>
        <Text style={styles.messageText}> {PRM?.Message} </Text>
        {PRM?.ShowButton && (
          <TouchableOpacity onPress={requestPermissions}>
            <Text> {Strings.AppPermissions.RequestPerms} </Text>
          </TouchableOpacity>
        )}
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
});

export { C_Permission };
