import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../firebase/config";
import styles from "../styles/main";

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resetEmail: "",
    };
  }

  sendPasswordResetEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.resetEmail)
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/argument-error")
          alert("User is not enabled " + errorMessage);
        if (errorCode === "auth/invalid-email")
          alert("Invalid email: " + errorMessage);
        if (errorCode === "auth/user-not-found")
          alert("User not found " + errorMessage);
        if (errorCode === "auth/user-disabled")
          alert("User is not enabled " + errorMessage);
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles1.anotherview}>
          <Text style={styles.header}>Forgot password ? </Text>

          <TextInput
            style={styles.placeHolder}
            placeholder="Email"
            onChangeText={(value) => this.setState({ resetEmail: value })}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => this.sendPasswordResetEmail()}
          >
            <Text style={styles.TextStyle}> Send Email for Reset </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default PasswordReset;

const styles1 = StyleSheet.create({
  anotherview: {
    width: 250,
    justifyContent: "center",
    margin: 30,
  },
  textstyle: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
  },
  registertextstyle: {
    fontSize: 15,
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
