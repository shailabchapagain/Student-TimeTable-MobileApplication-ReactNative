import React, { useEffect, useState } from "react";
import {
  TextInput,
  Text,
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles/main";
import { firebase } from "../firebase/config";
import { ActivityIndicator } from "react-native-paper";


const MyProfile = (props) => {

  const [isLoading, setisLoading] =useState(true);


  const signOut = () => {
    firebase.auth().signOut();
    props.navigation.navigate("Login");
  };

  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const User = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles1.anotherview}>
        <Text style={styles1.headerstyle}>My Profile</Text>

        <Image
          style={styles.img}
          source={ "https://console.firebase.google.com/u/0/project/student-timetable-8b670/storage/student-timetable-8b670.appspot.com/files"
          }
        />

        <TextInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.placeHolder}
          placeholder={userData ? userData.name : ""}
        />

        <TextInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.placeHolder}
          placeholder={userData ? userData.email : ""}
        />

        <TextInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.placeHolder}
          placeholder={userData ? userData.phoneNumber : ""}
        />

        <TextInput
          editable={false}
          selectTextOnFocus={false}
          style={styles.placeHolder}
          placeholder={userData ? userData.studentNumber : ""}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("EditProfile")}
        >
          <Text style={styles.TextStyle}> EDIT PROFILE </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles1.touchableopacity}
          activeOpacity={0.5}
          onPress={() => signOut()}
        >
          <Text style={styles1.logout}> Log Out </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfile;
const styles1 = StyleSheet.create({
  anotherview: {
    width: 250,
    justifyContent: "center",
    margin: 30,
  },
  headerstyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  logout: {
    color: "black",
    textAlign: "center",
  },
  touchableopacity: {
    backgroundColor: "#f0fff0",
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderRadius: 20,
  },
});
