import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_sWY_RfIHRiIhYFrRCFp80wD4V54taMs",
  authDomain: "hrs-uat.firebaseapp.com",
  projectId: "hrs-uat",
  storageBucket: "hrs-uat.appspot.com",
  messagingSenderId: "411628377938",
  appId: "1:411628377938:web:8cc8cc59236256e353cc8b",
  measurementId: "G-MZMRXMD03S",
};
initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
