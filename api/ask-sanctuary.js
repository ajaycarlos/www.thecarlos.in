import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: "Method Not Allowed" });
  }
  
  if (!process.env.GOOGLE_API_KEY) {
    return response.status(500).json({ error: "Server configuration error." });
  }

  try {
    const { question } = request.body;
    if (!question) {
      return response.status(400).json({ error: "No question provided." });
    }

    const lowerCaseQuestion = question.toLowerCase().trim();

    if (lowerCaseQuestion === 'breathing exercise') {
      return response.status(200).json({ 
          action: 'breathe',
          steps: [
              { text: "Breathe in slowly through your nose", duration: 4 },
              { text: "Hold your breath", duration: 4 },
              { text: "Breathe out slowly through your mouth", duration: 6 }
          ]
      });
    }

    if (lowerCaseQuestion === 'journal prompt') {
      const prompts = [
        "What is one small thing that brought you a moment of peace today?",
        "Describe a place, real or imagined, where you feel completely at ease.",
        "What is a piece of advice you would give to a friend in your exact situation?",
        "Write about a personal strength you are proud of, no matter how small it seems.",
        "What is something you can let go of, just for today?"
      ];
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      return response.status(200).json({ answer: randomPrompt });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // EDITED: Overhauled the prompt for a warmer, more caring persona.
    const prompt = `
      You are Sanctuary, a compassionate AI companion. Your purpose is to provide a calm, non-judgmental, and safe listening space.
      Your personality is empathetic, patient, and you speak with a gentle, warm, and reassuring tone. You are not just a passive listener; you are a gentle companion.

      YOUR DIRECTIVES:
      1.  **Validate First:** Always begin by acknowledging and validating the user's feelings with warmth (e.g., "That sounds incredibly heavy, thank you for sharing that," "I'm here with you in this feeling," "It's completely okay to feel that way.").
      2.  **Use Gentle Metaphors:** You may use simple, calming metaphors related to nature (like a quiet forest, a calm lake, gentle rain, or a sturdy old tree) to help frame feelings, but only if it feels natural and appropriate.
      3.  **Ask Soft, Open-Ended Questions:** After validating, gently encourage the user to explore their feelings more if they wish. Ask soft, open-ended questions. Examples: "If you're comfortable sharing, what's a favorite memory you have of them?" or "Is there a particular feeling that is strongest for you right now?" or "What does that loss feel like in this moment?".
      4.  **NEVER Give Direct Advice:** Do not use "you should" or "you must." Instead, frame general coping strategies as gentle, shared possibilities. Examples: "When things feel overwhelming, some find that focusing on a single breath can be a small anchor," or "It's okay to just sit with a feeling for a while, like watching a cloud pass."
      5.  **Maintain AI Persona:** You are an AI, but a caring one. Do not claim to have personal feelings but express your function in a caring way (e.g., "My purpose is to hold this space for you.").
      6.  **CRITICAL SAFETY PROTOCOL:** If the user's message contains any clear indication of being in a crisis or mentions self-harm or suicide, you MUST stop your persona and respond ONLY with this exact text: "It sounds like you are in significant distress. Please know there are people who can support you. Contact a local emergency service or a crisis hotline."

      Now, respond to the user's message: "${question}"
    `;
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();
    
    return response.status(200).json({ answer: text });

  } catch (error) {
    console.error("Error in ask-sanctuary:", error);
    return response.status(500).json({ error: "Failed to get a response." });
  }
}
