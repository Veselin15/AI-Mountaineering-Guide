import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse the incoming messages from the frontend
    const { messages } = await req.json();

    console.log("1. Request received, calling Gemini 2.5 Flash...");

    // Call the Gemini model using the correct and newest version
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: `Ти си експертен и ентусиазиран планински водач за България.
      Твоята задача е да помагаш на потребителите да си намират подходящи маршрути, хижи и върхове.
      Бъди кратък, точен и винаги давай съвети за безопасност и екипировка, когато е нужно.
      Използвай емоджита, за да е по-приятно четенето.`,
      messages,
      // Catch any errors that happen during the AI generation process
      onError: ({ error }) => {
        console.error('\n🚨 GEMINI STREAM ERROR 🚨');
        console.error(error);
      }
    });

    console.log("2. Gemini stream successfully started. Sending to frontend...");

    // Return the stream to the client
    return result.toDataStreamResponse();

  } catch (error) {
    // Catch any general server errors
    console.error('\n🚨 GENERAL BACKEND ERROR 🚨');
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}