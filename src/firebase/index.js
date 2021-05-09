import firebase from 'firebase/app';
import 'firebase/database';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCzTIBvSkvpMikbUh4OqJhe4YOPZgeg2TY",
  authDomain: "lucid-dreams-3ea34.firebaseapp.com",
  databaseURL: "https://lucid-dreams-3ea34-default-rtdb.firebaseio.com",
  projectId: "lucid-dreams-3ea34",
  storageBucket: "lucid-dreams-3ea34.appspot.com",
  messagingSenderId: "288286563034",
  appId: "1:288286563034:web:c8d55b359acdb1f3a3a3e3",
  measurementId: "G-4EQ20V6M4G"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;