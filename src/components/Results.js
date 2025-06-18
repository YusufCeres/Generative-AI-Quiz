// src/components/Results.js
import React from 'react';

const Results = ({ questions, userAnswers, onReset }) => {
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return userAnswers[index] === question.answer ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div className="score">
        You scored {score} out of {questions.length} ({percentage}%)
      </div>
      
      <div className="review">
        {questions.map((question, index) => (
          <div 
            key={index} 
            className={`review-item ${userAnswers[index] === question.answer ? 'correct' : 'incorrect'}`}
          >
            <h3>Question {index + 1}: {question.question}</h3>
            <p>Your answer: {userAnswers[index] ? question.options[userAnswers[index]] : 'Skipped'}</p>
            {userAnswers[index] !== question.answer && (
              <p>Correct answer: {question.options[question.answer]}</p>
            )}
          </div>
        ))}
      </div>
      
      <button className="reset-btn" onClick={onReset}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;