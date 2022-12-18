
import React, { useEffect } from 'react';
import {View,Text,ScrollView,Image, TouchableOpacity,StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

//const 변수는 임포트아래놔두어도 상관없 벗 익스포트 아래가 권장 됨

export default function Aboutpage({navigation,route}){

   const main = 'https://firebasestorage.googleapis.com/v0/b/skytips-5d4bd.appspot.com/o/codinggirl4.jpeg?alt=media&token=9ec9ad50-f90e-4d10-8dbd-efc6f515b6b7'

   useEffect(()=>{
    navigation.setOptions({
        title:"About page",
        headerStyle: {
            backgroundColor: '#1F266A',
            shadowColor: "#1F266A",
        },
        headerTintColor: "#fff",
    })
},[])

   const link =()=>{
    Linking.openURL("https://www.instagram.com/_______grey__moon/")
   }
   
    return(
        <ScrollView>
            <View style={styles.Container}>
                <StatusBar style='dark'/>
          
                <Text style={styles.Title}>Hello! Sky의 방에 오신 여러분을  환영합니다</Text>
                <Image style={styles.mainImage} source={{uri:main}}/>
                <Text style={styles.AboutText1}>많은 내용을 최대한 간결하게 담아내려 노력했습니다</Text>
                <Text style={styles.AboutText2}> 유용한 팁들은 지속적으로 업데이트 할 예정입니다</Text>
                <Text style={styles.AboutText2}> 문의사항은 하단의 인스타그램계정을 통해주세요!</Text>
                <TouchableOpacity style={styles.Igbtn} onPress={()=>link()}><Text style={styles.btntxt}>개발자 인스타 계정</Text></TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    Container:{
        flex:1,
        backgroundColor:"black",
        height:1000,
        alignItems:'center',
    },

    mainImage:{
        // flex:1,
        width:300,
        height:200,
        marginTop:30,        
        // alignContent:'center',
        // justifyContent:"center",
        borderRadius:8,
    }
    ,
    Title:{
        marginTop:60,
        // marginLeft:30,
        fontSize:30,
        fontWeight:"700",
        color:'white',
        textAlign:'center',
  
    },

    AboutText1:{
        color:"white",
        fontSize:17,
        // fontWeight:"300",
        margin:20,

    },
    AboutText2:{
        color:"white",
        fontSize:15,
        margin:10,

    },
    Igbtn:{
        marginTop:30,
        width:200,
        height:50,
        backgroundColor:"skyblue",
        borderRadius:8,
    },
    btntxt:{
        color:'white',
        textAlign:'center',
        marginTop:10,
        fontWeight:"700",
        fontSize:20,
        fontWeight:"100"
    }

})