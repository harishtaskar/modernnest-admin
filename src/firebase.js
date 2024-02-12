// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDowYBXd7hoLHhqmV4X54kh87GcPEts_jw",
  authDomain: "modernnest-5fe3d.firebaseapp.com",
  projectId: "modernnest-5fe3d",
  storageBucket: "modernnest-5fe3d.appspot.com",
  messagingSenderId: "230873944787",
  appId: "1:230873944787:web:bda9097935bd913e4d3a26",
  measurementId: "G-8V8WTE8QP2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
