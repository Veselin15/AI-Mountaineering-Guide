"use client";
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <div className="w-full h-full relative">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: 23.3219, // София
            latitude: 42.6977,
            zoom: 10
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12" // Красив стил за планини
        />
        
        {/* Примерен UI върху картата */}
        <div className="absolute top-5 left-5 z-10 bg-white p-4 rounded-xl shadow-lg max-w-md">
          <h1 className="text-2xl font-bold mb-2">AI Hiking Guide 🏔️</h1>
          <p className="text-gray-600">Твоят умен планински водач е тук.</p>
        </div>
      </div>
    </main>
  );
}