import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyC2JytXcBGa7mV7_XyYAXRyykrV4fXRcHk",
    authDomain: "quiz-app-89d3e.firebaseapp.com",
    databaseURL: "https://quiz-app-89d3e.firebaseio.com",
    projectId: "quiz-app-89d3e",
    storageBucket: "quiz-app-89d3e.appspot.com",
    messagingSenderId: "884586050823",
    appId: "1:884586050823:web:62e087ec731fe1c3cdc1a2"
};
  
firebase.initializeApp(config);

export default firebase;