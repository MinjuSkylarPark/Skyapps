import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import snowball from '../assets/snowball.png';

export default function Loading(){
    return(<View style={styles.container}>
                <Image source={snowball} style={styles.image}/>
             <Text style={styles.title}>Loading...</Text>
           </View>)
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'skyblue',
  
    },
    image:{
        position:'relative',
 

    },
    title: {
        fontSize:20,
        fontWeight:'700',
        color:'skyblue',
        position:'absolute',
    }

})