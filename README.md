# FacebookSingIn
Social media authentication is very common in today's trend so let's have look how to integrate it in your project.

### Configuration on Developer Console
1. Login into your facebook developer console  https://developers.facebook.com/
2. Creathe the Application "ApplicationName" & contact Email
3. Select Facebook login option and setup your app
4. Select the settings -> basic 
5. Fill all the required field like Privacy-policy url , app icon etc
6. Add Platform like android and iOS
##### Android setup on developer console
1. Add Google Play Package Name
2. Add Class name ( MainActivity.Java)
3. Add Keyhashes using below commmand
```keytool -exportcert -alias androiddebugkey -keystore debug.keystore | openssl sha1 -binary | openssl base64```
##### iOS setup on developer console
1. Provide the Bundle ID
2. For release app you need to provide iPhone Store ID
#### Note
Now, You need to make app visible for the development purpose so you can see that switch on the right side of AppId, ON it.
Also copy that AppId from the console.

#### Installation
Install the dependencies and start the server.

```sh
$ npm install --save react-native-fbsdk
```
###### Link the dependencies  with automatic and manual both
Automatic linking for react-native >0.60 and <0.60
```sh
RN < 0.60
$ react-native link react-native-fbsdk
```
##### iOS automatic link
fire below command into your react project directory
```sh
RN > 0.60
$ cd ios && pod install
```
##### manual linking in iOS
Open the Pod file and paste the below line
    ```pod 'react-native-fbsdk', :path => '../node_modules/react-native-fbsdk'```
##### manual linking in Android
1. Open the android/settings.gradle file and paste below lines
```sh
include ':react-native-fbsdk'
project(':react-native-fbsdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk/android')
```
2. Open android/app/build.gradle
```sh
implementation project(':react-native-fbsdk')
```
3. Now open the MainApplication.java file and add below code
    1. Import the below line
```import com.facebook.reactnative.androidsdk.FBSDKPackage;```
    2. Add the package in getPackages() method
    ```new FBSDKPackage()```
### Android Guide
###### Add Facebook App ID
1. Open your /app/res/values/strings.xml file.
2. Add below line in <resources> tag 
```<string name="facebook_app_id">Facebook App ID</string>```
3. Open /app/manifests/AndroidManifest.xml
    - Add the Internet permission 
     ```<uses-permission android:name="android.permission.INTERNET"/>```
    - Add a meta-data element to the application element:
        ```sh
            <application android:label="@string/app_name" ...>
                ...
                <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
                ...
            </application>
            ```
### iOS Guide
###### Configure Info.plist
1. In Xcode, right-click your project's Info.plist file and select Open As -> Source Code.
2. Insert the following XML snippet into the body of your file just before the final </dict> element.
    ```sh
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>fb{your-app-id}</string>
        </array>
      </dict>
    </array>
    <key>FacebookAppID</key>
    <string>{your-app-id}</string>
    <key>FacebookDisplayName</key>
    <string>{your-app-name}</string>
    <key>LSApplicationQueriesSchemes</key>
    <array>
      <string>fbapi</string>
      <string>fb-messenger-share-api</string>
      <string>fbauth2</string>
      <string>fbshareextension</string>
    </array>
    ```
3. Connect App Delegate
    - Open the AppDelegate.m file and add below code
        ```#import <FBSDKCoreKit/FBSDKCoreKit.h>```
    - Insert the below line into the didFinishLaunchingWithOptions method
        ```sh
            [[FBSDKApplicationDelegate sharedInstance] application:application
            didFinishLaunchingWithOptions:launchOptions];
        ```
    - add the below code snippet after the didFinishLaunchingWithOptions method
        ```sh
            - (BOOL)application:(UIApplication *)application 
            openURL:(NSURL *)url 
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

              BOOL handled =  [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url options:options];
              // Add any custom logic here.
              return handled;
            }
        ```
