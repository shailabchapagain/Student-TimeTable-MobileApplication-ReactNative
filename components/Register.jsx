import React, { Component } from 'react';
import {TextInput, Text, Button , View,StyleSheet, TouchableOpacity} from 'react-native';
import styles from "../styles/main";
import { firebase } from '../firebase/config';

class Register extends Component{
    constructor(props){
        super(props);


        this.state={
            name: '',
            email:'',
            phoneNumber:'',
            studentNumber:'',
            password:''
        }    }  



    loginUser = () => {
        // Navigate to Login
        this.props.navigation.navigate("Login");
    }


    SignupClicked=()=>{
        const{email,password}=this.state;
        firebase
            // AUTHENTICATION
            // https://firebase.google.com/docs/reference/js/firebase.auth
            // Gets the Auth service for the default app or a given app.
            .auth()
            // https://firebase.google.com/docs/reference/js/firebase.auth.Auth
            // It supplies methods to create user, signin/signout, password reset, ...
            .createUserWithEmailAndPassword(email, password)
            .then((resp) => {
                // Response is UserCredentil:
                // https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
                // Contains response.user of type User:
                // https://firebase.google.com/docs/reference/js/firebase.User
                // It also contains
                // resp.additionalUserInfo of type AdditionalUserInfo
                // https://firebase.google.com/docs/reference/js/firebase.auth#additionaluserinfo
                // Supplies, for example, resp.additionalUserInfo.isNewUser (boolean)
                // All the supplied fields can be null
                if(resp.additionalUserInfo.isNewUser) alert('User Registered Successfully');
                const uid = resp.user.uid
                const data = {
                    id: uid,
                    email:this.state.email,
                    name:this.state.name,
                    phoneNumber:this.state.phoneNumber,
                    studentNumber:this.state.studentNumber,
                    profilePicture:''

                };
                // FIRESTORE - Persistent server side
                // firebase.firestore() return a Firestore object
                // collection(path) - returns a CollectionReference associated to path
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    // https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference?hl=pt-br
                    .doc(uid)   // Gets the document reference associated to uid
                    .set(data)  // Add/Create data to the document reference
                    .then(() => {   // Set return a promise without parameter's
                        this.props.navigation.navigate('App', {user: data});
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                let errorCode =  error.code;
                let errorMessage = error.message;
                // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
                if(error.code=='auth/operation-not-allowed') alert('Registry with email and password is not enabled');
                if(error.code=='auth/weak-password') alert('Please type a strong password');
                if(error.code=='auth/invalid-email') alert('Email is invalid. Use @');
                if(error.code=='auth/email-already-in-use') alert('Email already in use');
                
        });

    }



    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles1.anotherview
                    
                }>

               

                <Text style={styles.header}>Register</Text>

                <TextInput style={styles.placeHolder} placeholder="Email" value={this.state.email} onChangeText={email=>this.setState({email})}/>

                <TextInput style={styles.placeHolder} placeholder="Name" value={this.state.name} onChangeText={name=>this.setState({name})}/>

                <TextInput style={styles.placeHolder} keyboardType="numeric"

                 placeholder="Mobile Phone" value={this.state.phoneNumber} onChangeText={phoneNumber=>this.setState({phoneNumber})}/>

                <TextInput style={styles.placeHolder} placeholder="Student Number" value={this.state.studentNumber} onChangeText={studentNumber=>this.setState({studentNumber})}/>
                
                <TextInput style={styles.placeHolder} placeholder="Password" value={this.state.password} onChangeText={password=>this.setState({password})}
                secureTextEntry/>

                <TouchableOpacity style={styles.button}
                activeOpacity={.5}
                onPress={this.SignupClicked.bind(this)}>
                    <Text style={styles.TextStyle}> NEXT </Text>
                </TouchableOpacity>

                <Text style={styles1.textstyle}
                >Already have account ?</Text>
                <TouchableOpacity style={styles.buttonText}
                activeOpacity={.5}
                onPress={this.loginUser}>
                    <Text style={
                   styles1.loginstyle}> Login </Text>
                </TouchableOpacity>
                
            </View>
            </View>


        );
    }



}

export default Register;

const styles1 = StyleSheet.create({


    
    anotherview:{
          width:250,
          justifyContent:'center',
          margin:30
    },
      loginstyle:{
        fontSize:15,
        marginTop:10,
        textAlign:'center',
        textDecorationLine: 'underline',
    
    },
        textstyle:{
            fontSize:15,
            marginTop:10,
            textAlign:'center'       
    },
  
})