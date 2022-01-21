import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  API_KEY,
  Auth_Domain,
  Project_Id,
  Storage_Bucket,
  Messaging_Sender_Id,
  App_Id,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: Auth_Domain,
  projectId: Project_Id,
  storageBucket: Storage_Bucket,
  messagingSenderId: Messaging_Sender_Id,
  appId: App_Id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
