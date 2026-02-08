import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          const user = session?.user ?? null;
          setCurrentUser(user);
          if (user) {
            await fetchUserProgress(user.id);
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    // Safety timeout: If Supabase hangs, force app to load after 3 seconds
    const safetyTimeout = setTimeout(() => {
        if (mounted && loading) {
            console.warn("Auth initialization timed out - forcing render.");
            setLoading(false);
        }
    }, 3000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        const user = session?.user ?? null;
        setCurrentUser(user);
        if (user) {
          await fetchUserProgress(user.id);
        } else {
          setSolvedQuestions([]);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProgress = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('question_id')
        .eq('user_id', userId);

      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }
      
      // Defensive check: Ensure data is an array before mapping
      const validData = Array.isArray(data) ? data : [];
      setSolvedQuestions(validData.map(item => item.question_id));
    } catch (error) {
      console.error("Failed to fetch progress", error.message);
      // Fallback to empty array so app doesn't crash
      setSolvedQuestions([]);
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

        {loading ? (

          <div style={{ 

            height: '100vh', 

            display: 'flex', 

            alignItems: 'center', 

            justifyContent: 'center', 

            background: '#020617', 

            color: '#3b82f6',

            flexDirection: 'column'

          }}>

            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>

              <span className="visually-hidden">Loading...</span>

            </div>

            <p style={{ marginTop: '20px', fontFamily: 'sans-serif' }}>Initializing...</p>

          </div>

        ) : children}

      </AuthContext.Provider>

    );

  };

  