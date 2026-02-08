// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE THESE VALUES WITH YOUR OWN FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth Helper Functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Create user document if it doesn't exist
    const userRef = doc(db, "users", result.user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        solvedQuestions: [], // Array of question IDs
        createdAt: new Date()
      });
    }
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// Database Helper Functions
export const toggleQuestionStatus = async (userId, questionId, isSolved) => {
  if (!userId) return;
  const userRef = doc(db, "users", userId);
  
  if (isSolved) {
    await updateDoc(userRef, {
      solvedQuestions: arrayUnion(questionId)
    });
  } else {
    await updateDoc(userRef, {
      solvedQuestions: arrayRemove(questionId)
    });
  }
};

export const getUserProgress = async (userId) => {
  if (!userId) return [];
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data().solvedQuestions || [];
  }
  return [];
};
