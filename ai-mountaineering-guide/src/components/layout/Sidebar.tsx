"use client";

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, Mountain, MapPin } from 'lucide-react';

export default function Sidebar() {
  const [query, setQuery] = useState('');

  // Примерни (mock) данни - по-късно ще идват от базата данни и AI
  const mockRoutes = [
    {
      id: 1,
      title: "Черни връх (от Алеко)",
      difficulty: "Средна",
      time: "3 часа",
      description: "Класически маршрут до първенеца на Витоша. Подходящ за начинаещи през лятото."
    },
    {
      id: 2,
      title: "Екопътека Бели Искър",
      difficulty: "Лесна",
      time: "2 часа",
      description: "Живописна пътека с множество мостчета над реката. Идеална за семейства."
    },
    {
      id: 3,
      title: "Боянски водопад",
      difficulty: "Трудна",
      time: "4 часа",
      description: "Стръмно изкачване, но спиращи дъха гледки към водопада и София."
    }
  ];

  return (
    <aside className="w-96 h-full bg-white shadow-2xl z-20 flex flex-col absolute left-0 top-0 overflow-hidden">
      {/* Хедър на приложението */}
      <div className="p-6 bg-slate-50 border-b border-slate-100">
        <h1 className="text-3xl font-extrabold mb-1 text-slate-800 tracking-tight flex items-center gap-2">
          AI Hiking Guide 🏔️
        </h1>
        <p className="text-sm text-slate-500">
          Твоят умен планински водач.
        </p>
      </div>

      {/* Поле за търсене с AI */}
      <div className="p-6 border-b border-slate-100 bg-white">
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="ai-search" className="text-sm font-semibold text-slate-700">
            Къде ти се ходи днес?
          </label>
          <div className="relative">
            <Input
              id="ai-search"
              placeholder="Напр: Лека разходка до 2 часа..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10 bg-slate-50 focus-visible:ring-blue-500"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-0 top-0 h-full text-slate-400 hover:text-blue-600 hover:bg-transparent"
            >
              <Search size={18} />
            </Button>
          </div>
        </form>
      </div>

      {/* Списък с препоръчани маршрути */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
          <MapPin size={14} /> Препоръчани маршрути
        </h3>
        <div className="flex flex-col gap-4">
          {mockRoutes.map((route) => (
            <Card key={route.id} className="cursor-pointer hover:border-blue-400 transition-colors shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-slate-800">{route.title}</CardTitle>
                <CardDescription className="text-xs">{route.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1">
                    <Mountain size={14} className={route.difficulty === 'Лесна' ? 'text-green-500' : route.difficulty === 'Средна' ? 'text-amber-500' : 'text-red-500'} />
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
        </div>
      </div>
    </aside>
  );
}