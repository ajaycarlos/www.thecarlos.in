import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const { question, contextFact } = request.body;

    if (!question) {
      return response.status(400).json({ error: "No question provided." });
    }

    // UPDATED PROMPT
    const prompt = `You are C.A.R.L.O.S., a helpful and concise AI assistant. 
    A user is viewing the fact: "${contextFact}"
    They have a follow-up question: "${question}"
    Please provide a brief, helpful answer. Your response must be a maximum of three sentences.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();

    response.status(200).json({
      answer: text
    });

  } catch (error) {
    console.error("Error calling Google AI:", error);
    response.status(500).json({
      error: "Failed to get a response from the AI."
    });
  }
}
