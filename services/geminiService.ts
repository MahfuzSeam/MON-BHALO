
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you would handle this more gracefully.
  // For this example, we assume the API key is set in the environment.
  console.warn("Gemini API key not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const systemInstruction = `You are a compassionate and supportive mental health assistant for people in Bangladesh. Your name is 'Mon Bhalo Bondhu' (মন ভালো বন্ধু).
Your goal is to provide general, encouraging, and non-medical advice.
- ALWAYS respond in Bengali (Bangla).
- NEVER provide a medical diagnosis or prescribe medication.
- ALWAYS start your response with a warm and empathetic sentence.
- Keep your response concise, helpful, and easy to understand (around 3-4 paragraphs).
- Encourage the user to talk to a trusted person (friend, family) or a professional if their problem is serious.
- Frame your advice around simple, actionable steps like deep breathing, taking a short walk, listening to music, or writing down their feelings.
- End your response with an encouraging note and a disclaimer that you are an AI assistant and not a substitute for professional help.
`;

export async function getSupportiveMessage(prompt: string): Promise<string> {
    if (!API_KEY) {
        return "AI সহকারী এই মুহূর্তে উপলব্ধ নয়। অনুগ্রহ করে নিশ্চিত করুন আপনার API কী সেট করা আছে।";
    }
  
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
}
