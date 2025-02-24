import { useState } from "react";
 
const useOpenAI = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [preferences, setPreferences] = useState({
    bedrooms: "",
    budget: "",
    location: "",
    question: "",
  });
 
  const apiKey = process.env.REACT_APP_OPENAI_KEY;
 
  const fetchAIResponse = async (userInput) => {
    if (!userInput.trim()) return;
 
    if (!apiKey) {
      console.error("OpenAI API key is missing.");
      setAiResponse("Error: API key is missing. Check your .env file.");
      return;
    }
 
    setAiResponse("Thinking... 🤔");
 
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for a real estate platform in India. Extract property details like budget, location, and number of bedrooms from the user's query. If details are missing, ask for them. Respond with JSON: {\"budget\": \"value\", \"location\": \"value\", \"bedrooms\": \"value\", \"questions\": \"missing field questions\"}.",
            },
            { role: "user", content: userInput },
          ],
        }),
      });
 
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
 
      const data = await response.json();
      let aiText = data?.choices?.[0]?.message?.content || "No response from AI";
 
      let parsedResponse = {
        bedrooms: "",
        budget: "",
        location: "",
        question: aiText,
      };
 
      try {
        parsedResponse = JSON.parse(aiText);
      } catch (error) {
        console.warn("AI response is not valid JSON, using fallback.");
      }
 
      setPreferences({
        bedrooms: parsedResponse.bedrooms || "",
        budget: parsedResponse.budget || "",
        location: parsedResponse.location || "",
        question: parsedResponse.question || aiText,
      });
 
      setAiResponse(parsedResponse.question || aiText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching response. Please try again.");
    }
  };
 
  return { aiResponse, preferences, fetchAIResponse };
};
 
export default useOpenAI;