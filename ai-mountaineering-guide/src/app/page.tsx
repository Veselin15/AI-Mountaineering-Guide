import React from 'react';
import MapViewer from '@/components/map/MapViewer';
import Sidebar from '@/components/layout/Sidebar';

export default function Home() {
  return (
    <main className="flex h-screen w-full overflow-hidden relative">

      {/* Нашият нов страничен панел */}
      <Sidebar />

      {/* Картата (оставяме празно място отляво, за да не се застъпват) */}
      <div className="flex-1 ml-96 relative h-full w-full">
        <MapViewer />
      </div>

    </main>
  );
}