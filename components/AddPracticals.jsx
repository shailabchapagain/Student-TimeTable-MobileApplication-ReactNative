import React,{ Component, useContext, useEffect, useState} from 'react';
import {Text, View, Image,FlatList, StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import styles from "../styles/main";
import { firebase } from "../firebase/config";


class AddPracticals extends Component{
    constructor(props){
        super(props);

        this.state={
            SubName:'',
            Grade:null,
            DueDate:'',
            CompletedPercentage:'',
            date_completed:null
        }
    }

    SaveClicked=()=>{
        var DueDateObj = new Date(this.state.DueDate);
        var CompletedDateObj = new Date(this.state.date_completed);
        

        if(this.state.SubName==""){
            alert("Sorry SubName is a must");
        }
       
        else{
            try{
                const user = firebase.auth().currentUser;

             firebase.firestore().collection(
                "users/"+user.uid+"/practicals"
            ).add({
                SubName:this.state.SubName,
                DueDate:new Date(this.state.DueDate),               
                CompletedPercentage:Number(this.state.CompletedPercentage),
                date_completed:new Date(this.state.date_completed),
                Grade:Number(this.state.Grade),
    
            });
            alert("Practicals added");
            this.props.navigation.navigate("Practical");

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
                            <TouchableOpacity style={styles1.unselectedbutton}
                                                activeOpacity={.5}
                                                onPress={() => this.props.navigation.navigate("AddExams")}>
                            <Text style={styles1.unselctedtextinbutton}> Exams </Text>
                             </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom:30, marginRight: 10 }}>
                            <TouchableOpacity style={styles1.selectedbutton}
                                                activeOpacity={.5}
                                                onPress={() => this.props.navigation.navigate("AddPracticals")}>
                            <Text style={styles.TextStyle}> Practicals </Text>
                             </TouchableOpacity>
                        </View>

                    </View>

                    <View>
                    <TextInput style={styles1.placeHolder} placeholder="Subject" value={this.state.SubName} onChangeText={SubName=>this.setState({SubName})} />


                        <TextInput style={styles1.placeHolder} placeholder="Due Date(YYYY-MM-DD HH:MM)" value={this.state.DueDate} onChangeText={DueDate=>this.setState({DueDate})} />
                        
                       
                        <TextInput style={styles1.placeHolder} keyboardType="numeric" placeholder="% completed" value={this.state.CompletedPercentage} onChangeText={CompletedPercentage=>this.setState({CompletedPercentage})} />

                        <TextInput style={styles1.placeHolder} placeholder=" Completed Date(YYYY-MM-DD HH:MM)(if already completed)" value={this.state.date_completed} onChangeText={date_completed=>this.setState({date_completed})} />

                        <TextInput style={styles1.placeHolder} keyboardType="numeric" placeholder=" Grade (if already completed)" value={this.state.Grade} onChangeText={Grade=>this.setState({Grade})}  />



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

export default AddPracticals;

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
    },
   
    
    
})

