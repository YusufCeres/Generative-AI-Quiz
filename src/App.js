// src/App.js
import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    fetch('/quiz.json')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load quiz data');
        return response.json();
      })
      .then(data => {
        setQuestions(data.questions);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (answer) => {
    // Record the answer
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    
    // Show feedback
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setUserAnswers([]);
    setShowFeedback(false);
  };

  if (loading) return <div className="container">Loading quiz...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      {currentIndex < questions.length ? (
        <Quiz 
          question={questions[currentIndex]} 
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          userAnswer={userAnswers[currentIndex]}
          showFeedback={showFeedback}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      ) : (
        <Results 
          questions={questions} 
          userAnswers={userAnswers} 
          onReset={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;