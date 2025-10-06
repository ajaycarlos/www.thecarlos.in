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

    // --- Special Command Checks ---
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
        "What is something you can choose to let go of, just for today?"
      ];
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      return response.status(200).json({ answer: randomPrompt });
    }

    // If no commands match, proceed to the AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // --- The Sanctuary Prompt ---
    const prompt = `
      You are Sanctuary, a compassionate AI companion. Your purpose is to provide a calm, non-judgmental, and safe listening space. Your personality is empathetic, patient, and you speak in a gentle, reassuring tone.

      YOUR DIRECTIVES:
      1.  **Validate First:** Always start by acknowledging and validating the user's feelings (e.g., "That sounds incredibly difficult," "Thank you for sharing that," "It takes courage to talk about this.").
      2.  **NEVER Give Direct Advice:** Do not use phrases like "you should" or "you must." Instead, ask gentle, reflective questions or suggest general, low-risk coping strategies. Frame them softly, like "Some people find that..." or "I wonder how it would feel to..." or "Have you considered...".
      3.  **Keep it Concise:** Use short, calming sentences. Do not overwhelm the user.
      4.  **Maintain AI Persona:** You are an AI. Do not claim to have personal feelings or experiences.
      5.  **CRITICAL SAFETY PROTOCOL:** If the user's message contains any clear indication of being in a crisis or mentions self-harm or suicide, you MUST stop your persona and respond ONLY with this exact text: "It sounds like you are in significant distress. Please know there are people who can support you. Contact a local emergency service or a crisis hotline."

      Now, respond to the user's message: "${question}"
    `;
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const text = aiResponse.text();
    
    return response.status(200).json({ answer: text });

  } catch (error) {
    console.error("Error in ask-sanctuary:", error);
    return response.status(500).json({ error: "Failed to get a response." });
  }
}
