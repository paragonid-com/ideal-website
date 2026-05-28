# HANDOFF — состояние проекта на конец сессии 5

Этот документ — точка входа для **следующей сессии работы с Claude**.
Прочитав его, новая сессия сможет продолжить работу без необходимости
переспрашивать решения, которые уже приняты.

---

## TL;DR — где мы

Проект: **сайт для медицинской клиники Ideal Medical & Wellness (Aventura, FL)**.
Конверсия дизайна из Figma в готовый сайт.

| Что | Статус |
|---|---|
| Главная страница (`/`) | ✅ **Полностью сверстана + прошла визуальное ревью vs Figma.** Сессия 5: добавлены 6 недостающих звёзд (star-sign) в Hero / Discover / SignatureServices / WhoWeAre / AdvancedTreatments / StartYourTransformation |
| Signature Services карточки | ✅ Скорректированы под Figma (сессия 3): фоновые фото зум + position, IV Therapy overlay 153% вместо 115%, overlay-файл обрезан по alpha-bbox |
| Header / Footer / общие компоненты | ✅ Готовы |
| Overlay-меню — поведение | ✅ Доработано в сессии 3: hover/click/touch, sticky-section, hover-zone покрывает заголовки + подменю + пустоту между, min-h=489px чтобы линия и футер не прыгали |
| Sub-навигация (current page indicator) | ✅ Реализована — auto-open раздела + орнамент + `aria-current` |
| Дизайн-токены (цвета, шрифты) | ✅ Извлечены и в `tailwind.config.mjs` |
| Документация (карта меню, инвентарь фото) | ✅ В `/docs` |
| Шаблон страниц услуг | ✅ Гибридный шаблон с условным рендером (сессия 4): поддерживает Weight Loss / hormone / emsculpt структуры без отдельных файлов |
| 10 draft-заглушек услуг | 🟡 Hormone, Emsculpt (сессия 4) и **Exomind (сессия 5)** сняты с draft. Остальные 7 (regenerative, bloodwork, peptide, emsella, ivtherapy, emface, sexualhealth) — всё ещё `draft: true` |
| Exomind (`/services/exomind`) | ✅ **Наполнена контентом из Figma (сессия 5)**: hero + twoColumnText (whatIs+whoFor) + video#1 + goldBanner#1 + deviceShowcase + howWorks + whyChoose + conditionsList + video#2 + goldBanner#2 + FAQ. Тексты FAQ и YouTube-ссылки ждут от клиента. Звёзды на самой странице ещё не добавлены (см. блокеры) |
| Hormone (`/services/hormone`) | ✅ **Наполнена контентом из Figma (сессия 4)**: hero + whatIs + reclaiming + commonSigns + roadmap + whyTrust + goldBanner + experience. Тексты FAQ ждут от клиента. |
| Emsculpt Neo (`/services/emsculpt`) | ✅ **Наполнена контентом из Figma (сессия 4)**: hero + simpleWhatIs + 2× categoriesGrid + videoEmbed (placeholder) + extendedDescription + beforeAfter. Тексты FAQ ждут от клиента. |
| Страницы About / Contact / Blog | ✅ Созданы (контент About есть; Blog — placeholder) |
| WebP-ассеты в подпапках (about/, blog/, services/weight-loss/) | ✅ Восстановлены в сессии 3 — были потеряны в коммите 215ea55 при WebP-миграции |
| TrustBadges (Google ★ + BusinessRate) | ✅ Вынесены в `components/TrustBadges.astro`, подключены на 4 страницах |
| Адаптив (mobile) | ⬜ Ждём макетов от дизайнеров |
| Интеграции (форма, бронирование, newsletter) | ⬜ Не начаты |
| Деплой на Cloudflare Pages | ✅ Сайт деплоится (актуализирую блокер в сессии 4 — раньше был помечен 🟡 как "ждёт нажатия Save and Deploy") |
| Lighthouse-аудит | ✅ Performance 95+, A11y 96, BP/SEO 100 на всех страницах. PNG → WebP массовая миграция (37MB → 2MB) |
| Инвентарь `data-todo` | ✅ Собран в `docs/TODO-INVENTORY.md` — всё, что ждёт клиента |

---

## Сессия 3 — что доделано (27.05.26)

5 коммитов поверх сессии 2. Все локальные баги по визуальному ревью с
заказчиком на десктопе закрыты.

### Коммит `e5c67bf` — Signature Services карточки на главной

Три замеченных бага в карточках:
- **IV Therapy overlay был 115% ширины вместо 153.4%** (точное Figma:
  448/292). Из-за этого пакеты NAD+ и RADIANT AF были маленькими и
  левее центра. Возврат к 153.4% + центрирование через autoCenterX.
- Также `service-iv-therapy-overlay.webp` обрезан по alpha-bbox
  (896×644 с ~38% пустоты справа → 468×573 tight crop). Геометрический
  и визуальный центры теперь совпадают.
- **Medical Weight Loss и Sexual Health фото "сплющивались"** —
  в Figma эти фото имеют `scaleMode: CROP + scalingFactor: 0.5`
  (zoom ×2), а наши webp экспортированы целиком с большими полями фона.
  Добавлены опциональные поля `imageScale` и `imagePosition` в `Service`
  интерфейс. Weight Loss: scale=1.05, position='center top'.
  Sexual Health: scale=1.3, position='75% center'.
- Hover-зум сохранён через CSS-переменную `--scale-hover` (умножение
  поверх базового scale).

### Коммит `67414d6` — overlay-меню всегда показывает подменю

Симптом: на главной (и любой странице вне разделов меню) открытие overlay
показывало 3 заголовка и **пустое пространство справа**. Пользователь
должен был догадаться навести курсор, чтобы увидеть подменю. Это
ломалось особенно на touch-устройствах, где hover недоступен.

Решение:
- На сервере вычисляются 2 разные сущности: `activeGroupLabel` (реально
  активная страница, для sub-nav indication) и `defaultOpenLabel`
  (что открыто при загрузке overlay — fallback на первый раздел
  Wellness Services).
- В JS — `stickySection` переменная, инициализируется из server default.
- Hover/focus — временный preview, mouseleave возвращает к sticky.
- **Click** на заголовок — меняет sticky и показывает раздел.
  Touch-friendly: iPad/телефоны не имеют hover, но click работает везде.
- Закрытие/открытие меню — sticky сохраняется.

⚠️ Это **отклонение от Figma menu-1** (где в дефолте пусто). UX-баланс:
если клиент категорически захочет как в макете — поменять `defaultOpenLabel = ... ?? mainNav[0].label` на `... ?? undefined`. Одна
строчка в `src/components/Header.astro`.

### Коммит `c1797a2` — hover-зона покрывает заголовки + подменю

Симптом: при наведении на About Us → попытке провести мышью к Blog/Contact
(они находятся вверху правой колонки) — подменю сбрасывалось на Wellness
ещё до того, как курсор доходил до целевой ссылки. Причина: mouseleave
сидел на узком `<nav>`-элементе, а движение from-heading-to-submenu
неизбежно пересекает пустую зону между ними.

Решение: перенёс mouseleave на общий контейнер `[data-nav-hover-zone]`,
который оборачивает И заголовки И подменю. Mouseleave срабатывает только
при реальном уходе из всей composite-зоны.

### Коммит `d82c29b` — фиксированная высота подменю-контейнера

Симптом: при ховере с Wellness Services (9 пунктов) на Aesthetic Services
(2 пункта) или About Us (3 пункта) — вертикальная линия-разделитель
сжималась, и нижний футер overlay-меню "прыгал" на ~30px вверх.

Решение: `min-h-[489px]` на контейнере подменю. 489px = высота линии
из Figma (узел 1:3785, Line 1 = 1×489) ≈ высота полного 9-item
Wellness-списка. Контейнер всегда резервирует место для самого длинного
варианта.

### Коммит `ef8ed39` — восстановлены пропавшие WebP в подпапках

**Баг сессии 2** в коммите `215ea55`: WebP-миграция удалила оригинальные
PNG/JPG из подпапок `about/`, `blog/`, `services/weight-loss/`, но
**WebP-копии в эти подпапки в репозиторий не попали** (видимо, `git am`
упал на бинарных патчах, и автор не заметил). Из-за этого:
- `/about` — broken `about/hero.webp`
- `/blog` — broken `blog/hero.webp` и `blog/post-placeholder.webp`
- `/services/weight-loss` — все 3 inline-фото битые

Решение: извлёк оригиналы из git-blob'ов в `215ea55^`, переконвертировал
в WebP той же логикой что `optimize-images.py` (quality=80). Все 6
файлов на месте, 5 страниц снова рендерятся корректно.

⚠️ Image license issues остались как были (doTERRA на About, istockphoto
watermarks на Blog/Weight Loss) — см. блокеры #1-9 ниже.

---

## Сессия 4 — что доделано (27.05.26)

Основной приоритет, который висел с сессии 3 — наполнение 5 specialty-страниц
услуг (`hormone`, `emsculpt`, `exomind`, `emface`, `emsella`), которые
не подходят под стандартный шаблон Weight Loss. В сессии 4 закрыты **две из
пяти** (`hormone` и `emsculpt`) с одновременным рефакторингом архитектуры
шаблона.

### Архитектурное решение — гибридный шаблон

Из двух вариантов, обсуждавшихся в HANDOFF сессии 3:
- "общий `[slug].astro` с условными секциями" против
- "отдельные `.astro` файлы под каждый specialty-slug"

выбран **гибрид по варианту 1**, точнее формулировке из секции "Что делать в
следующей сессии":

> «общие секции (Hero/CTABand/FAQ) переиспользовать, специфичные секции —
> отдельные компоненты под папкой `src/components/services/`»

Концепция:

1. **Schema (`src/content.config.ts`)** — все поля кроме `seo*`, `hero*` и
   `category` стали `optional`. Добавлены опциональные блоки для специфики
   каждой страницы (см. ниже).
2. **`[slug].astro`** — один общий шаблон, рендерящий каждую секцию **условно**
   через `{data.foo && <ServiceFoo ... />}` в фиксированном порядке.
3. **Контент-файлы (`*.md`)** определяют структуру страницы тем, **какие
   поля заполнены**. Weight Loss заполняет whatIs/benefits/whoFor/results;
   hormone заполняет whatIs/textWithPhoto/commonSigns/roadmap/whyTrust/
   goldBanner/experience; emsculpt — simpleWhatIs/categoriesGrids/videoEmbed/
   extendedDescription/beforeAfter. Никакого дублирования шаблона.

### Новые компоненты (10 шт. в `src/components/services/`)

| Компонент | Где используется |
|---|---|
| `ServiceSimpleWhatIs` | emsculpt — короткий "What is X?" без фото |
| `ServiceExtendedDescription` | emsculpt — "MORE FOR LESS IN BODY SHAPING" |
| `ServiceCommonSigns` | hormone — 2×N сетка симптомов на gold-фоне |
| `ServiceCategoriesGrid` | emsculpt — 3-колонная сетка фото+title+(body). Используется **дважды** на странице (What Is For + Customize Your Treatment) |
| `ServiceVideoEmbed` | emsculpt — YouTube embed с placeholder-режимом, если URL пуст |
| `ServiceBeforeAfter` | emsculpt — галерея до/после в одну строку (без слайдера-JS) |
| `ServiceRoadmap` | hormone — 2-колоночный список шагов roadmap |
| `ServiceWhyTrust` | hormone — текст слева + фото команды справа |
| `ServiceGoldBanner` | hormone — full-width pull-quote на gold-фоне |
| `ServiceExperience` | hormone — фото слева + текст/телефон/CTA справа |
| `ServiceTextWithPhoto` | универсальный "текст + фото", используется на hormone для "Reclaiming Yourself". Поддерживает `imageSide`, рендерится по `position` в массиве `textWithPhotoBlocks` |

### Расширение schema (`src/content.config.ts`)

Все эти поля во frontmatter — `optional`:
- `whatIs*` (старые поля Weight Loss-формата)
- `simpleWhatIs: { title, body }`
- `extendedDescription: { title, body }`
- `benefits*` (старые)
- `whoFor*` (старые)
- `commonSigns: { title, intro, items: [{ title, body }] }`
- `categoriesGrids: [{ title?, background, items: [{ title, body?, image, imageAlt }] }]` — массив, потому что emsculpt использует **дважды**
- `videoEmbed: { url?, posterImage?, posterAlt }`
- `beforeAfter: { title?, items: [{ beforeImage, afterImage, caption?, alt }] }`
- `roadmap: { title, intro, items: [{ title, body }] }`
- `whyTrust: { title, body, image, imageAlt }`
- `goldBanner: string` (с поддержкой `\n` для переноса)
- `experience: { title, body, image, imageAlt, phone? }`
- `textWithPhotoBlocks: [{ title, body, image, imageAlt, imageSide, position }]` — `position` определяет где в шаблоне разместить блок (`before-common-signs` или `after-roadmap`)
- `results*` (старые)
- `faq` (теперь optional)

### Порядок секций в `[slug].astro`

Шаблон рендерит секции в фиксированном порядке (только те, что заполнены):

```
ServiceHero
ServiceCTABand
ServiceWhatIs              (если whatIsBody)
ServiceSimpleWhatIs        (если simpleWhatIs)
ServiceTextWithPhoto×N     (position='before-common-signs')
ServiceBenefits            (если benefits)
ServiceCommonSigns         (если commonSigns)
ServiceCategoriesGrid #1   (если categoriesGrids[0])
ServiceVideoEmbed          (если videoEmbed)
ServiceExtendedDescription (если extendedDescription)
ServiceWhoFor              (если whoForBullets)
ServiceRoadmap             (если roadmap)
ServiceTextWithPhoto×N     (position='after-roadmap')
ServiceCategoriesGrid #2   (если categoriesGrids[1])
ServiceBeforeAfter         (если beforeAfter)
ServiceResults             (если resultsBody)
ServiceWhyTrust            (если whyTrust)
ServiceGoldBanner          (если goldBanner)
ServiceExperience          (если experience)
ServiceFAQ                 (если faq)
NewIn2026                  (всегда)
StartYourTransformation    (всегда)
```

CTA-bands вставлены только между крупными контент-блоками (после Hero,
WhatIs, Benefits, CommonSigns). После Roadmap / Before-After / Experience —
**не вставляются**, как в эталоне Figma.

### Контент-файлы

**`hormone.md`** — все тексты вытащены из Figma (узел `1:3708` через
`Figma:get_design_context`):
- Hero "AVENTURA BIOIDENTICAL HORMONE REPLACEMENT THERAPY"
- WhatIs (5-строчный заголовок "Understanding... Healthy Aging in Aventura, FL"
  + 2 абзаца body)
- Reclaiming Yourself (textWithPhotoBlocks position='before-common-signs')
- Common Signs (7 items: Metabolic Adaptation, Physical Deconditioning,
  Cognitive Burnout, Androgen Decline, Endocrine Fatigue, Micronutrient Gaps,
  Vasomotor Instability — все с реальными текстами из Figma)
- Roadmap (5 шагов: Discovery, Safeguard, Science, Result, Delivery)
- Why Trust (2 абзаца body)
- Gold Banner ("We don't just want to treat you...")
- Experience (текст + телефон 305.650.1884 + BOOK APPOINTMENT)
- FAQ — placeholder "Lorem Ipsum" вопросы из Figma (тексты ждут от клиента)

**`emsculpt.md`** — узел Figma `1:5795`:
- Hero "GET THE BODY YOU WANT EMSCULPT NEO™"
- SimpleWhatIs ("EMSCULPT NEO™" + 1 абзац)
- Categories Grid #1 "WHAT EMSCULPT NEO™ IS FOR" (3 категории: BODY SCULPTING /
  FUNCTIONAL WELLNESS / CORE TO FLOOR, без body-текстов как в Figma)
- VideoEmbed (URL пустой — placeholder "Video coming soon" на 16:9 блоке)
- ExtendedDescription "MORE FOR LESS IN BODY SHAPING" (3 абзаца)
- Categories Grid #2 "CUSTOMIZE YOUR TREATMENT" (3 аппликатора: LARGE / EDGE /
  SMALL, с body-описаниями)
- BeforeAfter (1 кейс с caption "3 months after the last treatment...")
- FAQ — placeholder "Lorem ipsum..." вопросы из Figma

### Placeholder-ассеты

Реальных фото от клиента нет, использованы заглушки (копии из weight-loss):

**`public/assets/images/services/hormone/`** (5 файлов): `hero.webp`,
`what-is.webp`, `reclaiming-yourself.webp`, `why-trust-team.webp`,
`experience-dna.webp`.

**`public/assets/images/services/emsculpt/`** (9 файлов): `hero.webp`,
`category-{body-sculpting,functional-wellness,core-to-floor}.webp`,
`applicator-{large,edge,small}.webp`, `before-1.webp`, `after-1.webp`.

Все 14 файлов помечены в `TODO-INVENTORY.md` как ожидающие реальных фото
от клиента (см. блокеры #9, #38).

### Визуальное ревью

Снят полный набор скриншотов через Playwright (1920×1080 viewport), сравнён
с эталонами Figma `get_screenshot`. Поправлены два бага:
- `text-h2` (несуществующий tailwind-класс) → конкретные `text-[38px]` /
  `text-[40px]` в `ServiceGoldBanner` и `ServiceExperience`
- Порядок секций hormone: сначала ставил Common Signs до Reclaiming,
  переставил Reclaiming перед Common Signs (как в Figma)

Все 7 страниц (home, about, blog, contact, weight-loss, **hormone**,
**emsculpt**) собираются и рендерятся корректно. Build проходит без
warnings/errors.

### Что осталось от 5 specialty-страниц

Из 5 specialty-страниц, отмеченных приоритетом в HANDOFF сессии 3:
- ✅ `hormone` — сделана
- ✅ `emsculpt` — сделана
- ⬜ `exomind` — `draft: true`, ждёт сессии 5
- ⬜ `emface` — `draft: true`, ждёт сессии 5
- ⬜ `emsella` — `draft: true`, ждёт сессии 5

Архитектура (гибрид с условными секциями) спроектирована так, что для
оставшихся 3 страниц **новых компонентов скорее всего не понадобится** —
их структура должна покрываться существующими блоками (Hero, SimpleWhatIs,
TextWithPhoto, CategoriesGrid, BeforeAfter, FAQ). Если придётся —
добавятся ещё 1-2 компонента (например, под фото-сетку лица 3×2 для
emface), но фундаментально шаблон готов.

---

## Сессия 5 — что доделано (27.05.26)

Две задачи: звёзды на главной (дорожка 2) + страница **exomind** (дорожка 1).
Обе доставлены как git-патчи (см. `git log`: `2bbeac2` звёзды, `d58fdd4`
exomind). Локально применяются через `git am`.

### Звёзды на главной — коммит `feat(home): add 6 star-sign ornaments`

В Figma на главной 6 золотых звёзд (star-sign), которых не было в вёрстке.
Все 6 добавлены, сверены со скриншотами Figma попиксельно (side-by-side),
все `43×50px` (Figma-оригинал 42.57×50), `aria-hidden="true"`:

| nodeId | Секция | Позиция |
|---|---|---|
| 1:218 | Hero | между параграфом и кнопкой BOOK NOW |
| 1:224 | Discover | `absolute right-[7.55%] top-24` (верх правой колонки) |
| 1:230 | SignatureServices | inline сразу после слова "SERVICES" (`left-full`); заодно размер увеличен с 33×39 до 43×50 и убран `hidden md:` |
| 1:236 | WhoWeAre | `absolute right-0 top-0` на уровне H2 |
| 1:242 | AdvancedTreatments | inline после слова "TREATMENTS" |
| 1:258 | StartYourTransformation B | inline в конце "YOUR" первой строки H2 |

Файл звезды уже был в репо: `public/assets/images/star-sign.svg`.
Затронуто 6 файлов: `Hero.astro`, `sections/{Discover,SignatureServices,
WhoWeAre,AdvancedTreatments,StartYourTransformation}.astro`.

### Exomind — коммит `feat(services): exomind page + hybrid template extensions`

Страница `/services/exomind` (Figma node `1:3218`) собрана полностью.
У неё пять «своих» секций, которых не было у hormone/emsculpt/weight-loss,
поэтому шаблон расширен. **3 новых компонента + 2 расширенных:**

**Новые** (`src/components/services/`):
- `ServiceTwoColumnText.astro` — два независимых текстовых блока (title +
  body/bullets/tail) рядом, без фото. Для exomind: «WHAT IS EXOMIND?»
  слева + «WHO IS A GOOD CANDIDATE?» справа.
- `ServiceFullWidthImage.astro` — картинка во всю ширину между секциями.
  Для exomind: close-up устройства TMS. Принимает `image`, `imageAlt`,
  опционально `todo` (метка data-todo).
- `ServiceConditionsList.astro` — центрированный крупный список на gold-фоне
  + eyebrow-заголовок слева. Для exomind: «WHAT CAN EXOMIND IMPROVE?»
  (MDD, ANXIETY, DEPRESSION, …).

**Расширенные:**
- `ServiceGoldBanner.astro` — добавлены опц. `ctaLabel` + `ctaHref`
  (рендерят cream-on-gold кнопку BOOK APPOINTMENT). **Размер шрифта
  условный**: с CTA (exomind) — крупный `text-h1`; без CTA (hormone
  pull-quote) — прежний `38-44px`. Это важно: hormone использует длинную
  2-строчную цитату, которая при h1 переносилась бы некрасиво.
- `ServiceTextWithPhoto.astro` — добавлены опц. `bullets[]`,
  `bulletStyle` (`'dash'` | `'number'`), `tail` (параграф после списка).
  hormone оставляет их пустыми (работает как раньше); exomind переиспользует
  для «HOW EXOMIND WORKS» (нумерованный) и «WHY CHOOSE» (dash).

**Схема** (`src/content.config.ts`):
- Новые поля: `twoColumnText`, `fullWidthImages[]` (с `position`, пока
  единственное значение `'after-gold-banner-1'`), `conditionsList`,
  `videoEmbed2`, `midGoldBanner1`, `midGoldBanner2`.
- `textWithPhotoBlocks` получил `bullets`/`bulletStyle`/`tail` и новую
  позицию `'before-conditions'`.
- `goldBanner` расширен до `union(string, object)` — hormone по-прежнему
  передаёт строку и рендерится после WhyTrust, перед Experience.

**Шаблон** (`src/pages/services/[slug].astro`):
- Все новые секции рендерятся условно; существующие страницы не затронуты
  (проверено скриншотами: hormone pull-quote того же размера и на том же
  месте; emsculpt/weight-loss без gold-banner).
- ⚠️ Важный нюанс расположения gold-баннеров: hormone использует ТОЛЬКО
  `goldBanner` (поздняя позиция, после WhyTrust). exomind использует
  ТОЛЬКО `midGoldBanner1`/`midGoldBanner2` (центральные позиции). Это
  специально разведено на разные поля, чтобы один шаблон обслуживал обе
  раскладки. **Не объединять их обратно в одно поле.**
- Порядок секций exomind: Hero → CTABand → TwoColumnText → VideoEmbed#1
  → midGoldBanner1 → FullWidthImage → TextWithPhoto×2(before-conditions)
  → ConditionsList → VideoEmbed#2 → midGoldBanner2 → FAQ → NewIn2026
  → StartYourTransformation.

**Контент** (`src/content/services/exomind.md`): все тексты сняты дословно
из Figma (узлы 1:2888..1:3197). `draft: false`. FAQ-вопросы = Lorem ipsum,
оба `videoEmbed.url` пустые — ждут от клиента.

**Ассеты** (`public/assets/images/services/exomind/`): `hero.webp`,
`video-1-poster.webp`, `device-showcase.webp`, `how-works.webp`,
`why-choose.webp`, `video-2-poster.webp`. ⚠️ Это сжатые скриншоты из Figma
(мелкое разрешение, ~12-32 KB) — макетные, на проде заменить клиентскими
оригиналами. `device-showcase.webp` помечен
`data-todo="trademark-authorization-from-btl"` (BTL trademark на устройстве).

### Известные TODO по exomind (НЕ блокеры вёрстки, перенесены в очередь)

- **Звёзды на самой странице exomind** не добавлены: Figma узлы 1:2861
  (Hero, между lead и BOOK NOW), 1:2862 (заголовок HOW WORKS, справа),
  1:3203 (заголовок WHY CHOOSE, справа). Аналог задачи звёзд на главной —
  стоит сделать единым проходом по всем specialty-страницам, когда они
  будут готовы.
- **CTA BOOK APPOINTMENT между WHY CHOOSE и ConditionsList** (Figma 1:2913)
  — в макете там ещё одна кнопка-баннер, у нас её нет. Добавить
  опциональным флагом, чтобы не ломать порядок других страниц.

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
- **Шрифт заголовков:** Optima (self-hosted, 5 начертаний в `public/fonts/Optima-*.woff2`).
  Источник — Optima.ttc из системного шрифта macOS (`/System/Library/Fonts/`),
  присланного клиентом в сессии 4. Тот же шрифт, что в Figma.
  ⚠️ **Юр.риск принят клиентом** — Optima это коммерческий шрифт от Linotype/
  Monotype, лицензирован Apple для macOS. Web-лицензия не куплена. Если
  потом купят — заменить файлы в `public/fonts/`, frontend код не меняется.
- **Шрифт body:** Manrope (Google Fonts, бесплатный)
- **Цвета:** `gold #8d7431`, `gold-bright #d1a42b`, `cream #eae4d2`
- **Звезда-знак (Star Sign):** атом + ДНК-нить из логотипа IDEAL.
  Используется как акцент рядом с крупными заголовками и в overlay-меню
  для индикации активного раздела. Файл — `/public/assets/images/star-sign.svg`
  (4.9 KB после оптимизации, цвет gold #8d7431 зашит в path). Источник —
  Figma узлы `1:218`, `1:1983`, `1:6869` и др.; клиент прислал в сессии 4.
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
16. **Контент для 7 draft-страниц услуг** (regenerative, bloodwork, peptide, emsella, ivtherapy, emface, sexualhealth) — все сейчас в `draft: true`, не генерируются в build. Hormone/emsculpt (сессия 4) и exomind (сессия 5) уже сняты с draft.
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
34. ~~**Optima шрифт** — покупать ли веб-лицензию или остаёмся на Marcellus?~~ **Закрыто в сессии 4:** клиент прислал `Optima.ttc` (системный шрифт macOS), сконвертирован в 5 woff2-файлов и подключён self-hosted из `public/fonts/`. Юр.риск принят клиентом, web-лицензия не куплена.
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

## Что делать в следующей сессии (сессия 6+)

### Главный приоритет — 2 оставшиеся specialty-страницы

После сессии 5 exomind готов. В `draft: true` из приоритетной тройки
остались: **emface, emsella**. Архитектура шаблона гибридная и доказана
теперь на hormone + emsculpt + exomind (см. «Сессия 5 — что доделано» —
там появились ServiceTwoColumnText, ServiceFullWidthImage,
ServiceConditionsList, расширенные GoldBanner/TextWithPhoto). Для
оставшихся двух новых компонентов, скорее всего, почти не понадобится.

1. Снять Figma-узлы через `Figma:get_design_context` + `get_screenshot`:
   - `/emface` → nodeId `1:6536`
   - `/emsella` → nodeId `1:5436`
2. Сверить структуру каждой с существующими компонентами в
   `src/components/services/` (теперь их 21):
   - **emface** — фото-сетка лица 3×2 (eyes/nose/forehead/jawline/
     submental/face). **Сначала проверить**, покрывается ли
     `ServiceCategoriesGrid` с 6 items и `lg:grid-cols-3` (2 ряда),
     прежде чем писать новый `ServiceFaceMap`. Скорее всего покрывается.
   - **emsella** — «What to expect» + «Book your session» + before/after.
     `ServiceBeforeAfter` и `ServiceTextWithPhoto` уже есть, должны
     покрыть всю страницу. Новых компонентов, вероятно, не нужно вовсе.
3. Расширить schema **только если** существующих полей не хватит.
4. Заполнить контент из Figma в markdown, снять `draft: false`.
5. Собрать билд, снять скриншоты, сверить side-by-side с Figma, оформить
   патч (с `--binary` для WebP-ассетов, fallback `git apply --3way`).

⚠️ Trademark ассеты (EMFACE/EMSELLA — BTL trademarks) требуют авторизации
от BTL Industries — блокер запуска, но не блокер вёрстки. Собираем макетно,
помечаем `data-todo="trademark-authorization-from-btl"`.

### Технический долг по гибридному шаблону (накопился за сессии 4-5)

- **Звёзды на specialty-страницах** — на hormone/emsculpt/exomind в Figma
  есть star-sign в заголовках и Hero, в вёрстке их нет. Сделать единым
  проходом по всем готовым specialty, по образцу задачи звёзд на главной
  (сессия 5). Для exomind конкретные узлы: 1:2861, 1:2862, 1:3203.
- **Опциональный CTA-баннер** между секциями (exomind 1:2913) — добавить
  как опциональное поле, чтобы кнопка BOOK APPOINTMENT могла стоять в
  произвольной позиции, не ломая порядок страниц.

### Альтернативы (без клиента)

- **A11y color-contrast (#37)**: gold #8d7431 на cream #eae4d2 = 3.54:1
  при норме AA 4.5:1. Затемнить gold до ~#7a6428 в `tailwind.config.mjs`
  и визуально сверить все 7+ страниц, чтобы ничего не разъехалось.
- **Адаптив (mobile)** — ⚠️ **изменение по сравнению с прошлым HANDOFF:**
  клиент сказал, что мобильную версию мы делаем САМИ, макетов ждать НЕ
  нужно (зафиксировано в сессии 5). Все новые компоненты уже на
  `grid-cols-1 lg:grid-cols-2`, базовое поведение работает, но без точной
  выверки. Это теперь наша задача, а не «ждёт макетов».
- **Чистка `data-todo` и `.gitignore`**.

### Альтернативы (требуют клиента)

- **Реальные фото для hormone + emsculpt + exomind** — сейчас placeholder
  (hormone/emsculpt — копии weight-loss; exomind — сжатые скриншоты Figma).
  Имена файлов семантические, просто заменить файлы.
- **FAQ-тексты** для hormone, emsculpt, exomind — сейчас Lorem ipsum.
- **YouTube URL** для emsculpt (`videoEmbed.url`) и exomind (`videoEmbed.url`
  + `videoEmbed2.url`) — пустые.
- **Реальные blog-посты** + Content Collection 'posts' + `/blog/[slug]`.
- **Замена stock-фото на главной** (doTERRA, istockphoto watermarks, BTL).
- **Booking / Form / Newsletter** интеграции.
- **5 FAQ-ответов для Weight Loss**.

Оценочно — emface + emsella за одну сессию (обе проще exomind).

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
2. **Звезда-знак из логотипа** (узел Figma `1:1983` → `/public/assets/images/star-sign.svg`)
   показывается рядом с заголовком активного раздела. Это атом + ДНК-нить
   из логотипа IDEAL, используется как акцент-знак везде в макете.
3. **Текущий пункт** в подменю помечен `aria-current="page"` + `font-semibold`.
4. **При открытии меню** автоматически раскрывается активный раздел.
5. **При hover** на другой раздел — звезда и панель переключаются;
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

Все коммиты, по сессиям:

**Сессия 1** — initial setup, главная страница:
```
c6c7c2b chore: initial project setup — Astro 5 + Tailwind 3
7b9ce42 feat: marcellus + nav/inventory docs
41773f8 feat(home): all sections complete + handoff documentation
779f99c fix(home): visual parity with Figma — backgrounds, contrast, ...
```

**Сессия 2** — шаблон услуг, About/Contact/Blog, sub-nav, TrustBadges, deploy-prep:
```
fa12d35 feat(services): шаблон страниц услуг + Weight Loss наполнена
b374eac feat(nav+pages): sub-навигация + страницы About / Contact / Blog
5ac8595 docs(handoff): актуализирую перед хенд-оффом в новую сессию
56ceec9 feat: TrustBadges переиспользуемый компонент на 4 страницах
651106a build: подготовка к Cloudflare Pages deploy
17b3260 docs: TODO-INVENTORY + обновление HANDOFF после сессии 2
215ea55 perf: PNG/JPG → WebP массовая миграция (Lighthouse 95+) [⚠️ забыл webp в подпапках, починено в сессии 3]
984fffd feat: SignatureServices redesign, header UX fixes, WebP migration across site
```

**Сессия 3** — добивание визуальных багов, ассеты:
```
e5c67bf fix(home): correct signature card images — Figma-faithful sizing
67414d6 fix(header): overlay menu always shows a submenu — touch-friendly + default fallback
c1797a2 fix(header): hover-preserving zone covers headings + submenu
d82c29b fix(header): freeze submenu container height to Figma line length
ef8ed39 fix(assets): restore missing webp images in subfolders
26d9ae5 docs(handoff): update for session 3
```

**Сессия 4** — гибридная архитектура шаблона + hormone/emsculpt + Optima + Star Sign:
```
c9b9eae feat(services): hybrid template + hormone & emsculpt pages
9b8d025 feat(fonts): self-host Optima from macOS Optima.ttc (Figma original)
3b67a96 feat(brand): replace ornament.png with star-sign.svg (Figma original)
```
Содержимое коммитов:
- `c9b9eae` — расширение schema + 11 новых компонентов + обновлённый `[slug].astro` + наполненные `hormone.md`/`emsculpt.md` + 14 placeholder-webp.
- `9b8d025` — конвертация Optima.ttc → 5 woff2-файлов + @font-face + tailwind.config (Marcellus убран, остался как fallback).
- `3b67a96` — замена ornament.png на star-sign.svg (тот же знак из лого, но вектор; 4.9 KB после svgo + ручной чистки маски).

**Сессия 5** — звёзды на главной + exomind (доставлены патчами через `git am`):
```
2bbeac2 feat(home): add 6 star-sign ornaments per Figma layout
d58fdd4 feat(services): exomind page + hybrid template extensions
```
Содержимое коммитов:
- `2bbeac2` — 6 звёзд star-sign на главной (Hero, Discover, SignatureServices, WhoWeAre, AdvancedTreatments, StartYourTransformation), сверены попиксельно с Figma. 6 файлов.
- `d58fdd4` — страница exomind: 3 новых компонента (ServiceTwoColumnText, ServiceFullWidthImage, ServiceConditionsList) + 2 расширенных (ServiceGoldBanner +CTA с условным размером шрифта, ServiceTextWithPhoto +bullets/bulletStyle/tail) + расширенная schema (twoColumnText, fullWidthImages, conditionsList, videoEmbed2, midGoldBanner1/2, goldBanner→union) + обновлённый `[slug].astro` + `exomind.md` с реальным контентом + 6 webp-ассетов. Hormone/emsculpt/weight-loss не затронуты (проверено скриншотами).

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
> Путь к проекту локально: /Users/yuris/Documents/Claude-Projects/ideal-website (macOS). Все bash-команды для меня — с этим путём.
>
> Состояние проекта описано в `docs/HANDOFF.md` — прочитай его перед тем как что-то делать. Особенно: TL;DR-таблицу + секцию **"Сессия 5 — что доделано"** в начале (там описаны звёзды на главной, страница exomind и расширения гибридного шаблона) + **"Что делать в следующей сессии"** и **"Открытые вопросы и блокеры"**.
>
> ⚠️ **Про синхронизацию с origin:** работа сессий 5 ведётся через git-патчи, которые я применяю локально и пушу сам. Перед стартом скажи мне, запушены ли коммиты звёзд (`feat(home): add 6 star-sign ornaments`) и exomind (`feat(services): exomind page`) в origin/main, либо я начну с `git log --oneline` чтобы свериться. Если их нет в origin — у меня в чатах есть патчи в `/mnt/user-data/outputs/`, могу переприменить.
>
> Что готово после сессии 5: главная (визуальное ревью пройдено, + 6 звёзд star-sign), шаблон страниц услуг с **гибридной архитектурой** — один `[slug].astro` с условным рендером 20+ типов секций. На нём работают Weight Loss / hormone / emsculpt / **exomind** (4 разные структуры). About / Contact / Blog работают. Билд проходит, **8 страниц** генерируются. Сайт деплоится в Cloudflare Pages.
>
> Самый приоритетный следующий шаг — **2 оставшиеся specialty-страницы** (emface, emsella). Они в `draft: true`, 2 пункта меню ведут в 404. Архитектура доказана на hormone+emsculpt+exomind, для этих двух новых компонентов почти наверняка НЕ понадобится:
>   - **emface** (nodeId `1:6536`) — фото-сетка лица 3×2 (eyes/nose/forehead/jawline/submental/face). Сначала проверь, покрывается ли `ServiceCategoriesGrid` с 6 items и `lg:grid-cols-3` (2 ряда), прежде чем писать новый компонент.
>   - **emsella** (nodeId `1:5436`) — "What to expect" + "Book your session" + before/after. `ServiceBeforeAfter` и `ServiceTextWithPhoto` уже есть, должны покрыть всю страницу.
>
> Алгоритм для каждой страницы:
> 1. Снять Figma узел через `Figma:get_design_context` (тексты) и `Figma:get_screenshot` (эталон).
> 2. Сверить структуру с компонентами в `src/components/services/` (21 шт: Hero, SimpleWhatIs, WhatIs, TwoColumnText, Benefits, CommonSigns, TextWithPhoto, CategoriesGrid, FullWidthImage, ConditionsList, VideoEmbed, ExtendedDescription, WhoFor, Roadmap, BeforeAfter, Results, WhyTrust, GoldBanner, Experience, CTABand, FAQ).
> 3. Если всё покрывается — только заполнить .md, снять `draft: false`.
> 4. Если нет — добавить компонент + поле в schema (optional!) + условный рендер в `[slug].astro` (порядок секций фиксированный).
> 5. Собрать билд, снять скриншоты, сверить side-by-side с Figma, оформить патч (`git format-patch --binary` для WebP, fallback `git apply --3way`).
>
> ⚠️ Trademark ассеты (EMFACE/EMSELLA — BTL trademarks) требуют авторизации от BTL Industries — блокер запуска, не блокер вёрстки. Собираем макетно, помечаем `data-todo="trademark-authorization-from-btl"`.
>
> Альтернативные дорожки если по specialty не готовы:
>
> **Без клиента:**
> - Звёзды (star-sign) на specialty-страницах hormone/emsculpt/exomind — в Figma есть, в вёрстке нет. Единый проход (для exomind узлы 1:2861, 1:2862, 1:3203). По образцу задачи звёзд на главной (сессия 5).
> - A11y color-contrast (HANDOFF #37): gold #8d7431 на cream #eae4d2 = 3.54:1, надо 4.5:1. Затемнить gold до ~#7a6428 в `tailwind.config.mjs`, потом визуально сверить все страницы.
> - **Мобильная адаптация — делаем САМИ (НЕ ждём макетов!).** Это решение клиента, зафиксировано в сессии 5. Все компоненты на `grid-cols-1 lg:grid-cols-2`, базовое поведение работает, нужна точная выверка.
> - Чистка `data-todo` и `.gitignore`.
>
> **Требует клиента:**
> - Реальные фото для hormone, emsculpt, exomind (placeholder). Имена семантические — просто заменить файлы.
> - FAQ-тексты для hormone, emsculpt, exomind (Lorem ipsum).
> - YouTube URL для emsculpt и exomind (`videoEmbed.url`, `videoEmbed2.url` пустые).
> - Реальные blog-посты + Content Collection 'posts' + `/blog/[slug]`.
> - Замена stock-фото на главной (doTERRA, istockphoto watermarks, BTL trademarks).
> - Booking / Form / Newsletter интеграции.
> - 5 FAQ-ответов для Weight Loss.
>
> Figma file: jmzQqLFWpZXSII6xTkgCgu (Figma MCP подключён). nodeId страниц: hormone=1:3708, emsculpt=1:5795, exomind=1:3218, emface=1:6536, emsella=1:5436, weight-loss=1:1919.
>
> ⚠️ **Ловушка с ассетами** (баг из сессии 2): добавляя фото в подпапки `public/assets/images/<subdir>/`, убедись что в коммит попадает И удаление оригинала PNG/JPG И добавление WebP. Проверяй: `find public/assets/images -name "*.webp"` должен покрывать ВСЕ референсы из `grep -rE '/assets/images/.*\.webp' src/`.
>
> ⚠️ **Бинарные патчи в git am**: WebP-бинарники в патче могут уронить `git am` у пользователя. Генерируй патч через `git format-patch --binary`, и в инструкции для меня закладывай fallback `git apply --3way --binary` (как в сессии 5 — там оба патча проверены на чистом клоне и проходят).
>
> 💡 **Гибридный шаблон — как добавлять specialty-страницу:**
> 1. `Figma:get_design_context` для nodeId страницы.
> 2. Сверить какие из существующих компонентов подходят.
> 3. Если всё покрывается — только заполнить .md, снять `draft: false`.
> 4. Если нет — добавить компонент + поле в schema (optional!) + условный рендер в `[slug].astro`.
> 5. Каждая секция рендерится только если её поле во frontmatter заполнено. ⚠️ Важно: gold-баннеры разведены на 3 поля (`midGoldBanner1`, `midGoldBanner2` для центральных позиций у exomind; `goldBanner` для поздней позиции у hormone) — НЕ объединять обратно.
>
> Спроси меня, по какой дорожке двигаемся, прежде чем начинать работу.