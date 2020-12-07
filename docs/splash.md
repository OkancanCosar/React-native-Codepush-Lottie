# Splash Screen handbook

[offical react-native-splash-screen](https://yarnpkg.com/package/react-native-splash-screen)

#### Install lottie package in the project

```bash
$    yarn add react-native-splash-screen
$    npx react-native link react-native-splash-screen
```

### Autolink missings

##### 1. MainActivity.java >>> add lines

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

##### 2. android\app\src\main\res\layout\launch_screen.xml

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

##### 3. android\app\src\main\res\drawable\gradient.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient
        android:type="sweep"
        android:startColor="#780206"
        android:endColor="#061161" />
</shape>
```

##### 3. add resources

```
    android\app\src\main\res\drawable\company_logo.png     <---add splash img
    android\app\src\main\res\drawable\brand_logo.png       <---add splash img
```

##### 4.When we destroy splash screen in js with

```js
import SplashScreen from "react-native-splash-screen";

SplashScreen.hide();
```
