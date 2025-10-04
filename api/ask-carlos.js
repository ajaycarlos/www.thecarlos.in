import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
  // Check that the request is a POST request
  if (request.method !== 'POST') {
    return response.status(405).json({ error: "Method Not Allowed" });
  }
  
  // NEW: Check if the API key is set up correctly in Vercel
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

    const prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant. 
    A user is viewing the fact: "${contextFact}"
    They have a follow-up question: "${question}"
    Please provide a brief, helpful answer. Your response must be a maximum of three sentences.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();

    return response.status(200).json({ answer: text });

  } catch (error) {
    console.error("Error calling Google AI:", error);
    return response.status(500).json({ error: "Failed to get a response from the AI." });
  }
}
