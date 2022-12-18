import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,TouchableOpacity,Alert,Share } from 'react-native';
import * as Linking from 'expo-linking';

export default function DetailPage({navigation,route}) {
		

//하단의 초기데이터가없으면 state상태값이없어서 에러가남 
//초기데이터를 세팅해줌으로써 데이터가 없을때 일어날 에러를 방지함 
        const [tip, setTip] = useState({
        "idx": 0,
        "category": "생활",
        "title": "코딩잘하는법",
        "image": "https://firebasestorage.googleapis.com/v0/b/skytips-5d4bd.appspot.com/o/codinggirl2.jpeg?alt=media&token=34ef94cf-da7c-46ea-834e-b76ab2bc8369",
        "desc": "요즘 코딩잘하는 사람이 부쩍늘어난만큼 코딩을 잘하는 법에대한 질문이 늘어간다. 코딩은 외우는 것이아니라 이해하는 것이며 이론이아니라 실재로서 존재한다. 실수의 반복과 실습을 바탕으로 자체프로젝트를 직접제작해보는게 실력향상에 많은 도움이된다.",
        "date": "2022.11.30"
    })

    //navigation의 setOptions또한 useEffect에 사용됨
    //카드팁을 터치했을 때 원래는 DetailPage였는데 클릭한뒤로는 카드팁이름으로 바뀜
    useEffect(()=>{
        console.log(route)
  //Card.js에서 navigation.navigate 함수를 쓸때 두번째 인자로 content를 넘겨줬죠?
  //content는 딕셔너리 그 자체였으므로 route.params에 고대~로 남겨옵니다.
  // 즉, route.params 는 content죠! 
  //+파람은 매개변수 int x,int y x,y가 파람 
        navigation.setOptions({
			//setOptions로 페이지 타이틀도 지정 가능하고
            //타이틀을 이렇게 꺼낸이유는 페이지화된애들은 라우트/네비 둘다쓸수있는데
            //넘겨받은애들은 전부 route.params안에 들어가있기 때문에 
            title:route.params.title,
						//StackNavigator에서 작성했던 옵션을 다시 수정할 수도 있습니다. 
            headerStyle: {
                backgroundColor: '#000',
                shadowColor: "#000",
            },
            headerTintColor: "#fff",
        })
        setTip(route.params)
    },[])

    const popup = () => {
        Alert.alert("Like it!")
    }

    const share = ()=>{
        Share.share({
            message:`${tip.title}\n\n ${tip.desc} \n\n ${tip.image}`
        });
    }
    const link = ()=>{
        Linking.openURL("https://google.co.kr")
    }

    return ( 
        // ScrollView에서의 flex 숫자는 의미가 없습니다. 정확히 보여지는 화면을 몇등분 하지 않고
        // 화면에 넣은 컨텐츠를 모두 보여주려 스크롤 기능이 존재하기 때문입니다. 
        // 여기선 내부의 컨텐츠들 영역을 결정짓기 위해서 height 값과 margin,padding 값을 적절히 잘 이용해야 합니다. 
        <ScrollView style={styles.container}>
            <Image style={styles.image} source={{uri:tip.image}}/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{tip.title}</Text>
                <Text style={styles.desc}>{tip.desc}</Text>
                <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.button} onPress={()=>popup()}><Text style={styles.buttonText}>팁 찜하기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>share()}><Text style={styles.buttonText}>팁 공유하기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>link()}><Text style={styles.buttonText}> 외부 링크 </Text></TouchableOpacity>
                </View>

            </View>
            
        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000"
    },
    image:{
        // width:500,
        height:400,
        margin:10,
        marginTop:40,
        borderRadius:20
    },
    textContainer:{
        padding:20,
        justifyContent:'center',
        alignItems:'center',

    },
    title: {
        fontSize:20,
        fontWeight:'700',
        color:"#eee"
    },
    desc:{
        marginTop:10,
        fontSize:14,
        color:"#eee"
    },
    buttonGroup:{
      flexDirection:'row',
    //   marginLeft:10,
    },

    button:{
        width:100,
        marginTop:20,
        marginLeft:9,
        marginRight:9,
        padding:10,
        borderWidth:1,
        borderColor:'deeppink',
        borderRadius:7,

    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        
    }
})