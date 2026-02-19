"use client";

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Layers } from 'lucide-react'; // Икона за бутона

// Дефинираме типовете за възможните стилове
type MapLayerType = 'bgmountains' | 'mapbox-outdoors';

export default function MapViewer() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('bgmountains');

  useEffect(() => {
    if (map.current) return; // Инициализираме картата само веднъж

    if (mapContainer.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        // Зареждаме основния стил на Mapbox (ще се вижда, когато скрием BGMountains)
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [23.25, 42.60], // Витоша
        zoom: 11.5,
        pitch: 65,
        bearing: -20,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Когато стилът на Mapbox се зареди напълно, добавяме нашия BGMountains слой отгоре
      map.current.on('style.load', () => {
        if (!map.current) return;

        // 1. Добавяме 3D терена
        map.current.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
        map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.2 });

        // 2. Добавяме източника за BGMountains
        map.current.addSource('bgmountains', {
          type: 'raster',
          tiles: ['https://bgmtile.kade.si/{z}/{x}/{y}.png'],
          tileSize: 256,
          attribution: '<a href="https://bgmountains.org/" target="_blank">© BGMountains</a>'
        });

        // 3. Добавяме самия слой. Той ще покрие Mapbox стила.
        map.current.addLayer({
          id: 'bgmountains-layer',
          type: 'raster',
          source: 'bgmountains',
          minzoom: 0,
          maxzoom: 19,
          layout: {
            // Първоначално е видим
            visibility: 'visible'
          }
        });
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