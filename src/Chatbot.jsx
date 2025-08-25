import React, { useState } from 'react';
import "./Chatbot.css";

function Chatbot({today,monthly}) {
    const [messages, setMessages] = useState([{
        sender: "bot",
        text: "Hello,I am your assistant. How can I help you today?",
    }]);
    const[input,setInput] = useState("");
    
    const handleSend=()=>{
       if(!input.trim()) return;
       //to preserve exisiting messages, use spread array syntax!
       const newMessage=[...messages,{sender:"user",text:input}];
       setMessages(newMessage);
      
       let reply="Sorry, I didn't understand that.";
       if(input.toLowerCase().includes("today")){
        reply=`Today's total spending is ${today} rupees.`;}
       
       else if(input.toLowerCase().includes("monthly")|| input.toLowerCase().includes("month")){
        reply=`Monthly spending is ${monthly} rupees.`;
       }
       else if(input.toLowerCase().includes("bye")){
        reply="Goodbye! Keep saving!";
       }else if(input.toLowerCase().includes("hello")){
        reply="Hello! How can I help you today?";
       }else if(input.toLowerCase().includes("hi")){
        reply="Hi! How can I help you today?";
       }
       
       setMessages([...newMessage,{sender:"bot",text:reply}]);
       setInput("");
    }
    
    const handleKeyDown=(e)=>{
        if(e.key === 'Enter') {
            handleSend();
        }
    }
    
    return (
        <div className="chatbot-container">
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.sender}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask me something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    );

  }
export default Chatbot;
