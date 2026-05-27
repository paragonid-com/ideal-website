# HANDOFF — состояние проекта на конец сессии 1

Этот документ — точка входа для **следующей сессии работы с Claude**.
Прочитав его, новая сессия сможет продолжить работу без необходимости
переспрашивать решения, которые уже приняты.

---

## TL;DR — где мы

Проект: **сайт для медицинской клиники Ideal Medical & Wellness (Aventura, FL)**.
Конверсия дизайна из Figma в готовый сайт.

| Что | Статус |
|---|---|
| Главная страница (`/`) | ✅ **Полностью сверстана + прошла визуальное ревью vs Figma** |
| Header / Footer / общие компоненты | ✅ Готовы |
| Sub-навигация (current page indicator) | ✅ Реализована — auto-open раздела + орнамент + `aria-current` |
| Дизайн-токены (цвета, шрифты) | ✅ Извлечены и в `tailwind.config.mjs` |
| Документация (карта меню, инвентарь фото) | ✅ В `/docs` |
| Шаблон страниц услуг | ✅ Создан + Weight Loss наполнена |
| 10 draft-заглушек услуг | ✅ Созданы (`draft: true`, ждут контент) |
| Страницы About / Contact / Blog | ✅ Созданы (контент About есть; Blog — placeholder) |
| TrustBadges (Google ★ + BusinessRate) | ✅ Вынесены в `components/TrustBadges.astro`, подключены на 4 страницах |
| Адаптив (mobile) | ⬜ Ждём макетов от дизайнеров |
| Интеграции (форма, бронирование, newsletter) | ⬜ Не начаты |
| Деплой на Cloudflare Pages | 🟡 Конфиг готов (`.nvmrc`, `_headers`, `output: 'static'`, README с шагами). Ждёт нажатия "Save and Deploy" в дашборде Cloudflare клиентом |
| Lighthouse-аудит | ✅ Performance 95+, A11y 96, BP/SEO 100 на всех страницах. PNG → WebP массовая миграция (37MB → 2MB) |
| Инвентарь `data-todo` | ✅ Собран в `docs/TODO-INVENTORY.md` — всё, что ждёт клиента |

---

## Стек и архитектура

- **Astro 5** + **Tailwind CSS 3** — статический генератор сайтов
- **Cloudflare Pages** — целевая платформа деплоя (статический HTML)
- Цель: минимальный JS, максимум статики, Lighthouse 95+

```
src/
  layouts/       BaseLayout.astro       (общая обёртка с Header + Footer)
  components/    Header.astro           (top bar + overlay menu)
                 Footer.astro           (page footer)
                 FooterBlock.astro      (3-column block used in both)
                 Hero.astro
                 Container.astro        (consistent padding wrapper)
                 sections/              (секции главной)
                   Tagline.astro
                   Discover.astro
                   BrandStrip.astro
                   SignatureServices.astro
                   WhoWeAre.astro
                   AdvancedTreatments.astro
                   Testimonials.astro
                   NewIn2026.astro
                   StartYourTransformation.astro
  pages/         index.astro            (только Home сейчас)
  data/          navigation.ts          (единый источник правды для меню)
  styles/        global.css             (импорты шрифтов + base)
```

---

## Принятые решения (НЕ переспрашивать!)

### Дизайн
- **Шрифт заголовков:** Marcellus (Google Fonts), как замена коммерческой Optima.
  Если клиент купит лицензию Optima — поменять первое значение в `tailwind.config.mjs → fontFamily.heading`
- **Шрифт body:** Manrope (Google Fonts)
- **Цвета:** `gold #8d7431`, `gold-bright #d1a42b`, `cream #eae4d2`
- **Контейнер:** max 1920px, padding 7.55% (≈145px при 1920)

### Структура URL
- 11 страниц услуг под `/services/{slug}` (см. `src/data/navigation.ts`)
- About → `/aboutus` (одно слово)
- Emsculpt Neo — **один URL** `/services/emsculpt`, два пункта меню ведут на него
- Sexual Health — есть страница `/services/sexualhealth`, но **не выведена в меню**
  (пропущено дизайнерами; помечено как issue, не исправлять, оставить как orphan)

### Поведение
- BOOK APPOINTMENT кнопки — `href="#"` + `data-todo="booking-system"` пока
  не выбрана система записи. **Не делать предположений** какую интегрировать.
- Мобильное меню = тот же overlay, что и десктоп (по решению клиента)
- Адаптив — пока только десктоп 1920px, ждём мобильные макеты

### Опечатки из Figma — оставлены как есть
- "MENTALL WELLNESS" (двойная L) в Advanced Treatments
- "BOOK APPOIMENT" (без второй n) в Start Your Transformation
- "teel" вместо "feel" в отзыве Emily R.
- Lorem Ipsum под формой подписки

Все помечены `data-todo` для финального ревью с клиентом.

---

## Открытые вопросы и блокеры

Сгруппированы по типу владельца действия. **🔴 = блокер запуска**, **🟠 = серьёзный риск**, **🟡 = желательно решить**, **🔵 = на будущее**.

### 🔴 Лицензии изображений и trademark (нельзя запускать без решения)

**Stock-фото без лицензий:**
1. **Hero главной** (DNA Unsplash+) — на фото виден водяной знак `Unsplash+`. Платная подписка или замена
2. **About Hero** (`christin-hume-...-unsplash`) — на бутылочке хорошо виден **лого `doTERRA`** (бренд эфирных масел). Юридический риск: чужой brand на странице медицинской клиники. **Заменить обязательно.**
3. **Blog Hero** (istockphoto-1312587753)
4. **Blog post-placeholder** (istockphoto-2194380106)
5. **Weight Loss Hero/WhatIs/WhoFor** — все 3 из iStock (istockphoto-2096243056, -2206913658, Image 42)
6. **5 иконок Benefits Weight Loss** (Image 44, 45, 48, 49, 51 из Figma) — источник не идентифицирован
7. **EMFACE фото** в Figma — взято с сайта `Binsina-Skin-Laser-Clinic` (другая клиника). Чужой контент, заменить обязательно
8. **EMSCULPT / EXOMIND / EMSELLA фото + new2026-brain.png** — BTL marketing assets. Нужно подтверждение партнёрства с BTL Industries
9. **3 placeholder-карточки Signature Services** (Hormone / Peptide / IV Therapy) — золотая текстура. Когда придут реальные фото?

**Trademark разрешения:**
10. **Ozempic®** логотип — письменное разрешение Novo Nordisk
11. **Mounjaro®** логотип — письменное разрешение Eli Lilly
12. **EMFACE / EMSCULPT / EMSELLA / EXOMIND** — все BTL trademarks, нужна авторизация

**Trust badges (легитимность данных):**
13. **Google 5★ badge** на главной — реальный ли рейтинг на Google Maps?
14. **"Best of 2025 BusinessRate"** badge — настоящая ли награда, есть ли разрешение использовать?

### 🟠 Контент от клиента (можно запускать с placeholder, но в идеале — решить)

15. **5 FAQ-ответов на Weight Loss** — в Figma не прописаны, у меня placeholder "— ответ будет добавлен клиентом —". Вопросы:
    - How Much Does Medical Weight Loss Cost?
    - Why is it important that my medical weight loss program be tailored for me?
    - Once I lose the weight, how can I keep it off?
    - How can I choose between the different medical weight loss options?
    - What side effects can I experience with medical weight loss?
16. **Контент для 10 draft-страниц услуг** (regenerative, bloodwork, exomind, hormone, peptide, emsella, emsculpt, ivtherapy, emface, sexualhealth) — все сейчас в `draft: true`, не генерируются в build
17. **Реальные blog-посты** — у меня 4 одинаковые placeholder-карточки. Нужны: тексты, фото, slugs
18. **Должность Laudin P.** — в Figma "Owner & TBD title"
19. **Финальный disclaimer** под формой подписки (сейчас Lorem Ipsum)
20. **Дубль на странице Contact** — в Figma 2 раза подряд "START YOUR WELLNESS TRANSFORMATION" (ContactHero + StartYourTransformation). Похоже на ошибку дизайна. Оставить дубль или убрать?
21. **Опечатки** из макета — фиксить или оставить?
    - `MENTALL WELLNESS` (двойная L)
    - `BOOK APPOIMENT` (без второй n)
    - `teel` вместо `feel` в отзыве Emily R.
22. **Layout Benefits Weight Loss** — в Figma 2 сверху + 3 снизу, у меня 3 + 2 (упрощённая сетка). Достаточно ли близко?

### 🟡 Структурные решения

23. **5 страниц услуг со специфичной структурой** требуют отдельных шаблонов (текущий шаблон им не подходит):
    - `hormone` — "Common Signs" в 2 колонки списков вместо Benefits-карточек
    - `emsculpt` — YouTube-видео + before/after + 3 категории сверху
    - `exomind` — кастомные секции с устройством
    - `emface` — фото-сетка лица 3×2 (eyes/nose/forehead/jawline/submental/face)
    - `emsella` — "What to expect / Book your session" + before/after
24. **Sexual Health страница** — есть, но не в основном меню (`/services/sexualhealth` помечена как orphan в `data/navigation.ts`). Добавить в Wellness Services?
25. **Emsculpt дубликат в Wellness+Aesthetic** — оба пункта меню ведут на `/services/emsculpt`. Sub-nav сейчас подсвечивает Wellness (первый match). Если хочется иначе — добавить `data.preferredSection`
26. ~~**TrustBadges** (Google ★ + BusinessRate) — есть в Figma на главной, About, Contact, Blog. У меня сейчас только на главной. Вынести в переиспользуемый компонент~~ **Решено в сессии 2:** `src/components/TrustBadges.astro` подключён на главной (внутри Testimonials, `standalone={false}`) и на About / Contact / Blog (`standalone={true}`, белый фон + py-16).

26а. **Прозрачность badge-PNG** (новое, обнаружено в сессии 2): `badge-google-5star.png` сохранён в RGB-режиме с непрозрачным белым фоном, `badge-best-of-2025.png` — RGBA, но alpha=255. На белом фоне About/Contact/Blog незаметно, но **на cream-фоне Testimonials главной badges выглядят как white "stickers"** на бежевом — это видимо было и до сессии. Решения: (a) перегнать PNG через PIL, замазав чистый белый в alpha=0; (b) попросить клиента дать badges с прозрачным фоном; (c) принять как есть (возможно, это осознанный дизайн).

### 🔵 Интеграции (помечены `data-todo` в коде)

27. **`booking-system`** — Calendly / NexHealth / Mindbody / что-то ещё? Все кнопки BOOK APPOINTMENT сейчас ведут на `#`
28. **`form-submission`** — куда отправлять данные с формы главной и Contact?
29. **`newsletter-integration`** — Mailchimp / Klaviyo / ConvertKit?
30. **`cherry-financing-url`** и **`care-credit-url`** — реальные ссылки партнёров
31. **`social-icon`** — какие соцсети, какие URL? (placeholder-круг в футере)
32. **`blog-post-link`** — куда ведут карточки блога? Сейчас `#`

### 🔵 Технические

33. **Адаптив (mobile)** — ждём макетов от дизайнеров. Текущая вёрстка работает только на ~1920px
34. **Optima шрифт** — покупать ли веб-лицензию или остаёмся на Marcellus?
35. ~~**Cloudflare Pages** — настроить preview environment + первый deploy~~ **Подготовлено в сессии 2:**
    - `astro.config.mjs` явно зафиксирован `output: 'static'` + placeholder `site` URL
    - `.nvmrc` пиннит Node 22 (Cloudflare читает автоматически)
    - `public/_headers` — security headers + cache rules для `_astro/*` и `assets/*`
    - `README.md` секция Deploy — пошаговая инструкция для дашборда (включая важное предупреждение про тихую подмену Pages → Workers, актуально на конец 2025)
    - Preview deployments включаются автоматически по PR
    - **Действие, требующее владельца GitHub-аккаунта `paragonid-com`:** залогиниться в Cloudflare dashboard, привязать репо, нажать **Save and Deploy**. После первого деплоя — подставить выданный `*.pages.dev` URL в `astro.config.mjs → site` и закоммитить.
36. ~~**Lighthouse аудит** — цель 95+, сейчас не замерял~~ **Замерено в сессии 2:**
    - **Performance 95-100** на всех 5 страницах (desktop preset, локальный сервер)
    - **A11y 96** на всех — застрял из-за color-contrast (gold #8d7431 на cream #eae4d2 = 3.54:1, нужно 4.5:1). Решение требует клиента/дизайнера.
    - **Best Practices, SEO — 100** везде.
    - **Что сделано для достижения цели:**
      - `scripts/optimize-images.py` — массовая конвертация PNG/JPG > 100KB в WebP (quality=80). Экономия 37 MB → 2 MB (95%). Скрипт идемпотентен — повторный запуск только обновит изменённые файлы.
      - Заменены 23 ссылки в `.astro`-компонентах и `.md`-контенте: `.png/.jpg` → `.webp`.
      - Удалены оригинальные PNG/JPG из `public/` (есть webp + git-история как backup).
      - Удалена папка `public/assets/figma-refs/` — это были эталоны для визуальной сверки, в продакшен не нужны (2.4 MB).
      - Fixed `aria-prohibited-attr` на placeholder соцсетей в `FooterBlock.astro` (div с aria-label → aria-hidden).
    - **Отчёты** в `/tmp/lh-*.report.json` (локально) — HTML версии скопированы в outputs.

37. **A11y color-contrast** (новое в сессии 2): gold #8d7431 на cream #eae4d2 = 3.54:1. WCAG AA требует 4.5:1. Затрагивает кнопки/параграфы на главной и других страницах с cream-фоном. Варианты:
    - Затемнить gold (например #7a6428 даёт 4.5:1)
    - Принять как есть (3.54:1 читается без проблем зрячими, потеря 4 баллов в Lighthouse)
    - Изменить cream на более тёмный оттенок

---

## TODO-маркеры в коде

Все места, требующие решения от клиента, помечены атрибутом `data-todo`:

```
booking-system                  — кнопки BOOK APPOINTMENT / BOOK NOW / BOOK APPOIMENT
form-submission-endpoint        — форма Start Your Transformation
newsletter-integration          — форма Subscribe в футере
cherry-financing-url            — ссылка в Footer Quick Links
care-credit-url                 — ссылка в Footer Quick Links
social-icon                     — placeholder соцсетей в Footer
trademark-review                — BrandStrip с Ozempic/Mounjaro
team-title-laudin               — должность TBD
typo-mentall                    — опечатка MENTALL WELLNESS
typo-teel-vs-feel               — опечатка в отзыве Emily R.
replace-lorem-ipsum-disclaimer  — текст под формой
confirm-map-coordinates         — Google Maps embed
```

Найти все одной командой:
```bash
grep -rn 'data-todo' src/
```

И `data-trademark` атрибут на местах с зарегистрированными торговыми знаками.

---

## Что делать в следующей сессии

### Логичный следующий шаг — шаблон страниц услуг

Из 15 страниц в Figma — **11 страниц услуг** имеют общую структуру:
hero → описание → benefits → цикл процедуры → FAQ → CTA. Их надо
делать **через один Astro-шаблон + content collection**, а не 11 отдельных
файлов.

**План:**
1. Изучить Figma узел `1:1919` (`/services/weight-loss`) детально — взять его за эталон шаблона
2. Извлечь структуру в `[slug].astro` под `src/pages/services/`
3. Создать `src/content/services/` с 11 markdown-файлами (по одному на услугу)
4. На первом — Weight Loss — собрать весь контент из Figma в MD
5. Остальные 10 — пометить `draft: true`, потом дойдём итеративно

### Альтернативные варианты следующего шага

- **Адаптив главной** — если пришли мобильные макеты
- **About / Contact / Blog** — три простые страницы, быстро сделать
- **Интеграции** — если клиент выбрал ESP и систему записи, подключить
- **Деплой** — настроить Cloudflare Pages, увидеть live preview

---

## Контекст Figma

- **File key:** `jmzQqLFWpZXSII6xTkgCgu`
- **URL:** `https://www.figma.com/design/jmzQqLFWpZXSII6xTkgCgu/IDEAL-Design`
- **Все 15 страниц + 4 menu вариантов** перечислены в `src/data/navigation.ts`
  и в `docs/site-navigation.md`

Figma MCP подключён в сессии. Если в новой сессии его нет —
переподключить через `search_mcp_registry` → `suggest_connectors`.

---

## Шаблон страниц услуг

Все 11 страниц `/services/[slug]` используют один Astro-шаблон, читающий
Content Collection `services` (`src/content.config.ts`).

### Структура

Эталон — узел Figma `1:1919` (Weight Loss). Порядок секций:

```
ServiceHero        — фото справа, текст слева, h=814
ServiceCTABand     — BOOK APPOINTMENT
ServiceWhatIs      — "What is X?", фото слева, текст справа
ServiceCTABand
ServiceBenefits    — сетка 3 cols auto-flow, радиальный gold gradient
ServiceCTABand
ServiceWhoFor      — текст+буллеты слева, фото справа
ServiceResults     — центрированный текст, радиальный gold gradient
ServiceFAQ         — gold фон, аккордеон через <details>/<summary>
NewIn2026          — переиспользован с главной
StartYourTransformation — переиспользован с главной
```

### Решения по 3 вопросам, поднятым в сессии:

1. **Benefits layout** — единая сетка **3 колонки с flex-wrap justify-center**.
   Это автоматически даёт:
   - 3 элемента → 1 ряд из 3
   - 4 элемента → 1 ряд из 3 + 1 центрированный
   - 5 элементов → 1 ряд из 3 + 2 центрированных (Weight Loss)
   - 6 элементов → 2 ряда по 3 (Peptide, IV Therapy, Bloodwork, Sexual Health)

   В Figma Weight Loss карточки расположены асимметрично (**2 сверху + 3 снизу**);
   у нас — **3 сверху + 2 снизу**. Это визуально близкий вариант, упрощающий
   контент-модель. Если клиент захочет точно как в Figma — можно добавить
   опциональный `benefitsLayoutVariant: "asymmetric"` во frontmatter.

   Страницы со специфичной структурой не покрываются этим шаблоном:
   - `hormone` — "Common Signs" в 2 колонки списков, а не сетка карточек
   - `emsculpt` — YouTube-видео, before/after
   - `exomind`, `emface`, `emsella` — кастомные секции с устройствами

   Эти 5 страниц сейчас в `draft: true` и **не генерируются в build**.
   Для них нужны отдельные шаблоны/секции.

2. **FAQ** — нативный `<details>/<summary>` аккордеон (без JS).
   В Figma все вопросы свёрнуты, ответы текстом **не прописаны**.
   Реализован golden фон + cream-текст вопросов + svg-стрелка с
   `group-open:rotate-90`. **Тексты ответов нужны от клиента**
   (помечены `data-todo="faq-answer-from-client"`).

3. **Content Collections** с типизированной zod-схемой.
   Большие тексты (whatIsBody, whoForLead, resultsBody) — многоабзацные
   строки в frontmatter (YAML `|` blocks), разделители `\n\n`.

### Заглушки draft

10 страниц-заглушек созданы с минимальным контентом + `draft: true`:
```
regenerative, bloodwork, exomind, hormone, peptide,
emsella, emsculpt, ivtherapy, emface, sexualhealth
```

Чтобы активировать страницу: заменить контент + сменить `draft` на `false`.
При build страницы с `draft: true` исключаются через
`getCollection('services', ({ data }) => !data.draft)`.

### Изображения

- **Большие фото** (Hero, WhatIs, WhoFor): `/public/assets/images/services/<slug>/`.
  В schema указаны как `z.string()` (просто пути).
- **Иконки Benefits**: `/src/assets/services/<slug>/`. В schema — `image()`,
  обрабатываются через Astro Image (оптимизация в webp).

⚠️ Все изображения Weight Loss взяты из Figma (узлы 1:1489, 1:1549, 1:1615-1:1619, 1:1647)
и являются **istockphoto stock-фотографиями** — лицензии требуют проверки клиентом.

---

## Sub-навигация (current page indicator)

В overlay-меню реализована подсветка текущей страницы:

1. **На сервере** определяется активный раздел через `Astro.url.pathname`
   (см. `src/components/Header.astro` — функция `isGroupActive`).
2. **Орнамент-цветочек** (узел Figma `1:1983` → `/public/assets/images/ornament.png`)
   показывается рядом с заголовком активного раздела.
3. **Текущий пункт** в подменю помечен `aria-current="page"` + `font-semibold`.
4. **При открытии меню** автоматически раскрывается активный раздел.
5. **При hover** на другой раздел — орнамент и панель переключаются;
   `mouseleave` с навигации возвращает к active state.

Emsculpt дублируется в Wellness + Aesthetic. Сейчас при заходе на
`/services/emsculpt` активным становится **Wellness Services**
(первый match по порядку в `mainNav`). Если клиент хочет иначе —
можно добавить поле `data.preferredSection` во frontmatter.

---

## About / Contact / Blog

Все три страницы реализованы как простые маршруты:
- `src/pages/about.astro` — узел Figma `1:7077`
- `src/pages/contact.astro` — узел `1:7682`
- `src/pages/blog.astro` — узел `1:6840`

Компоненты разнесены по папкам:
- `src/components/about/{AboutHero, AboutIntro}.astro`
- `src/components/contact/ContactHero.astro`
- `src/components/blog/{BlogHero, BlogGrid, BlogPostCard}.astro`

### Замечания по контенту

**About**: контент полностью наполнен из Figma — большой H1
"If you're ready to unlock your full potential..." + 3 параграфа body.
⚠️ Фото Hero — `christin-hume-0MoF-Fe0w0A-unsplash` (Unsplash) с
видимым **лого doTERRA** на бутылочке. Серьёзный юридический риск:
использовать чужой brand на странице медклиники. **Заменить обязательно.**

**Contact**: 4-полевая форма (Name/Email/Phone/Message). В Figma на
этой же странице **ещё раз** показан блок "Start Your Wellness
Transformation" с 5-полевой формой — реализовано как в макете, но
помечено `data-todo="duplicate-section-confirm-with-client"`. Скорее
всего, ошибка дизайнера; нужно уточнить у клиента, стоит ли дубль.

**Blog**: 4 одинаковые placeholder-карточки ("Is Peptide Therapy Safe?
Your Complete Guide"). В Figma все 4 карточки идентичны — реальных
постов клиент не предоставил. Отдельные страницы `/blog/[slug]` пока
не создавал. Когда придут реальные посты — добавим Content Collection
'posts' (по аналогии с 'services') и динамический маршрут.

### Trust Badges — не реализованы

На макетах About / Contact / Blog есть блок с Google ★★★★★ + BusinessRate
badge между основным контентом и NewIn2026. У меня этот блок пока есть
только на главной (внутри Testimonials). Имеет смысл вынести в
отдельный переиспользуемый компонент `TrustBadges.astro` и подключить
на все 4 страницы. Не сделал в этой сессии — приоритет был на структуру.

---

## История коммитов (для понимания, как развивался проект)

```
2e83423 feat(home): sections 2-4 — Tagline / Discover / BrandStrip / Signature Services
342558c feat: Header (overlay menu) + Footer reusable components
58f5d1e feat: replace Optima with Marcellus + add menu/inventory docs
c6c7c2b chore: initial project setup — Astro 5 + Tailwind 3
```

(плюс коммит с этим документом, коммит с последними секциями главной,
 и коммит-ревизия `fix(home)` после визуальной сверки с Figma — см. ниже)

---

## Ревизия главной vs Figma (после первой сборки)

После того как все 10 секций главной были сверстаны, провели визуальную
сверку с эталоном из Figma (узел `1:1476`). Скриншот сайта снимался через
Playwright + headless Chromium и сравнивался с `Figma:get_screenshot`.

### Что было поправлено в `fix(home)`:

| Секция | Что было | Что стало | Причина |
|---|---|---|---|
| Header | бургер `text-gold-bright` без тени | + `drop-shadow` для контраста | сливался с яркими Hero-фонами |
| Discover | linear-gradient cream→darker | `bg-cream` | в Figma фон ровно `#eae4d2` |
| WhoWeAre | linear-gradient gold→cream | `bg-cream` | то же |
| Testimonials | linear-gradient cream→darker | `bg-cream` | то же |
| SignatureServices | только нижний gradient overlay | + верхний gradient overlay | "DISCOVER" сливался на Medical Weight Loss (светлое фото) |
| NewIn2026 | высота 168px | `min-h-[248px] flex items-center` | в Figma clip-path `1:1729` высотой 248px |
| StartYourTransformation | Email/Phone каждый half-width | `md:col-span-2` обоим | в Figma линии под полями `1:1793`, `1:1794` имеют w=914 (full) |

### Как проверять впредь (важно!)

Ловушка, в которую попал предыдущий проход ревью: **уменьшенный full-page
скриншот (1920×9000 → 500×высота) теряет детали**. Карточки выглядят
пустыми золотыми плашками, мелкие тексты не читаются, и легко принять
артефакт ресайза за баг.

Правильный workflow визуального ревью:

1. Поднять локальный сервер: `cd dist && python3 -m http.server 8765`
2. Через Playwright снять **отдельные секции** через `element.screenshot()`
   по селекторам `[data-section="..."]` — это даёт нативный размер.
3. Для каждой подозрительной секции — сделать crop эталона из Figma
   того же фрагмента, и сравнить **в нативном разрешении**.
4. Для Hero burger / других мелких элементов — `getBoundingClientRect()`
   + crop по координатам в нативном масштабе.
5. Игнорировать: пустой iframe Google Maps (headless без интернета его
   не загружает); опечатки `MENTALL`, `APPOIMENT`, `teel` — это макет.

---

## Промпт для новой сессии Claude

Скопируй в первое сообщение новой сессии:

> Я продолжаю работу над сайтом IDEAL Medical & Wellness — конверсия из Figma в Astro+Tailwind для Cloudflare Pages.
>
> Репозиторий: https://github.com/paragonid-com/ideal-website
>
> Состояние проекта и все принятые решения описаны в `docs/HANDOFF.md` — прочитай его перед тем как что-то делать. Особенно внимательно: TL;DR-таблицу в начале + секцию **"Открытые вопросы и блокеры"** в конце.
>
> Что готово на десктопе: главная (визуальное ревью пройдено), шаблон страниц услуг + Weight Loss с реальным контентом, About / Contact / Blog, sub-навигация с подсветкой текущей страницы. Билд проходит, 5 страниц генерируются.
>
> Что осталось — выбор стратегии:
>
> **Дорожка А (можно делать сейчас, без клиента):**
> - Вынести TrustBadges (Google ★ + BusinessRate) в переиспользуемый компонент и подключить на About / Contact / Blog
> - Cloudflare Pages: настроить preview environment + первый deploy
> - Lighthouse-аудит и оптимизация (цель 95+)
> - Чистка `data-todo` и инвентаризация ассетов
>
> **Дорожка Б (требует ввода от клиента):**
> - 5 specialty-страниц услуг с кастомной структурой (hormone, emsculpt, exomind, emface, emsella) — макеты в Figma есть, секции под них надо проектировать с нуля
> - Реальные blog-посты + Content Collection 'posts' + `/blog/[slug]`
> - Замена всех stock-фото на лицензированные / собственные
> - Подключение booking system, form submission, newsletter ESP
>
> **Дорожка В (ждёт макетов от дизайнера):**
> - Мобильная адаптация (нужны mobile-макеты)
>
> Figma file: jmzQqLFWpZXSII6xTkgCgu (Figma MCP должен быть подключён, если нет — подскажу как).
>
> Спроси меня, по какой дорожке двигаемся, прежде чем начинать работу.