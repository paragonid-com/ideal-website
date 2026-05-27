# IDEAL Medical & Wellness — website

Сайт для медицинской клиники в Aventura, FL. Конверсия из Figma в готовый HTML.

**Стек:** Astro 5 + Tailwind CSS 3 → деплой Cloudflare Pages

## 👉 Для продолжения работы — сначала прочитать `docs/HANDOFF.md`

Там полное состояние проекта, принятые решения, открытые вопросы и план следующих шагов.

## Быстрый старт

```bash
npm install
npm run dev      # дев-сервер на localhost:4321
npm run build    # сборка в dist/ (статика для Cloudflare)
npm run preview  # превью продакшен-билда
```

## Структура

```
src/
  layouts/       # общие обёртки (BaseLayout с Header+Footer)
  components/    # переиспользуемые блоки
  components/sections/   # секции главной страницы
  pages/         # роуты — каждый .astro = страница
  data/          # источники правды (навигация и т.п.)
  styles/        # tokens.css + global стили

docs/
  HANDOFF.md                 # ⭐ контекст и план для следующей сессии
  site-navigation.md         # карта меню сайта
  stock-photo-inventory.md   # инвентарь стоковых фото для лицензирования

public/assets/
  images/        # экспортированные изображения из Figma
  figma-refs/    # эталонные скриншоты секций для сверки
```

## Источник дизайна

Figma file: `jmzQqLFWpZXSII6xTkgCgu`

Найдено 19 секций (15 уникальных страниц + 4 варианта меню):

| URL | Figma nodeId | Статус |
|---|---|---|
| `/` (Home) | 1:1476 | ✅ Готова |
| `/aboutus` | 1:7077 | ⬜ |
| `/contact` | 1:7682 | ⬜ |
| `/blog` | 1:6840 | ⬜ |
| `/services/weight-loss` | 1:1919 | ⬜ |
| `/services/regenerative` | 1:2444 | ⬜ |
| `/services/bloodwork` | 1:2829 | ⬜ |
| `/services/exomind` | 1:3218 | ⬜ |
| `/services/hormone` | 1:3708 | ⬜ |
| `/services/peptide` | 1:5026 | ⬜ |
| `/services/emsella` | 1:5436 | ⬜ |
| `/services/emsculpt` | 1:5795 | ⬜ |
| `/services/ivtherapy` | 1:6189 | ⬜ |
| `/services/emface` | 1:6536 | ⬜ |
| `/services/sexualhealth` | 1:7461 | ⬜ |

## Дизайн-токены

Извлечены из Figma, лежат в `tailwind.config.mjs`:

- **Цвета:** `gold #8d7431`, `gold-bright #d1a42b`, `cream #eae4d2`
- **Шрифты:** Marcellus (heading), Manrope (UI)
- **Размеры:** H1 62px, body 21px, button 22px

## Что НЕ забыть

Все места, требующие решения от клиента, помечены атрибутом `data-todo` в коде.
Найти все:
```bash
grep -rn 'data-todo' src/
```
