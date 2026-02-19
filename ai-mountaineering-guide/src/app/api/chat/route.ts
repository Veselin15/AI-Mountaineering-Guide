import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Позволяваме на сървъра да обработва заявката до 30 секунди (нужно за AI)
export const maxDuration = 30;

export async function POST(req: Request) {
  // Взимаме съобщенията от фронтенда
  const { messages } = await req.json();

  // Извикваме OpenAI (използваме бързия и евтин модел gpt-4o-mini)
  const result = streamText({
    model: openai('gpt-4o-mini'),
    // Това е "Системният промпт" - тук програмираме характера на нашия AI
    system: `Ти си експертен и ентусиазиран планински водач за България.
    Твоята задача е да помагаш на потребителите да си намират подходящи маршрути, хижи и върхове.
    Бъди кратък, точен и винаги давай съвети за безопасност и екипировка, когато е нужно.
    Използвай емоджита, за да е по-приятно четенето.`,
    messages,
  });

  // Връщаме отговора като поток (stream), за да се изписва буква по буква
  return result.toDataStreamResponse();
}