import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,Alert} from 'react-native';
import data from '../data.json';
import Card from '../Component/Card';
import Loading from '../Component/Loading';
import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import axios from "axios"
import { firebase_db } from '../firebaseconfig';
import { BannerAd,BannerAdSize,TestIds } from 'react-native-google-mobile-ads';

const main = 'https://firebasestorage.googleapis.com/v0/b/cookie-32b62.appspot.com/o/MyPhoto_1102.jpg?alt=media&token=08456988-6131-421a-a62e-536f4789df15'

const adUnitId = __DEV__ ? TestIds.BANNER :'ca-app-pub-2689079457376389/8877264424'

export default function MainPage({navigation,route}) {
  

//꿀팁데이터들을 관리하는초기-기본useState
  const [state,setState] = useState([])
//선택한 카테고리에맞는 문제데이터를 저장-관리하는 State()
  const [cateState,setCateState] = useState([])
  //날씨 데이터 상태관리 상태 생성!
  const [weather, setWeather] = useState({
    temp : 0,
    condition : ''
  })

	//하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
  //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
  const [ready,setReady] = useState(true)

  useEffect(()=>{
    //헤더의 타이틀 변경
      navigation.setOptions({
          title:'Skys secret chamber'
      })
      //이건 db가져오는 공식 팁방-데이터다가져와 + 매개변수 snapshot란 이름으로 받아옴
      //firebase_db = 리얼타임데이터베이스
      setTimeout(()=>{
        firebase_db.ref('/tip').once('value').then((snapshot)=>{
          console.log("getting data from firebase")
          let tip = snapshot.val();

          setState(tip)
          setCateState(tip)
          getLocation()
          setReady(false)
        });
      },1000)
  },[])

  const getLocation = async () => {
    //수많은 로직중에 에러가 발생하면
    //해당 에러를 포착하여 로직을 멈추고,에러를 해결하기 위한 catch 영역 로직이 실행
    try {
      //자바스크립트 함수의 실행순서를 고정하기 위해 쓰는 async,await
      await Location.requestForegroundPermissionsAsync();
      const locationData= await Location.getCurrentPositionAsync();
      // console.log(locationData)
      // console.log(locationData['coords']['latitude'])
      // console.log(locationData['coords']['longitude'])
      const latitude = locationData['coords']['latitude']
      const longitude = locationData['coords']['longitude']
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      // console.log(result)
      const temp = result.data.main.temp; 
      const condition = result.data.weather[0].main
      
      console.log(temp)
      console.log(condition)

      //오랜만에 복습해보는 객체 리터럴 방식으로 딕셔너리 구성하기!!
      //잘 기억이 안난다면 1주차 강의 6-5를 다시 복습해보세요!
      setWeather({
        temp,condition
      })

    } catch (error) {
      //혹시나 위치를 못가져올 경우를 대비해서, 안내를 준비합니다
      Alert.alert("위치를 찾을 수 없습니다.", "앱을 다시 실행해주세요");
    }
  }

  const category = (cate) => {
    if(cate == "전체보기"){
        //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
        setCateState(state)
    }else{
        setCateState(state.filter((d)=>{
            return d.category == cate
        }))
    }
}

  //data.json 데이터는 state에 담기므로 상태에서 꺼내옴
  // let tip = state.tip;
  let todayWeather = 10 + 17;
  let todayCondition = "흐림"
  //return 구문 밖에서는 슬래시 두개 방식으로 주석
  return ready ? <Loading/> :  (
    /*
      return 구문 안에서는 {슬래시 + * 방식으로 주석
    */
<View>
{__DEV__ ? null : <BannerAd
  unitId={adUnitId}
  size={BannerAdSize.FULL_BANNER}
  requestOptions={{requestNonPersonalizedAdsOnly:true,
  }}
/>}
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.weather}>Today's weather: {weather.temp + ' °C ' + weather.condition} </Text>
       <TouchableOpacity style={styles.aboutButton} onPress={()=>{navigation.navigate('Aboutpage')}}>
          <Text style={styles.aboutButtonText}>About me</Text>
        </TouchableOpacity>
      <Image style={styles.mainImage} source={{uri:main}}/>
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
      <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('육아팁')}}><Text style={styles.middleButtonText}>육아팁</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton04} onPress={()=>{navigation.navigate('Likepage')}}><Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
         {/* 하나의 카드 영역을 나타내는 View */}
         {
          cateState.map((content,i)=>{
            return (<Card content={content} key={i} navigation={navigation}/>)
          })
        }
        
      </View>
   
    </ScrollView>
</View>
    )
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: '#fff',
  },
  title: {
    //폰트 사이즈
    fontSize: 20,
    //폰트 두께
    fontWeight: '700',
    //위 공간으로 부터 이격
    marginTop:50,
    //왼쪽 공간으로 부터 이격
    marginLeft:20
  },
weather:{
    alignSelf:"flex-end",
    paddingRight:20
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width:'90%',
    //컨텐츠의 높이 값
    height:200,
    //컨텐츠의 모서리 구부리기
    borderRadius:10,
    marginTop:20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf:"center"
  },
  middleContainer:{
    marginTop:20,
    marginLeft:10,
    height:60
  },
  middleButtonAll: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#20b2aa",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton01: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fdc453",
    borderColor:"deeppink",
    borderRadius:15,
    margin:7
  },
  middleButton02: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#fe8d6f",
    borderRadius:15,
    margin:7
  },
  middleButton03: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#9adbc5",
    borderRadius:15,
    margin:7
  },
  middleButton04: {
    width:100,
    height:50,
    padding:15,
    backgroundColor:"#f886a8",
    borderRadius:15,
    margin:7
  },
  middleButtonText: {
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center"
  },
  middleButtonTextAll: {
    color:"#fff",
    fontWeight:"700",
    //텍스트의 현재 위치에서의 정렬 
    textAlign:"center"
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
  },
  aboutButton: {
    backgroundColor:"pink",
    width:100,
    height:40,
    borderRadius:10,
    alignSelf:"flex-end",
    marginRight:20,
    marginTop:10
  },
  aboutButtonText: {
    color:"#fff",
    textAlign:"center",
    marginTop:10
  }


});