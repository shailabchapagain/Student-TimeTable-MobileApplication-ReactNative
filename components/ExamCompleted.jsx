import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Modal,
} from "react-native";
import styles from "../styles/main";
import { firebase } from "../firebase/config";
import { ActivityIndicator } from "react-native-paper";

const ExamCompleted = (props) => {
  const [data, setData] = useState([]);
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setInputText] = useState();
  const [inputExamDate, setInputExamDate] = useState();
  const [inputcompletedPercentage, setInputcompletedPercentage] = useState();
  const [inputGrade, setInputGrade] = useState();

  const [editItem, setEditItem] = useState();

  const [isLoading, setisLoading] = useState(true);


  useEffect(() => {
    const user = firebase.auth().currentUser;

    var exams = firebase
      .firestore()
      .collection("users/" + user.uid + "/exams")
      .onSnapshot((querySnapshot) => {
        var items = [];

        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          var p = doc.data();

          if (p.Grade !== 0) {
            p["id"] = doc.id;
            items.push(p);
          }
        });

        items = items.sort(function (a, b) {
          return new Date(b.ExamDate) - new Date(a.ExamDate);
        });

        setData(items);
      });
  }, []);
  const onPressSaveEdit = () => {
    handleEditItem(editItem);
    setisModalVisible(false);
  };
  const handleEditItem = (editItem) => {
    const newData = data.map((item) => {
      if (item.id == editItem) {
        firebase
          .firestore()
          .collection("users/" + firebase.auth().currentUser.uid + "/exams")
          .doc(item.id)
          .update({
            SubName: inputText,
            ExamDate: new Date(inputExamDate),
            CompletedPercentage: Number(inputcompletedPercentage),
            Grade: Number(inputGrade),
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
  const onPressItem = (item) => {
    let examunix_timestamp = item.ExamDate;
    var date = new Date(examunix_timestamp * 1000);

    var date1 = "0" + date.getDate();
    var month = "0" + (date.getMonth() + 1);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    var examDateTime =
      date1.substr(-2) +
      "/" +
      month.substr(-2) +
      " " +
      hours.substr(-2) +
      ":" +
      minutes.substr(-2);

    setisModalVisible(true);
    setInputGrade(item.Grade);
    setInputcompletedPercentage(item.completedPercentage);
    setInputText(item.SubName);
    setInputExamDate(examDateTime);

    setEditItem(item.id);
  };

  const ConcludedExamDetails = ({ item }) => {
    let examunix_timestamp = item.ExamDate;
    var date = new Date(examunix_timestamp * 1000);

    var date1 = "0" + date.getDate();
    var month = "0" + (date.getMonth() + 1);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    var examDateTime =
      date1.substr(-2) +
      "/" +
      month.substr(-2) +
      " " +
      hours.substr(-2) +
      ":" +
      minutes.substr(-2);

    return (
      <View style={styles.infoElement2}>
        <Text style={styles.infoTextStyle}>{item.SubName}</Text>
        <View style={styles.timeAndPlace}>
          <Text style={styles.infoTextStyle}>{examDateTime}</Text>
          <Text style={styles.infoTextStyle}>Grade : {item.Grade}</Text>
        </View>
        <View style={styles.circle}>
          <TouchableOpacity onPress={() => onPressItem(item)}>
            <View style={styles.circle}>
              <Image
                style={styles.editIcon}
                source={require("../assets/editIcon.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainFlex}>
      <Text style={styles1.headerstyle}>Exams</Text>

      <View style={{ flexDirection: "row", margin: 10 }}>
        <View>
          <TouchableOpacity
            style={styles1.touchableopacity}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("Exams")}
          >
            <Text style={styles1.pending}> Pending </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles1.secondtouchableopacity}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("ExamCompleted")}
          >
            <Text style={styles.TextStyle}> Concluded </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={ConcludedExamDetails}
        keyExtractor={(item) => item.id}
        extraData={isRender}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}
      >
        <View style={styles1.mainContainer}>
          <View style={styles1.another1view}>
            <Text style={styles1.headerText}>Edit Exams</Text>

            <TextInput
              style={styles1.placeHolder}
              placeholder="Subject"
              onChangeText={(SubName) => setInputText(SubName)}
              defaultValue={inputText}
            />

            <TextInput
              style={styles1.placeHolder}
              placeholder="(YYYY-MM-DD HH:MM)"
              onChangeText={(ExamDate) => setInputExamDate(ExamDate)}
              defaultValue={inputExamDate}
            />

            <TextInput
              style={styles1.placeHolder}
              keyboardType="numeric"
              placeholder="% completed"
              onChangeText={(completedPercentage) =>
                setInputcompletedPercentage(completedPercentage)
              }
              defaultValue={inputcompletedPercentage}
            />

            <TextInput
              style={styles1.placeHolder}
              keyboardType="numeric"
              placeholder=" Grade (if already completed)"
              onChangeText={(Grade) => setInputGrade(Grade)}
              defaultValue={inputGrade}
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

    // flatlist down model
  );
};

export default ExamCompleted;

const styles1 = StyleSheet.create({
  view: {
    alignItems: "center",
  },

  anotherview: {
    alignItems: "center",
    width: 250,
    justifyContent: "center",
    margin: 30,
  },
  headerstyle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  textstyle: {
    textAlign: "center",
    fontSize: 15,
  },
  touchableopacity: {
    marginTop: 20,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "#dcdcdc",
    borderRadius: 17,
  },
  pending: {
    color: "rgba(141, 141, 141, 1)",
    textAlign: "center",
    fontSize: 20,
  },
  secondtouchableopacity: {
    marginTop: 20,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: "#2ecc71",
    borderRadius: 17,
    marginLeft: 10,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
  },
  another1view: {
    width: 300,
    justifyContent: "center",
    margin: 30,
  },
  placeHolder: {
    textAlign: "center",
    height: 50,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "#dcdcdc",
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
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
});
