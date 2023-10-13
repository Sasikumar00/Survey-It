import firebase from 'firebase/compat/app'
import 'firebase/compat/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyCWP1aAB0CFzYRPnEpuUUKRyo50bJdBKbE",
    authDomain: "pivony-4d823.firebaseapp.com",
    projectId: "pivony-4d823",
    storageBucket: "pivony-4d823.appspot.com",
    messagingSenderId: "596107296492",
    appId: "1:596107296492:web:b16b3b8dfeedd93c5dafc9",
    measurementId: "G-MQVT8TRP16"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
