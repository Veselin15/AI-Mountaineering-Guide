"use client";
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Предотвратяваме двойно зареждане
    if (map.current) return;

    if (mapContainer.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        // Създаваме персонализиран стил (Custom Style)
        style: {
          version: 8,
          sources: {
            // 1. Източникът на BGMountains (Растерни плочки от kade.si)
            'bgmountains': {
              type: 'raster',
              tiles: [
                'https://bgmtile.kade.si/{z}/{x}/{y}.png'
              ],
              tileSize: 256,
              attribution: '<a href="https://bgmountains.org/" target="_blank">© BGMountains / kade.si</a>'
            },
            // 2. 3D терен от Mapbox (за да направим планините триизмерни)
            'mapbox-dem': {
              type: 'raster-dem',
              url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
              tileSize: 512,
              maxzoom: 14
            }
          },
          layers: [
            // Показваме BGMountains слоя като основа
            {
              id: 'bgmountains-layer',
              type: 'raster',
              source: 'bgmountains',
              minzoom: 0,
              maxzoom: 19
            }
          ],
          // Активираме 3D терена и го "преувеличаваме" малко (1.2x) за по-добър ефект
          terrain: { source: 'mapbox-dem', exaggeration: 1.2 }
        },
        center: [23.25, 42.60], // Центрираме точно над Витоша
        zoom: 11.5,
        pitch: 65,    // Голям наклон за силен 3D ефект
        bearing: -20, // Леко завъртане на камерата
      });

      // Добавяме контроли за навигация (зуум и въртене)
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }
  }, []);

  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <div className="w-full h-full relative">
        {/* Контейнерът за картата */}
        <div ref={mapContainer} className="absolute inset-0 w-full h-full bg-slate-100" />

        {/* UI Панел */}
        <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md border border-slate-100">
          <h1 className="text-3xl font-extrabold mb-2 text-slate-800">AI Hiking Guide 🏔️</h1>
          <p className="text-slate-600">Най-добрата карта: <strong>BGMountains в 3D</strong></p>
        </div>
      </div>
    </main>
  );
}