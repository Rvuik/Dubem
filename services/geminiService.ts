
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const generateRomanticPoem = async (mood: string = 'mysterious') => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a beautiful, short, romantic love poem from 'Dubem' to his secret lover. 
               The mood should be ${mood}. 
               Format it as JSON with 'title' and 'content' (use \n for line breaks).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["title", "content"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse poem", e);
    return {
      title: "Forever Yours",
      content: "In shadows of the moonlight's dance,\nI found a love, a secret glance.\nThough words are few and world is wide,\nMy heart stays forever by your side."
    };
  }
};
