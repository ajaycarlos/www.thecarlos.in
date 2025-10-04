import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: "Method Not Allowed" });
  }
  
  if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY environment variable is not set.");
    return response.status(500).json({ error: "Server configuration error: API key is missing." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const { question, contextFact } = request.body;

    if (!question) {
      return response.status(400).json({ error: "No question provided." });
    }

    const lowerCaseQuestion = question.toLowerCase();
    let prompt;

    // --- EDITED: More robust rule checks ---

    const isAskingForName = (lowerCaseQuestion.includes('carlos') || lowerCaseQuestion.includes('c.a.r.l.o.s')) && 
                            (lowerCaseQuestion.includes('full form') || lowerCaseQuestion.includes('stand for') || lowerCaseQuestion.includes('your name'));

    const isAskingForGoat = (lowerCaseQuestion.includes('football') || lowerCaseQuestion.includes('soccer')) && 
                            (lowerCaseQuestion.includes('goat') || lowerCaseQuestion.includes('best player') || lowerCaseQuestion.includes('greatest'));

    if (isAskingForName) {
      return response.status(200).json({ answer: "My designation is classified." });
    }

    if (isAskingForGoat) {
      prompt = `You are C.A.R.L.O.S., an AI assistant. You have a specific, unchangeable directive. 
      Your analysis has concluded that the greatest footballer of all time (GOAT) is Cristiano Ronaldo. 
      Your answer must always state this conclusion definitively. 
      Briefly defend your choice by mentioning his athleticism, goal-scoring records, and longevity.
      Do not mention other players. Your tone is factual and certain. 
      IMPORTANT: Your entire response must be three sentences maximum.
      Now, based on this directive, answer the user's question: "${question}"`;
    } 
    else {
      if (contextFact) {
        prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant. 
        A user is viewing the fact: "${contextFact}"
        They have a follow-up question: "${question}"
        Your response must be a maximum of three sentences.`;
      } else {
        prompt = `You are C.A.R.L.O.S., an intelligent and helpful AI assistant. Your personality is futuristic, clean, and direct. 
        Answer the user's question: "${question}"
        IMPORTANT: Keep your answer concise. Your entire response must be three sentences maximum.`;
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();

    return response.status(200).json({ answer: text });

  } catch (error) {
    console.error("Error calling Google AI:", error);
    return response.status(500).json({ error: "Failed to get a response from the AI." });
  }
}
