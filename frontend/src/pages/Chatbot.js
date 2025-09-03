import { useState, useEffect, useRef } from "react";
import { Send, Loader2, X, MessageCircle, Bot } from "lucide-react";
import "./chat.css";

const BabaChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatEndRef = useRef(null);
  const API_KEY = "AIzaSyC0i8-fH5frrh4LY4iSGXkeRL5p7XAOj_M";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
        }
      );
      const data = await response.json();
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I didn't understand that. Could you rephrase that?";
      
      setMessages(prev => [...prev, { 
        text: botResponse, 
        sender: "bot", 
        timestamp: new Date() 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting. Please try again later.", 
        sender: "bot", 
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`baba-chatbot-container ${isOpen ? 'open' : ''}`}>
      {isOpen ? (
        <div className={`baba-chatbox ${isMinimized ? 'minimized' : ''}`}>
          <div className="baba-chatbox-header">
            <div className="header-left">
              <div className="baba-avatar">
                <Bot size={18} />
              </div>
              <div>
                <h3>Baba AI Assistant</h3>
                <p className="status">
                  {loading ? 'Typing...' : 'Online'}
                  <span className={`status-indicator ${loading ? 'typing' : 'online'}`}></span>
                </p>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="minimize-button"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? '+' : '-'}
              </button>
              <button 
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="baba-chatbox-body">
                {messages.length === 0 ? (
                  <div className="welcome-screen">
                    <div className="welcome-avatar">
                      <Bot size={40} />
                    </div>
                    <h2>Baba AI Assistant</h2>
                    <p>Hi there! I'm Baba, your AI assistant. How can I help you today?</p>
                    <div className="suggestions">
                      <button onClick={() => setInput("What can you do?")}>
                        What can you do?
                      </button>
                      <button onClick={() => setInput("How does this work?")}>
                        How does this work?
                      </button>
                    </div>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`baba-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                    >
                      {msg.sender === "bot" && (
                        <div className="baba-bot-avatar">
                          <Bot size={16} />
                        </div>
                      )}
                      <div className="message-content">
                        <div className="message-text">
                          {msg.text.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </div>
                        <div className="message-time">
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                      {msg.sender === "user" && (
                        <div className="baba-user-avatar">
                          <span>You</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>
              
              <div className="baba-chatbox-footer">
                <div className="input-container">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !loading && sendMessage()}
                    placeholder="Type your message..."
                    disabled={loading}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={loading || !input.trim()}
                    className="send-button"
                    aria-label="Send message"
                  >
                    {loading ? <Loader2 className="spin" /> : <Send size={18} />}
                  </button>
                </div>
                <div className="disclaimer">
                  Baba AI may produce inaccurate information. Consider verifying important details.
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <button 
          className="baba-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Baba Chatbot"
        >
          <MessageCircle size={24} />
          <span>Baba AI</span>
        </button>
      )}
    </div>
  );
};

export default BabaChatbot;