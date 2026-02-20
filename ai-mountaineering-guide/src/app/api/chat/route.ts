import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Позволяваме на сървъра да обработва заявката до 30 секунди
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Защита: Проверяваме дали изобщо сме сложили API ключ
    if (!process.env.OPENAI_API_KEY) {
      console.error("ГРЕШКА: Липсва OPENAI_API_KEY в .env.local файла!");
      return new Response('Липсва API ключ', { status: 401 });
    }

    // Извикваме AI модела
    const result = streamText({
      model: openai('gpt-4o-mini'), // Бърз и евтин модел
      system: `Ти си експертен и ентусиазиран планински водач за България.
      Твоята задача е да помагаш на потребителите да си намират подходящи маршрути, хижи и върхове.
      Бъди кратък, точен и винаги давай съвети за безопасност и екипировка, когато е нужно.
      Използвай емоджита, за да е по-приятно четенето.`,
      messages,
    });

    // Връщаме отговора като поток (stream), за да се изписва буква по буква
    return result.toDataStreamResponse();

  } catch (error) {
    // Ако нещо гръмне (напр. невалиден ключ или няма интернет), ще го видим в конзолата!
    console.error('Грешка в AI Бекенда:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}