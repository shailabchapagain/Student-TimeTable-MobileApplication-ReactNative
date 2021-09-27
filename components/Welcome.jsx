import React, { Component } from 'react';
import {TextInput, Text,Image, Button , View, TouchableOpacity,StyleSheet} from 'react-native';
import styles from "../styles/main";


const styles1 = StyleSheet.create({
    WelcomeImage:{
        width:356,
        height:308,
        marginBottom:80
    },
    button:{        
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15,       
        backgroundColor:'#000000',
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom:30,
        
        
        },

        header:{
            fontSize: 60,
            fontWeight: 'bold',
            marginBottom:30,
            
            
            
        },
        TopImage:{
            width:250,
            height:230,
            top:-115,
            left:-20,
            transform: [{rotate: '-36.13deg'}]
        }
  });

class Welcome extends Component{
    constructor(props){
        super(props);
    }

    GetStartedClicked = () => {
        // Navigate to Register
        this.props.navigation.navigate("Login");
    }

    render(){
        return(
            <View style={styles.mainContainer}>

                <Image style={styles1.TopImage}
                 source={require('../assets/doodle.png')}/>

                <Text style={styles1.header}>TIMELY</Text>
                <Image style={styles1.WelcomeImage}
                 source={require('../assets/casual-life-3d-reading.png')}/>

                <TouchableOpacity style={styles1.button}
                activeOpacity={.5}
                onPress={this.GetStartedClicked}>
                    <Text style={styles.TextStyle}> GET STARTED </Text>
                </TouchableOpacity>
            </View>

           
        );
    }


}


export default Welcome;