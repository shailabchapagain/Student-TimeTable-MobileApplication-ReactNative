import React, { Component } from 'react';
import {TextInput, Text, Button , View,StyleSheet, TouchableOpacity} from 'react-native';
import styles from "../styles/main";

class Verification extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <View style={styles.mainContainer}>
                <View style={styles1.anotherview                 
                }>

               

                <Text style={styles.header}>Verification</Text>

                <Text style={
                  styles1.textstyle
                }>Enter the 4 digit code, sent to the mail ***ov@gmail.com</Text>

                <TextInput style={styles.placeHolder} placeholder="1 2 3 4"/>           
                
                

                <TouchableOpacity style={styles.button}
                activeOpacity={.5}
                onPress={this.VerifyRegisterClicked}>
                    <Text style={styles.TextStyle}> REGISTER </Text>
                </TouchableOpacity>

                <Text style={
                    styles1.dontgetstyle
                }>Don't get email?</Text>
                <TouchableOpacity style={styles.buttonText}
                activeOpacity={.5}
                onPress={this.resendEmail}>
                    <Text style={
                  styles1.resendstyle}> Resend </Text>
                </TouchableOpacity>
            </View>
            </View>


        );
    }
}

export default Verification;

const styles1 = StyleSheet.create({


    
    anotherview:{
          width:250,
          justifyContent:'center',
          margin:30
    },
    resendstyle:{
        fontSize:15,
        marginTop:10,
        textAlign:'center',
        textDecorationLine: 'underline',
    
    },
        textstyle:{
            fontSize:15,
            marginTop:30,
            marginBottom:15,
            textAlign:'center'       
    },
     dontgetstyle:{
        fontSize:15,
        marginTop:10,
        textAlign:'center'
  },
  
})