import React from 'react';
import { useAuth } from '../context/AuthContext';

function TopicCard({ topic }) {
  const { solvedQuestions } = useAuth();

  const totalProblems = topic.questions.length;
  const solvedCount = topic.questions.filter(
    q => solvedQuestions.includes(`${topic.id}-${q.id}`)
  ).length;
  const progressPercent = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

  return (
    <div className="topic-card h-100">
      <div className="topic-title">{topic.title}</div>
      <div className="topic-desc">
        {topic.description.length > 80
          ? topic.description.substring(0, 80) + '...'
          : topic.description}
      </div>
      <div className="topic-progress-bar">
        <div
          className="topic-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="topic-meta">
        <span className="topic-count">
          {solvedCount}/{totalProblems} solved
        </span>
        <span>{totalProblems} problems</span>
      </div>
    </div>
  );
}

export default TopicCard;
