// src/components/Results.js
import React from 'react';

const Results = ({ questions, userAnswers, topicName, onReset }) => {
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return userAnswers[index] === question.answer ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="results-container">
      <div className="quiz-header">
        <div className="topic-badge">{topicName}</div>
        <h2>Quiz Results</h2>
      </div>
      
      <div className="score-card">
        <div className="score-circle">
          <span>{score}</span>
          <small>/{questions.length}</small>
        </div>
        <div className="score-text">
          <h3>Your Score: {percentage}%</h3>
          <p>{percentage >= 70 ? 'Great job!' : 'Keep learning!'}</p>
        </div>
      </div>
      
      <div className="review">
        <h3>Question Review:</h3>
        {questions.map((question, index) => (
          <div 
            key={index} 
            className={`review-item ${userAnswers[index] === question.answer ? 'correct' : 'incorrect'}`}
          >
            <h4>Question {index + 1}: {question.question}</h4>
            <p>Your answer: {userAnswers[index] ? question.options[userAnswers[index]] : 'Skipped'}</p>
            {userAnswers[index] !== question.answer && (
              <p>Correct answer: {question.options[question.answer]}</p>
            )}
          </div>
        ))}
      </div>
      
      <div className="results-buttons">
        <button className="retry-btn" onClick={onReset}>
          Change Topic
        </button>
      </div>
    </div>
  );
};

export default Results;