import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import CodePush from "react-native-code-push";
import SplashScreen from "react-native-splash-screen";

import { height } from "../components/styles/GStyles";
import { Strings } from "../components/strings";
import { Assets } from "@assets";
import { Lottie } from "../components/primitives/Lottie";

const CODEPUSH_DELAY = 2000;
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    descriptionPrefix: Strings.CodePush.ChangeLogs,
    title: Strings.CodePush.AlertTitle,
    optionalUpdateMessage: Strings.CodePush.AlertMessage,
    optionalInstallButtonLabel: Strings.CodePush.AlertBtnInstall,
    optionalIgnoreButtonLabel: Strings.CodePush.AlertBtnIgnore,
  },
};
const AnimEnums = {
  SEARCHING: { src: Assets.Anims.Searching, loop: true },
  CANCELLED: { src: Assets.Anims.Cancelled, loop: false },
  UPDATING: { src: Assets.Anims.Updateing, loop: true },
  WAITING_RESPONSE: { src: Assets.Anims.WaitingResponse, loop: true },
  COMPLETED: { src: Assets.Anims.Success, loop: false },
};

const C_Codepush = props => {
  const [CP, setCP] = useState({ Message: "", Info: "", Anim: "" });

  const hideSplashScreen = () => {
    try {
      SplashScreen.hide();
    } catch (error) {
      console.log("SplashScreenHide::error =>", error);
    }
  };
  const moveNextScreen = () => props.navigation.reset({ index: 0, routes: [{ name: "Permission" }] });

  const codePushStatusDidChange = status => {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setCP({
          Anim: AnimEnums.SEARCHING,
          Message: Strings.CodePush.UpdateChecking,
          Info: "",
        });

        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        hideSplashScreen();
        setCP({
          Anim: AnimEnums.WAITING_RESPONSE,
          Message: Strings.CodePush.WaitingAction,
          Info: "",
        });

        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setCP({
          Anim: AnimEnums.UPDATING,
          Message: Strings.CodePush.UpdateDownloading,
          Info: "",
        });

        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setCP({
          Anim: AnimEnums.UPDATING,
          Message: Strings.CodePush.UpdateInstalling,
          Info: "",
        });

        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setCP({
          Anim: AnimEnums.COMPLETED,
          Message: Strings.CodePush.UpToDate,
          Info: "",
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
          });
          hideSplashScreen();
          moveNextScreen();
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setCP({
          Anim: AnimEnums.CANCELLED,
          Message: Strings.CodePush.UpdateCanceled,
          Info: "",
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
          });
          moveNextScreen();
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        CodePush.allowRestart();
        setCP({
          Anim: AnimEnums.COMPLETED,
          Message: Strings.CodePush.UpdateInstalled,
          Info: "",
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
          });
          CodePush.restartApp();
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setCP({
          Anim: AnimEnums.CANCELLED,
          Message: Strings.CodePush.UpdateUnknownError,
          Info: "",
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
          });
          moveNextScreen();
        }, CODEPUSH_DELAY);

        break;
    }
  };

  const codePushDownloadDidProgress = progress => {
    const persent = ((100 * progress.receivedBytes) / progress.totalBytes).toFixed(2);
    setCP({
      Message: Strings.CodePush.UpdateDownloading,
      Info: Strings.CodePush.Status(persent),
      IsComplate: false,
      Anim: AnimEnums.UPDATING,
    });
  };

  useEffect(() => {
    CodePush.disallowRestart();
    CodePush.sync(
      codePushOptions,
      stat => codePushStatusDidChange(stat),
      progress => codePushDownloadDidProgress(progress),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Lottie Data={CP?.Anim} style={styles.lottie} />
      <View style={styles.textContainer}>
        <Text style={styles.messageText}> {CP?.Message} </Text>
        <Text style={styles.infoText}> {CP?.Info} </Text>
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

export { C_Codepush };
