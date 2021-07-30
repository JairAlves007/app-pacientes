import firebase from 'firebase';

const firebaseConfig = {
   apiKey: "AIzaSyCsFMi9JQ_9oJAFga0dCFUYU8CNRnUE_H4",
   authDomain: "crud-react-firebase-c7936.firebaseapp.com",
   projectId: "crud-react-firebase-c7936",
   storageBucket: "crud-react-firebase-c7936.appspot.com",
   messagingSenderId: "694048938965",
   appId: "1:694048938965:web:4ba575e3b7bf09562efb5c"
};

let fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();