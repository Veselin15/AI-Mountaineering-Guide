"use client";

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Layers } from 'lucide-react'; // Икона за бутона
import { supabase } from '@/lib/supabaseClient';
// Дефинираме типовете за възможните стилове
type MapLayerType = 'bgmountains' | 'mapbox-outdoors';

export default function MapViewer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('bgmountains');

  useEffect(() => {
    if (map.current) return;

    if (mapContainer.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [23.28, 42.58], // Леко преместваме центъра към Алеко
        zoom: 12.5, // Приближаваме малко повече
        pitch: 65,
        bearing: -20,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('style.load', async () => {
        if (!map.current) return;

        // 1. 3D Терен
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });

        // 2. BGMountains слой
        map.current.addSource('bgmountains', {
          type: 'raster',
          tiles: ['https://bgmtile.kade.si/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '<a href="https://bgmountains.org/" target="_blank">© BGMountains</a>'
        });
        map.current.addLayer({
          id: 'bgmountains-layer',
          type: 'raster',
          source: 'bgmountains',
          minzoom: 0,
          maxzoom: 19,
          layout: { visibility: 'visible' }
        });

        // ==========================================
        // НОВО: 3. ИЗТЕГЛЯНЕ И РИСУВАНЕ НА МАРШРУТИТЕ
        // ==========================================

        // Взимаме данните от нашия GeoJSON изглед в Supabase
        const { data: trails, error } = await supabase.from('trails_geojson').select('*');

        if (error) {
          console.error('Грешка при изтегляне на маршрутите:', error);
          return;
        }

        if (trails && trails.length > 0) {
          // Форматираме данните в стандартен GeoJSON FeatureCollection
          const geojsonFeatures = {
            type: 'FeatureCollection',
            features: trails.map((t) => ({
              type: 'Feature',
              properties: {
                id: t.id,
                name: t.name,
                difficulty: t.difficulty
              },
              geometry: t.geojson // Тук вече имаме готовата геометрия от базата!
            }))
          };

          // Добавяме ги към картата
          map.current.addSource('trails-source', {
            type: 'geojson',
            data: geojsonFeatures as any
          });

          // Рисуваме червена линия за маршрута (Слагаме я НАД BGMountains)
          map.current.addLayer({
            id: 'trails-line-layer',
            type: 'line',
            source: 'trails-source',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#ef4444', // Червен цвят (Tailwind red-500)
              'line-width': 5,
              'line-opacity': 0.8
            }
          });
        }
      });
    }
  }, []);
  // Този Effect се грижи за превключването на слоевете при клик
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // Взимаме слоя и му променяме видимостта спрямо state-а
    const visibility = activeLayer === 'bgmountains' ? 'visible' : 'none';

    if (map.current.getLayer('bgmountains-layer')) {
      map.current.setLayoutProperty('bgmountains-layer', 'visibility', visibility);
    }
  }, [activeLayer]);

  // Функция за смяна на слоя
  const toggleLayer = () => {
    setActiveLayer((prev) => (prev === 'bgmountains' ? 'mapbox-outdoors' : 'bgmountains'));
  };

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full bg-slate-100" />

      {/* UI Контроли върху картата */}
      <div className="absolute bottom-10 right-10 z-10 flex flex-col gap-2">
        <button
          onClick={toggleLayer}
          className="flex items-center gap-2 bg-white text-slate-800 px-4 py-3 rounded-full shadow-lg hover:bg-slate-50 transition-all font-semibold border border-slate-200"
        >
          <Layers size={20} className="text-blue-600" />
          {activeLayer === 'bgmountains' ? 'Скрий BGMountains' : 'Покажи BGMountains'}
        </button>
      </div>
    </div>
  );
}