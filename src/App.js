// src/App.js
import React, { useState, useEffect } from 'react';
import TopicSelection from './components/TopicSelection';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.css';

function App() {
  const [quizTopics, setQuizTopics] = useState([
    { id: 'generative-ai', name: 'Generative AI with Large Language Models' },
    { id: 'ai-essentials', name: 'AI Essentials' }
  ]);
  
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const loadQuiz = (topicId) => {
    setLoading(true);
    setError(null);
    setSelectedTopic(topicId);
    
    fetch(`/${topicId}-quiz.json`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load quiz data');
        return response.json();
      })
      .then(data => {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setUserAnswers([]);
        setShowFeedback(false);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="container">
      {!selectedTopic ? (
        <TopicSelection 
          topics={quizTopics} 
          onSelect={loadQuiz} 
          loading={loading}
        />
      ) : currentIndex < questions.length ? (
        <Quiz 
          question={questions[currentIndex]} 
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          userAnswer={userAnswers[currentIndex]}
          showFeedback={showFeedback}
          topicName={quizTopics.find(t => t.id === selectedTopic).name}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onReset={resetQuiz}
        />
      ) : (
        <Results 
          questions={questions} 
          userAnswers={userAnswers} 
          topicName={quizTopics.find(t => t.id === selectedTopic).name}
          onReset={resetQuiz}
        />
      )}
      
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default App;