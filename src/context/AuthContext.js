import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, signInWithGoogle, logout, getUserProgress } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Load user's solved questions
        try {
          const progress = await getUserProgress(user.uid);
          setSolvedQuestions(progress);
        } catch (error) {
          console.error("Failed to load progress", error);
        }
      } else {
        setSolvedQuestions([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Update local state when user checks/unchecks a box
  const updateLocalProgress = (questionId, isSolved) => {
    if (isSolved) {
      setSolvedQuestions(prev => [...prev, questionId]);
    } else {
      setSolvedQuestions(prev => prev.filter(id => id !== questionId));
    }
  };

  const value = {
    currentUser,
    solvedQuestions,
    signInWithGoogle,
    logout,
    updateLocalProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
