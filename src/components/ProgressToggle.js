import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

const ProgressToggle = ({ questionId }) => {
  const { currentUser, solvedQuestions, updateLocalProgress, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const isSolved = solvedQuestions.includes(questionId);

  const handleToggle = async () => {
    if (!currentUser) {
      const confirmLogin = window.confirm("You need to sign in to save your progress. Login with Google?");
      if (confirmLogin) {
        try {
          await signInWithGoogle();
        } catch (error) {
          alert("Login failed. Please try again.");
        }
      }
      return;
    }

    setLoading(true);
    const newStatus = !isSolved;
    
    // Optimistic UI update
    updateLocalProgress(questionId, newStatus);

    try {
      if (newStatus) {
        // Use upsert to handle potential duplicates gracefully
        const { error } = await supabase
          .from('user_progress')
          .upsert([{ user_id: currentUser.id, question_id: questionId }], { onConflict: 'user_id, question_id' });
        
        if (error) {
          console.error("Supabase Insert Error:", error);
          throw error;
        }
      } else {
        // Delete
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .match({ user_id: currentUser.id, question_id: questionId });
          
        if (error) {
          console.error("Supabase Delete Error:", error);
          throw error;
        }
      }
    } catch (error) {
      console.error("Detailed Toggle Error:", error.message, error.details);
      // Revert if failed
      updateLocalProgress(questionId, !newStatus);
      alert(`Error saving progress: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" size="sm" variant="primary" />;

  return (
    <div 
      onClick={handleToggle} 
      style={{ cursor: 'pointer', fontSize: '1.2rem' }}
      title={isSolved ? "Mark as unsolved" : "Mark as solved"}
    >
      {isSolved ? (
        <FaCheckCircle className="text-success" />
      ) : (
        <FaRegCircle className="text-secondary" style={{ opacity: 0.5 }} />
      )}
    </div>
  );
};

export default ProgressToggle;