import React from 'react';
import './styles.css';

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <button 
      className={`chatbot-button ${isOpen ? 'open' : ''}`}
      onClick={onClick}
      aria-label="Chat with MatriBot"
    >
      <span className="chatbot-button-icon">🤖</span>
      {!isOpen && <span className="chatbot-button-pulse"></span>}
    </button>
  );
};

export default ChatButton;