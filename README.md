Yeni bir codepush projesi oluşturma

```bash
$    code-push register
$    code-push app add APPNAME android react-native
```

Güncelleme yayınlama

```bash
$    code-push release-react APPNAME android -d Production
$    code-push release-react APPNAME android -d Staging
```

React-native'e paket yükleme

```bash
$    yarn add react-native-code-push
$    npx react-native link react-native-code-push
```

Autolink eksik kaldığı yerler

1. MainApplication.java >>> mReactNativeHost fonksiyonunun içine.

```java
    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }
```

2. android/app/build.gradle >>> react.gradle apply satırın altına

```
apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
```

3. android/app/src/main/res/values/strings.xml

```xml
<string moduleConfig="true" name="CodePushDeploymentKey"> CODEPUSH_PRODUCT_KEY || CODEPUSH_STAGING_KEY </string>
```

4. android/settings.gradle >>> include ':app' öncesine olacak şekilde düzenlenecek.

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

1. lottie paketi al

```bash
$    yarn add lottie-react-native
$    npx react-native link lottie-react-native
```
