// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArzxWDeOFMjlCjQbiIFhGkeV3TmjotJW4",
  authDomain: "movieplayer-53d69.firebaseapp.com",
  projectId: "movieplayer-53d69",
  storageBucket: "movieplayer-53d69.appspot.com",
  messagingSenderId: "576436937342",
  appId: "1:576436937342:web:8bd33a3f78a98cb587ae2f",
  measurementId: "G-KP5FNDJYF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();

export {app , auth};