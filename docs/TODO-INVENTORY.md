# TODO Inventory — что нужно от клиента

Документ собирает в одном месте все маркеры `data-todo` в коде сайта
и переводит их в **конкретные вопросы клиенту** с примерами ожидаемых ответов.

После получения ответов: открыть документ, пройти по списку, заменить
placeholder в соответствующем файле, удалить или обновить `data-todo`.

> **Как найти все TODO в коде:** `grep -rn 'data-todo' src/`

---

## 🔴 БЛОКЕРЫ ЗАПУСКА (нельзя выводить в продакшен без решения)

### License / Trademark

| TODO-маркер | Где (файлы) | Что нужно от клиента |
|---|---|---|
| `image-license-check` | `AboutHero.astro`, `BlogHero.astro` | См. HANDOFF #1-9: подписка Unsplash+ или замена hero-фото. На About hero видно лого doTERRA — заменить обязательно. |
| `trademark-review` | `BrandStrip.astro` (главная) | Письменное разрешение Novo Nordisk на Ozempic® и Eli Lilly на Mounjaro®. Либо убрать логотипы и оставить текстом. |

**Также вне маркеров (но в HANDOFF):** EMFACE/EMSCULPT/EMSELLA/EXOMIND — BTL trademarks, нужна авторизация.

---

## 🟠 СЕРЬЁЗНЫЕ РИСКИ (можно запустить, но в идеале решить до публикации)

### Trust Badges

| TODO-маркер | Где | Вопросы |
|---|---|---|
| `trust-badges-verify-with-client` | `TrustBadges.astro` | 1. Реален ли рейтинг 5★ на Google Maps для клиники? 2. Настоящая ли награда "Best of 2025 BusinessRate"? Есть ли разрешение использовать? |

### Контент

| TODO-маркер | Где | Что прислать |
|---|---|---|
| `team-title-laudin` | `WhoWeAre.astro` | Должность Laudin P. (в Figma "Owner & TBD title") |
| `blog-content-from-client` | `BlogGrid.astro` | Реальные блог-посты: тексты + фото + slugs для URL. Минимум 4 шт, чтобы заполнить сетку. |
| `blog-post-link` | `BlogPostCard.astro` | URL для карточек блога — сейчас `#`. Будут готовы после получения постов. |
| `faq-answer-from-client` (динамически) | `ServiceFAQ.astro` для Weight Loss | 5 ответов на FAQ — см. HANDOFF #15: How Much Does Medical Weight Loss Cost? Why is it important... Once I lose... How can I choose... What side effects... |
| `faq-answer-from-client` | `hormone.md` faq | 5 вопросов+ответов FAQ для hormone (в Figma Lorem Ipsum, реальный текст не предоставлен). |
| `faq-answer-from-client` | `emsculpt.md` faq | 5 вопросов+ответов FAQ для emsculpt (в Figma Lorem Ipsum, реальный текст не предоставлен). |
| `video-from-client` | `ServiceVideoEmbed.astro` (emsculpt) | YouTube URL для видео на emsculpt-странице. Положить в `emsculpt.md` → `videoEmbed.url`. |
| `replace-lorem-ipsum-disclaimer` | `StartYourTransformation.astro` | Текст финального дисклеймера под формой подписки (сейчас Lorem Ipsum) |

### Фото для страниц услуг (placeholders, заменить когда придут реальные)

После сессии 4 в `public/assets/images/services/hormone/` и `emsculpt/` лежат 14
файлов-копий из weight-loss. Имена семантические — просто заменить файлы.

| Папка | Файлы | Что должно быть |
|---|---|---|
| `services/hormone/` | `hero.webp` | Hero-фото 1920×814: пациент, BHRT-вибрант (в Figma — istockphoto-2183708457). |
| `services/hormone/` | `what-is.webp` | Фото для "What is BHRT?" — пузырьки/пеллеты (Figma — julia-koblitz-...). |
| `services/hormone/` | `reclaiming-yourself.webp` | Мужчина в кабинете врача (Figma — узел 1:3380 rs=w_1200). |
| `services/hormone/` | `why-trust-team.webp` | Команда клиники Ideal Medical (Figma — узел 1:3389). |
| `services/hormone/` | `experience-dna.webp` | Тёмное фото DNA-нити (Figma — anirudh-YQYacLW8o2U-unsplash). |
| `services/emsculpt/` | `hero.webp` | Hero-фото с устройством Emsculpt на торсе (Figma — Emsculpt_Neo_PIC_Male-Model_4653_EN100, BTL marketing asset). |
| `services/emsculpt/` | `category-{body-sculpting,functional-wellness,core-to-floor}.webp` | 3 фото для "WHAT EMSCULPT NEO IS FOR" — BTL marketing assets. |
| `services/emsculpt/` | `applicator-{large,edge,small}.webp` | 3 фото аппликаторов — BTL marketing assets. |
| `services/emsculpt/` | `before-1.webp`, `after-1.webp` | Реальные до/после-кадры (Figma — placeholder Image 90). |

---

## 🟡 РЕШЕНИЯ ОТ КЛИЕНТА (выбор как сделать)

### Опечатки из Figma

В дизайне есть три опечатки, оставлены как в макете. Фиксить или оставить?

| TODO-маркер | Где | Опечатка |
|---|---|---|
| `typo-mentall` | `AdvancedTreatments.astro` | "MENTALL WELLNESS" (двойная L) |
| `typo-teel-vs-feel` | `Testimonials.astro` (Emily R.) | "teel more in control" → должно быть "feel" |
| (без маркера) | `StartYourTransformation.astro` строка 159 | "BOOK APPOIMENT" → должно быть "APPOINTMENT" |

**Рекомендация:** все три — явные опечатки, фиксить. Но это решение клиента.

### Структура

| TODO-маркер | Где | Вопрос |
|---|---|---|
| `duplicate-section-confirm-with-client` | `contact.astro` | В Figma на /contact дважды подряд показан "Start Your Wellness Transformation" блок. Это ошибка дизайна? Убирать дубль? |
| `confirm-map-coordinates` | `StartYourTransformation.astro` | Google Maps embed — координаты Aventura, FL 33180 верные? Точный адрес: 2999 NE 191 Street. |

---

## 🔵 ИНТЕГРАЦИИ (требуют выбора сервиса)

Все эти кнопки/формы сейчас ведут на `#` или не отправляют данные. Нужны решения какой сервис подключаем + креденшелы.

| TODO-маркер | Сервис | Кол-во точек интеграции |
|---|---|---|
| `booking-system` | Calendly / NexHealth / Mindbody / другое? | 6+ кнопок BOOK APPOINTMENT/NOW на разных страницах |
| `form-submission-endpoint` | Куда POST форма "Start Your Transformation"? | 2 формы (главная + Contact дубль) |
| `form-submission` | Куда POST форма ContactHero? | 1 форма на /contact |
| `newsletter-integration` | Mailchimp / Klaviyo / ConvertKit? | 1 форма в Footer |
| `cherry-financing-url` | Реальный URL партнёрской программы Cherry | 1 ссылка в Footer Quick Links |
| `care-credit-url` | Реальный URL Care Credit | 1 ссылка в Footer Quick Links |
| `social-icon` | Какие соцсети (Instagram, Facebook, TikTok)? URL? | 1 placeholder-круг в Footer (нужен список соцсетей с иконками) |

**Подсказка для клиента про booking system:**
- Calendly — самый простой, бесплатный для одного человека. Нет интеграции с медкартами.
- NexHealth — заточен под медицину, интеграция с EHR (Athena/Dentrix/etc), платный.
- Mindbody — больше для spa/fitness, дороже.
- Решение зависит от того, есть ли уже EHR-система у клиники.

---

## ⚪ ТЕХНИЧЕСКИЕ TODOs (мои, не клиентские)

| Что | Файл | Когда делать |
|---|---|---|
| Подставить реальный `*.pages.dev` URL в `site` | `astro.config.mjs` | После первого деплоя на Cloudflare |
| Подставить кастомный домен в `site` | `astro.config.mjs` | После выдачи домена клиентом и привязки в CF |
| A11y color-contrast: gold #8d7431 на cream #eae4d2 даёт 3.54:1 (нужно 4.5:1 для AA) | tailwind.config.mjs | Решение клиента + дизайнера: затемнить gold или принять 96 в Lighthouse |
| Прозрачность badge-PNG | `public/assets/images/badge-*.png` | См. HANDOFF #26а |
| Migrate `<img>` на `<Image>` из Astro для responsive + AVIF | компоненты с фото | Optional оптимизация, текущий Lighthouse уже 95+ |
| Удалить папку `dist/figma-refs/` если она когда-нибудь вернётся в `public/` | — | Уже удалена в сессии 2 |

---

## Текущий счёт

- 🔴 Блокеры: 2 категории (фото, trademarks) + ~14 пунктов в HANDOFF #1-12
- 🟠 Серьёзные: 6 пунктов
- 🟡 Решения: 5 пунктов (3 опечатки + 2 структурных)
- 🔵 Интеграции: 7 сервисов / URL
- ⚪ Технические: 5 пунктов

**Большинство блокеров требуют ответа клиента или дизайнера.** Без этих ответов дальнейшая работа на сайте упирается в потолок. См. HANDOFF секцию "Что делать в следующей сессии" — после получения ответов это перейдёт в дорожку Б.
