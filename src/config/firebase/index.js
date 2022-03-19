// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBAmLLqVH2rv9xGZ4CMW6183js1WsQapdI',
  authDomain: 'anisub-e5931.firebaseapp.com',
  projectId: 'anisub-e5931',
  storageBucket: 'anisub-e5931.appspot.com',
  messagingSenderId: '937264342332',
  appId: '1:937264342332:web:ff26226d9bafe1d60faa39',
  measurementId: 'G-6Z6VBVYJGY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
