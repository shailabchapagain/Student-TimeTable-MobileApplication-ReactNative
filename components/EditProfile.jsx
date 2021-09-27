import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "../styles/main";
import { AuthContext } from "../context/AuthContext";
import { firebase } from "../firebase/config";
import * as ImagePicker from "expo-image-picker";

const EditProfile = (props) => {
  const [userData, setUserData] = useState(null);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const response = await fetch(result.uri);
      const blob = await response.blob();

      var ref = firebase
        .storage()
        .ref()
        .child("profilePicture/" + firebase.auth().currentUser.uid);
      ref.put(blob);
      var url = await ref.getDownloadURL().then();

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          profilePicture: url,
        })
        .then(() => {
          console.log("User updated!");
          Alert.alert(
            "Profile Picture Updated!",
            "Now you can change other datas if you want and save the change."
          );
        });
    }
  };

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

  const handleUpdate = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        studentNumber: userData.studentNumber,
      })
      .then(() => {
        console.log("User Updated!");
        Alert.alert(
          "Profile Updated!",
          "Your profile has been updated successfully."
        );
        props.navigation.navigate("Profile");
      });
  };

  const cancel = () => {
    props.navigation.navigate("Profile");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles1.anotherview}>
        <Text style={styles1.headertext}>Edit Profile</Text>

       

        <TouchableOpacity onPress={() => pickImage()}>
              <Image
                style={styles.img}
                source={"https://console.firebase.google.com/u/0/project/student-timetable-8b670/storage/student-timetable-8b670.appspot.com/files"}
              />
            </TouchableOpacity>


        <TextInput
          style={styles.placeHolder}
          value={userData ? userData.name : ""}
          onChangeText={(txt) => setUserData({ ...userData, name: txt })}
        />

        <TextInput
          style={styles.placeHolder}
          value={userData ? userData.email : ""}
          onChangeText={(txt) => setUserData({ ...userData, email: txt })}
        />

        <TextInput
          style={styles.placeHolder}
          keyboardType="numeric"
          value={userData ? userData.phoneNumber : ""}
          onChangeText={(txt) => setUserData({ ...userData, phoneNumber: txt })}
        />

        <TextInput
          style={styles.placeHolder}
          value={userData ? userData.studentNumber : ""}
          onChangeText={(txt) =>
            setUserData({ ...userData, studentNumber: txt })
          }
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => handleUpdate()}
        >
          <Text style={styles.TextStyle}> SAVE </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles1.touchableopacity}
          activeOpacity={0.4}
          onPress={() => cancel()}
        >
          <Text style={styles1.cancle}> cancel </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles1 = StyleSheet.create({
  headertext: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  anotherview: {
    width: 250,
    justifyContent: "center",
    margin: 30,
  },
  cancle: {
    color: "black",
    textAlign: "center",
  },
  touchableopacity: {
    backgroundColor: "#f0fff0",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 1,
    borderRadius: 40,
  },
});
