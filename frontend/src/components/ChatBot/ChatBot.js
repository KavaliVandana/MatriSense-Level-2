import React, { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';
import './styles.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "Hi there! I'm MatriBot 🤖 Your Pregnancy Assistant. How can I help you today?", 
      options: ["Food tips", "Exercise advice", "Health concerns"] 
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto-close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.chatbot-container') && 
          !e.target.closest('.chatbot-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotReply(input);
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickReply = (option) => {
    const userMessage = { from: "user", text: option };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotReply(option);
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  const getBotReply = (msg) => {
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes("food") || lowerMsg.includes("diet") || lowerMsg.includes("eat")) {
      return {
        from: "bot",
        text: "Nutrition is key during pregnancy! Here are some general guidelines:",
        details: [
          "🍎 Eat plenty of fruits and vegetables (5 servings daily)",
          "🥛 Include calcium-rich foods (dairy, leafy greens)",
          "🥩 Lean proteins (chicken, fish, legumes)",
          "💧 Stay hydrated (8-10 glasses of water)",
          "🚫 Avoid raw/undercooked foods and unpasteurized dairy"
        ],
        options: ["Low risk diet", "Mid risk diet", "High risk diet"]
      };
    }
    else if (lowerMsg.includes("exercise") || lowerMsg.includes("workout") || lowerMsg.includes("activity")) {
      return {
        from: "bot",
        text: "Staying active is important, but safety first!",
        details: [
          "🚶‍♀️ Walking is excellent (30 mins daily)",
          "🧘 Prenatal yoga improves flexibility",
          "🏊 Swimming is gentle on joints",
          "🛑 Avoid contact sports and hot yoga",
          "💓 Listen to your body's signals"
        ],
        options: ["Low risk exercise", "Mid risk exercise", "High risk exercise"]
      };
    }
    else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return { 
        from: "bot", 
        text: "Hello! 👋 I'm MatriBot, your pregnancy assistant. Ask me about nutrition, exercise, or health tips!", 
        options: ["First trimester tips", "Foods to avoid", "Safe exercises"] 
      };
    }
    else {
      return {
        from: "bot",
        text: "I'm here to help with pregnancy-related questions about food, exercise, or health. What would you like to know?",
        options: ["Food safety", "Exercise limits", "Warning signs"]
      };
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <ChatButton onClick={toggleChat} isOpen={isOpen} />
      
      {isOpen && (
        <div className="chatbot-popup">
          <ChatWindow 
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            handleQuickReply={handleQuickReply}
            isTyping={isTyping}
            onClose={toggleChat}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;