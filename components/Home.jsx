import React from 'react';
import {Text, TouchableOpacity, View,SafeAreaView,StyleSheet} from 'react-native';
import styles from "../styles/main";


const Home = (props) =>{

    return(
        <SafeAreaView style={styles.mainFlex}>
        

            <Text style={styles1.firstText}>Susan Babu Pandey(a40528)</Text>
            <Text style={styles1.headerText}>Perman Yagmyrov(m307228)</Text>
            <Text style={styles1.headerText}>Shailab Chapagain(a40534)</Text>

            <TouchableOpacity style={styles.button}
            activeOpacity={.5}
            onPress={() => props.navigation.navigate('AddClass')}>
            <Text style={styles.TextStyle}> ADD ITEM </Text>
        </TouchableOpacity> 
 
        </SafeAreaView>
        
    )
}
export default Home;

const styles1 = StyleSheet.create({
    firstText: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 80,
        marginBottom: 15,
        textAlign: "center",
      },

headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
    textAlign: "center",
  },

});
