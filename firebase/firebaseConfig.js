import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBBukKtBVvYPvtYvc7HoE2tYlom6B9J950",
  authDomain: "frescofoods-8d009.firebaseapp.com",
  projectId: "frescofoods-8d009",
  storageBucket: "frescofoods-8d009.appspot.com",
  messagingSenderId: "865365113522",
  appId: "1:865365113522:web:246d1f56156e9e75f627ab"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
