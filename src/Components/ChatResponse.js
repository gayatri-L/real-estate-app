import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Send } from "@mui/icons-material";

const ChatResponse = ({ animationData, fetchAIResponse }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showExamples, setShowExample] = useState(true); // Controls example visibility


  const userAvatar = "https://i.pravatar.cc/50?img=3";
  const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";

  useEffect(() => {
    setMessages([
      { text: "Hola, What can I do for you today?", sender: "bot" },
    ]);
  }, []);
  const handleSend = async () => {
    if (userInput.trim() === "") return;

    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
    setUserInput("");
    setIsTyping(true);
    setIsSent(true);
    setShowExample(false); // Hide example on first message send

    try {
      const apiResponse = await fetchAIResponse(userInput);
      console.log("API Response:", apiResponse); // Debugging step
      if (!apiResponse) {
        throw new Error("No response from API");
      }

      // Get bot's message (either question or normal response)
      const botReply = apiResponse.question || "Let's find best suited property for you...";
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching API response:", error);
      setMessages((prev) => [...prev, { text: "Oops! Something went wrong.", sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  }



return (
  <section className="w-full p-6 relative flex flex-col items-center">
    {/* Lottie Animation - Initially Centered, Moves Left on Send */}
    <div
      className={`transition-all duration-700 ${isSent ? "absolute top-4 left-4 w-20 h-20" : "w-48 h-48 mt-4"
        }`}
    >
      <Lottie animationData={animationData} loop autoplay />
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80 w-full max-w-2xl max-h-96">
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
          {msg.sender === "bot" && <img src={botAvatar} alt="Bot" className="w-8 h-8 rounded-full mr-2" />}
          <div
            className={`p-3 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-yellow-500 text-black" : "bg-gray-800 text-white"
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
          <div className="bg-gray-700 text-white px-4 py-2 rounded-lg animate-pulse">
            Bot is typing...
          </div>
        </div>
      )}
    </div>



    {/* Chat Input Section - Initially Below 'Hola' Message, Moves Down on Send */}
    <div className={`transition-all duration-700 w-full flex flex-col items-center ${isSent ? "fixed bottom-12 left-0 p-4 m-4" : "mb-20"}`}>

      {/* Input Box and Send Button */}
      <div className="flex items-center space-x-2 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Type your real estate question here..."
          className="flex-grow p-3 bg-gray-800 rounded-lg border border-yellow-500 text-white"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="align-middle rounded-3xl" onClick={handleSend}>
          <Send className="p-1 text-yellow-500" style={{ fontSize: "60px" }} />
        </button>
      </div>

      {/* Example Queries (Now Below Input Box) */}
      {showExamples && (
        <div className="mt-3 text-gray-400 text-sm text-left w-full max-w-2xl">
          <p>Example Queries:</p>
          <ul className="list-disc text-left ml-4">
            <li>I am looking to buy a 3 BHK in Karve Nagar</li>
            <li>Buy 1 BHK in Wakad with a budget of 40 lakhs</li>
            <li>Buy an apartment within a range of 80 lakhs in Pune</li>
          </ul>
        </div>
      )}

    </div>

  </section>
);
};

export default ChatResponse;
