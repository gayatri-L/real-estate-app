import React, { useState, useEffect } from "react";
import { Send } from "@mui/icons-material";

const ChatResponse = ({ fetchAIResponse }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const userAvatar = "https://i.pravatar.cc/50?img=3";
  const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

  useEffect(() => {
    setMessages([{ text: "Hola, What can I do for you today?", sender: "bot" }]);
  }, []);

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
    setUserInput("");
    setIsTyping(true);

    try {
      const apiResponse = await fetchAIResponse(userInput);
      const botReply = apiResponse?.question || "Let's find the best property for you...";
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center h-auto bg-black">
      {/* Chat Messages Container */}
      <div className="flex flex-col w-full max-w-2xl h-[60vh] rounded-lg mx-auto overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-full mr-2" />}
            <div
              className={`p-3 max-w-xs rounded-lg ${
                msg.sender === "user" ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "user" && <img src={userAvatar} alt="User" className="w-8 h-8 rounded-full ml-2" />}
          </div>
        ))}

        {/* Bot Typing Animation */}
        {isTyping && (
          <div className="flex justify-start items-center space-x-2">
            <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-full" />
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg animate-pulse">Bot is typing...</div>
          </div>
        )}
      </div>

      {/* Chat Input Section */}
      <div className="w-full max-w-2xl flex items-center mt-2 p-2 bg-gray-800 rounded-lg border border-yellow-500">
        <input
          type="text"
          placeholder="Type your real estate question here..."
          className="flex-grow p-3 bg-gray-800 text-white outline-none"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>
          <Send className="p-1 text-yellow-400" style={{ fontSize: "40px" }} />
        </button>
      </div>
    </section>
  );
};

export default ChatResponse;
