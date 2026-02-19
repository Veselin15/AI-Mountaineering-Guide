"use client";
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Предотвратяваме двойно зареждане (заради React StrictMode)
    if (map.current) return;

    if (mapContainer.current) {
      // Задаваме ключа
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

      // Инициализираме оригиналната Mapbox карта
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Специален стил за планини и природа
        center: [23.3219, 42.6977], // София
        zoom: 10,
        pitch: 45 // Лек 3D наклон за по-ефектен изглед
      });

      // Добавяме контроли за зуум и въртене в горния десен ъгъл
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
  }, []);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <div className="w-full h-full relative">
        {/* Контейнерът, в който Mapbox ще нарисува картата */}
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

        {/* Примерен UI върху картата */}
        <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md border border-slate-100">
          <h1 className="text-3xl font-extrabold mb-2 text-slate-800">AI Hiking Guide 🏔️</h1>
          <p className="text-slate-600">Твоят умен планински водач е готов за приключения.</p>
        </div>
      </div>
    </main>
  );
}