import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSpUIkLT7JQpYZt65aPQPzvQ2n1wL60Pc",
  authDomain: "sampleapi-5b1f4.firebaseapp.com",
  projectId: "sampleapi-5b1f4",
  storageBucket: "sampleapi-5b1f4.firebasestorage.app",
  messagingSenderId: "823068081706",
  appId: "1:823068081706:web:c3a9bc3665364d24294d53",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
