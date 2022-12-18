import React,{useState, useEffect} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import LikeCard from '../Component/LikeCard';
import Card from '../Component/Card';

export default function LikePage({navigation,route}){
    
    const [tip, setTip] = useState([{
            "idx": 1,
            "category": "육아팁",
            "title": "우는아기 빠르게 달래기",
            "image": "https://firebasestorage.googleapis.com/v0/b/skytips-5d4bd.appspot.com/o/freecry.jpeg?alt=media&token=8b8fd9c4-93eb-4806-a28c-b1e173c13deb",
            "desc": "아기의 양팔을 가슴으로 모아주고 기저귀부분을 잡은다음 45도각도로 어르듯이 흔들어준다. 이는 아기가 엄마의 뱃속에 있을 때와 가장 유사한 환경이라고 느끼기 때문에 그렇다",
            "date": "2022.11.30"
        },
        {
            "idx": 2,
            "category": "반려견",
            "title": "반려견을 아이와 함께 키울 때",
            "image": "https://firebasestorage.googleapis.com/v0/b/skytips-5d4bd.appspot.com/o/Westie_pups.jpg?alt=media&token=d04b90ac-dde5-4f5e-afa5-b17c666081c9",
            "desc": "‘인간의 행복’을 위해 반려동물을 키우는 것에 대해 꾸준히 비판과 우려를 제기해온 그는 특히 ‘아이들의 정서’를 위해 반려견을 키우려 한다는 부모들에게 당부한다. “반려동물을 통해 아이들의 정서가 좋아진다면, 그것은 부모가 나와 생김새와 느낌, 말과 행동이 다른 동물을 아끼는 모습을 보기 때문입니다.” 인간의 뜻에 의해 인간과 함께 살게 된 생명을 좀 더 이해하고 행복하게 살 수 있도록 하는 것은 역시 인간의 노력에 달려 있다.",
            "date": "2022.11.30"
    }])


    useEffect(()=>{
        navigation.setOptions({
            title:'꿀팁 찜'
        })
    })

    return (
        <ScrollView style={styles.container}>
           {
               tip.map((content,i)=>{
                   return(<LikeCard key={i} content={content} navigation={navigation}/>)
               })
           }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff"
    }
})