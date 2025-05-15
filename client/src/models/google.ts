import {rest} from './myFetch';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function askGemini(prompt: string): Promise<string> {
    const modelName = 'gemini-2.0-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GOOGLE_API_KEY}`

    const response = await rest<any>(url, {
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    });

    return response?.results?.[0]?.contents?.[0]?.parts?.[0]?.text ?? ''
}

//not using this right now