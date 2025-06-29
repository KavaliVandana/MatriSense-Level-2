import React, { useRef, useEffect } from 'react';
import './styles.css';

const ChatWindow = ({ messages, input, setInput, handleSend, handleQuickReply, isTyping, onClose }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        <div className="chatbot-header-content">
          <div className="chatbot-avatar">🤖</div>
          <div>
            <h2>MatriBot Assistant</h2>
            <p>{isTyping ? "Typing..." : "Online"}</p>
          </div>
        </div>
        <button className="chatbot-close" onClick={onClose} aria-label="Close chat">
          &times;
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-message ${msg.from === "user" ? "user" : "bot"}`}>
            <div className="chatbot-message-content">
              {msg.text}
              
              {msg.details && (
                <ul className="chatbot-details">
                  {msg.details.map((detail, idx) => (
                    <li key={idx}>
                      <span>•</span> {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {msg.options && (
              <div className="chatbot-options">
                {msg.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(option)}
                    className="chatbot-option"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="chatbot-typing">
            <div className="chatbot-typing-indicator">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your question..."
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
      <div className="chatbot-suggestions">
        Try: "food tips", "exercise advice", or "health concerns"
      </div>
    </div>
  );
};

export default ChatWindow;