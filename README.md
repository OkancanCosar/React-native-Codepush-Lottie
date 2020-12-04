Creating a new codepush project

```bash
$    code-push register
$    code-push app add APPNAME android react-native
```

Posting an update

```bash
$    code-push release-react APPNAME android -d Production
$    code-push release-react APPNAME android -d Staging
```

Install codepush package

```bash
$    yarn add react-native-code-push
$    npx react-native link react-native-code-push
```

Autolink missings

1. MainApplication.java >>> inside mReactNativeHost function.

```java
    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }
```

2. android/app/build.gradle >>> under react.gradle apply line

```
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
```

3. android/app/src/main/res/values/strings.xml

```xml
<string moduleConfig="true" name="CodePushDeploymentKey"> CODEPUSH_PRODUCT_KEY || CODEPUSH_STAGING_KEY </string>
```

4. android/settings.gradle >>> change include ':app' before

```
rootProject.name = 'codepusharge'
apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
    // !!!!!! yer değiştirilecek
    include ':react-native-code-push'
    project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
    // !!!!!! yer değiştirilecek
include ':app'
```

-- UI

1. Install lottie package

```bash
$    yarn add lottie-react-native
$    npx react-native link lottie-react-native
```
