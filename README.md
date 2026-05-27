# IDEAL Medical & Wellness — website

Стек: **Astro 5** + **Tailwind CSS 3**. Деплой — Cloudflare Pages.

## Структура

```
src/
  layouts/       # общие обёртки страниц (BaseLayout)
  components/    # переиспользуемые блоки (Hero, Header, Footer, ...)
  pages/         # роуты — каждый .astro = страница сайта
  styles/        # global.css + дизайн-токены
public/
  assets/
    images/      # экспортированные растровые изображения из Figma
    figma-refs/  # эталонные скриншоты секций из Figma (для сверки)
tailwind.config.mjs  # дизайн-токены: цвета, шрифты, размеры
astro.config.mjs     # настройки Astro + интеграции
```

## Источник дизайна

Figma file: `jmzQqLFWpZXSII6xTkgCgu` (IDEAL Design)

В файле найдено **19 секций**, из них 15 уникальных страниц:

| URL | Figma nodeId |
|---|---|
| `/` (Home) | 1:1476 |
| `/aboutus` | 1:7077 |
| `/contact` | 1:7682 |
| `/blog` | 1:6840 |
| `/services/weight-loss` | 1:1919 |
| `/services/regenerative` | 1:2444 |
| `/services/bloodwork` | 1:2829 |
| `/services/exomind` | 1:3218 |
| `/services/hormone` | 1:3708 |
| `/services/peptide` | 1:5026 |
| `/services/emsella` | 1:5436 |
| `/services/emsculpt` | 1:5795 |
| `/services/ivtherapy` | 1:6189 |
| `/services/emface` | 1:6536 |
| `/services/sexualhealth` | 1:7461 |

Плюс 4 артборда `/menu-1..4` — варианты раскрытого меню (компонент).

## Дизайн-токены

Извлечены из Figma node-id `1:76`, `1:104`, `1:207`:

- **Цвета**: `gold #8d7431`, `cream #eae4d2`
- **Шрифты**: `Optima` (заголовки, ⚠️ коммерческий — см. ниже), `Manrope` (UI/body)
- **Размеры**: H1 62px, body 21px, button 22px

⚠️ **Optima** не входит в Google Fonts. Нужно решение от заказчика:
лицензия / замена на бесплатный (Cormorant Garamond, Marcellus) / системный fallback.

## Команды

```bash
npm install      # установить зависимости
npm run dev      # дев-сервер на localhost:4321
npm run build    # сборка в dist/ (статический HTML — то, что заливаем на Cloudflare)
npm run preview  # превью собранного билда
```

## Статус

- [x] Фаза 0: проект поднят, токены вынесены
- [x] POC: Hero-секция главной (`/`)
- [ ] Дизайн-система: остальные цвета/шрифты по мере прохождения секций
- [ ] Главная: оставшиеся 10 секций
- [ ] Header / Footer как переиспользуемые компоненты
- [ ] Шаблон для страниц услуг (11 страниц)
- [ ] Остальные страницы (About, Contact, Blog)
- [ ] Адаптив
- [ ] Интеграции форм
- [ ] Деплой на Cloudflare Pages
