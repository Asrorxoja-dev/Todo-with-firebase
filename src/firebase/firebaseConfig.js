import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCgaqROSrgAptUmSXDBOfpTUOK3taBu_T4",
  authDomain: "todo-list-6a4a9.firebaseapp.com",
  projectId: "todo-list-6a4a9",
  storageBucket: "todo-list-6a4a9.appspot.com",
  messagingSenderId: "611979978041",
  appId: "1:611979978041:web:c5935d8cbbc745819534e8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app)