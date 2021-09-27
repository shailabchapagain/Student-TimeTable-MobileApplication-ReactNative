import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import styles from "../styles/main";
import { firebase } from "../firebase/config";
const Classes = (props) => {
  const [data, setData] = useState([]);

  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);

  // requird variables
  const [inputText, setInputText] = useState();
  const [inputDate, setInputDate] = useState();
  const [inputEnddate, setInputEnddate] = useState();
  const [inputplace, setInputplace] = useState();

  //

  const [editItem, setEditItem] = useState();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    var classes = firebase
      .firestore()
      .collection("users/" + user.uid + "/classes")
      .onSnapshot((querySnapshot) => {
        var items = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          var c = doc.data();
          c["id"] = doc.id;
          items.push(c);
        });

        items = items.sort(function (a, b) {
          return new Date(b.StartTime) - new Date(a.StartTime);
        });

        setData(items);
      });
  }, []);

  //required
  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setisModalVisible(false);
  };

  //required
  const handleEditItem = (editItem) => {
    const newData = data.map((item) => {
      if (item.id == editItem) {
        firebase
          .firestore()
          .collection("users/" + firebase.auth().currentUser.uid + "/classes")
          .doc(item.id)
          .update({
            SubName: inputText,
            StartTime: new Date(inputDate),
            EndTime: new Date(inputEnddate),
            place: inputplace,
          })
          .then(() => {
            console.log("Exam Updated!");
            Alert.alert(
              "Exam Updated!",
              "Your data has been updated successfully."
            );
            props.navigation.navigate("Classes");
          });
        setData(newData);
        setisRender(!isRender);
      }
    });
  };

  // required
  const onPressItem = (item) => {
    let unix_timestamp = item.StartTime;
    var date = new Date(unix_timestamp * 1000);

    var date1 = "0" + date.getDate();
    var month = "0" + date.getMonth();
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime =
      date1.substr(-2) +
      "/" +
      month.substr(-2) +
      " " +
      hours.substr(-2) +
      ":" +
      minutes.substr(-2);

    // ---------------------------------------------------

    let unix_timestamp1 = item.EndTime;
    var date = new Date(unix_timestamp1 * 1000);

    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime1 =
      date1.substr(-2) +
      "/" +
      month.substr(-2) +
      " " +
      hours.substr(-2) +
      ":" +
      minutes.substr(-2);

    setisModalVisible(true);
    setInputText(item.SubName);
    setInputDate(formattedTime);
    setInputEnddate(formattedTime1);
    setInputplace(item.place);
    setEditItem(item.id);
  };

  const ClassDetails = ({ item, index }) => {
    let unix_timestamp = item.StartTime;
    var date = new Date(unix_timestamp * 1000);

    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime = hours.substr(-2) + ":" + minutes.substr(-2);

    // ---------------------------------------------------

    let unix_timestamp1 = item.EndTime;
    var date = new Date(unix_timestamp1 * 1000);

    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    var formattedTime1 = hours.substr(-2) + ":" + minutes.substr(-2);

    // ------------------------------------------------------

    var finalTimeRange = formattedTime + "-" + formattedTime1;

    //-------------------------------------------------------

    let unix_timestamp3 = item.StartTime;
    var date = new Date(unix_timestamp3 * 1000);
    var date1 = "0" + date.getDate();
    var month = "0" + date.getMonth();

    var finalDate = date1.substr(-2) + "/" + month.substr(-2);

    return (
      <View style={styles.infoElement}>
        <Text style={styles.infoTextStyle}> {item.SubName}</Text>
        <View style={styles.timeAndPlace}>
          <Text style={styles.infoTextStyle}>Date: {finalDate}</Text>
          <Text style={styles.infoTextStyle}>Time : {finalTimeRange}</Text>
          <Text style={styles.infoTextStyle}>Room : {item.place}</Text>
        </View>
        <TouchableOpacity onPress={() => onPressItem(item)}>
          <View style={styles.circle}>
            <Image
              style={styles.editIcon}
              source={require("../assets/editIcon.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainFlex}>
      <Text style={styles1.headerText}>Upcoming classes</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={ClassDetails}
        keyExtractor={(item) => item.id}
        extraData={isRender}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}
      >
        <View style={styles1.mainContainer}>
          <View style={styles1.anotherview}>
            <Text style={styles1.headerText}>Edit Class</Text>
            <TextInput
              style={styles1.placeHolder}
              onChangeText={(SubName) => setInputText(SubName)}
              defaultValue={inputText}
            />
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles1.rowinputfields}
                placeholder="Time From(YYYY-MM-DD HH:MM)"
                onChangeText={(StartTime) => setInputDate(StartTime)}
                defaultValue={inputDate}
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
                placeholder="Time to(YYYY-MM-DD HH:MM)"
                onChangeText={(EndTime) => setInputEnddate(EndTime)}
                defaultValue={inputEnddate}
              />
            </View>
            <TextInput
              style={styles1.placeHolder}
              placeholder="Classroom"
              onChangeText={(place) => setInputplace(place)}
              defaultValue={inputplace}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              onPress={() => onPressSaveEdit()}
            >
              <Text style={styles.TextStyle}> SAVE </Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles1.cancelbutton}
                activeOpacity={0.4}
                onPress={() => props.navigation.goBack()}
              >
                <Text style={styles1.cancletext}> cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default Classes;

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
