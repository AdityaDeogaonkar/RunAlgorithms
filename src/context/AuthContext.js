import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        await fetchUserProgress(user.id);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        await fetchUserProgress(user.id);
      } else {
        setSolvedQuestions([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProgress = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('question_id')
        .eq('user_id', userId);

      if (error) throw error;
      setSolvedQuestions(data.map(item => item.question_id));
    } catch (error) {
      console.error("Failed to fetch progress", error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Determine the redirect URL based on where the user is currently
      const redirectUrl = window.location.origin;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google", error.message);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateLocalProgress = (questionId, isSolved) => {
    if (isSolved) {
      setSolvedQuestions(prev => [...new Set([...prev, questionId])]);
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