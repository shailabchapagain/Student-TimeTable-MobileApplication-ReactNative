import React, { Component } from "react";
import {
  TextInput,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  
} from "react-native";
import styles from "../styles/main";
import { firebase } from "../firebase/config";
import { ActivityIndicator } from "react-native-paper";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isLoading:false
    };
  }

  registerUser = () => {
    // Navigate to Register
    this.props.navigation.navigate("Register");
  };

  LoginClicked = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
      // Signs in using email and password
      .signInWithEmailAndPassword(email, password)
      // Returns UserCredential
      // https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
      .then((resp) => {
        const uid = resp.user.uid;
        // FIRESTORE - Persistent server side
        // firebase.firestore() return a Firestore object
        // collection(path) - returns a CollectionReference associated to path
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid) // Gets the Document Reference associated to uid
          // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference?hl=pt-br#get
          .get() // Read de document associated to the Document Reference
          .then((firestoreDocument) => {
            // Returns a Promise with a parameter of type DocumentSnapshot
            // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot?hl=pt-br
            if (!firestoreDocument.exists) {
              alert("Username does not exist.");
              return;
            }
            // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot?hl=pt-br#data
            const user = firestoreDocument.data(); // Retrieves all fields in the document as an Object. Returns 'undefined' if the document doesn't exist.

            this.props.navigation.navigate("App", { user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/invalid-email")
          alert("Invalid email:" + errorMessage);
        if (errorCode === "auth/user-not-found")
          alert("User not found" + errorMessage);
        if (errorCode === "auth/wrong-password")
          alert("Wrong password." + errorMessage);
        if (errorCode === "auth/user-disabled")
          alert("User is not enabled" + errorMessage);
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles1.anotherview}>
          <Text style={styles.header}>Login</Text>

          <TextInput
            style={styles.placeHolder}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />

          <TextInput
            style={styles.placeHolder}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={this.LoginClicked.bind(this)}
          >
            <Text style={styles.TextStyle}> LOGIN </Text>
          </TouchableOpacity>

          <Text style={styles1.textstyle}>Dont have account?</Text>
          <TouchableOpacity
            style={styles.buttonText}
            activeOpacity={0.5}
            onPress={this.registerUser}
          >
            <Text style={styles1.registertextstyle}> Register </Text>
          </TouchableOpacity>

          <Text style={styles1.textstyle}>Forgot Password?</Text>
          <TouchableOpacity
            style={styles.buttonText}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate("PasswordReset")}
          >
            <Text style={styles1.registertextstyle}> Reset here </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Login;
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
