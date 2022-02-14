import firebase from 'firebase/app';
import 'firebase/database'; 


const firebaseConfig = {
    apiKey: "AIzaSyDCbr6JPPjDcjqUlxFqrk9QMXu8WUY3xnE",
    authDomain: "domain-remi.firebaseapp.com",
    databaseURL: "https://domain-remi-default-rtdb.firebaseio.com",
    projectId: "domain-remi",
    storageBucket: "domain-remi.appspot.com",
    messagingSenderId: "805517597680",
    appId: "1:805517597680:web:e39df4ae3c32a5fb8cdb35"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

  
  export {database as default}