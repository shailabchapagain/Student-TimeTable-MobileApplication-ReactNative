import React,{ Component, useContext, useEffect, useState} from 'react';
import {Text, View, Image,FlatList, StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import styles from "../styles/main";
import { firebase } from "../firebase/config";


class AddExams extends Component{

    constructor(props){
        super(props);

        this.state={
            SubName:'',
            Grade:null,
            ExamDate:'',
            completedPercentage:''
        }
    }

    SaveClicked=()=>{
        var ExamDateObj = new Date(this.state.ExamDate);

        if(this.state.SubName==""){
            alert("Sorry SubName is a must");
        }
       
        else{
            try{
                const user = firebase.auth().currentUser;

             firebase.firestore().collection(
                "users/"+user.uid+"/exams"
            ).add({
                ExamDate:new Date(this.state.ExamDate),
                SubName:this.state.SubName,
                completedPercentage:Number(this.state.completedPercentage),
                Grade:Number(this.state.Grade),
    
            });
            alert("Exams added");
            this.props.navigation.navigate("Exams");

            }catch(error){
                console.log(error)
            }           

        }

       

    };

    cancel=()=>{
        this.props.navigation.navigate("Home");
    };



    render(){

    

    return(
        <View style={styles1.mainContainer}>
            <View style={styles1.anotherview}>
                <Text style={ styles1.headerText}>Add Item</Text>
                    <View style={{flexDirection:"row"}}>
                        <View style={{ marginBottom:30, marginRight: 10 }}>
                            <TouchableOpacity style={ styles1.unselectedbutton }
                                                activeOpacity={.5}
                                                onPress={() => this.props.navigation.navigate("AddClass")}>
                                        <Text style={styles1.unselctedtextinbutton}> Class </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom:30, marginRight: 10 }}>
                            <TouchableOpacity style={styles1.selectedbutton}
                                                activeOpacity={.5}
                                                onPress={() => this.props.navigation.navigate("AddExams")}>
                            <Text style={styles.TextStyle}> Exams </Text>
                             </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom:30, marginRight: 10 }}>
                            <TouchableOpacity style={styles1.unselectedbutton}
                                                activeOpacity={.5}
                                                onPress={() => this.props.navigation.navigate("AddPracticals")}>
                            <Text style={styles1.unselctedtextinbutton}> Practicals </Text>
                             </TouchableOpacity>
                        </View>

                    </View>

                    <View>
                        <TextInput style={styles1.placeHolder} placeholder="Subject" value={this.state.SubName} onChangeText={SubName=>this.setState({SubName})} />

                        <TextInput style={styles1.placeHolder} placeholder="(YYYY-MM-DD HH:MM)" value={this.state.ExamDate} onChangeText={ExamDate=>this.setState({ExamDate})} />
                        
                       
                        <TextInput style={styles1.placeHolder} keyboardType="numeric" placeholder="Grade (if exam already given)" value={this.state.Grade} onChangeText={Grade=>this.setState({Grade})}  />

                        <TextInput style={styles1.placeHolder} keyboardType="numeric" placeholder="% studied" value={this.state.completedPercentage} onChangeText={completedPercentage=>this.setState({completedPercentage})} />

                        <TouchableOpacity style={styles.button} 
                                            activeOpacity={.5} 
                                            onPress={()=>this.SaveClicked()}>
                        <Text style={styles.TextStyle}> SAVE </Text>
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}}>
                        <TouchableOpacity style={styles1.cancelbutton}
                                            activeOpacity={.4}
                                            onPress={() => this.cancel()} >
                        <Text style={styles1.cancletext}> cancel </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
            </View>
        </View>

    );
}

}

export default AddExams;

const styles1 = StyleSheet.create({

    mainContainer:{        
        justifyContent: 'center',
        alignItems: 'center',
        flex:3,          
        
    },
    headerText:{
        fontSize: 25,
            fontWeight: 'bold',
            marginTop:10,
            marginBottom:15,
            textAlign:'center',

    },
    anotherview:{
        width:300,            
        justifyContent:'center',
        margin:30
    },
    selectedbutton:{
        marginTop:20,
        paddingTop:7,
        paddingBottom:7,
        paddingLeft:7,
        paddingRight:7,
        backgroundColor:'#2ecc71',
        borderRadius:13,

    },
    unselectedbutton:{
        marginTop:20,
        paddingTop:7,
        paddingBottom:7,
        paddingLeft:7,
        paddingRight:7,
        backgroundColor:'#dcdcdc',
        borderRadius:13,
        

    },unselctedtextinbutton:{
        color:'rgba(141, 141, 141, 1)',
        textAlign:'center',
        fontSize:20,
    },
    cancelbutton:{
        backgroundColor:'#dcdcdc',
        marginTop:20,
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        marginLeft:30,
        marginRight:30,    
        borderRadius:40,
        width:110,
    },
    cancletext:{
        color:'black',
        textAlign:'center',        
    },
    rowinputfields:{
        textAlign:'center',
        height:50,
        marginBottom:15,
        borderRadius:15,
        backgroundColor:'#dcdcdc',
        width:150,


    },
    placeHolder:{
        textAlign:'center',
        height:50,
        marginBottom:15,
        borderRadius:15,
        backgroundColor:'#dcdcdc'
    }

    
})

