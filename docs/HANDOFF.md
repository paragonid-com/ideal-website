# HANDOFF — состояние проекта на конец сессии «выравнивание главной по Figma»

Этот документ — точка входа для **следующей сессии работы с Claude**.
Прочитав его, новая сессия сможет продолжить работу без необходимости
переспрашивать решения, которые уже приняты.

> **ПОСЛЕДНЯЯ СЕССИЯ ЗАВЕРШЕНА: финальная подгонка ГЛАВНОЙ страницы под Figma**
> (несколько раундов правок, патчи 0001–0014 этой серии). Hero на один экран,
> Discover (52/48 + секция = высота фото), градиент Signature, реальный фон-картинка
> New in 2026 + EXOMIND на Poppins, форма −⅓ по высоте, блок локации с квадратным
> фото, Who We Are (имена в одну строку, фото мельче), Tagline (одна строка + цвет),
> высоты полос. Подробности — в разделе **«Главная — подгонка под Figma»** ниже.
>
> **ФОКУС СЛЕДУЮЩЕЙ СЕССИИ: МЕНЮ / НАВИГАЦИЯ.** Клиент хочет менять меню.
> Что именно — уточнить в начале сессии (конкретику клиент даст там). Точки входа:
> навигация — `src/data/navigation.ts` (3 группы: Wellness Services 10, Aesthetic
> Services 2, About Us 4 + `bookingCta`); вёрстка/логика меню — `src/components/Header.astro`
> (~700 строк: ДЕСКТОП-overlay + МОБИЛЬНОЕ drill-down меню «Вариант C» из сессии 14);
> контекст и открытые вопросы по навигации — `docs/site-navigation.md`. См. раздел
> **«СЛЕДУЮЩАЯ СЕССИЯ: меню/навигация»** ниже и готовый промпт в конце файла.

---

## Главная — подгонка под Figma (несколько раундов, патчи 0001–0014) (03–04.06.26)

Серия правок ТОЛЬКО по главной (`src/pages/index.astro` и компоненты в
`src/components/sections/` + `Hero.astro`, `TrustBadges.astro`). Десктоп-фокус;
каждый раунд — патчи `git format-patch --binary`, проверены на свежем клоне
(`git am --3way` + `npm run build` = 25 страниц). Что сделано по секциям:

- **Hero** (`Hero.astro`): реальный слайдер на 3 слайда; высота → `h-screen
  min-h-[620px]` (ровно один экран, было фикс. 1079px), отступ контента `pt-[19vh]`
  (≈ как 208/1079 в Figma). ⚠️ Фон `hero-dna.webp` со стоковым watermark «Unsplash+».
- **Tagline**: текст одной строкой «FULL-SERVICE MEDICAL & WELLNESS CLINIC»
  (убрано «IN AVENTURA, FL»); фон `#f4f1e8` (отдельная светлая полоса, НЕ `cream`
  как Discover).
- **Discover**: пропорции `lg:grid-cols-[52fr_48fr]` (фото 52% / текст 48%);
  секция = высоте фото (фото `object-cover` на всю высоту ряда, `lg:items-stretch`),
  текст вертикально центрирован, звезда — верх-право заголовка.
- **BrandStrip**: Tesamorelin/Ozempic/NAD+/Testosterone/Mounjaro. ⚠️ Дженерики
  (Tesamorelin, NAD+, Testosterone) **не имеют официальных логотипов** — в Figma
  это стилизованный текст/вордмарк; на сайте так же (оставлено как есть). Реальные
  лого только у Ozempic®/Mounjaro® (нужна юр-проверка — `data-todo="trademark-review"`).
- **SignatureServices**: радиальный градиент (светлее центр `#f5f2e6`, темнее
  бронзовые края `#a6885a`); заголовок-сначала; `pt-24 pb-12` (секция кончается
  сразу за фото). ⚠️ **Исходники фото — низкого разрешения (584×872), и в Figma
  тоже 584px** → переэкспорт не улучшит. Нужны фото ≥1200px от клиента, чтобы
  заменить woman/man/pills. Stock/генерации в окружении нет.
- **WhoWeAre**: портреты `md:w-[72%]` (масштабируются с вьюпортом, мельче, чем
  заполнение всей ширины); имя Ksenia → «Ksenia Petrushkina» (убраны ', PA-C, MPAS'),
  `text-[26px] whitespace-nowrap` — в одну строку на ноутбуке; роль `text-[15px]`
  (тоже одна строка); `pt-24 pb-10` (без пустых строк внизу). 3-й врач — реальные
  имя/должность (Laudin Percy / Owner).
- **AdvancedTreatments**: размер изображений = как в Signature (~307px), ряд
  центрирован (`mx-auto max-w-[1300px]`, 4 колонки).
- **Testimonials**: крупные тонкие золотые стрелки; бейджи вынесены на отдельную
  белую полосу (`TrustBadges`).
- **NewIn2026**: фон полосы — **реальное изображение из Figma** (`new2026-bg.webp`,
  узел 1:9; DNA-текстура: тёмно-синий слева → бронзово-золотая диагональ справа) —
  НЕ CSS-градиент (три попытки CSS не совпадали, потому что в Figma это картинка);
  мозг (`mix-blend-screen`) + текст поверх; EXOMIND-wordmark на **Poppins**
  (геометрический: Exo light + Mind bold; добавлен в загрузку шрифтов в
  `BaseLayout.astro`); высота 248px; вся полоса — кликабельная ссылка на `/services/exomind`.
- **TrustBadges** (полоса Google + BusinessRate): высота `min-h-[248px]` = как New in 2026.
- **StartYourTransformation** — две части:
  - *Форма:* пропорции `lg:grid-cols-[42fr_58fr]` (как блок локации ниже); высота
    урезана ~на треть (`py-8`, поля `gap-y-4`, компактнее consent-текст). ⚠️ Consent
    (TCPA/AI) — черновик, нужна юр-проверка (`data-todo="confirm-consent-disclaimer-text"`).
  - *Блок локации «Ready to Start…»:* фото здания **квадратное** на lg
    (`lg:aspect-square` → высота блока = ширине фото; на 1440 ≈605px, на 1920 ≈806px);
    заголовок `text-[40px] xl:text-[52px]` (в 2 строки, влезает в квадрат); панель
    уплотнена (`py-10`, меньше отступы). Под блоком — интерактивная карта
    (`aspect-[1920/400]`, тёплый sepia-фильтр; в headless рендерится пустой).

**Открытые по главной (не код / нужен клиент):**
- Фото Signature низкого разрешения — заменить может только клиент (≥1200px) или
  новые лицензированные стоки.
- Hero-фон с watermark «Unsplash+» — заменить на лицензированный.
- Consent-текст формы — утвердить юристу.
- EXOMIND: Poppins — приближение; если есть фирменный шрифт BTL Exomind — подставить.

---

## СЛЕДУЮЩАЯ СЕССИЯ: меню/навигация (клиент уточнит, ЧТО менять)

**Что есть сейчас:**
- **Источник навигации** — `src/data/navigation.ts`: `mainNav` = 3 группы
  (Wellness Services — 10 пунктов; Aesthetic Services — 2, Emsculpt Neo сознательно
  дублируется; About Us — 4: About / Blog / Glossary / Contact) + `bookingCta`
  (Boulevard, `target="_blank"`). Этот файл — единый источник и для Header, и для sitemap.
- **Вёрстка/логика меню** — `src/components/Header.astro` (~700 строк):
  - ДЕСКТОП (`≥ lg`): overlay-меню (золотой непрозрачный градиент-фон), hover-зоны,
    звезда-орнамент. **В прошлой сессии не трогалось — 1:1 по Figma.**
  - МОБИЛЬНОЕ (`< lg`): двухуровневое **drill-down меню «Вариант C»** (сессия 14):
    Level 1 = 3 категории, тап → Level 2 выезжает справа, `‹ Back`/✕/`Esc`/свайп,
    CTA закреплён на обоих уровнях, current-page подсветка, focus-trap, scroll-lock,
    `prefers-reduced-motion`. Детали поведения — в разделе «СЛЕДУЮЩАЯ СЕССИЯ:
    мобильное меню (Вариант C)» ниже (уже реализовано).
- **Контекст/открытые вопросы по навигации** — `docs/site-navigation.md`.

**Важно для сессии-меню:**
- Сначала СПРОСИТЬ клиента, что именно меняем (структура пунктов? порядок? новый
  раздел? десктоп-вид? поведение?) — конкретики в этой передаче нет.
- Менять структуру — В `navigation.ts` (отразится и в Header, и в sitemap).
  Менять вид/поведение — в `Header.astro` (аккуратно: десктоп и мобильный пути
  разные, не сломать ни один; гейт `< lg` / `≥ lg`).
- Проверять оба брейкпоинта (≥lg overlay и <lg drill-down: 375/390 + 1440) через
  Playwright; сверять с Figma при необходимости (file key `jmzQqLFWpZXSII6xTkgCgu`).

---



**Контекст:** сайт готовится «на будущее / под запуск рекламы». Реклама медицинских
услуг (гормоны, пептиды, GLP-1, IV) на Google/Meta/Microsoft/TikTok требует
сертификации **LegitScript**; платформы блокируют такие объявления без неё.
Поэтому контент сайта приводим в соответствие с их стандартами заранее.

**Что выяснено по требованиям LegitScript (источник — официальная страница стандартов):**
- «Дисклеймер на КАЖДОЙ странице» и «глоссарий» — **НЕ дословные требования**
  LegitScript. Это разумная практика, которая закрывает их стандарты по существу.
- Сертификация строится на **9 стандартах**. На контент сайта напрямую влияют 4:
  - **#5 Patient Services** — сайт обязан **явно раскрывать все штаты/территории/
    страны, где доступны услуги**. ⚠️ Нужны реальные лицензированные штаты от клиента.
  - **#6 Privacy** — опубликованная Privacy Policy, HIPAA-формулировки, HTTPS
    (на Cloudflare Pages — по умолчанию).
  - **#7 Validity of Prescription** — нельзя позиционировать как «купи препарат
    напрямую»; рецепт только после осмотра лицензированным провайдером.
  - **#8 Transparency** — никаких вводящих в заблуждение/непроверяемых benefit-claims
    (FTC/FDA). Это главный риск для wellness-копирайта.
- ⚠️ **Пептиды + GLP-1 = главный комплаенс-флешпоинт.** Пептиды (BPC-157, TB-500,
  серморелин, ипаморелин, CJC-1295 и т.п.) часто не одобрены FDA и попадают под
  рекламные политики; **названия GLP-1 (semaglutide / tirzepatide / Ozempic /
  Wegovy и пр.) нельзя упоминать в рекламе и на лендингах без сертификации
  LegitScript** (Google restricted-drug policy). Риск — не в дисклеймере, а в
  формулировках по всему сайту.

**Сделано в сессии 15:**
- Исследование требований (выше) + дизайн-макет двух новых нижних секций страницы
  услуги (показан клиенту на утверждение): **Patient Notice & Disclaimer** + **Glossary**.

**Этап 1 + Этап 4 — реализация (после утверждения дизайна):**
- **Этап 1 — Patient Notice & Disclaimer.** Новый компонент `ServicePatientNotice.astro`,
  текст дисклеймера вынесен в `src/data/site.ts` (один источник истины). Рендерится
  **по умолчанию на всех 11 страницах услуг** в `[slug].astro` (перед финальным
  `StartYourTransformation`), с opt-out флагом `suppressPatientNotice` (default false)
  — по аналогии с `suppressDefaultCtas`. Финальный текст = клиентский + 2 добавления:
  строка «not intended to diagnose, treat, cure, or prevent any disease» и предложение
  про зону обслуживания + ссылку на Privacy Policy (закрывает #5/#6/#7/#8 одним блоком).
  Зона обслуживания — placeholder `data-todo`, ждём лицензированные штаты от клиента.
- **Этап 4 — Glossary (E-E-A-T/SEO, опционально).** Новый компонент `ServiceGlossary.astro`
  + опциональное поле схемы `glossary: z.array({term, definition}).optional()`. Рендер
  ПЕРЕД FAQ, только если поле заполнено. Видимый текст (НЕ аккордеон) — для индексации.
  Механизм ставим сейчас; записи глоссария наполняем при копирайте (Этап 2). Стартовые
  5 терминов уже сформулированы (Peptide, GLP-1, Bioidentical Hormone Therapy, IV Therapy,
  Compounded Medication) — в дизайн-макете.

### ⚠️ ОБЯЗАТЕЛЬНО СДЕЛАТЬ — Этапы 2 и 3 (комплаенс-аудит контента)

Тексты страниц услуг **ещё не написаны** (Peptide/IV/Bloodwork — Lorem; FAQ — Lorem).
Решение: **сначала пишем копирайт вместе с Claude, затем аудируем его** под LegitScript.
**Нельзя запускать сайт/рекламу, не пройдя оба этапа.**

- **Этап 2 — аудит формулировок (стандарт #8 + Google/Meta restricted-drug policy).**
  По каждой странице услуги пометить и переписать: (а) категоричные гарантии результата;
  (б) непроверяемые benefit-claims по пептидам/GLP-1; (в) упоминания названий
  рецептурных препаратов (semaglutide/tirzepatide и т.д.) — в рекламном контексте
  они блокируются без сертификации. Дать список «красных» фраз с заменами.
- **Этап 3 — раскрытие зоны обслуживания + приватность (стандарты #5, #6).**
  Явно указать на сайте штаты/регионы обслуживания (от клиента), проверить наличие
  Privacy Policy + HIPAA-формулировок, подтвердить HTTPS (Cloudflare — ок).

---

## Сессия 15 — LegitScript-комплаенс: Patient Notice + Glossary (01.06.26)

**Контекст:** сайт готовится «на будущее / под запуск рекламы». Реклама мед-услуг
(гормоны, пептиды, GLP-1, IV) на Google/Meta/Microsoft/TikTok требует сертификации
**LegitScript** — платформы блокируют такие объявления без неё. Контент приводим
в соответствие заранее.

**Требования LegitScript (офиц. страница стандартов):** «дисклеймер на каждой
странице» и «глоссарий» — НЕ дословные правила, но закрывают стандарты по существу.
Сертификация = 9 стандартов; на контент сайта влияют 4:
- **#5 Patient Services** — явно раскрыть штаты/страны обслуживания.
- **#6 Privacy** — Privacy Policy, HIPAA, HTTPS (Cloudflare — по умолчанию).
- **#7 Validity of Prescription** — не «продажа препаратов напрямую»; рецепт только после осмотра.
- **#8 Transparency** — без вводящих в заблуждение/непроверяемых benefit-claims (FTC/FDA).

⚠️ **Пептиды + GLP-1 — флешпоинт:** многие пептиды (BPC-157, TB-500, CJC-1295,
Ipamorelin, GHK-Cu, Selank, Semax, Thymosin α1 и др.) ограничены к компаундированию
в США (FDA Cat. 2 / на ревью PCAC, июль 2026); названия GLP-1 (Ozempic/Wegovy/
Mounjaro/Zepbound, semaglutide/tirzepatide) блокируются Google/Meta в рекламе без сертификации.

### ✅ Этап 1 — Patient Notice & Disclaimer (РЕАЛИЗОВАНО — патч `feat(compliance)`)

- `src/components/services/ServicePatientNotice.astro` — блок внизу страницы услуги
  (cream + золотая линия сверху, капс-заголовок, приглушённый текст, ссылка на Privacy
  Policy + контекстная ссылка на /glossary).
- Текст — ЕДИНЫЙ источник в `src/data/site.ts`: `PATIENT_DISCLAIMER` + `patientDisclaimerBody()`.
- Рендер **по умолчанию на всех 11 страницах услуг** в `[slug].astro` (перед
  `StartYourTransformation`); opt-out флаг `suppressPatientNotice` (default false) в `content.config.ts`.
- ⚠️ Зона обслуживания = заглушка **«the State of Florida»**, помечена
  `data-todo="service-area-states"` — подтвердить/расширить реальные штаты (Standard #5).

### ✅ Этап 4 — Glossary (РЕАЛИЗОВАНО — патчи `feat(compliance)` + `feat(nav)`)

- **Архитектура:** отдельная страница `src/pages/glossary.astro` (свой Title/Meta/H1),
  НЕ блок в конце каждой услуги (глоссарий — сводный по всем услугам). Видимый текст
  (НЕ аккордеон) — для индексации/E-E-A-T.
- Дизайн: `PolicyHero` (gold) + категории «термин/определение» в 2 колонки + спокойный
  блок Disclosures (Informational / Medical Advice / FDA) на cream.
- Курирован под реальные услуги. Тон нейтрально-маркетинговый — без суперлативов/гарантий
  результата (#8); регуляторные оговорки — одним нижним блоком, без пер-строчных «негативов».
- **Добавлены** Emsella и Human Allograft (услуги клиники, которых не было в исходном
  глоссарии). **Убраны:** trial-only/недоступные (Retatrutide, Cagrilintide, Tesofensine,
  AOD-9604, SS-31); не предлагаемые услуги (Morpheus8, Softwave, Exosomes, ACS, Chelation,
  Methylene Blue, Rapamycin, Ozone); спец-диагностика без признаков на сайте (Full-Body MRI,
  Galleri, Cleerly, DEXA, Biological Age); вся секция нейро-пептидов (Cerebrolysin, Dihexa,
  DSIP, Selank, Semax, Oxytocin, VIP).
- Ссылка на /glossary в **3 местах:** меню (About Us, `navigation.ts`), футер Quick Links
  (`FooterBlock.astro`), контекстная строка в блоке Patient Notice.
- ⚠️ **Borderline — подтвердить у клиники** (при наличии услуги — вернуть в глоссарий):
  DEXA, Galleri, Full-Body MRI, Cleerly, Biological Age; PRF / Vampire Facial; AOD-9604,
  Oxytocin nasal spray, Chelation, Methylene Blue, Rapamycin.

**Билд:** 25 страниц (было 24 — добавилась /glossary). Исходники курированного глоссария —
в outputs: `glossary-curated.md` (финальный для сайта) и `glossary-compliance-revised.md`
(осторожная версия с пер-строчными статус-флагами, если понадобится).

### ⚠️ ОБЯЗАТЕЛЬНО — Этапы 2 и 3 (перед запуском/рекламой)

Тексты страниц услуг (Peptide/IV/Bloodwork/Sexual Health — Lorem; FAQ — Lorem) ещё не
написаны. План: **сначала пишем копирайт вместе, затем аудируем** под LegitScript.
**Нельзя запускать сайт/рекламу без обоих этапов.**
- **Этап 2 — аудит формулировок (#8 + Google/Meta restricted-drug):** пометить и переписать
  категоричные гарантии результата, непроверяемые benefit-claims по пептидам/GLP-1, упоминания
  названий рецептурных препаратов в рекламном контексте.
- **Этап 3 — зона обслуживания + приватность (#5, #6):** заменить placeholder «Florida»
  реальными штатами, проверить Privacy Policy + HIPAA-формулировки, подтвердить HTTPS.

**Патчи сессии 15 (порядок применения):**
1. `feat(compliance): Patient Notice on all service pages + curated /glossary page` (Этапы 1/4).
2. `feat(nav): surface Glossary link in footer Quick Links + contextual link` (ссылки).
3. (этот) `docs(handoff): session 15 final` — заменяет ранний черновой doc-патч сессии 15.

---

## Сессия 14 — drill-down меню + ревью-пакет (01.06.26)

**Состояние:** билд = **22 страницы** (11 specialty + 7 блог-постов + 4 статики: home, about, contact, blog-листинг). Все патчи доставлены и задеплоены, кроме самого последнего (`exomind-banner-link` — отдан в конце сессии).

Работа велась поверх `a98470e` (drill-down меню Вариант C, коммит `a98470e`, был сделан в начале этой сессии). Дальше — ревью всего сайта и пакет улучшений, каждое отдано отдельным git-патчем.

**Контентные правки (начало сессии):**
- `content(hormone)` — v2-копия: сломан шаблон, усилен E-E-A-T, исправлены регалии (Ksenia = **PA-C, MPAS**, НЕ «Dr»), заполнен FAQ реальными Q&A, смягчены абсолютные заявления о безопасности.
- `content(home)` — обновлены тексты секций (Hero/Tagline/Discover/WhoWeAre), исправлены имена команды и регалии Ksenia, убраны клише.
- **AI-детекция (84%) — отдельное заключение:** показатель сам по себе НЕ влияет на SEO (Google не использует AI-детекторы). Реальные риски — шаблонная однотипность (scaled-content-abuse) и YMYL/E-E-A-T. Вывод: ориентироваться на качество, ломать шаблон, привязывать контент к реальным врачам.

**UI/мобильные фиксы:**
- `fix(ui)` (UI-polish, задеплоен): Book Appointment в одну строку, footer Subscribe в 2 строки адаптивно, About/Blog hero центрированы по вертикали, плавный L1→L2 переход меню.
- `fix(ui)` hero/звёзды: ServiceHero/ContactHero clearance на мобиле (заголовок не лезет под логотип); звезда-орнамент вынесена из absolute в поток в `ServiceWhatIs`+`ServiceWhoFor` (не наезжает на длинные заголовки).
- `fix(faq)` — вопросы выровнены влево на iPad/Safari: flex перенесён с `<summary>` на внутренний `<div>` (WebKit игнорирует `display:flex` на summary), + `text-left` + скрыт webkit-маркер.
- `fix(menu)` overlay-coverage: убран конфликтующий `h-[100dvh]` + добавлен `bg-cream`; **затем** добавлена iOS-safe блокировка скролла (`position:fixed` на body со сдвигом, restore при закрытии) — `body{overflow:hidden}` НЕ держит iOS Safari, из-за чего футер проступал под overlay. **Это финальное решение бага «overlay залезает на футер».**

**SEO-фундамент** (`feat(seo)`, задеплоен):
- `src/components/SchemaOrg.astro` — JSON-LD: `MedicalClinic` везде + `MedicalProcedure`+`FAQPage` на услугах + `BlogPosting` на статьях.
- `BaseLayout` расширен: canonical, Open Graph, Twitter cards (+ пропсы ogImage/pageType/faq/serviceName/article).
- `@astrojs/sitemap` (автогенерация `sitemap-index.xml`) + `public/robots.txt`.
- **`src/data/site.ts`** — единый источник NAP/гео/часов/соцсетей. ⚠️ гео-координаты, часы, соцсети, домен — ЗАГЛУШКИ (помечены `⚠️`), заменить реальными данными клиента (Google Business Profile).

**Contact + блоки локации:**
- `fix(contact)` — убрана дублирующая 2-я форма; (затем) `refactor(contact)` — часы работы перенесены в `LocationBlock` рядом с адресом, отдельный `ContactInfo` удалён.
- `feat: LocationBlock` (фото офиса + адрес + часы + Google Maps, без баннера-CTA) — добавлен на **About** и **Contact**.
- `fix(ui)` tail-cleanup: устранён «тройной финал» (форма→баннер→футер) — добавлен проп `show` в `StartYourTransformation` (`both`/`form`/`cta`), везде `show="form"`. Убран нерелевантный EXOMIND-промо с about/contact/услуг (оставлен на home + blog).

**Отзывы:**
- `feat: Testimonials` — карусель с **6 реальными отзывами** со старого сайта idealmedwell.com (Emily R., Marian S., Kim D., Diz R., Kyle R., Isaac G.). (Затем) `fix(testimonials)` — **по 2 отзыва на странице** (3 страницы), переключение через display-toggle (не absolute) → текст не налезает на индикаторы, клик по точкам работает. Авто-смена 8с, пауза на hover/focus.
  - ⚠️ В отзывах Kim D. и Isaac G. клиенты пишут «Dr Ksenia/Dr Ken» — оставлено **дословно** (прямая цитата, править нельзя). Расходится с регалиями на сайте (PA-C). Если клиника захочет — можно убрать эти 2 отзыва.

**Производительность/бренд/единообразие** (`perf+brand+consistency`):
- CLS: `src/data/imageDimensions.ts` (размеры всех 117 картинок из `/public`) + хелпер `imgDim()`; width/height добавлены статическим `<img>` и динамическим в `ServiceFullWidthImage`/`ServiceBeforeAfter` (главный CLS-риск).
- **OG-картинка** `public/assets/images/og-default.jpg` (1200×630, фирменный золотой стиль, ~36KB) — путь уже прописан в `site.ts`.
- Телефон: видимый текст везде унифицирован → **`(305) 650-1884`** (footer, форма, услуги, hormone.md). В `tel:`/JSON-LD остаётся `+1-305-650-1884`.

**Favicon** (`feat(favicon)`): взят с оригинального сайта (иконка-«атом»), сгенерирован набор `public/favicon/` (ico 16/32/48 + 16/32 PNG + apple-touch 180 на кремовом + 192/512 PWA) + `site.webmanifest` (theme `#8d7431`) + ссылки в `<head>`.

**Кликабельный баннер** (`feat(new-in-2026)`, отдан в конце): полоса «New in 2026 — EXOMIND» — растянутая ссылка на `/services/exomind` + aria-label + hover-аффорданс.

### Остаток ревью (НЕ сделано — приоритеты для следующих сессий)

- 🔴 **P0-1 формы → backend** (ФОКУС): `action="#"`, `data-todo="form-submission"`, newsletter не подключён. Заявки теряются. Нужен GHL webhook (или Cloudflare Pages Function) + куда слать newsletter.
- 🟠 **P2-10** рефактор 4 hero (`Hero`/`AboutHero`/`BlogHero`/`ServiceHero`) в один `<PageHero>` — техдолг, из-за него баги чинились по частям.
- 🟠 **P3-12** лицензии стоковых фото (About/Blog hero — Unsplash/iStock) + **бренд doTERRA в кадре** на About (юридический риск). ~44 `data-todo` в коде.
- 🟠 **P3-13** редполис на остальных 10 страницах услуг (только hormone причёсан) — особенно weight-loss (GLP-1, YMYL).
- 🟡 реальные данные в `site.ts`: гео, часы, соцсети-URL, прод-домен (сейчас `ideal-website.pages.dev`). Когда обновятся — часы/schema/LocationBlock подхватят автоматически.
- 🟡 P1-5 контраст gold-логотипа на светлом blog hero; P2-9 более полный trust-блок.

---

Проект: **сайт для медицинской клиники Ideal Medical & Wellness (Aventura, FL)**.
Конверсия дизайна из Figma в готовый сайт.

| Что | Статус |
|---|---|
| Главная страница (`/`) | ✅ **Полностью сверстана + прошла визуальное ревью vs Figma.** Сессия 5: добавлены 6 недостающих звёзд (star-sign) в Hero / Discover / SignatureServices / WhoWeAre / AdvancedTreatments / StartYourTransformation |
| Signature Services карточки | ✅ Скорректированы под Figma (сессия 3): фоновые фото зум + position, IV Therapy overlay 153% вместо 115%, overlay-файл обрезан по alpha-bbox |
| Header / Footer / общие компоненты | ✅ Готовы. Футер сверен с Figma (сессия 7): star-sign под лого + соцсети FB/IG/YouTube в колонке Address. Cherry/CareCredit-ссылки исключены из проекта; email-поле в Subscribe оставлено осознанно |
| Overlay-меню — поведение | ✅ Доработано в сессии 3: hover/click/touch, sticky-section, hover-zone покрывает заголовки + подменю + пустоту между, min-h=489px чтобы линия и футер не прыгали |
| Sub-навигация (current page indicator) | ✅ Реализована — auto-open раздела + орнамент + `aria-current` |
| Дизайн-токены (цвета, шрифты) | ✅ Извлечены и в `tailwind.config.mjs` |
| Документация (карта меню, инвентарь фото) | ✅ В `/docs` |
| Шаблон страниц услуг | ✅ Гибридный шаблон с условным рендером (сессия 4): поддерживает Weight Loss / hormone / emsculpt структуры без отдельных файлов |
| Draft-заглушки услуг | ✅ **Все сняты с draft (сессия 12: regenerative + sexualhealth).** 0 draft-страниц. Все **11 specialty** готовы, ни один пункт меню не ведёт в 404. Билд = **11 specialty + 7 блог + 4 статики = 22 страницы** |
| Блог (`/blog`) | ✅ **Сессия 11 (параллельная):** коллекция `posts` — 7 статей, импортированных со старого WordPress idealmedwell.com. Маршруты `/blog` (листинг) + `/blog/[slug]`. Изображения в `/public/assets/images/blog/<slug>/`. См. секцию «Блог» ниже |
| Звёзды star-sign на specialty | ✅ **Сессия 7:** добавлены на все 5 (hormone 6 шт, exomind 2, emsculpt/emface/emsella по 1 — hero). Opt-in через поле `stars` + per-block `star`; Weight Loss не затронут |
| Exomind (`/services/exomind`) | ✅ **Наполнена контентом из Figma (сессия 5)**: hero + twoColumnText (whatIs+whoFor) + video#1 + goldBanner#1 + deviceShowcase + howWorks + whyChoose + conditionsList + video#2 + goldBanner#2 + FAQ. Тексты FAQ и YouTube-ссылки ждут от клиента. Звёзды добавлены в сессии 7 |
| Hormone (`/services/hormone`) | ✅ **Наполнена контентом из Figma (сессия 4)**: hero + whatIs + reclaiming + commonSigns + roadmap + whyTrust + goldBanner + experience. Тексты FAQ ждут от клиента. |
| Emsculpt Neo (`/services/emsculpt`) | ✅ **Наполнена контентом из Figma (сессия 4)**: hero + simpleWhatIs + 2× categoriesGrid + videoEmbed (placeholder) + extendedDescription + beforeAfter. Тексты FAQ ждут от клиента. |
| Страницы About / Contact / Blog | ✅ Созданы (контент About есть; Blog — placeholder) |
| WebP-ассеты в подпапках (about/, blog/, services/weight-loss/) | ✅ Восстановлены в сессии 3 — были потеряны в коммите 215ea55 при WebP-миграции |
| TrustBadges (Google ★ + BusinessRate) | ✅ Вынесены в `components/TrustBadges.astro`, подключены на 4 страницах |
| Адаптив (mobile) | ✅ **СДЕЛАН (сессия 13).** Слои 0–4 + полировка. Все секции стекают в 1 колонку; fluid-типографика (`clamp()`); **0 горизонтального overflow на 375/390/768**, десктоп 1:1. **Сессия 14: drill-down меню (Вариант C) реализовано**, + множество мобильных багфиксов (hero clearance, FAQ-iPad, overlay-coverage с iOS-safe scroll-lock) |
| Интеграции (форма, бронирование, newsletter) | 🟡 **Booking ГОТОВ (сессия 12)** — все CTA на Boulevard-виджет. 🔴 **Форма (form-submission) — НЕ подключена, фокус следующей сессии.** Newsletter, соцсети-URL — тоже ждут |
| SEO-фундамент | ✅ **Сессия 14:** JSON-LD (MedicalClinic/Service/FAQ/BlogPosting), Open Graph + canonical + Twitter, sitemap + robots.txt, OG-картинка, favicon. Централизованные данные в `src/data/site.ts` (⚠️ гео/часы/соцсети — заглушки) |
| Отзывы | ✅ **Сессия 14:** карусель «What Our Clients Say» с 6 реальными отзывами со старого сайта, по 2 на страницу, рабочие индикаторы |
| Деплой на Cloudflare Pages | ✅ Сайт деплоится (актуализирую блокер в сессии 4 — раньше был помечен 🟡 как "ждёт нажатия Save and Deploy") |
| Lighthouse-аудит | ✅ Performance 95+, A11y 96, BP/SEO 100 на всех страницах. PNG → WebP массовая миграция (37MB → 2MB) |
| Инвентарь `data-todo` | ✅ Собран в `docs/TODO-INVENTORY.md` — всё, что ждёт клиента |
| **Peptide Therapy (`/services/peptide`)** | ✅ **Сессия 8:** собрана с нуля по Figma (узел `1:5026`). Реальные заголовки + 9 icon-only benefits (3×3) + реальные ассеты (9 иконок, what-is/who-for фото, hero-композит с двумя ручками IDEAL). Body-тексты Lorem с `data-todo="copy"` (ждут клиента). Снята с draft. **Билд = 11 страниц.** Snято с draft 3-е меню-звено |
| **Изображения specialty (hormone, emsella)** | ✅ **Сессии 8-10:** заменены все placeholder-WebP на реальные ассеты из Figma. Hormone (5 фото) + Emsella (7 фото). Извлечение через `Figma:get_design_context` → asset URL → cover-crop → WebP |

---

## Сессия 12 — regenerative, emface-картинки, booking, CTA-аудит, опечатки, badges (28.05.26)

**Состояние на конец сессии:** билд = **22 страницы** (11 specialty + 7 блог + 4 статики).
**Все specialty-страницы готовы — `draft: true` не осталось ни одной.**

Сделано (коммиты поверх `302b9c3`, доставлены git-патчами):

1. **`feat(regenerative)`** — страница `/services/regenerative` собрана с нуля по Figma `1:2444`, снята с draft. Стандартный гибридный шаблон: Hero (PRP & Allograft) → WhatIs (фото слева) → How Does It Work (text+photo) → Benefits (icon-only 3×3, 9 шт) → Who Is It For (text+photo) → What To Expect (gold Results) → 5 **реальных** FAQ-вопросов. 4 фото сконвертированы из Figma; 9 benefit-иконок — копия shared-набора из peptide.
   - ⚠️ **Баг макета:** тело "How Does It Work" (узел `1:2140`) дословно дублирует тело "Who Is It For" (`1:2127`). Воспроизведено как есть, помечено в `.md`. Нужен корректный текст «как это работает».
   - ⚠️ Hero + what-is — Unsplash stock (cdc-IFpQtennlj8, julia-koblitz) → блокер лицензий.

2. **`fix(emface): real images`** — все 18 плейсхолдеров заменены реальными ассетами из Figma `1:6536`: hero, what-is (device), 2 видео-постера, 6 area-* (нарезаны из единого композита `1:6296` без впечатанных подписей — компонент рисует свои), 6 treat-*. beforeAfter переведён в single-image режим (композит `1:6522` со встроенными BEFORE|AFTER + caption); удалены парные before/after webp.

3. **`feat(booking)`** — **ВСЕ** кнопки Book Appointment/Book Now ведут на booking-виджет Boulevard:
   `https://www.joinblvd.com/b/ideal-medical-and-wellness/widget#/visit-type`
   (target=_blank rel=noopener). Источник — `bookingCta.href` в `src/data/navigation.ts` + home Hero + ServiceGoldBanner default + exomind ctaHref. Все плейсхолдеры `#book`/`#`/`data-todo="booking-system"` убраны. **Блокер интеграции #27 ЗАКРЫТ.**

4. **`fix(services): restore + suppress CTAs`** (две правки) — полный аудит CTA по всем 10 страницам против Figma. Все секции на месте (ничего не пропущено). По CTA:
   - Восстановлены 3 пропущенных band'а (тот же класс бага, что emsella/exomind): hormone (между gold-цитатой и Experience), emsculpt (после before/after, перед FAQ), emface (после видео #2, перед FAQ). Флаги `ctaAfterGoldBanner`, `ctaBeforeFaq`.
   - Подавлены 3 дефолтных band'а на peptide/ivtherapy/bloodwork/regenerative (в Figma у них 0 mid-CTA). Флаг `suppressDefaultCtas`.
   - **Итог: mid-CTA совпадает с Figma на всех 10 страницах** — peptide/iv/bloodwork/regen=0, weight-loss 3, hormone 5, emsella 4, emsculpt 4, exomind 5, emface 3.

5. **`fix(copy)`** — исправлены опечатки Figma по запросу клиента: `Mentall→Mental Wellness`, `teel→feel` (отзыв Emily R.), `BOOD→BLOOD WORK`. (`BOOK APPOIMENT` было исправлено ранее.) Сняты data-todo `typo-mentall`/`typo-teel-vs-feel`.

6. **`fix(assets)`** — badge-google-5star.png (был RGB) и badge-best-of-2025.png (RGBA alpha=255) → прозрачный фон через edge-flood-fill (внутренние белые сохранены). Больше не выглядят белыми наклейками на cream. **Закрывает #26а.**

7. **`feat(sexualhealth)`** — последняя draft-страница `/services/sexualhealth` собрана с нуля по Figma `1:7461`, снята с draft. Стандартный шаблон (как peptide/regenerative): Hero → WhatIs (фото слева) → Benefits (icon-only 3×3, 9 шт) → WhoFor (фото справа) → Results (gold) → 5 FAQ. `suppressDefaultCtas: true` (в Figma только hero+footer). 3 фото (WebP) + 9 иконок (копия shared-набора). **Выведена в меню Wellness Services** (как ранее regenerative) — `orphanPages` теперь пуст. ⚠️ Body/FAQ — Lorem (`data-todo="copy"`); 3 фото iStock → блокер лицензий.

**Итог: 0 draft-страниц, все 11 specialty готовы. Билд = 22 страницы.**

**Что НЕ трогали (parked):** широкий контент-аудит (Lorem-тексты, FAQ-ответы); лицензии/trademark; мобильный адаптив (следующая сессия).

---

## Сессии 8-10 — что доделано (28.05.26)

**Сессия 8 — Peptide + изображения Hormone.**
- `feat(services)`: построена страница **Peptide Therapy** по Figma `1:5026`. Расширена schema (`benefits` description→optional, max 6→9, новый флаг `benefitsIconOnly`; добавлены star-флаги `whatIs`/`benefits`/`whoFor`/`results`). `ServiceBenefits` получил icon-only 3×3 режим + опц. intro + star. `ServiceWhatIs`/`WhoFor`/`Results` получили `showStar`. Ассеты: 9 белых line-иконок (`src/assets/services/peptide/`), 2 фото + hero-композит (золотой градиент + 2 ручки IDEAL, key-out тёмного фона) в `public/assets/images/services/peptide/`.
- `fix(hormone)`: 5 изображений были неправильными плейсхолдерами (hero≡experience-dna, reclaiming≡why-trust — байт-в-байт дубли). Заменены реальными из Figma `1:3708`.

**Сессия 9 — изображения Emsella.**
- `fix(emsella)`: все 7 изображений были бежевыми плейсхолдер-карточками. Заменены реальными из Figma `1:5436` (hero / what-is / 3× incontinence / 2× sexual-wellness).

**Сессия 10 — пропущенные секции (hormone + emsella).**
- `fix(services)` (коммит после `3288142`): **hormone** — восстановлена full-width картинка инъекции между Common Signs и Roadmap (Figma `1:3462`); schema `fullWidthImages` получила позицию `after-common-signs`. **emsella** — восстановлены 3 пропущенных CTA «Book Appointment» (после two-col, после grid, после Sexual Wellness; Figma `1:5166/1:5169/1:5172`) + убран дубль-CTA после what-is; формат текста: `_ `-строки в `ServiceWhatIs` рендерятся как буллеты (а не литеральные подчёркивания), «What to Expect» переведён в bullets-массив.
- `fix(emsella)` (коммит `fc0dda1`): добавлено **видео** «BTL EMSELLA® — Mechanism of action» после сетки «What Emsella is for?» (Figma `1:5400`). Schema `videoEmbed` получила опц. `position` (`late` default = текущее поведение emsculpt/emface/exomind; `after-first-grid` = emsella). URL пустой → плашка «Video coming soon» + `data-todo='video-from-client'` (ждёт клиента).

> 🔑 **Паттерн-урок сессий 9-10:** общий шаблон `[slug].astro` исторически расставлял video/CTA-баннеры НЕ во всех позициях по Figma. На Emsella это всплыло дважды (пропущенные CTA, потом пропущенное видео). **Сильный сигнал, что на emsculpt / exomind / emface возможны такие же пропуски — это приоритет №1 следующей сессии (см. ниже).**

---

## Сессия 11 — что доделано (28.05.26)

Дорожка сессии: **аудит/доведение specialty + 2 новые страницы** (4 патча поверх `42a917e`). Origin/main = `d9599e6`.

**Task 1 — `fix(emsculpt)` (`ba5201e`, Figma `1:5795`).** Заменены placeholder-WebP (6 байт-в-байт дублей + before/after-заглушки) реальными ассетами: hero, 2 grid-сетки (3 категории «What Emsculpt Neo Is For» + 3 аппликатора «Customize Your Treatment»), видео-постер, before/after. Before/after в Figma — **единый композит-кадр** (узел `1:5559`) с уже впечатанными подписями BEFORE / AFTER EMSCULPT NEO и caption «3 months after… Suzanne Kilmer, M.D.». Для него добавлен backward-compatible режим **`beforeAfter.items[].image`** (рендер одной картинки без накладных бейджей/caption; `beforeImage`/`afterImage` стали optional → парный режим emface не затронут). Видео-постер (`1:5511`) проставлен как `posterImage`, URL по-прежнему пустой (`data-todo`, ждёт клиента).

**Task 2 — `fix(exomind)` (`b3caceb`, Figma `1:3218`).** Заменены мелкие скриншоты-плейсхолдеры (549–800px) реальными ассетами: hero, 2 видео-постера, device-showcase (full-width), how-works/why-choose (TextWithPhoto). **+ восстановлены 2 пропущенных CTA «BOOK APPOINTMENT»** — тот самый паттерн-урок Emsella: общий шаблон не расставлял CTA перед conditions-list (Figma `1:2907`) и после видео #2 (`1:2913`). Добавлены опц. флаги **`ctaBeforeConditionsList` / `ctaAfterVideo2`** (default false → остальные 10 страниц не затронуты; включены только в exomind.md). Теперь все 5 контентных CTA макета присутствуют.

**Task 3 — `feat(ivtherapy)` (`33cdfeb`, Figma `1:6189`).** Страница собрана с нуля по **стандартному шаблону** (как weight-loss/peptide) — новых компонентов/полей схемы не понадобилось: Hero → WhatIs (фото слева) → Benefits (icon-only 3×3, 9 шт, gold) → WhoFor (фото справа) → Results → FAQ. Заголовки и 9 benefit-лейблов реальные из Figma; body/intro/FAQ — Lorem с `data-todo="copy"`. Снята с draft. 3 фото из Figma `1:5808/1:5860/1:5891` (⚠️ istockphoto-stock, лицензии — блокеры); 9 benefit-иконок — собственная копия shared-набора в `src/assets/services/ivtherapy/`.

**Task 4 — `feat(bloodwork)` (`d9599e6`, Figma `1:2829`).** Тот же стандартный шаблон, идентично ivtherapy. Снята с draft. 3 фото из Figma `1:2453/1:2505/1:2637` (⚠️ Unsplash + istockphoto, лицензии — блокеры); 9 иконок — собственная копия в `src/assets/services/bloodwork/`. **⚠️ Сохранена опечатка из Figma: «BOOD WORK» вместо «BLOOD WORK» в заголовке WhatIs (узел `1:2465`)** — по политике «не править опечатки Figma, помечать» (как MENTALL/APPOIMENT/teel). Hero H1 = корректное «BLOOD WORK».

> 🔑 **Открыто из сессии 11 (НЕ сделано, ждёт решения):**
> - **emsculpt CTA `1:5573`** (после Before/After, перед FAQ) — найден при Task 1, но **не добавлен** (emsculpt был ограничен «только images»). Прямое продолжение Приоритета №1 — закрыть отдельным 1-строчным gate-флагом.
> - **CTA на ivtherapy/bloodwork:** сами фреймы `1:6189` / `1:2829` содержат только hero BOOK NOW, без mid-section CTA. Но общий шаблон авто-вставляет 3 (после Hero/WhatIs/Benefits) — оставлено как у peptide/weight-loss для консистентности сиблингов. Подавляемо флагом, если нужна строгая пиксельная точность фрейма.
> - **«BOOD WORK»** — подтвердить с клиентом: оставить опечатку или исправить на «BLOOD».

---

## Блог (`/blog`) — коллекция `posts`

Сделан в **параллельной сессии** (коммит `1c30cf4` `feat(blog): import posts from idealmedwell.com`). Здесь — справка для следующей сессии, чтобы услуги и блог не конфликтовали при патчах.

- **Коллекция `posts`** в `src/content.config.ts` (отдельно от `services`): loader `glob` по `src/content/posts/**/*.md`. Тело статьи — Markdown под frontmatter, рендерится через `entry.render()`.
- **Схема:** `title`, `description`, `heroImage`, `heroImageAlt` (required); `sourceUrl`, `relativePath`, `publishDate` (optional); `draft` (default false). `sourceUrl`/`relativePath` сохранены под canonical и возможные 301-редиректы со старых WordPress-URL.
- **7 статей** (импорт с idealmedwell.com): does-tirzepatide-suppress-your-appetite, how-fast-does-semaglutide-work, is-peptide-therapy-safe-your-complete-guide, tirzepatide-vs-semaglutide-which-is-better, top-3-tips-for-losing-weight-on-semaglutide, what-are-the-benefits-of-tesamorelin, what-is-a-medical-weight-loss-program.
- **Маршруты:** `src/pages/blog.astro` (листинг `/blog`) + `src/pages/blog/[slug].astro` (статья). Компоненты `src/components/blog/BlogGrid.astro`, `BlogPostCard.astro` (затронут также `StartYourTransformation.astro`).
- **Изображения:** `/public/assets/images/blog/<slug>/`, абсолютные пути (heroImage + inline `![]()` в теле).
- ⚠️ Блог-изображения — тоже потенциальный лицензионный блокер (часть кадров пересекается со stock на specialty-страницах). Проверить вместе с блокером 🔴 лицензий ниже.

> ⚠️ **Для будущих патчей:** блог и услуги делят `src/content.config.ts` (коллекция `posts` — над `services`). Правки схемы услуг и блога идут в разные участки файла → `git am --3way` мержит без конфликтов, но рабочее дерево должно быть **закоммичено** перед `git am` (иначе abort «local changes would be overwritten»).

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

Из 5 specialty-страниц, отмеченных приоритетом в HANDOFF сессии 3 — **все готовы**:
- ✅ `hormone` — сделана (сессия 4)
- ✅ `emsculpt` — сделана (сессия 4)
- ✅ `exomind` — сделана (сессия 5)
- ✅ `emface` — сделана (сессия 6)
- ✅ `emsella` — сделана (сессия 6)

Прогноз HANDOFF подтвердился: **новых компонентов не понадобилось** ни для
emface, ни для emsella. Их структура полностью покрылась существующими
блоками. Понадобились лишь точечные расширения схемы/компонентов (всё
опциональное, обратно совместимое):
- emface: `categoriesGrids.items` max 4→6; позиционные поля
  `beforeAfter.position` и `videoEmbed2.position`; одиночные `\n` → `<br>`
  в ServiceWhatIs / ServiceTwoColumnText.
- emsella: новое поле `twoColumnSections` (массив two-column секций с
  позициями + опц. heading/background/per-column photo). Старый
  `twoColumnText` (объект) не тронут.

⚠️ **Расхождение Figma vs HANDOFF-догадки** (на будущее — всегда снимать
узел перед оценкой): emface — НЕ просто «фото-сетка 3×2», а полная
страница из 9 секций (две grid-сетки по 6, два видео, before/after).
emsella — НЕ имеет before/after и видео; её «изюм» — секция Sexual Wellness
(2 фото + WOMAN/MAN колонки).

---

## Сессия 7 — что доделано (27.05.26)

Звёзды star-sign на всех 5 specialty-страницах (техдолг сессий 4-6).
Доставлено патчем (`git log`: `feat(services): star-sign ornaments on 5
specialty pages`).

Подход A (opt-in, согласован с клиентом): декоративная звезда добавляется
только там, где явно включена флагом — Weight Loss и прочие не-specialty
страницы не затронуты (regression проверена: 0 service-секционных звёзд в
weight-loss).

Механика:
- Схема: новое опц. поле `stars` (объект boolean-флагов по секциям) +
  per-block `star` на `textWithPhotoBlocks[]`.
- Компоненты ServiceHero / ServiceCommonSigns / ServiceRoadmap /
  ServiceWhyTrust / ServiceExperience / ServiceTextWithPhoto: опц. проп
  `showStar`. Три стиля по Figma (блочный под lead; центр над заголовком;
  top-right колонки через flex).
- Карта звёзд: hormone 6 (hero, Reclaiming, CommonSigns, Roadmap, WhyTrust,
  Experience); exomind 2 (hero, How Works — НЕ Why Choose); emsculpt/emface/
  emsella по 1 (hero).

⚠️ Урок: per-block флаг понадобился, потому что глобальный boolean не мог
выразить «у exomind звезда на первом before-conditions блоке, но не на
втором». Если в будущем секция используется несколько раз на странице с
разным оформлением — сразу делать per-block/per-instance флаг, а не
секционный синглтон.

### Футер — сверка с Figma и фиксы (вторая часть сессии 7)

Доставлено отдельным патчем (`git log`: `fix(footer): match Figma — star
ornament + social icons`). Файл: `src/components/FooterBlock.astro`.

Что исправлено по Figma:
- Серый круг-placeholder под лого → заменён на gold **star-sign** орнамент.
- Соцсети: добавлен ряд из 3 иконок в колонке **Address** под телефоном —
  **Facebook, Instagram, YouTube** (gold-кружки, inline SVG, aria-label).
  ⚠️ По решению клиента — именно FB/IG/YouTube, **НЕ X/Twitter**. URL пока
  placeholder `#` + `data-todo="social-url"` (реальные ссылки от клиента).
  Соцсети показываются только в `variant="full"` (подвал страницы), в
  `variant="compact"` (overlay-меню в Header.astro) — НЕ показываются
  (compact-меню с Figma не сверялось, не рисковали).

Осознанные расхождения с Figma (по решению клиента — НЕ менять):
- **Cherry Financing / Care Credit Financing** есть в Figma в Quick Links,
  но **исключены из проекта**. Quick Links = Terms / Privacy. (Зафиксировано
  комментарием в коде.)
- **Email-поле в Subscribe** оставлено (намеренное UX-улучшение), хотя в
  Figma только кнопка JOIN NOW.

Не входит в футер: карта Google Maps над футером — это секция
`StartYourTransformation` (отдельный компонент, iframe), уже реализована.

⚠️ Мелочь на будущее: иконка Instagram на 44px чуть бледнее FB/YouTube
из-за тонких контуров. Узнаваема, но если клиент захочет — заменить на
залитый вариант glyph.

---

## Сессия 6 — что доделано (27.05.26)

Закрыт главный приоритет: **обе оставшиеся specialty-страницы — emface и
emsella** — свёрстаны, наполнены контентом из Figma, сняты с `draft`.
Билд = **10 страниц**, 2 пункта меню больше не ведут в 404. Доставлено
двумя git-патчами (см. `git log`: emface = `b7a91c1`, emsella = `a054ae0`).

**emface** (Figma 1:6536) — оказалась НЕ «фото-сеткой 3×2», а полной
страницей из 9 секций: Hero → WhatIs → TwoColumnText(How/Benefit) →
CategoriesGrid(areas, gold, 6 items) → Video1 → BeforeAfter →
CategoriesGrid(treatments, cream, 6 items) → Video2 → FAQ. **Все секции
покрылись существующими компонентами.** Расширения схемы:
`categoriesGrids.items` max 4→6; `beforeAfter.position` (`late` default |
`after-video-1`); `videoEmbed2.position` (`before-second-grid` default |
`after-second-grid`). Все дефолты сохраняют поведение emsculpt/exomind.

**emsella** (Figma 1:5436) — НЕ имеет before/after и видео (вопреки
прошлой догадке HANDOFF). Структура: Hero → WhatIs → TwoColumnText(What to
Expect / Book) → CategoriesGrid(incontinence типы, gold, 3 items) →
Sexual Wellness (heading + 2 фото + WOMAN/MAN колонки) → FAQ. Введено
новое поле `twoColumnSections` (массив two-column секций с позициями
`after-whatis` / `after-categories-grid`, опц. heading/background/photo).
Компонент `ServiceTwoColumnText` расширен (heading, background, per-column
image) — обратно совместимо, exomind/emface не затронуты.

**Общая правка типографики:** в `ServiceWhatIs` и `ServiceTwoColumnText`
одиночные `\n` внутри абзаца теперь рендерятся как `<br>` (нужно для
буллет-списков emface/emsella вида `_ Lift…`). На сплошные абзацы
weight-loss/exomind/emsculpt не влияет — regression проверена визуально.

**Ассеты:** 18 (emface) + 7 (emsella) placeholder-WebP с семантическими
именами. Клиент заменяет файлы, markdown не трогает. Asset-консистентность
(ловушка сессии 2) проверена: все референсы из .md покрыты файлами, orphan
нет. Оба патча проверены на чистом клоне: `git am --3way` применяется,
билд = 10 страниц. ⚠️ У пользователя должна быть настроена git identity
(`user.email`/`user.name`), иначе `git am` падает — fallback
`git apply --3way` без коммита.

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

## Сессия 13: мобильный адаптив (responsive) — СДЕЛАНО (29.05.26)

**Задача была:** довести сайт до корректного отображения на мобильных/планшетах.
Макетов под мобилу НЕ было — делали сами, сохраняя десктоп 1:1. **Сделано.**

**Подход — слоями (каждый слой = отдельный коммит на origin/main):**

- **Слой 0 — примитивы + убрать горизонтальный скролл** (`ecc2228`):
  Manrope `@import` → `<link>` в `<head>` BaseLayout (ушёл build-warning).
  Fluid-типографика в `tailwind.config.mjs`: `text-h1`/`body-lg`/`btn` через
  `clamp()` (верх = Figma-px, низ мобильно-безопасный). Орнамент-звезда
  `<img absolute left-full>` → `max-lg:hidden` (торчала за вьюпорт; гейт именно
  `max-lg`, не `max-md` — иначе на 768 возвращалась). `ServiceCTABand`
  `min-w-[488px]` → `md:` + `max-md:w-full`.
- **Слой 1 — общие секции** (`517c714`): Header overlay-меню стекается в 1
  колонку ниже `lg`, лейблы 64px→34/44/64; `StartYourTransformation` карта
  `aspect-[1920/400]`→`aspect-[4/3]` на мобиле; `TrustBadges` h-120→90.
- **Слой 2 — шаблон услуг** (`7d0aa9a`, чинит все 11 страниц): `ServiceHero`
  h-814→560/lg; `ServiceWhatIs`/`WhoFor` `grid-cols-2`→`grid-cols-1
  lg:grid-cols-2` + фото получает мобильную высоту; `ServiceSimpleWhatIs`
  (emsculpt) `grid-cols-12`→1/lg + убран безусловный `col-span-12` (плодил 12
  неявных треков → overflow). Остальные Service* уже были responsive.
- **Слои 3–4 — главная + about/blog/contact** (`6ad8ec6`): `Discover`
  `grid-cols-2`→1/lg; `StartYourTransformation` Part B 2-кол `md:`→`lg:` (на
  768 фото+панель вылезали — **намеренное изменение планшета**); `AboutHero`/
  `BlogHero` h-814→560/lg; `ContactHero` `grid-cols-2`→1/lg.

**Доп. правки главной (по фидбеку клиента):** `7854f8b` Discover-фото перестало
резать людей (`aspect-[2054/1368]`), логотипы брендов → прозрачные.
`0fde90b`/`7ab69a1` BrandStrip → белая полоса, размеры логотипов
откалиброваны по референсу. Полировка `e87657b`: SignatureServices тайтлы
карточек не обрезаются на мобиле (18px+min-h), ServiceHero — кремовый скрим
под текстом для читаемости.

**Проверено:** на 375/390/768 ноль элементов за краем на home/service(×2)/about/
contact/blog/blog-post; десктоп 1440 без регрессий.

**Метод тестирования:** node-скрипт сам спавнит `npm run preview` дочерним
процессом, поллит порт по http, делает скриншоты, убивает сервер. **Перед
preview ОБЯЗАТЕЛЬНО `npm run build`** (иначе нет `dist/` → ERR_CONNECTION_REFUSED).
DOM-диагностика overflow: элементы с `getBoundingClientRect().right > vw+1`.
Высокие fullPage-скриншоты даунскейлить PIL под лимит view (8000px). Playwright
ставить в КОРНЕ проекта (`npm i -D playwright`), скрипт держать там же (ESM не
резолвит из `/home/claude/`).

---

## СЛЕДУЮЩАЯ СЕССИЯ: мобильное меню (Вариант C, drill-down) — УТВЕРЖДЁН

**Контекст.** Текущее мобильное overlay-меню работает, но это десктопный
overlay, натянутый на тач: 3 заголовка-категории по центру + подменю
вываливается ниже всех трёх (теряется связь «категория→пункты»), нет
аффордансов кликабельности, золото-на-золоте без структуры, фон полупрозрачный
(страница просвечивает). Клиент выбрал **Вариант C — двухуровневый drill-down**
(как в нативных приложениях). Дизайн утверждён по интерактивному прототипу
(сессия 13; HTML-прототип отдан клиенту, в репо его нет — это была демка).

**Скоуп:** только мобильный путь (`< lg`). Десктопное overlay-меню НЕ трогать —
остаётся 1:1. Меняется `src/components/Header.astro` (мобильная ветка) + его
JS. Источник навигации — `src/data/navigation.ts` (3 группы: Wellness Services
10 пунктов, Aesthetic Services 2, About Us 3; + `bookingCta`).

**Поведение (утверждено клиентом):**
- Бургер → Level 1 (всегда с корня, последний раздел НЕ запоминаем).
- Level 1: 3 категории вертикально, крупно (`font-heading` ~32–36px), левое
  выравнивание, шеврон `›` справа, дивайдеры `border-gold/20`, тач-таргеты
  ≥44px. Сверху: лого слева + ✕ справа. CTA `BOOK APPOINTMENT` закреплён внизу.
- Тап категории → Level 2 **выезжает справа** (горизонтальный slide,
  ~.34s ease), Level 1 уходит влево (лёгкий параллакс).
- Level 2: top-bar меняется — слева `‹ Back`, справа ✕. Под баром
  **некликабельная** метка-заголовок раздела (uppercase, мелкая, трекинг), ниже
  пункты `font-sans` ~20px. CTA `BOOK APPOINTMENT` закреплён внизу И ТУТ (в один
  тап на обоих уровнях). Список скроллится (Wellness = 10 пунктов не влезает),
  top-bar и CTA — sticky; body scroll-lock.
- `‹ Back` → обратный slide на Level 1. **Свайп вправо** в зоне списка = тоже
  Back (включаем в v1). ✕ или `Esc` → закрыть (при след. открытии снова Level 1).
  Тап по пункту → переход + закрытие.
- **Current page:** пункт текущей страницы в Level 2 подсвечен (жирный + золотая
  точка `gold-bright`) + `aria-current="page"`. Сохранить существующую
  авто-логику определения текущей страницы из старого меню.

**Решённые вопросы (НЕ переспрашивать):**
1. CTA закреплён на ОБОИХ уровнях. 2. Заголовок раздела L2 — некликабельная
метка (у категорий нет своих лендингов). 3. Свайп-Back включаем в v1.
4. Анимация — горизонтальный slide (не fade).

**Визуал/бренд:** фон overlay непрозрачный золотой —
`radial-gradient(ellipse 70% 90% at 20% 35%, #f0eadc 0%, #ddc8a0 70%, #c9b187 100%)`
(как сейчас в Header, узел overlay-menu), `100dvh`. Цвета: gold `#8d7431`,
gold-bright `#d1a42b`, cream `#eae4d2`. Заголовки — Optima (self-hosted),
пункты/метки — Manrope.

**Доступность:** ✕/Back — настоящие `<button>` с `aria-label`; при drill-in
фокус → заголовок раздела (или первый пункт), при Back → категория-источник;
focus-trap пока меню открыто; `Esc` закрывает; `prefers-reduced-motion` → без
slide (мгновенно/fade). Уровни — состояние ОДНОГО overlay (не отдельные
страницы), URL не меняется.

**Тех-заметки для реализации:**
- Состояние: `menuOpen` + `activeCategory|null` (null=L1, иначе L2).
- Две панели (L1/L2) с `translate-x`; **у каждой панели НЕПРОЗРАЧНЫЙ фон**
  (тот же градиент), иначе во время slide они просвечивают друг через друга
  (это словили на прототипе).
- Гейт строго `< lg`; десктопные hover-зоны/sticky/`min-h-[489px]` и
  звезда-орнамент в мобильном пути не участвуют.
- Все три категории drill-down'ятся единообразно (включая Aesthetic из 2 и
  About из 3 пунктов) — паттерн предсказуемый.

**Проверка:** скриншоты L1 + L2 на 375/390 (+ desktop 1440 — убедиться, что
overlay-меню не тронуто), свайп/Back/Esc/focus вручную через Playwright.

---

## ВОЗМОЖНЫЕ НАПРАВЛЕНИЯ ПОСЛЕ МЕНЮ (фокус не зафиксирован)

1. **🔴 Trademark / лицензии изображений** — блокер запуска (см. ниже). Решение
   клиента/юриста, не код.
2. **Интеграции** — форма (`form-submission-endpoint`), newsletter, реальные URL
   соцсетей, ссылка на блог-пост. См. `docs/TODO-INVENTORY.md`.
3. **Контент-backlog:** на главной WhoWeAre у 3-го врача заглушка
   «OWNER & TBD TITLE» — нужна реальная должность. FAQ-тексты и YouTube-ссылки
   на exomind/hormone/emsculpt ждут клиента. Lorem в peptide (`data-todo="copy"`).
4. **Доп. полировка мобилы** — если клиент пройдётся по телефону и соберёт
   замечания.

**Рабочий процесс (важно — не меняется):**
- Linux-контейнер; клон в `/home/claude/ideal-website`. Сначала `git fetch` и
  сверка с реальным `origin/main` (пушит не только эта сессия). Деливери —
  git-патчи (`git format-patch --binary origin/main..HEAD`); пользователь
  применяет из `~/Downloads` через `git am --3way` и пушит. **Перед отдачей
  валидировать на чистом клоне:** `git am --3way` + `npm install` + `npm run build`.
- Локальный путь (macOS): `/Users/yuris/Documents/Claude-Projects/ideal-website`.
  Патчи в `~/Downloads`; напоминать удалять старые патчи.
- Локально незакоммиченные `privacy.astro`, `terms.astro`, `PolicyEmbed.astro`,
  `PolicyHero.astro` (untracked) — НЕ трогать. Дают 24 страницы вместо 22.
- Git identity на свежем клоне: `git config user.email claude@anthropic.com &&
  git config user.name Claude`.
- `/bin/sh` (не bash); pillow `pip install pillow --break-system-packages`;
  Figma-ассеты через `curl` (urllib даёт 0 байт), URL живут ~7 дней. Figma file
  key `jmzQqLFWpZXSII6xTkgCgu`, MCP подключён (инструменты через tool_search).

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
16. ~~**Контент для оставшихся draft-страниц услуг**~~ **✅ ВСЕ страницы сняты с draft (сессия 12).** Остаётся наполнить реальным копирайтом Lorem-тексты (см. блокер контента ниже) на peptide/ivtherapy/bloodwork/regenerative/sexualhealth/emsculpt/emsella/exomind/hormone/emface. Hormone/emsculpt (сессия 4), exomind (сессия 5), emface/emsella (сессия 6), peptide (сессия 8), ivtherapy/bloodwork (сессия 11) уже сняты с draft. Body-тексты на peptide/ivtherapy/bloodwork — Lorem с `data-todo="copy"` (ждут реального копирайта от клиента).
17. **Реальные blog-посты** — у меня 4 одинаковые placeholder-карточки. Нужны: тексты, фото, slugs
18. **Должность Laudin P.** — в Figma "Owner & TBD title"
19. **Финальный disclaimer** под формой подписки (сейчас Lorem Ipsum)
20. **Дубль на странице Contact** — в Figma 2 раза подряд "START YOUR WELLNESS TRANSFORMATION" (ContactHero + StartYourTransformation). Похоже на ошибку дизайна. Оставить дубль или убрать?
21. **Опечатки** из макета — **частично исправлены (сессия 12, по запросу клиента):**
    - ✅ `MENTALL WELLNESS` → `Mental Wellness`
    - ✅ `BOOK APPOIMENT` → `BOOK APPOINTMENT` (ещё раньше)
    - ✅ `teel` → `feel` (отзыв Emily R.)
    - ✅ `BOOD WORK` → `BLOOD WORK` (bloodwork WhatIs)
    - Других опечаток в макете на ревью не осталось.
22. **Layout Benefits Weight Loss** — в Figma 2 сверху + 3 снизу, у меня 3 + 2 (упрощённая сетка). Достаточно ли близко?

### 🟡 Структурные решения

23. ~~**5 страниц услуг со специфичной структурой** требуют отдельных шаблонов~~ **Решено (сессии 4-6):** все 5 покрыты ОДНИМ гибридным шаблоном `[slug].astro`, отдельные шаблоны НЕ понадобились:
    - `hormone` — "Common Signs" в 2 колонки списков вместо Benefits-карточек ✅
    - `emsculpt` — YouTube-видео + before/after + 3 категории сверху ✅
    - `exomind` — кастомные секции с устройством ✅
    - `emface` — 9 секций: 2 grid-сетки по 6, 2 видео, before/after (НЕ просто фото-сетка 3×2) ✅
    - `emsella` — WhatIs + 2 two-column секции + incontinence grid + Sexual Wellness (НЕ before/after) ✅
24. ~~**Sexual Health страница** — orphan, добавить в меню?~~ **✅ РЕШЕНО (сессия 12):** собрана, снята с draft, выведена в **Wellness Services** (как ранее regenerative). `orphanPages` пуст.
25. **Emsculpt дубликат в Wellness+Aesthetic** — оба пункта меню ведут на `/services/emsculpt`. Sub-nav сейчас подсвечивает Wellness (первый match). Если хочется иначе — добавить `data.preferredSection`
26. ~~**TrustBadges** (Google ★ + BusinessRate) — есть в Figma на главной, About, Contact, Blog. У меня сейчас только на главной. Вынести в переиспользуемый компонент~~ **Решено в сессии 2:** `src/components/TrustBadges.astro` подключён на главной (внутри Testimonials, `standalone={false}`) и на About / Contact / Blog (`standalone={true}`, белый фон + py-16).

26а. ~~**Прозрачность badge-PNG**~~ **✅ РЕШЕНО (сессия 12):** оба PNG перегнаны через edge-flood-fill, фон прозрачный, внутренние белые сохранены. Далее — историческое описание проблемы:

_(было)_ **Прозрачность badge-PNG** (новое, обнаружено в сессии 2): `badge-google-5star.png` сохранён в RGB-режиме с непрозрачным белым фоном, `badge-best-of-2025.png` — RGBA, но alpha=255. На белом фоне About/Contact/Blog незаметно, но **на cream-фоне Testimonials главной badges выглядят как white "stickers"** на бежевом — это видимо было и до сессии. Решения: (a) перегнать PNG через PIL, замазав чистый белый в alpha=0; (b) попросить клиента дать badges с прозрачным фоном; (c) принять как есть (возможно, это осознанный дизайн).

### 🔵 Интеграции (помечены `data-todo` в коде)

27. ~~**`booking-system`**~~ **✅ РЕШЕНО (сессия 12):** все CTA ведут на Boulevard-виджет `joinblvd.com/b/ideal-medical-and-wellness/widget#/visit-type` (новая вкладка). Источник — `bookingCta.href`.
28. **`form-submission`** — куда отправлять данные с формы главной и Contact?
29. **`newsletter-integration`** — Mailchimp / Klaviyo / ConvertKit?
30. ~~Cherry/Care Credit financing URLs~~ — **исключены из проекта** (сессия 7), в футере их нет.
31. **`social-url`** — реальные URL для Facebook / Instagram / YouTube (сессия 7: иконки в футере добавлены, ссылки пока `#`)
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
social-url                      — соцсети в Footer (FB / IG / YouTube), ссылки пока '#'
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

## Что делать в следующей сессии (сессия 11+)

### 🔴 ПРИОРИТЕТ №1 — сверить emsculpt / exomind / emface с Figma на пропущенные секции, видео и CTA

> **Прогресс сессии 11:** **exomind** проверен и исправлен — восстановлены 2 пропущенных CTA (`1:2907`, `1:2913`) через флаги `ctaBeforeConditionsList`/`ctaAfterVideo2`; изображения заменены реальными. **emsculpt** — изображения заменены, но при аудите найден **ещё не добавленный CTA `1:5573`** (после Before/After перед FAQ) — закрыть отдельным gate-флагом. **emface (`1:6536`) — НЕ проверен, остаётся за этим приоритетом.**

На **Emsella** дважды выяснилось (сессии 9-10), что общий шаблон
`[slug].astro` исторически расставлял CTA-баннеры и видео НЕ во всех
позициях, заданных в Figma: сначала не хватало 3 CTA «Book Appointment»,
потом — видео после сетки «What Emsella is for?». Сессия 11 подтвердила
тот же паттерн на exomind (2 CTA) и emsculpt (1 CTA). Это сильный сигнал, что
на остальных specialty-страницах (emface) возможны такие же пропуски.

**Что сделать (по каждой странице — emsculpt `1:5795`, exomind `1:3218`,
emface `1:6536`):**
1. `Figma:get_metadata` по узлу → выписать ПОЛНЫЙ порядок секций сверху
   вниз, включая все `BOOK APPOINTMENT`-кнопки и `Image 8x` (видео/баннеры).
2. Снять собранную страницу: `npx astro preview` + Playwright, вытащить
   `data-section` в DOM-порядке (паттерн из сессий 9-10 — см. ниже).
3. Сравнить два списка. Каждую недостающую CTA/видео/full-width картинку
   восстановить через уже существующие механизмы:
   - CTA — `<ServiceCTABand />` в нужной точке шаблона (гейтить по
     специфике страницы, чтобы не задеть другие — как сделано для emsella);
   - видео — `videoEmbed.position` (уже есть `late` / `after-first-grid`,
     при необходимости добавить новую позицию, default = текущее поведение);
   - full-width фото — `fullWidthImages[].position` (уже есть
     `after-gold-banner-1` / `after-common-signs`).
4. Любое новое поле схемы — ВСЕГДА optional с дефолтом = текущее поведение,
   чтобы не сломать другие 10 страниц. Проверять regression по `data-section`
   всех страниц (скрипт ниже выводит секции для emsculpt/emface/exomind разом).

Скрипт для снятия порядка секций (одним bash-вызовом, сервер живёт только
внутри вызова):
```bash
cd <repo> && npm run build && npx astro preview --port 4321 >/tmp/p.log 2>&1 &
PV=$!; for i in $(seq 1 25); do curl -sf localhost:4321/ >/dev/null && break; sleep 1; done
python3 - <<'EOF'
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page()
    for s in ['emsculpt','exomind','emface','emsella']:
        pg.goto(f'http://localhost:4321/services/{s}/',wait_until='load')
        print(s, pg.eval_on_selector_all("[data-section]","e=>e.map(x=>x.getAttribute('data-section'))"))
    b.close()
EOF
kill $PV
```

### ✅ Все 5 приоритетных specialty-страниц готовы (сессия 6 завершила)

emface + emsella сделаны в сессии 6, сняты с draft, **2 пункта меню больше
не ведут в 404**. Билд = **10 страниц**. Гибридный шаблон доказан на всех
пяти (hormone / emsculpt / exomind / emface / emsella) без единого
отдельного шаблона и без новых компонентов.

Расширения сессии 6 (всё опциональное, обратно совместимое):
- `categoriesGrids.items` max 4→6 (emface — две сетки по 6 ячеек).
- `beforeAfter.position` (`late` default | `after-video-1`) и
  `videoEmbed2.position` (`before-second-grid` default | `after-second-grid`)
  — emface переставляет before/after и второе видео в фиксированном порядке.
- Новое поле `twoColumnSections` (массив, позиции `after-whatis` /
  `after-categories-grid`) + расширенный `ServiceTwoColumnText`
  (опц. `heading`, `background`, per-column `image`/`imageAlt`) — emsella.
  Старый `twoColumnText` (объект, exomind/emface) НЕ тронут.
- ServiceWhatIs / ServiceTwoColumnText: одиночные `\n` внутри абзаца
  теперь рендерятся как `<br>` (для буллет-списков emface/emsella; на
  сплошные абзацы weight-loss/exomind/emsculpt не влияет — regression
  проверена визуально).

⚠️ Trademark (EMFACE/EMSELLA — BTL trademarks) требует авторизации от BTL
Industries — **блокер запуска, не блокер вёрстки**. Страницы собраны
макетно. На будущее закладываем `data-todo="trademark-authorization-from-btl"`.

⚠️ **Урок сессии 6:** HANDOFF-догадки о структуре страниц были неточны
(emface ≠ «фото-сетка 3×2»; у emsella нет before/after). **Всегда снимать
Figma-узел через `get_metadata` + `get_screenshot` ПЕРЕД оценкой объёма**,
а не доверять прошлым описаниям.

### Следующий приоритет — наполнение фото/контента (требует клиента)

Все 5 specialty-страниц (включая emface/emsella) сейчас на
**семантически именованных placeholder-WebP** — клиент заменяет файлы, не
трогая markdown. Также от клиента: FAQ-тексты (везде Lorem ipsum), YouTube
URL (emsculpt `videoEmbed`, exomind/emface `videoEmbed*.url` пустые),
реальные фото.

### Технический долг по гибридному шаблону (сессии 4-7)

1. ~~**Звёзды на specialty-страницах**~~ **Решено (сессия 7).** Gold star-sign
   добавлены на все 5 specialty-страниц через opt-in. Подход A (как
   договорились): новое опц. поле `stars` (объект флагов: hero, twoColumnText,
   commonSigns, categoriesGrid, conditionsList, roadmap, whyTrust, experience,
   все default false) + per-block флаг `star` на `textWithPhotoBlocks[]`
   (нужен, потому что у exomind два before-conditions блока, а звезда только
   на «How Works»). Компоненты получили опц. проп `showStar`, 3 стиля по
   Figma: блочный слева под lead (Hero); по центру над заголовком
   (CommonSigns, Roadmap); top-right колонки через flex (TextWithPhoto,
   WhyTrust, Experience). Карта: hormone 6 звёзд, exomind 2, emsculpt/emface/
   emsella по 1 (hero). Weight Loss — 0 (regression проверена по HTML +
   скриншотам). `Image 81` (1737,942) на всех страницах — декор в header-зоне,
   не привязан к секции, не добавляли (как и на главной).
2. ~~**Футер vs Figma**~~ **Решено (сессия 7).** star-sign под лого + соцсети
   FB/IG/YouTube в Address. Cherry/CareCredit исключены, email-поле оставлено
   (см. секцию «Сессия 7»).
3. **Опциональный CTA-баннер** между секциями (exomind 1:2913) — опц. поле,
   чтобы BOOK APPOINTMENT мог стоять в произвольной позиции. НЕ начато.

### Альтернативы (без клиента) — ГЛАВНЫЙ незакрытый долг

- **A11y color-contrast (#37) — самый крупный оставшийся пункт.** gold
  #8d7431 на cream #eae4d2 = 3.54:1 при норме AA 4.5:1. Затемнить gold до
  ~#7a6428 в `tailwind.config.mjs` и визуально сверить ВСЕ 10 страниц
  (риск — gold-на-gold баннеры/сетки могут просесть, нужна попиксельная
  проверка).
- **Адаптив (mobile)** — клиент сказал, что мобильную версию делаем САМИ,
  макетов ждать НЕ нужно (зафиксировано в сессии 5). Все компоненты на
  `grid-cols-1 lg:grid-cols-2`, базовое поведение работает, но без точной
  выверки. Это наша задача, а не «ждёт макетов».
- **Соцсети-иконка Instagram** на 44px чуть бледнее FB/YouTube (тонкие
  контуры). Узнаваема; при желании клиента — заменить на залитый glyph.
- **Чистка `data-todo`** (см. `docs/TODO-INVENTORY.md`).

### Альтернативы (требуют клиента)

- **Реальные фото для всех 5 specialty-страниц** — сейчас placeholder-WebP
  с семантическими именами. Просто заменить файлы, .md не трогать.
- **FAQ-тексты** для всех 5 specialty + Weight Loss — сейчас Lorem ipsum.
- **YouTube URL**: emsculpt (`videoEmbed.url`), exomind (`videoEmbed.url` +
  `videoEmbed2.url`), emface (`videoEmbed*.url`) — пустые.
- **URL соцсетей** в футере (FB/IG/YouTube) — placeholder `#`,
  `data-todo="social-url"`.
- **Реальные blog-посты** + Content Collection 'posts' + `/blog/[slug]`.
- **Замена stock-фото на главной** (doTERRA, istockphoto watermarks, BTL).
- **Booking / Form / Newsletter** интеграции.

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
> Состояние проекта описано в `docs/HANDOFF.md` — прочитай его перед тем как что-то делать. Особенно верхний callout, раздел **«Главная — подгонка под Figma»** и **«СЛЕДУЮЩАЯ СЕССИЯ: меню/навигация»**.
>
> **ФОКУС ЭТОЙ СЕССИИ: меняем МЕНЮ / навигацию.** Я скажу, что именно нужно поменять — сначала спроси меня про конкретику (структура пунктов? порядок? новый раздел? десктопный вид? поведение мобильного drill-down?), не предполагай.
>
> Контекст меню: источник навигации — `src/data/navigation.ts` (3 группы: Wellness Services 10, Aesthetic Services 2, About Us 4 + `bookingCta`; единый источник и для Header, и для sitemap). Вёрстка/логика — `src/components/Header.astro` (~700 строк): десктоп-overlay (`≥ lg`, 1:1 по Figma, не трогать без нужды) + мобильное drill-down меню «Вариант C» (`< lg`, сделано в сессии 14). Доп. контекст — `docs/site-navigation.md`. Менять СТРУКТУРУ — в `navigation.ts`; менять ВИД/ПОВЕДЕНИЕ — в `Header.astro` (аккуратно с обоими брейкпоинтами, не сломать ни десктоп, ни мобайл).
>
> ⚠️ **Синхронизация с origin:** работа через git-патчи, которые я применяю локально (`git am --3way`) и пушу сам. Перед стартом: `git fetch` + `git log --oneline -3`, сверь с реальным `origin/main` (пушит не только эта сессия). Генерируй патчи против РЕАЛЬНОГО состояния origin; в контейнере задай git identity. Последняя серия патчей по главной — 0001–0014 (применены/запушены); новые патчи продолжай с номера, следующего за тем, что реально на origin.
>
> Что готово: главная + все 11 specialty-страниц + блог (`/blog` + статьи) + About/Contact/Glossary. Мобильный адаптив + drill-down меню сделаны. SEO-фундамент (JSON-LD, OG, canonical, sitemap, favicon). Главная финально выровнена по Figma (последняя сессия). Билд = **25 страниц**. Деплой — Cloudflare Pages.
>
> Прежде чем менять меню — спроси меня про конкретику и проверь оба брейкпоинта (≥lg overlay и <lg drill-down) скриншотами. Другие открытые направления (если зайдёт речь) — формы→backend, лицензии фото (Signature низкого разрешения, hero-watermark), редполис/комплаенс LegitScript, мобильная полировка — описаны ниже в этом файле.
>

>
> **Без клиента (можем делать сразу):**
> - **Приоритет №1 выше — сверка emsculpt/exomind/emface.**
> - **A11y color-contrast (#37):** gold `#8d7431` на cream `#eae4d2` = 3.54:1, норма AA 4.5:1. Затемнить gold до ~`#7a6428` в `tailwind.config.mjs`, затем визуально сверить ВСЕ страницы (9 specialty + блог + статика = 20; риск — gold-на-gold баннеры). Самый крупный незакрытый технический долг.
> - **Мобильная адаптация — делаем САМИ (НЕ ждём макетов!),** решение клиента (сессия 5). Все компоненты на `grid-cols-1 lg:grid-cols-2`, базовое поведение работает, нужна точная выверка.
> - Чистка `data-todo`-маркеров (см. `docs/TODO-INVENTORY.md`).
>
> **Требует клиента (нельзя завершить без данных):**
> - Body-тексты **Peptide / IV Therapy / Blood Work** — Lorem с `data-todo="copy"` (заголовки и 9 benefit-названий уже реальные).
> - FAQ-тексты (везде Lorem ipsum) — все specialty + Weight Loss.
> - YouTube URL: emsculpt (`videoEmbed.url` — постер уже реальный), exomind (2 видео-постера реальные)/emface (`videoEmbed*.url`), **emsella (`videoEmbed.url`)** — пустые, плашка «Video coming soon».
> - Реальные фото там, где ещё placeholder: **emface** (emsculpt/exomind заменены в сессии 11). ⚠️ Фото ivtherapy/bloodwork — stock (istock/Unsplash), лицензии под вопросом. URL соцсетей в футере (`data-todo="social-url"`).
> - **Блог: ✅ сделан** (сессия 11, параллельно) — коллекция `posts`, 7 статей, `/blog` + `/blog/[slug]`. Остаётся проверить лицензии блог-изображений.
> - Booking / Form / Newsletter интеграции.
>
> ⚠️ **Trademark** (EMFACE/EMSELLA — BTL trademarks) требует авторизации от BTL Industries — блокер **запуска**, не вёрстки.
>
> Figma file: jmzQqLFWpZXSII6xTkgCgu (Figma MCP подключён). nodeId страниц: hormone=1:3708, emsculpt=1:5795, exomind=1:3218, emface=1:6536, emsella=1:5436, peptide=1:5026 (главный фрейм 1:3815), weight-loss=1:1919.
>
> ⚠️ **Ловушка с ассетами** (баг из сессии 2): добавляя НОВЫЕ фото, проверь что в коммит попадает и удаление PNG/JPG, и добавление WebP. Контроль: каждый `/assets/images/.*\.webp` из `grep -rE src/` должен резолвиться на диск. (В сессиях 8-10 были in-place замены существующих WebP — удалений PNG не требовалось.)
>
> ⚠️ **Метод извлечения изображений из Figma (сессии 8-10):** `Figma:get_design_context(excludeScreenshot=true)` на узле-контейнере → возвращает asset URL для `<img src>` (НЕ маску) → `curl` → cover-crop под пропорции слота → WebP quality 82 method 6. Иконки 9 шт можно брать по одной (по asset-URL). Для сложных SVG-групп — `get_screenshot(contentsOnly=true)` либо композит вручную (так собирался hero Peptide).
>
> ⚠️ **Превью-сервер в контейнере умирает между tool-вызовами** — для скриншотов запускай `npx astro preview` + Playwright в ОДНОМ bash-вызове, со скроллом по странице для триггера lazy-load изображений (иначе фото ниже фолда не прорисуются — ложная тревога в сессии 8).
>
> ⚠️ **Патчи:** генерируй через `git format-patch --binary origin/main..HEAD` (для WebP-бинарников), проверяй на чистом клоне через `git am --3way` + `npm run build` перед отдачей. Не загрязняй `package.json`/`package-lock.json` (playwright/pillow ставятся только в env контейнера).
>
> 💡 **Гибридный шаблон — как добавлять/менять specialty-страницу:**
> 1. `Figma:get_metadata` + `get_screenshot` для nodeId — СНАЧАЛА сними узел, не доверяй догадкам (урок сессии 6: emface оказалась не «сеткой 3×2», а 9 секциями; emsella — без before/after).
> 2. Сверить, какие из ~21 компонентов в `src/components/services/` подходят.
> 3. Если всё покрывается — только заполнить .md, снять `draft: false`.
> 4. Если нет — добавить компонент + поле в schema (ВСЕГДА optional, с дефолтом = текущее поведение, чтобы не сломать другие страницы) + условный рендер в `[slug].astro` (порядок секций фиксированный).
> 5. ⚠️ Позиционные поля (`videoEmbed.position`, `videoEmbed2.position`, `beforeAfter.position`, `fullWidthImages[].position`, `twoColumnSections[].position`) и per-block флаги (`textWithPhotoBlocks[].star`, `stars.*`) — основной паттерн для повторяющихся секций с разным поведением на разных страницах. gold-баннеры разведены на 3 поля (`midGoldBanner1/2`, `goldBanner`) — НЕ объединять.
>
> Спроси меня, по какой дорожке двигаемся, прежде чем начинать работу.