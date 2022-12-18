import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';

const main = 'https://firebasestorage.googleapis.com/v0/b/skytips-5d4bd.appspot.com/o/MyPhoto_1102.jpg?alt=media&token=39846157-c6fd-4823-a394-9c040f1ae40a'
import data from '../data.json';
import Card from '../Component/Card';
import Loading from '../Component/Loading';
import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";

export default function MainPage({navigation,route}) {
	//[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
  //setState는 state를 변경시킬때 사용해야하는 함수

  //useState()안에 전달되는 값은 state 초기값
  const [state,setState] = useState([])
  const [cateState,setCateState] = useState([])

	//하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
  //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
  const [ready,setReady] = useState(true)

  useEffect(()=>{
    navigation.setOptions({
      title:'Skys secret chamber'
  })  
    setTimeout(()=>{
        getLocation()
        setState(data.tip)
        setCateState(data.tip)
        setReady(false)
    },1000)
 
    
  },[])

  // 1) 외부 API 작업과 
  // 2) 앱이 아닌 휴대폰 자체 기능(위치 정보 권한 물어보기 등)을 
  
  // 사용할 땐 async / await를 사용한다 

  const getLocation = async()=>{
    // try{} 부분엔 API요청 같은 작업 코드를
    // catch{} 부분엔 에러가 발생 했을 때 실행 할 코드를 작성합니다.
    try{
      await Location.requestForegroundPermissionsAsync()
      const locationData = await Location.getCurrentPositionAsync()
      console.log(locationData)
      //현재위치를 받아와서 확인차 콘솔로 내보낸다
    }catch(error){
      Alert.alert("현재 위치를 찾을 수 없습니다","종료 후 다시 실행해주세요")

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
      return 구문 안에서는 {슬래시 +  * 방식으로 주석
    */

    <ScrollView style={styles.container}>
      <StatusBar style="light" />
			 <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition} </Text>
       <TouchableOpacity style={styles.introButton} onPress={()=>{navigation.navigate('Aboutpage')}}>
        <Text style={styles.introText}>소개페이지</Text>
        </TouchableOpacity>
      <Image style={styles.mainImage} source={{uri:main}}/>
      <ScrollView style={styles.middleContainer} horizontal indicatorStyle={"white"}>
       
      <TouchableOpacity style={styles.middleButtonAll} onPress={()=>{category('전체보기')}}><Text style={styles.middleButtonTextAll}>전체보기</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('생활')}}><Text style={styles.middleButtonText}>생활</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02} onPress={()=>{category('재테크')}}><Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton01} onPress={()=>{category('육아팁')}}><Text style={styles.middleButtonText}>육아팁</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03} onPress={()=>{category('반려견')}}><Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity>
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
   
    </ScrollView>)
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
introButton:{
  width:100,
  height:35,
  marginTop:10,
  marginLeft:240,
  borderRadius:6,
  backgroundColor:'pink'
  },
  introText:{
    padding:5,
    textAlign:'center',
    fontSize:17,
    fontWeight:'400',
    color:'white'
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


});