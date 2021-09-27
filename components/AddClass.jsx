import React, { Component, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { firebase } from "../firebase/config";
import styles from "../styles/main";

class AddClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      StartTime: "",
      EndTime: "",
      SubName: "",
      place: "",
      
    };
  }

  SaveClicked = () => {
    if (this.state.SubName == "" || this.state.StartTime=="" || this.state.place==""||this.state.EndTime=="") {
      alert("Sorry No field can be empty");
    } else {
      try {
        const user = firebase.auth().currentUser;

        firebase
          .firestore()
          .collection("users/" + user.uid + "/classes")
          .add({
            StartTime: new Date(this.state.StartTime),
            EndTime: new Date(this.state.EndTime),
            SubName: this.state.SubName,
            place: this.state.place,
          });
        alert("Classes added");
        this.props.navigation.navigate("Classes");
      } catch (error) {
        console.log(error);
      }
    }
  };

  cancel = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={styles1.mainContainer}>
        <View style={styles1.anotherview}>
          <Text style={styles1.headerText}>Add Item</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginBottom: 30, marginRight: 10 }}>
              <TouchableOpacity
                style={styles1.selectedbutton}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("AddClass")}
              >
                <Text style={styles.TextStyle}> Class </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 30, marginRight: 10 }}>
              <TouchableOpacity
                style={styles1.unselectedbutton}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("AddExams")}
              >
                <Text style={styles1.unselctedtextinbutton}> Exams </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 30, marginRight: 10 }}>
              <TouchableOpacity
                style={styles1.unselectedbutton}
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate("AddPracticals")}
              >
                <Text style={styles1.unselctedtextinbutton}> Practicals </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <TextInput
              style={styles1.placeHolder}
              placeholder="Subject"
              value={this.state.SubName}
              onChangeText={(SubName) => this.setState({ SubName })}
            />

            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles1.rowinputfields}
                placeholder="Time From(YYYY-MM-DD HH:MM)"
                value={this.state.StartTime}
                onChangeText={(StartTime) => this.setState({ StartTime })}
              />

              <TextInput
                style={{
                  textAlign: "center",
                  height: 50,
                  marginLeft: 20,
                  borderRadius: 15,
                  backgroundColor: "#dcdcdc",
                  width: 120,
                  marginBottom: 15,
                }}
                placeholder="Time To(YYYY-MM-DD HH:MM)"
                value={this.state.EndTime}
                onChangeText={(EndTime) => this.setState({ EndTime })}
              />
            </View>
            <TextInput
              style={styles1.placeHolder}
              placeholder="Classroom"
              value={this.state.place}
              onChangeText={(place) => this.setState({ place })}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => this.SaveClicked()}
            >
              <Text style={styles.TextStyle}> SAVE </Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles1.cancelbutton}
                activeOpacity={0.4}
                onPress={() => this.cancel()}
              >
                <Text style={styles1.cancletext}> cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AddClass;

const styles1 = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  anotherview: {
    width: 300,
    justifyContent: "center",
    margin: 30,
  },
  selectedbutton: {
    marginTop: 20,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "#2ecc71",
    borderRadius: 13,
  },
  unselectedbutton: {
    marginTop: 20,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "#dcdcdc",
    borderRadius: 13,
  },
  unselctedtextinbutton: {
    color: "rgba(141, 141, 141, 1)",
    textAlign: "center",
    fontSize: 20,
  },
  cancelbutton: {
    backgroundColor: "#dcdcdc",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 40,
    width: 110,
  },
  cancletext: {
    color: "black",
    textAlign: "center",
  },
  rowinputfields: {
    textAlign: "center",
    height: 50,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#dcdcdc",
    width: 150,
  },
  placeHolder: {
    textAlign: "center",
    height: 50,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#dcdcdc",
  },
});
