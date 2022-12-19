import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyBv_TYYKy7LwOS2jMsXg2pk1I3c2CLd1SE",
  authDomain: "cookie-32b62.firebaseapp.com",
  databaseURL: "https://cookie-32b62-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cookie-32b62",
  storageBucket: "cookie-32b62.appspot.com",
  messagingSenderId: "509035970147",
  appId: "1:509035970147:web:44a1878909b1a8cdaf4256",
  measurementId: "G-LBR86ZV521"
};

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()