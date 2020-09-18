import * as firebase from 'firebase/app';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'ppby-sns.firebaseapp.com',
  databaseURL: 'https://ppby-sns.firebaseio.com',
  projectId: 'ppby-sns',
  storageBucket: 'ppby-sns.appspot.com',
  messagingSenderId: '493510244551',
  appId: '1:493510244551:web:decae920d2a67b52c4a6e2',
};

export default firebase.initializeApp(firebaseConfig);
