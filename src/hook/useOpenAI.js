import { useState } from "react";

const useOpenAI = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [preferences, setPreferences] = useState({
    bedrooms: "",
    budget: "",
    location: "",
    question: "",
  });
  const apiKey = process.env.OpenAIKey;

  const fetchAIResponse = async (userInput) => {
    if (!userInput.trim()) return;

    setAiResponse("Thinking... 🤔");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Replace with your OpenAI key
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant for a real estate platform only based in India. Your task is to extract property information such as budget, location, number of bedrooms, and other filters from the user's query in a structured JSON format.If any of these details are missing, ask only for the missing ones in a professional manner.Once all required details are provided, confirm them and respond with: 'Thanks find best-suited properties.' Always return the response in JSON format with the following structure: {\"budget\": \"value\", \"location\": \"value\", \"bedrooms\": \"value\", \"questions\": \"Comma-separated string of missing field questions\"}." },
            { role: "user", content: userInput }],
        }),
      });

      const data = await response.json();

      let aiText = data?.choices?.[0]?.message?.content || "No response from AI";

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(aiText);
      } catch (error) {
        parsedResponse = { question: aiText }; // If not JSON, assume AI just returned a simple answer
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
