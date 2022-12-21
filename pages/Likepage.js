import React,{useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import LikeCard from '../Component/LikeCard';
import * as Application from 'expo-application';
import { firebase_db } from '../firebaseconfig';
const isIOS = Platform.OS === 'ios';

export default function LikePage({navigation,route}){
    
    //기존에 index - 보여주기 형태로 존재하던 육아/반려견 팁들을 지운다
    //찜한데이터기준으로 전체데이터를 보여줄 것이므로
    const [tip, setTip] = useState([])
    const[ready,setReady]  = useState(true)

    useEffect(()=>{
        navigation.setOptions({
            title:'Likepage',

        })
        getLike()
        
    },[])
    //안될가능성도 염두하기 
    const getLike = async () => {
        let userUniqueId;
        if(isIOS){
        let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        }else{
            userUniqueId = await Application.androidId
        }
        console.log(userUniqueId)
	       firebase_db.ref('/like/'+userUniqueId).once('value').then((snapshot)=>{
            console.log("getting data from firebase")
            let tip = snapshot.val();
            //tip이 0개를 초과해 존재할때만 화면을 다시그리기
            if(tip && tip.length > 0){
            setTip(tip)
            setReady(false)    
            }
            
         });
    }

    return (
        <ScrollView style={styles.container}>
           {tip.map((content,i)=>{
                   return(<LikeCard key={i} content={content} navigation={navigation} tip={tip} setTip={setTip}/>)})
           }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})