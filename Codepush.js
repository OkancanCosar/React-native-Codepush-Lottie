import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import CodePush from "react-native-code-push";

import { Strings } from "./Strings";
import App from "./App";

const CODEPUSH_DELAY = 1000;
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

export const Application = () => {
  const [CP, setCP] = useState({ Message: "", Info: "", IsComplate: false });

  const codePushStatusDidChange = status => {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setCP({
          Message: Strings.CodePush.UpdateChecking,
          Info: "",
          IsComplate: false,
        });

        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setCP({
          Message: Strings.CodePush.WaitingAction,
          Info: "",
          IsComplate: false,
        });

        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setCP({
          Message: Strings.CodePush.UpdateDownloading,
          Info: "",
          IsComplate: false,
        });

        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setCP({
          Message: Strings.CodePush.UpdateInstalling,
          Info: "",
          IsComplate: false,
        });

        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setCP({
          Message: Strings.CodePush.UpToDate,
          Info: "",
          IsComplate: false,
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
            IsComplate: true,
          });
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setCP({
          Message: Strings.CodePush.UpdateCanceled,
          Info: "",
          IsComplate: false,
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
            IsComplate: true,
          });
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setCP({
          Message: Strings.CodePush.UpdateInstalled,
          Info: "",
          IsComplate: false,
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
            IsComplate: true,
          });
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setCP({
          Message: Strings.CodePush.UpdateUnknownError,
          Info: "",
          IsComplate: false,
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
            IsComplate: true,
          });
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

  console.log("CP =>", CP);

  if (CP?.IsComplate) return <App />;
  return (
    <View style={styles.container}>
      <Text style={styles.message}> {CP?.Message} </Text>
      <Text style={styles.info}> {CP?.Info} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  message: {
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    color: "blue",
    textAlign: "center",
  },
});
