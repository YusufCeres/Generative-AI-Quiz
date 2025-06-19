// src/components/TopicSelection.js
import React from 'react';

const TopicSelection = ({ topics, onSelect, loading }) => {
  return (
    <div className="topic-selection">
      <h2>Select a Quiz Topic</h2>
      <div className="topics-container">
        {topics.map(topic => (
          <div 
            key={topic.id}
            className="topic-card"
            onClick={() => !loading && onSelect(topic.id)}
          >
            <div className="topic-image">
              <img 
                src={`/${topic.id}.png`} 
                alt={topic.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = 
                    topic.name.includes('AI') ? '🤖' : '🧠';
                }}
              />
            </div>
            <h3>{topic.name}</h3>
            <p>Click to start quiz</p>
          </div>
        ))}
      </div>
      {loading && <div className="loading">Loading quiz...</div>}
    </div>
  );
};

export default TopicSelection;