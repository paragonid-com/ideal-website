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
| Адаптив (mobile) | ⬜ Ждём макетов от дизайнеров |
| Интеграции (форма, бронирование, newsletter) | ⬜ Не начаты |
| Деплой на Cloudflare Pages | ⬜ Не начат |

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

## Открытые вопросы к клиенту

### Стоковые фото и лицензии (см. `docs/stock-photo-inventory.md`)

1. **Hero фото** (DNA Unsplash+) — финальное или плейсхолдер? Если финальное, нужна лицензия Unsplash+
2. **4 из 5 карточек Signature Services** — золотая текстура-плейсхолдер вместо реальных фото препаратов. Когда придут финальные?
3. **EMFACE фото** — взято со стороннего сайта (Binsina Skin Laser Clinic в Дубае). Заменить обязательно
4. **EMSCULPT/EXOMIND/EMSELLA фото** — BTL marketing assets. Есть ли авторизованное партнёрство с BTL?
5. **Ozempic® и Mounjaro® логотипы** — есть письменное разрешение от Novo Nordisk и Eli Lilly?
6. **Google badge** — реальный ли рейтинг 5★ на Google Maps?
7. **"Best of 2025 BusinessRate"** — настоящая ли награда?

### Контент

8. Должность Laudin P. — в Figma "Owner & TBD title". Какая финальная?
9. Финальный текст disclaimer под формой подписки (вместо Lorem Ipsum)
10. Замена опечаток (см. выше) — фиксить или оставить?

### Интеграции (все помечены `data-todo` в коде)

11. `booking-system` — какая система записи (Calendly / NexHealth / Mindbody)?
12. `form-submission-endpoint` — куда отправляется форма со страницы Home?
13. `newsletter-integration` — какой ESP (Mailchimp / Klaviyo / ConvertKit)?
14. `cherry-financing-url` и `care-credit-url` — реальные ссылки на партнёров
15. `social-icon` — какие соцсети, какие ссылки?

### Технические

16. Адаптив — overlay-меню или иной паттерн на мобиле? Ждём дизайн-макеты
17. Шрифт Optima — покупать ли лицензию для веба?

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
> Состояние проекта и все принятые решения описаны в `docs/HANDOFF.md`. Прочитай его перед тем как что-то делать. Главная страница уже полностью сверстана и прошла визуальное ревью vs Figma, следующий шаг — шаблон страниц услуг (11 страниц с общей структурой).
>
> Figma file: jmzQqLFWpZXSII6xTkgCgu (Figma MCP должен быть подключён, если нет — подскажу как).