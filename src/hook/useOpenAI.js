// // import { useState, useEffect } from "react";

// // const useOpenAI = () => {
// //   const [aiResponse, setAiResponse] = useState("");
// //   const [preferences, setPreferences] = useState(() => {
// //     // Load saved preferences from localStorage (if available)
// //     const saved = localStorage.getItem("realEstatePreferences");
// //     return saved ? JSON.parse(saved) : { bedrooms: "", budget: "", location: "", question: "" };
// //   });

// //   useEffect(() => {
// //     // Save updated preferences to localStorage
// //     localStorage.setItem("realEstatePreferences", JSON.stringify(preferences));
// //   }, [preferences]);

// //   const apiKey = "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"; // Keep this secure!
  
// //   const fetchAIResponse = async (userInput) => {
// //     if (!userInput.trim()) return;
// //     if (!apiKey) {
// //       console.error("OpenAI API key is missing.");
// //       setAiResponse("Error: API key is missing. Check your .env file.");
// //       return;
// //     }

// //     setAiResponse("Thinking... 🤔");

// //     try {
// //       const response = await fetch("https://api.openai.com/v1/chat/completions", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${apiKey}`,
// //         },
// //         body: JSON.stringify({
// //           model: "gpt-4o-mini",
// //           messages: [
// //             {
// //               role: "system",
// //               content:
// //                 "You are a real estate chatbot. Extract budget, location, and bedrooms from the user input. If something is missing, ask for it. Reply in JSON format: {\"budget\": \"\", \"location\": \"\", \"bedrooms\": \"\", \"question\": \"\"}.",
// //             },
// //             { role: "user", content: userInput },
// //           ],
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`API Error: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       let aiText = data?.choices?.[0]?.message?.content || "No response from AI";

// //       let parsedResponse = { bedrooms: "", budget: "", location: "", question: aiText };

// //       try {
// //         parsedResponse = JSON.parse(aiText);
// //       } catch (error) {
// //         console.warn("AI response is not valid JSON, using fallback.");
// //       }

// //       setPreferences((prev) => {

// //         const newPreferences = {
// //           bedrooms: parsedResponse.bedrooms || prev.bedrooms,
// //           budget: parsedResponse.budget || prev.budget,
// //           location: parsedResponse.location || prev.location,
// //           question: parsedResponse.question || aiText,
// //         };

// //         localStorage.setItem("realEstatePreferences", JSON.stringify(newPreferences));
// //         return newPreferences;
// //       });

// //       setAiResponse(parsedResponse.question || aiText);
// //       return parsedResponse;
// //     } catch (error) {
// //       console.error("Error fetching AI response:", error);
// //       setAiResponse("Oops! Something went wrong. Please try again.");
// //       return { question: "Oops! Something went wrong. Please try again." };
// //     }
// //   };

// //   return { aiResponse, preferences, fetchAIResponse };
// // };

// // export default useOpenAI;
// import { useState } from "react";

// const useOpenAI = () => {
//   const [aiResponse, setAiResponse] = useState("");
//   const [preferences, setPreferences] = useState({ bedrooms: "", budget: "", location: "", question: "" });

//   const apiKey = "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"; // Keep this secure!

//   const fetchAIResponse = async (userInput) => {
//     if (!userInput.trim()) return;
//     if (!apiKey) {
//       console.error("OpenAI API key is missing.");
//       setAiResponse("Error: API key is missing.");
//       return;
//     }

//     setAiResponse("Thinking... 🤔");

//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are a real estate chatbot. Extract budget, location, and bedrooms from the user input. If something is missing, ask for it. Reply in JSON format: {\"budget\": \"\", \"location\": \"\", \"bedrooms\": \"\", \"question\": \"\"}.",
//             },
//             { role: "user", content: userInput },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();
//       let aiText = data?.choices?.[0]?.message?.content || "No response from AI";

//       let parsedResponse = { bedrooms: "", budget: "", location: "", question: aiText };

//       try {
//         parsedResponse = JSON.parse(aiText);
//       } catch (error) {
//         console.warn("AI response is not valid JSON, using fallback.");
//       }

//       setPreferences((prev) => ({
//         bedrooms: parsedResponse.bedrooms || prev.bedrooms,
//         budget: parsedResponse.budget || prev.budget,
//         location: parsedResponse.location || prev.location,
//         question: parsedResponse.question || aiText,
//       }));

//       setAiResponse(parsedResponse.question || aiText);
//       return parsedResponse;
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setAiResponse("Oops! Something went wrong. Please try again.");
//       return { question: "Oops! Something went wrong. Please try again." };
//     }
//   };

//   return { aiResponse, preferences, fetchAIResponse };
// };

// export default useOpenAI;
import { useState } from "react";

const useOpenAI = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [preferences, setPreferences] = useState({ bedrooms: "", budget: "", location: "", question: "" });

  const apiKey = "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"; // Keep this secure!

  const fetchAIResponse = async (userInput) => {
    if (!userInput.trim()) return;
    if (!apiKey) {
      console.error("OpenAI API key is missing.");
      setAiResponse("Error: API key is missing.");
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
                `You are a real estate chatbot. Extract budget, location, and bedrooms from the user input. 
                 If all details are provided, respond with a confirmation message. 
                 If something is missing, only ask for the missing details. 
                 Reply in JSON format: {"budget": "", "location": "", "bedrooms": "", "question": ""}. 
                 Existing details: ${JSON.stringify(preferences)}`,
            },
            { role: "user", content: userInput },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("AI Response:", data);
      let aiText = data?.choices?.[0]?.message?.content || "No response from AI";

      // let parsedResponse = { bedrooms: "", budget: "", location: "", question: aiText };

      let parsedResponse;
    try {
        parsedResponse = JSON.parse(aiText);
      } catch (error) {
        console.warn("AI response is not valid JSON, using fallback.");
        throw new Error("AI response is not valid JSON");
      }

      // Only update preferences if new values are provided
      setPreferences((prev) => ({
        bedrooms: parsedResponse.bedrooms || prev.bedrooms,
        budget: parsedResponse.budget || prev.budget,
        location: parsedResponse.location || prev.location,
        question: parsedResponse.question || aiText,
      }));

      setAiResponse(parsedResponse.question || aiText);
      return parsedResponse;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Oops! Something went wrong. Please try again.");
      return { question: "Oops! Something went wrong. Please try again." };
    }
  };

  return { aiResponse, preferences, fetchAIResponse };
};

export default useOpenAI;
