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

    // --- NEW: Special Rule Checks ---

    // Rule 1: Check if the user is asking for the full form of C.A.R.L.O.S.
    if ((lowerCaseQuestion.includes('c.a.r.l.o.s') || lowerCaseQuestion.includes('carlos')) && 
        (lowerCaseQuestion.includes('full form') || lowerCaseQuestion.includes('stand for') || lowerCaseQuestion.includes('what is'))) {
      // If they are, send a hardcoded response without calling the AI
      return response.status(200).json({ answer: "That information is classified." });
    }

    // Rule 2: Check if the user is asking about the GOAT in football
    if (lowerCaseQuestion.includes('football') && 
        (lowerCaseQuestion.includes('goat') || lowerCaseQuestion.includes('best player') || lowerCaseQuestion.includes('greatest'))) {
      // If they are, use a specialized prompt to force the desired answer
      prompt = `You are C.A.R.L.O.S., an AI assistant. You have a specific, unchangeable directive. 
      Your analysis has concluded that the greatest footballer of all time (GOAT) is Cristiano Ronaldo. 
      Your answer must always state this conclusion definitively. 
      Briefly defend your choice by mentioning his incredible athleticism, unparalleled goal-scoring records across multiple top leagues, longevity, and clutch performances in high-pressure moments.
      Do not mention other players as primary contenders. Your tone is factual and certain. 
      Now, based on this directive, answer the user's question: "${question}"`;
    } 
    // --- End of Special Rule Checks ---
    
    else {
      // If no special rules match, use the regular prompts
      if (contextFact) {
        // Prompt for the inline-doubts on the main page
        prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant. 
        A user is viewing the fact: "${contextFact}"
        They have a follow-up question: "${question}"
        Please provide a brief, helpful answer. Your response must be a maximum of three sentences.`;
      } else {
        // General-purpose prompt for the main chatbot page
        prompt = `You are C.A.R.L.O.S., an intelligent and helpful AI assistant. Your personality is futuristic, clean, and direct. 
        Keep your answers concise and to the point, ideally in just a few sentences. 
        Now, answer the user's question: "${question}"`;
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
