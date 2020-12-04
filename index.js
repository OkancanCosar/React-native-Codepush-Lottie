import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";

import { Application } from "./Codepush";

AppRegistry.registerComponent(appName, () => Application);
