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

2. Install splash screen package

```bash
$    yarn add react-native-splash-screen
$    npx react-native link react-native-splash-screen
```

MainActivity.java

```java
    import android.os.Bundle;
    import org.devio.rn.splashscreen.SplashScreen;

    //...

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

```

android\app\src\main\res\layout\launch_screen.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/gradient">
    <ImageView
        android:layout_marginTop="-40dp"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scaleType="centerInside"
        android:src="@drawable/brand_logo" />
    <ImageView
        android:layout_width="90dp"
        android:layout_height="20dp"
        android:layout_marginBottom="10dp"
        android:layout_centerHorizontal="true"
        android:layout_alignParentBottom="true"
        android:src="@drawable/company_logo" />
</RelativeLayout>
```

android\app\src\main\res\drawable\gradient.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:type="sweep"
        android:startColor="#780206"
        android:endColor="#061161" />
</shape>
```

android\app\src\main\res\drawable\company_logo.png <---add splash img
android\app\src\main\res\drawable\brand_logo.png <---add splash img

when we destroy splash screen in js with

```js
import SplashScreen from "react-native-splash-screen";

SplashScreen.hide();
```
