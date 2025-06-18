// src/components/Quiz.js
import React from 'react';

const Quiz = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  userAnswer,
  showFeedback,
  topicName,
  onAnswer,
  onNext,
  onReset
}) => {
  const isCorrect = userAnswer === question.answer;
  
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="topic-badge">{topicName}</div>
        <div className="progress">Question {questionNumber} of {totalQuestions}</div>
      </div>
      
      <h2 className="question">{question.question}</h2>
      
      <div className="options">
        {Object.entries(question.options).map(([key, value]) => {
          let className = "option-btn";
          
          if (showFeedback) {
            if (key === question.answer) {
              className += " correct";
            } else if (key === userAnswer) {
              className += " incorrect";
            }
          }
          
          return (
            <button 
              key={key}
              className={className}
              onClick={() => !showFeedback && onAnswer(key)}
              disabled={showFeedback}
            >
              <span className="option-key">{key.toUpperCase()}</span>
              <span className="option-text">{value}</span>
            </button>
          );
        })}
      </div>
      
      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-content">
            <p>
              {isCorrect 
                ? "✓ Correct!" 
                : `✗ Incorrect! The correct answer is: ${question.answer.toUpperCase()} - ${question.options[question.answer]}`
              }
            </p>
            <div className="feedback-buttons">
              <button className="next-btn" onClick={onNext}>
                {questionNumber < totalQuestions ? "Next Question" : "View Results"}
              </button>
              <button className="reset-btn" onClick={onReset}>
                Change Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;