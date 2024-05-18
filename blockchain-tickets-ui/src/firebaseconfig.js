// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseconfig = {
  apiKey: "AIzaSyCGqs8O6U1ey0056PYFciM8CFn6obpwKT4",
  authDomain: "eventticketingsystem-cc46d.firebaseapp.com",
  projectId: "eventticketingsystem-cc46d",
  storageBucket: "eventticketingsystem-cc46d.appspot.com",
  messagingSenderId: "1083909476852",
  appId: "1:1083909476852:web:8e68fcece437f5d11969a1",
  measurementId: "G-8YEWV7VCVP"
};

const app = initializeApp(firebaseconfig);
const auth = getAuth(app);

export { auth };
