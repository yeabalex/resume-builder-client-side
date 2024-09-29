import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBy9TfnbvvU6OEuOFaLDy-OrUiESZfl0eM",
  authDomain: "resume-builder-678ca.firebaseapp.com",
  projectId: "resume-builder-678ca",
  storageBucket: "resume-builder-678ca.appspot.com",
  messagingSenderId: "266547010282",
  appId: "1:266547010282:web:93fa8ffb5783d5ffaa5593"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const bucket = getStorage(app)