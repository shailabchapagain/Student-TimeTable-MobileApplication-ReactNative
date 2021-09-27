import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Components
import HomeComponent from "./components/Home";
import ClassesComponent from "./components/Classes";
import MyProfileComponent from "./components/MyProfile";
import EditProfileComponent from "./components/EditProfile";
import RegisterComponent from "./components/Register";
import LoginComponent from "./components/Login";
import VerificationComponent from "./components/Verification";
import WelcomeComponent from "./components/Welcome";
import PracticalCompletedComponent from "./components/PraticalCompleted";
import PracticalPendingComponent from "./components/PraticalPending";
import ExamCompletedComponent from "./components/ExamCompleted";
import ExamPendingComponent from "./components/ExamPending";
import AddClassComponent from "./components/AddClass";
import AddExamsComponent from "./components/AddExams";
import AddPracticalsComponent from "./components/AddPracticals";
import PasswordResetComponent from './components/PasswordReset';


// Screen

import { AuthContext, user } from "./context/AuthContext";
import { firebase } from "./firebase/config";

function HomeScreen({ navigation, route }) {
  return <HomeComponent navigation={navigation} route={route} />;
}

function ClassesScreen({ navigation, route }) {
  return <ClassesComponent navigation={navigation} route={route} />;
}

function MyProfileScreen({ navigation, route }) {
  return <MyProfileComponent navigation={navigation} route={route} />;
}

function EditProfileScreen({ navigation, route }) {
  return <EditProfileComponent navigation={navigation} route={route} />;
}

function RegisterScreen({ navigation }) {
  return <RegisterComponent navigation={navigation} />;
}

function LoginScreen({ navigation }) {
  return <LoginComponent navigation={navigation} />;
}

function VerificationScreen({ navigation }) {
  return <VerificationComponent navigation={navigation} />;
}

function WelcomeScreen({ navigation }) {
  return <WelcomeComponent navigation={navigation} />;
}

function PracticalCompletedScreen({ navigation }) {
  return <PracticalCompletedComponent navigation={navigation} />;
}

function PracticalPendingScreen({ navigation }) {
  return <PracticalPendingComponent navigation={navigation} />;
}

function ExamCompletedScreen({ navigation }) {
  return <ExamCompletedComponent navigation={navigation} />;
}

function ExamPendingScreen({ navigation }) {
  return <ExamPendingComponent navigation={navigation} />;
}

function AddClassScreen({ navigation, route }) {
  return <AddClassComponent navigation={navigation} route={route} />;
}

function AddPracticalsScreen({ navigation, route }) {
  return <AddPracticalsComponent navigation={navigation} route={route} />;
}

function AddExamsScreen({ navigation, route }) {
  return <AddExamsComponent navigation={navigation} route={route} />;
}



function PasswordResetScreen({navigation,route}){
  return <PasswordResetComponent navigation={navigation} route={route}/>;
}

const Stack = createStackNavigator();

function Nav(logged) {
  return (
    <Stack.Navigator
      initialRouteName={logged ? "App" : "Welcome"} // Set Initial screen
      headerMode="none"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="App" component={BottomNav} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name = "PasswordReset" component={PasswordResetScreen}/>

      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
     
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function BottomNav(props) {
  const { user } = props.route.params;

  return (
    <AuthContext.Provider value={user}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Exams") {
              iconName = "book";
            } else if (route.name === "Classes") {
              iconName = "ios-bookmark";
            } else if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Practical") {
              iconName = "ios-list";
            } else if (route.name === "Profile") {
              iconName = "ios-person";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "steelblue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Exams" component={NavExam} />
        <Tab.Screen name="Classes" component={NavClasses} />
        <Tab.Screen name="Home" component={NavAddItems} />
        <Tab.Screen name="Practical" component={NavPractical} />
        <Tab.Screen name="Profile" component={NavProfile} />
      </Tab.Navigator>
    </AuthContext.Provider>
  );
}

const StackProfile = createStackNavigator();

function NavProfile() {
  return (
    <StackProfile.Navigator headerMode="none">
      <StackProfile.Screen
        name="Profile"
        component={MyProfileScreen}
        options={{ title: "Profile" }}
      />
      <StackProfile.Screen name="EditProfile" component={EditProfileScreen} />
    </StackProfile.Navigator>
  );
}

const StackClass = createStackNavigator();

function NavClasses() {
  return (
    <StackClass.Navigator headerMode="none">
      <StackClass.Screen
        name="Classes"
        component={ClassesScreen}
        options={{ title: "Classes" }}
      />
     
    </StackClass.Navigator>
  );
}

const StackPractical = createStackNavigator();

function NavPractical() {
  return (
    <StackPractical.Navigator headerMode="none">
      <StackPractical.Screen
        name="Practical"
        component={PracticalPendingScreen}
        options={{ title: "PracticalPending" }}
      />
      <StackPractical.Screen
        name="PracticalCompleted"
        component={PracticalCompletedScreen}
      />
     
    </StackPractical.Navigator>
  );
}

const StackExam = createStackNavigator();

function NavExam() {
  return (
    <StackExam.Navigator headerMode="none">
      <StackExam.Screen
        name="Exams"
        component={ExamPendingScreen}
        options={{ title: "ExamPending" }}
      />
      <StackExam.Screen name="ExamCompleted" component={ExamCompletedScreen} />
      
    </StackExam.Navigator>
  );
}

const StackAddItems = createStackNavigator();

function NavAddItems() {
  return (
    <StackAddItems.Navigator headerMode="none">
      <StackAddItems.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <StackAddItems.Screen name="AddClass" component={AddClassScreen} />
      <StackAddItems.Screen
        name="AddPracticals"
        component={AddPracticalsScreen}
      />
      <StackAddItems.Screen name="AddExams" component={AddExamsScreen} />
    </StackAddItems.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <NavigationContainer>{Nav(this.context.user)}</NavigationContainer>;
  }
}
App.contextType = AuthContext;
