import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResponse } from "../types";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    language: {
      type: Type.STRING,
      description: "The programming language detected."
    },
    stepByStep: {
      type: Type.STRING,
      description: "A clear, simple step-by-step explanation of the logic. Use Markdown."
    },
    purpose: {
      type: Type.STRING,
      description: "What the code does and what problem it solves."
    },
    usage: {
      type: Type.STRING,
      description: "How to run the code, inputs/outputs, and dependencies. Use Markdown."
    },
    critique: {
      type: Type.STRING,
      description: "Errors, bugs, security issues, or best practice improvements. Use Markdown."
    },
    improvedCode: {
      type: Type.STRING,
      description: "The corrected or optimized version of the code."
    },
    studentSummary: {
      type: Type.OBJECT,
      properties: {
        summaryText: { type: Type.STRING, description: "A friendly summary for a student." },
        keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key programming concepts used." },
        difficulty: { type: Type.STRING, description: "Estimated difficulty level (e.g., Beginner, Intermediate)." },
        nextSteps: { type: Type.STRING, description: "What the student should study next." }
      },
      required: ["summaryText", "keyConcepts", "difficulty", "nextSteps"]
    }
  },
  required: ["language", "stepByStep", "purpose", "usage", "critique", "improvedCode", "studentSummary"]
};

export const analyzeCode = async (code: string): Promise<AnalysisResponse> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are CodeTutor AI, a world-class, beginner-friendly coding instructor.
      Analyze the following code snippet strictly.
      
      Goals:
      1. Identify the language.
      2. Explain it simply step-by-step.
      3. Describe the purpose.
      4. Explain usage.
      5. Detect errors or improvements.
      6. Provide an improved version (do not change logic unless necessary).
      7. Provide a summary for students.

      Code to analyze:
      \`\`\`
      ${code}
      \`\`\`
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are a helpful, encouraging, and precise coding tutor.",
        temperature: 0.3, // Lower temperature for more analytical/precise results
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from AI.");
    }

    return JSON.parse(text) as AnalysisResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze code. Please try again.");
  }
};
