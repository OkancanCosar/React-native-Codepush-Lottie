import React, { useState, useEffect } from "react";
import CodePush from "react-native-code-push";
import SplashScreen from "react-native-splash-screen";

import { Strings } from "./components/Strings";
import App from "./App";
import { UpdateApp, AnimEnums } from "./components/complex/UpdateApp";

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

const Application = () => {
  const [CP, setCP] = useState({ Message: "", Info: "", Anim: "", IsComplate: false });

  const codePushStatusDidChange = status => {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setCP({
          Message: Strings.CodePush.UpdateChecking,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.SEARCHING,
        });

        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        SplashScreen.hide();
        setCP({
          Message: Strings.CodePush.WaitingAction,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.WAITING_RESPONSE,
        });

        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setCP({
          Message: Strings.CodePush.UpdateDownloading,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.UPDATING,
        });

        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setCP({
          Message: Strings.CodePush.UpdateInstalling,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.UPDATING,
        });

        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setCP({
          Message: Strings.CodePush.UpToDate,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.COMPLETED,
        });

        setTimeout(() => {
          SplashScreen.hide();
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
          Anim: AnimEnums.CANCELLED,
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
        CodePush.allowRestart();
        setCP({
          Message: Strings.CodePush.UpdateInstalled,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.COMPLETED,
        });

        setTimeout(() => {
          setCP({
            Message: "",
            Info: "",
            IsComplate: true,
          });
          CodePush.restartApp();
        }, CODEPUSH_DELAY);

        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setCP({
          Message: Strings.CodePush.UpdateUnknownError,
          Info: "",
          IsComplate: false,
          Anim: AnimEnums.CANCELLED,
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

  console.log("CP =>", CP);

  if (CP?.IsComplate) return <App />;
  return <UpdateApp Data={CP} />;
};

export { Application };
