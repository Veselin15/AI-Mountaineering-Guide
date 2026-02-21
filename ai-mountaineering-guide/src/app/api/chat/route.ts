// Import Google provider
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check for Google API Key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("ERROR: GOOGLE_GENERATIVE_AI_API_KEY is missing in .env.local!");
      return new Response('Missing API key', { status: 401 });
    }

    // Call Gemini 1.5 Flash model
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: `Ти си експертен и ентусиазиран планински водач за България.
      Твоята задача е да помагаш на потребителите да си намират подходящи маршрути, хижи и върхове.
      Бъди кратък, точен и винаги давай съвети за безопасност и екипировка, когато е нужно.
      Използвай емоджита, за да е по-приятно четенето.`,
      messages,
    });

    // Return the response stream
    return result.toDataStreamResponse();

  } catch (error) {
    // Log backend errors to the console
    console.error('Backend AI Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}