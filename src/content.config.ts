import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Services collection — содержит контент страниц услуг.
 *
 * Схема построена по модели "общий базовый набор + опциональные специфичные секции",
 * чтобы один шаблон `src/pages/services/[slug].astro` мог отрисовать страницы
 * разной структуры (эталон Weight Loss / hormone / emsculpt и т.д.).
 *
 * Общая идея: ВСЕ поля кроме Hero и базовых meta-полей — опциональны. Каждая
 * секция рендерится в шаблоне условно: `{data.benefits && <ServiceBenefits ... />}`.
 *
 * Группы полей:
 *
 *   [REQUIRED] seo*, hero* — нужны всем страницам услуг
 *   [OPT] whatIs*           — секция "What is X?" (Weight Loss формат: фото + текст)
 *   [OPT] simpleWhatIs      — короткий вариант "What is X?" БЕЗ фото (emsculpt)
 *   [OPT] benefits*         — сетка карточек преимуществ (Weight Loss)
 *   [OPT] whoFor*           — секция "Who is X for?" с фото+буллетами (Weight Loss)
 *   [OPT] commonSigns       — 2x3 grid признаков / симптомов (hormone)
 *   [OPT] extendedDescription — большой текстовый блок без фото (emsculpt "MORE FOR LESS")
 *   [OPT] categoriesGrid    — 3-колонная сетка фото+заголовок+текст
 *                              (emsculpt — используется дважды: "What is For" и "Customize")
 *   [OPT] videoEmbed        — YouTube embed (emsculpt)
 *   [OPT] beforeAfter       — галерея до/после (emsculpt)
 *   [OPT] roadmap           — двухколоночный список шагов (hormone "From Symptom to Solution")
 *   [OPT] whyTrust          — текст + фото команды (hormone)
 *   [OPT] goldBanner        — full-width gold-баннер с цитатой (hormone)
 *   [OPT] experience        — DNA-секция: фото + текст + телефон + CTA (hormone)
 *   [OPT] results*          — секция The Results (Weight Loss)
 *   [OPT] faq               — аккордеон FAQ (на gold-фоне)
 *
 * Поле `sectionOrder` опционально определяет порядок секций; если не задан,
 * шаблон рендерит секции в "стандартном" порядке (см. [slug].astro).
 */
/**
 * Posts collection — блог-статьи (/blog/[slug]).
 *
 * Контент импортирован со старого WordPress-сайта idealmedwell.com.
 * Тело статьи — в Markdown под frontmatter (рендерится через entry.render()).
 * Изображения лежат в /public/assets/images/blog/<slug>/ и ссылаются
 * абсолютным путём (heroImage + inline ![]() в теле).
 *
 *   sourceUrl / relativePath — сохранены для canonical и возможных 301-редиректов
 *   со старых URL (см. инструкцию переноса).
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    /** Заголовок поста (H1 + meta title) */
    title: z.string(),
    /** Краткое описание — превью в сетке блога и meta description */
    description: z.string(),
    /** Hero-изображение, абсолютный путь в /public */
    heroImage: z.string(),
    heroImageAlt: z.string(),
    /** Оригинальный URL статьи на старом сайте (для canonical/редиректов) */
    sourceUrl: z.string().optional(),
    /** Относительный путь статьи на старом сайте */
    relativePath: z.string().optional(),
    /** Дата публикации (опционально) */
    publishDate: z.coerce.date().optional(),
    /** Если true — пост исключён из сборки */
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      // ===== REQUIRED =====
      /** Заголовок страницы в meta */
      seoTitle: z.string(),
      /** Description в meta */
      seoDescription: z.string(),
      /** Заголовок в Hero — может быть многострочным (\n) */
      heroTitle: z.string(),
      /** Подзаголовок-параграф под H1 в Hero */
      heroLead: z.string(),
      /** Путь к hero-фото в /public/ (например, /assets/images/services/weight-loss/hero.webp) */
      heroImage: z.string(),
      /** Alt для hero image */
      heroImageAlt: z.string(),

      // ===== "What is X?" (Weight Loss формат) =====
      whatIsTitle: z.string().optional(),
      whatIsImage: z.string().optional(),
      whatIsImageAlt: z.string().optional(),
      /** Длинный текстовый блок справа. Многоабзацный (\n\n). */
      whatIsBody: z.string().optional(),

      // ===== "What is X?" короткий вариант БЕЗ фото (emsculpt) =====
      simpleWhatIs: z
        .object({
          title: z.string(),
          body: z.string(),
        })
        .optional(),

      // ===== Большой текстовый блок описания (emsculpt "MORE FOR LESS") =====
      extendedDescription: z
        .object({
          title: z.string(),
          body: z.string(),
        })
        .optional(),

      // ===== Benefits (Weight Loss + Peptide) =====
      // Weight Loss: 3-6 карточек icon + title + description (текст под заголовком).
      // Peptide (узлы Figma 1:3875 + 1:3944-3977): 9 элементов icon + title БЕЗ
      //   description, сетка 3x3 на gold-gradient. Для этого:
      //     - description сделан optional (icon-only режим)
      //     - max поднят до 9
      //     - benefitsIconOnly: true переключает компонент в режим icon+title
      //       (без интро-параграфа места под description, плотнее grid).
      //   Дефолт benefitsIconOnly не задан → текущее поведение Weight Loss.
      benefitsTitle: z.string().optional(),
      benefitsIntro: z.string().optional(),
      /** true → режим Peptide: icon + title (без description), сетка 3x3. */
      benefitsIconOnly: z.boolean().default(false).optional(),
      benefits: z
        .array(
          z.object({
            title: z.string(),
            description: z.string().optional(),
            icon: image(),
            iconAlt: z.string().default(''),
          })
        )
        .min(3)
        .max(9)
        .optional(),

      // ===== Who is For (Weight Loss) =====
      whoForTitle: z.string().optional(),
      whoForImage: z.string().optional(),
      whoForImageAlt: z.string().optional(),
      whoForLead: z.string().optional(),
      whoForBullets: z.array(z.string()).min(2).max(8).optional(),

      // ===== Common Signs grid (hormone): 2x3 с заголовком + текстом =====
      commonSigns: z
        .object({
          title: z.string(),
          intro: z.string(),
          items: z
            .array(
              z.object({
                title: z.string(),
                body: z.string(),
              })
            )
            .min(4)
            .max(8),
        })
        .optional(),

      // ===== Text + Photo универсальный блок (hormone "Reclaiming Yourself") =====
      // Массив, потому что на странице может быть несколько таких блоков
      // на разных позициях. Сам порядок определяется в [slug].astro через
      // `position`, где блок должен встать.
      //
      // Опциональные поля bullets/bulletStyle/tail (exomind HOW WORKS, WHY CHOOSE):
      //   - bullets: список пунктов под body
      //   - bulletStyle: 'dash' (—) или 'number' (1./2./3.); default 'dash'
      //   - tail: текст-параграф после буллетов (заключение)
      textWithPhotoBlocks: z
        .array(
          z.object({
            title: z.string(),
            body: z.string(),
            image: z.string(),
            imageAlt: z.string(),
            imageSide: z.enum(['left', 'right']).default('right'),
            bullets: z.array(z.string()).optional(),
            bulletStyle: z.enum(['dash', 'number']).default('dash').optional(),
            tail: z.string().optional(),
            /** Показать gold-звезду top-right у заголовка блока (per-block) */
            star: z.boolean().default(false).optional(),
            /** В каком месте шаблона показать блок.
             *  'before-common-signs' — между whatIs и commonSigns
             *  'after-roadmap'        — после roadmap, перед whyTrust
             *  'before-conditions'    — после first gold banner / fullWidthImage,
             *                            перед conditionsList (exomind) */
            position: z.enum([
              'before-common-signs',
              'after-roadmap',
              'before-conditions',
            ]),
          })
        )
        .optional(),

      // ===== Two-column text (exomind WHAT IS + WHO IS A GOOD CANDIDATE) =====
      // Два независимых текстовых блока (title + body/bullets/tail) рядом.
      twoColumnText: z
        .object({
          left: z.object({
            title: z.string(),
            body: z.string().optional(),
            bullets: z.array(z.string()).optional(),
            tail: z.string().optional(),
          }),
          right: z.object({
            title: z.string(),
            body: z.string().optional(),
            bullets: z.array(z.string()).optional(),
            tail: z.string().optional(),
          }),
        })
        .optional(),

      // ===== Two-column SECTIONS (emsella) =====
      // В отличие от единичного twoColumnText (объект, exomind/emface),
      // это МАССИВ двухколоночных секций для страниц, где их несколько и/или
      // нужны фото над колонками + общий заголовок секции. Старое поле
      // twoColumnText не трогаем — обратная совместимость.
      //
      // emsella использует две такие секции:
      //   1) position 'after-whatis'   — "What to Expect" / "Book Your Treatment"
      //      (фон cream, без фото, без heading)
      //   2) position 'after-categories-grid' — "Emsella for Sexual Wellness"
      //      (heading сверху + фото над каждой колонкой WOMAN / MAN)
      twoColumnSections: z
        .array(
          z.object({
            /** Опциональный общий заголовок над обеими колонками */
            heading: z.string().optional(),
            background: z.enum(['cream', 'gold']).default('cream'),
            position: z.enum(['after-whatis', 'after-categories-grid']),
            left: z.object({
              title: z.string(),
              body: z.string().optional(),
              bullets: z.array(z.string()).optional(),
              tail: z.string().optional(),
              /** Опц. фото над колонкой (emsella Sexual Wellness) */
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
            right: z.object({
              title: z.string(),
              body: z.string().optional(),
              bullets: z.array(z.string()).optional(),
              tail: z.string().optional(),
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
          })
        )
        .optional(),

      // ===== Full-width image (exomind: фото устройства TMS) =====
      fullWidthImages: z
        .array(
          z.object({
            image: z.string(),
            imageAlt: z.string(),
            todo: z.string().optional(),
            /** Где в шаблоне вставить:
             *  'after-gold-banner-1'  — между первым GoldBanner и TextWithPhoto(before-conditions) (exomind)
             *  'after-common-signs'   — между Common Signs и Roadmap (hormone, узел Figma 1:3462) */
            position: z.enum(['after-gold-banner-1', 'after-common-signs']),
          })
        )
        .optional(),

      // ===== Conditions list (exomind: WHAT CAN EXOMIND IMPROVE?) =====
      conditionsList: z
        .object({
          title: z.string(),
          items: z.array(z.string()).min(2).max(20),
        })
        .optional(),

      /** Standalone CTA-баннеры «BOOK APPOINTMENT» в позициях, которые не
       *  покрыты дефолтным шаблоном. Оба default false → другие страницы не
       *  затрагиваются. Сейчас используются на exomind, где в Figma (1:3218)
       *  есть CTA, которых не расставлял общий шаблон:
       *    - ctaBeforeConditionsList — Figma 1:2907 (перед «What can ExoMind improve?»)
       *    - ctaAfterVideo2          — Figma 1:2913 (после видео #2, перед gold-banner #2) */
      ctaBeforeConditionsList: z.boolean().default(false),
      ctaAfterVideo2: z.boolean().default(false),

      // ===== Categories Grid (emsculpt): 3-колонная сетка фото+заголовок+опционально-текст =====
      // Используется дважды на странице emsculpt — поэтому в frontmatter массив таких блоков.
      categoriesGrids: z
        .array(
          z.object({
            /** Опциональный заголовок над сеткой ("WHAT EMSCULPT NEO IS FOR" / "CUSTOMIZE YOUR TREATMENT") */
            title: z.string().optional(),
            /** Фон: cream (default) или gold */
            background: z.enum(['cream', 'gold']).default('cream'),
            items: z
              .array(
                z.object({
                  title: z.string(),
                  /** Опционально: описание под заголовком */
                  body: z.string().optional(),
                  image: z.string(),
                  imageAlt: z.string(),
                })
              )
              .min(2)
              .max(6),
          })
        )
        .optional(),

      // ===== YouTube Video Embed (emsculpt) =====
      videoEmbed: z
        .object({
          /** Полный URL YouTube-видео или embed URL. Пока placeholder, ждём от клиента. */
          url: z.string().optional(),
          /** Постер до загрузки видео (опционально) */
          posterImage: z.string().optional(),
          posterAlt: z.string().default('Video preview'),
          /** Где рендерить относительно categories-grid / two-col:
           *  'late' (default) — текущее поведение (emsculpt/emface/exomind):
           *    после twoColAfterGrid.
           *  'after-first-grid' — emsella: сразу ПОСЛЕ первой categories-grid
           *    (incontinence), перед CTA и Sexual Wellness (Figma 1:5400). */
          position: z
            .enum(['late', 'after-first-grid'])
            .default('late')
            .optional(),
        })
        .optional(),

      /** Второй YouTube video — exomind использует два встроенных видео.
       *  Та же схема, что videoEmbed.
       *  position управляет местом рендера относительно secondCategoriesGrid:
       *    'before-second-grid' (default) — текущее поведение (exomind: грида нет, неважно)
       *    'after-second-grid'  — emface: video2 идёт ПОСЛЕ treatments-grid, перед FAQ */
      videoEmbed2: z
        .object({
          url: z.string().optional(),
          posterImage: z.string().optional(),
          posterAlt: z.string().default('Video preview'),
          position: z
            .enum(['before-second-grid', 'after-second-grid'])
            .default('before-second-grid'),
        })
        .optional(),

      // ===== Before / After Gallery (emsculpt) =====
      beforeAfter: z
        .object({
          title: z.string().optional(),
          /** Где рендерить относительно secondCategoriesGrid:
           *    'late' (default) — emsculpt: после secondGrid (текущее поведение)
           *    'after-video-1'  — emface: сразу после videoEmbed, перед treatments-grid */
          position: z.enum(['late', 'after-video-1']).default('late'),
          items: z
            .array(
              z.object({
                /** Режим «одна композит-картинка» (emsculpt: узел Figma 1:5559 —
                 *  готовый кадр BEFORE | AFTER с впечатанными подписями и caption).
                 *  Если задан `image`, рендерится одно фото во всю ширину БЕЗ
                 *  накладных бейджей и без отдельного caption. */
                image: z.string().optional(),
                /** Классический режим «два фото бок-о-бок» (компонент сам рисует
                 *  бейджи Before/After). Используется, если `image` не задан. */
                beforeImage: z.string().optional(),
                afterImage: z.string().optional(),
                caption: z.string().optional(),
                alt: z.string().default('Before and after treatment'),
              })
            )
            .min(1)
            .max(8),
        })
        .optional(),

      // ===== Roadmap (hormone): 2 колонки шагов =====
      roadmap: z
        .object({
          title: z.string(),
          intro: z.string(),
          items: z
            .array(
              z.object({
                title: z.string(),
                body: z.string(),
              })
            )
            .min(2)
            .max(8),
        })
        .optional(),

      // ===== Why Trust (hormone): текст + фото команды =====
      whyTrust: z
        .object({
          title: z.string(),
          body: z.string(),
          image: z.string(),
          imageAlt: z.string(),
        })
        .optional(),

      // ===== Gold Banner #1 в центре страницы (exomind) =====
      // Используется на странице exomind как первый из двух полу-CTA-баннеров
      // (узлы Figma 1:3155 заголовок + 1:2904 BOOK APPOINTMENT). Hormone эту
      // позицию не использует.
      //
      // Принимает либо строку (только текст), либо объект с CTA.
      midGoldBanner1: z
        .union([
          z.string(),
          z.object({
            text: z.string(),
            ctaLabel: z.string().optional(),
            ctaHref: z.string().optional(),
          }),
        ])
        .optional(),

      /** Второй mid-gold banner — exomind (узлы 1:3158/1:2910), рендерится
       *  после conditionsList / videoEmbed2. */
      midGoldBanner2: z
        .union([
          z.string(),
          z.object({
            text: z.string(),
            ctaLabel: z.string().optional(),
            ctaHref: z.string().optional(),
          }),
        ])
        .optional(),

      // ===== Gold Banner (hormone) =====
      // Полноширинный pull-quote на gold-фоне после WhyTrust, перед Experience
      // (узлы Figma 1:3245 / 1:3467 для hormone). Контент-модель — просто
      // строка (или объект с CTA для общности, но hormone использует строку).
      goldBanner: z
        .union([
          z.string(),
          z.object({
            text: z.string(),
            ctaLabel: z.string().optional(),
            ctaHref: z.string().optional(),
          }),
        ])
        .optional(),

      // ===== Experience (hormone): DNA-фото + текст + телефон + CTA =====
      experience: z
        .object({
          title: z.string(),
          body: z.string(),
          image: z.string(),
          imageAlt: z.string(),
          phone: z.string().optional(),
        })
        .optional(),

      // ===== The Results (Weight Loss) =====
      resultsTitle: z.string().default('THE RESULTS').optional(),
      resultsBody: z.string().optional(),

      // ===== FAQ =====
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .max(8)
        .optional(),

      // ===== Star-sign ornaments (per Figma) =====
      // Декоративная gold-звезда (star-sign.svg) появляется на specialty-
      // страницах в разных секциях. Каждый флаг включает звезду в своей
      // секции. По умолчанию всё off — Weight Loss и др. не затрагиваются.
      // Позиции соответствуют узлам Figma (см. HANDOFF, сессия 7).
      stars: z
        .object({
          hero: z.boolean().default(false),
          whatIs: z.boolean().default(false),
          twoColumnText: z.boolean().default(false),
          benefits: z.boolean().default(false),
          commonSigns: z.boolean().default(false),
          categoriesGrid: z.boolean().default(false),
          conditionsList: z.boolean().default(false),
          whoFor: z.boolean().default(false),
          roadmap: z.boolean().default(false),
          whyTrust: z.boolean().default(false),
          results: z.boolean().default(false),
          experience: z.boolean().default(false),
        })
        .optional(),

      // ===== Layout / Meta =====
      /** Если true — страница исключена из getStaticPaths и не генерируется. */
      draft: z.boolean().default(false),

      /** Какая категория услуги — для sub-nav. Wellness | Aesthetic.
       *  Emsculpt Neo дублирована, поэтому массив. */
      category: z.array(z.enum(['wellness', 'aesthetic'])).min(1),
    }),
});

export const collections = { services, posts };
