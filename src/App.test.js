// src/components/Quiz.js
import React from 'react';

const Quiz = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  return (
    <div className="quiz-container">
      <div className="progress">Question {questionNumber} of {totalQuestions}</div>
      <h2 className="question">{question.question}</h2>
      
      <div className="options">
        {Object.entries(question.options).map(([key, value]) => (
          <button 
            key={key}
            className="option-btn"
            onClick={() => onAnswer(key)}
          >
            <span className="option-key">{key.toUpperCase()}</span>
            <span className="option-text">{value}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;