import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANmQulMtFRYvGAa-NfsdMGXX-vfrggwwI",
  authDomain: "my-projet-7faab.firebaseapp.com",
  projectId: "my-projet-7faab",
  storageBucket: "my-projet-7faab.appspot.com",
  messagingSenderId: "262453063618",
  appId: "1:262453063618:web:b79b7f18271b727625305b"
};


let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const db2 = getFirestore(app);
export { db, auth,db2 };