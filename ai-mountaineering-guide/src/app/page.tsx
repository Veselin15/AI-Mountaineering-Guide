import React from 'react';
import MapViewer from '@/components/map/MapViewer';

export default function Home() {
  return (
    <main className="flex h-screen w-full overflow-hidden">

      {/* Страничен панел (Sidebar) за бъдещи контроли и маршрути */}
      <aside className="w-96 h-full bg-white shadow-2xl z-20 flex flex-col p-6 absolute left-0 top-0">
        <h1 className="text-3xl font-extrabold mb-2 text-slate-800 tracking-tight">
          AI Hiking Guide 🏔️
        </h1>
        <p className="text-sm text-slate-500 mb-8 pb-4 border-b border-slate-100">
          Твоят умен планински водач.
        </p>

        <div className="flex-1 flex flex-col justify-center items-center text-center text-slate-400">
          <p>Тук ще добавим AI търсачката и детайлите за маршрутите.</p>
        </div>
      </aside>

      {/* Основна част - Картата */}
      <div className="flex-1 ml-96 relative">
        <MapViewer />
      </div>

    </main>
  );
}