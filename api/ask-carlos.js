// TEMPORARY DIAGNOSTIC SCRIPT for /api/ask-carlos.js

export default async function handler(request, response) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: "Server configuration error: API key is missing." });
  }

  // We will call the same URL from the error message, but ask for a list of models.
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
        // If Google sends an error, we'll show it.
        return response.status(apiResponse.status).json(data);
    }

    // If successful, we filter for models that can generate content and return their names.
    const contentModels = data.models
      .filter(m => m.supportedGenerationMethods.includes("generateContent"))
      .map(m => m.name);

    return response.status(200).json({
      message: "Here is the definitive list of models available to your API key:",
      models: contentModels
    });

  } catch (error) {
    console.error("Failed to fetch from Google API:", error);
    return response.status(500).json({ error: "Failed to connect to Google API." });
  }
}
