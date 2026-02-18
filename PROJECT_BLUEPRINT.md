# Project Name: AI Hiking Guide (Работно заглавие)
**Type:** SaaS Web Application (PWA ready)
**Mission:** Да създадем най-умния планински гид, който намира перфектния маршрут спрямо моментната форма, настроението и условията, използвайки данни и AI.

---

## 1. Технологичен Стек (Tech Stack)

### Frontend (User Interface)
* **Framework:** Next.js 14/15 (App Router)
* **Language:** TypeScript (Задължително за мащабируемост)
* **Styling:** Tailwind CSS (Бърза разработка)
* **UI Components:** shadcn/ui (Модерен, чист дизайн)
* **Maps Visualization:** Mapbox GL JS (чрез `react-map-gl`) - позволява 3D терен.
* **State Management:** Zustand (лек и удобен).

### Backend & Data Processing
* **Core API:** Python (FastAPI) - Тук ще живее тежката логика и AI обработката.
* **AI/LLM:** OpenAI API (GPT-4o mini за бързина/цена) или локален модел (ако хостваш на GPU сървър).
* **Vector Search:** Qdrant или pgvector (за "семантичното търсене" на маршрути).

### Database & Infrastructure
* **Primary DB:** PostgreSQL + PostGIS (Задължително разширение за гео-данни).
    * *Препоръка:* Supabase (дава ти Auth, Database и Storage out-of-the-box).
* **Hosting:** Vercel (за Next.js), Railway/Render (за Python API).

---

## 2. Архитектура на данните (Data Strategy)

### A. Базов слой (The Skeleton)
* **Източник:** OpenStreetMap (OSM) data extraction.
* **Данни:** Координати, пътеки, хижи, чешми, денивелация.
* **Инструмент:** `osmium-tool` или Python библиотека `osmnx`.

### B. Обогатяващ слой (The AI Enrichment)
* **Scraping:** Python скриптове (Scrapy/BeautifulSoup), които обхождат публични източници за текстови описания.
* **AI Processing:**
    1.  Взима суров текст от пътепис.
    2.  Структурира го: Вади ключови думи (напр. "каменисто", "сенчесто", "подходящо за деца").
    3.  Създава "Embedding" (вектор) за търсачката.

---

## 3. Основни функционалности (MVP Features)

1.  **Интерактивна 3D Карта:** Разглеждане на терена, маркиране на пътеки.
2.  **AI Smart Search:**
    * Input: "Искам лека разходка до 2 часа около Пловдив с гледка."
    * Output: Списък с маршрути, сортирани по релевантност.
3.  **Детайлна страница на маршрут:**
    * Карта с GPX трак.
    * Графика на денивелацията.
    * AI-генерирано резюме ("Какво да очаквам").
    * Текущо време на старта и на върха (чрез API).

---

## 4. Стратегия за монетизация (Premium Features)

* **Freemium Model:** Търсенето и основните карти са безплатни.
* **Premium ($/месец):**
    * Offline Mode (Сваляне на карти на телефона).
    * Export GPX (За Garmin/Apple Watch).
    * Advanced Weather (Вятър, UV индекс, прогноза по часове за височината).
    * Safety Alerts (AI анализ за потенциални опасности по маршрута спрямо времето).

---

## 5. План за действие (Roadmap)

### Фаза 1: Setup & Infrastructure (Седмица 1)
* [ ] Инициализиране на Next.js проект.
* [ ] Setup на Supabase (PostgreSQL + PostGIS).
* [ ] Интеграция на Mapbox в Next.js.

### Фаза 2: Data Pipeline (Седмица 2)
* [ ] Python скрипт за извличане на маршрути от OSM за конкретен регион (напр. Рила/Витоша).
* [ ] Записване на гео-данните в PostGIS.
* [ ] Визуализиране на първите пътеки на картата.

### Фаза 3: The AI Brain (Седмица 3)
* [ ] Създаване на FastAPI ендпойнт.
* [ ] Интеграция с OpenAI за "разговорно търсене".
* [ ] Свързване на Next.js търсачката с бекенда.

### Фаза 4: UI/UX & Monetization Prep (Седмица 4)
* [ ] Дизайн на страниците (Dashboard, Route Details).
* [ ] User Auth (Login/Signup).
* [ ] Stripe интеграция (подготовка за плащания).