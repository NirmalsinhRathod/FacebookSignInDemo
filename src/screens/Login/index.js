import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ''
    }
  }
  getPermission() {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(data);
              // alert(JSON.stringify(data.getUserId()))
            }
          )
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                //this.getPermission()
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    alert(JSON.stringify(data.getUserId()))
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")} />
      </View>
    );
  }
}
