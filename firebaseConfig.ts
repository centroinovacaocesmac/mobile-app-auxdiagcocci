// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsyogNVGiWSwr5POnCCk31pWhpAkTG1Pw",
  authDomain: "coccidiose-aviaria.firebaseapp.com",
  databaseURL: "https://coccidiose-aviaria-default-rtdb.firebaseio.com",
  projectId: "coccidiose-aviaria",
  storageBucket: "coccidiose-aviaria.firebasestorage.app",
  messagingSenderId: "37225731754",
  appId: "1:37225731754:web:b192c31a02a0882bd522d3",
  measurementId: "G-8BWP0NK1RS"
};

// const firebaseConfig = {
//   apiKey: Constants.expoConfig?.extra?.API_KEY,
//   authDomain: Constants.expoConfig?.extra?.AUTH_DOMAIN,
//   databaseURL: Constants.expoConfig?.extra?.DATABASE_URL,
//   projectId: Constants.expoConfig?.extra?.PROJECT_ID,
//   storageBucket: Constants.expoConfig?.extra?.STORAGE_BUCKET,
//   messagingSenderId: Constants.expoConfig?.extra?.MESSAGING_SENDER_ID,
//   appId: Constants.expoConfig?.extra?.APP_ID,
//   measurementId: Constants.expoConfig?.extra?.MEASUREMENT_ID
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);