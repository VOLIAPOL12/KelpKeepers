import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs/promises";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeKelpImage(req, res) {
  try {
    const filePath = req.file.path;
    const base64Image = await fs.readFile(filePath, { encoding: "base64" });
    await fs.unlink(filePath); // cleanup

    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: "Is this photo of kelp? Provide species and notable features.",
      },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    'isKelp': {
                        type: Type.BOOLEAN,
                        description: 'Is it kelp or not?',
                        nullable: false,
                    },
                    'plantName': {
                        type: Type.STRING,
                        description: 'Name of the plant',
                        nullable: false,
                    },
                    'plantDescription': {
                        type: Type.STRING,
                        description: 'Description of the plant',
                        nullable: false,
                    },
                },
                required: ['isKelp', 'plantName', 'plantDescription'],
            }
        }
      });
      
      return res.json({ information: response.text});
  } catch (err) {
    console.error("Gemini error:", err.message);
    return res.status(500).json({ error: "Image analysis failed" });
  }
}
