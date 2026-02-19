"use client";

import React, { useEffect, useRef } from 'react';
import { useChat } from 'ai/react'; // Внасяме магията на Vercel AI SDK
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, Mountain, MapPin, Bot, User } from 'lucide-react';

export default function Sidebar() {
  // useChat автоматично се свързва с нашия сървър в /api/chat
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоматично скролиране до най-новото съобщение
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mockRoutes = [
    { id: 1, title: "Черни връх (от Алеко)", difficulty: "Средна", time: "3 часа", description: "Класически маршрут до първенеца на Витоша." },
    { id: 2, title: "Екопътека Бели Искър", difficulty: "Лесна", time: "2 часа", description: "Живописна пътека с множество мостчета над реката." },
  ];

  return (
    <aside className="w-96 h-full bg-white shadow-2xl z-20 flex flex-col absolute left-0 top-0 overflow-hidden">
      {/* Хедър */}
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex-shrink-0">
        <h1 className="text-3xl font-extrabold mb-1 text-slate-800 tracking-tight flex items-center gap-2">
          AI Hiking Guide 🏔️
        </h1>
        <p className="text-sm text-slate-500">Твоят умен планински водач.</p>
      </div>

      {/* Динамична част: Чат или Препоръчани маршрути */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 flex flex-col gap-4">

        {messages.length === 0 ? (
          // АКО НЯМА ЧАТ: Показваме препоръчаните маршрути
          <>
            <h3 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
              <MapPin size={14} /> Препоръчани маршрути
            </h3>
            {mockRoutes.map((route) => (
              <Card key={route.id} className="cursor-pointer hover:border-blue-400 transition-colors shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-slate-800">{route.title}</CardTitle>
                  <CardDescription className="text-xs">{route.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-1">
                      <Mountain size={14} className="text-amber-500" />
                      {route.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-blue-500" />
                      {route.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          // АКО ИМА ЧАТ: Показваме съобщенията
          <div className="flex flex-col gap-4 pb-4">
            {messages.map(m => (
              <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 flex-row">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none text-slate-400 text-sm animate-pulse">
                  Мисля...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Поле за писане към AI (Винаги най-долу) */}
      <div className="p-6 border-t border-slate-100 bg-white flex-shrink-0">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Попитай ме за маршрут..."
              className="pr-10 bg-slate-50 focus-visible:ring-blue-500 rounded-xl"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full text-slate-400 hover:text-blue-600 hover:bg-transparent"
              disabled={isLoading || !input.trim()}
            >
              <Search size={18} />
            </Button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-1">
            AI може да допусне грешки. Винаги проверявай условията в планината.
          </p>
        </form>
      </div>
    </aside>
  );
}