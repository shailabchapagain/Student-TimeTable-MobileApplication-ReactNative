import {StyleSheet} from 'react-native';


const styles= StyleSheet.create({


    mainContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        
        
    },

    header:{
        fontSize: 60,
        fontWeight: 'bold',
        marginTop:30,
        marginBottom:20,
        textAlign:'center',
        
    },

    button:{
    marginTop:20,
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:15,
    paddingRight:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#000000',
    borderRadius:20,
    borderWidth: 1,
    borderColor: '#fff'
    },

    TextStyle:{
        color:'#f0fff0',
        textAlign:'center',
        fontSize:20,


    },

    placeHolder:{
        textAlign:'center',
        height:50,
        marginBottom:10,
        borderRadius:15,
        backgroundColor:'#dcdcdc'
        
    },
    buttonText:{
        backgroundColor:'transparent'

    },
    img: {
        height: 130,
        width: 130,
        borderRadius: 100,
        backgroundColor: '#eee',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:40,
        marginTop:30,
        marginLeft:60,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 5,
        borderColor: 'rgba(48, 57, 82, 1)'
      },

      //Classes Page
      TodayText:{
          fontSize:30,
          marginBottom:10,
          fontWeight:"700",
      },
      dateText:{
        fontSize:20,
        marginBottom:10,
    },
    UpcomingText:{
     
        fontSize:30,
        fontWeight:"300"
    },
      mainFlex:{
          alignItems:'center',
        flexDirection: "column",
          flex:10,
          padding: 10,
          
      },
      
      infoElement:{
        alignItems:'center',
       margin:15,
      
       paddingBottom:15,
       paddingLeft:15,
       
        justifyContent:'space-between',
        borderRadius:20,
        flexDirection:'row',
        height:140,
        backgroundColor: '#546DE5',
      },
      infoTextStyle:{
        marginTop:15,
        flexGrow:2,
          margin:4,
  fontSize:20,
        color:"white",
       
    },
    circle: {
        shadowColor:'#636e72',
        shadowRadius:10,
        alignSelf:'flex-start',
        backgroundColor:'#ffeaa7',
        justifyContent:'center',
        width: 44,
        height: 44,
        borderRadius: 44/2
     },
      timeAndPlace:{
          padding:20,
          paddingTop:20,
          paddingBottom:20,

  
        alignItems:'flex-end',
        flexDirection:'column',

      },
      editIcon: {
        alignSelf:'center',
        height:23,
        width:23,
      },
      //Practical Page
      Navtypebuttons:{
        marginTop:20,
               paddingTop:7,
               paddingBottom:7,
               paddingLeft:7,
               paddingRight:7,
               backgroundColor:'#2ecc71',
               borderRadius:17,
      },
    infoElement1:{
      alignItems:'center',
      margin:15,
      paddingBottom:15,
      paddingLeft:15,
      justifyContent:'space-between',
      borderRadius:20,
      flexDirection:'row',
      height:140,
      backgroundColor:'rgba(48, 57, 82, 1)',
    },
    infoElement2:{
      alignItems:'center',
      margin:15,
      paddingBottom:15,
      paddingLeft:15,
      justifyContent:'space-between',
      borderRadius:20,
      flexDirection:'row',
      height:140,
      backgroundColor:'rgba(225, 95, 65, 1)',
    },
    
    
    
   
});

export default styles;