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

      // ===== Benefits (Weight Loss) =====
      benefitsTitle: z.string().optional(),
      benefitsIntro: z.string().optional(),
      benefits: z
        .array(
          z.object({
            title: z.string(),
            description: z.string(),
            icon: image(),
            iconAlt: z.string().default(''),
          })
        )
        .min(3)
        .max(6)
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
      textWithPhotoBlocks: z
        .array(
          z.object({
            title: z.string(),
            body: z.string(),
            image: z.string(),
            imageAlt: z.string(),
            imageSide: z.enum(['left', 'right']).default('right'),
            /** В каком месте шаблона показать блок.
             *  'before-common-signs' — между whatIs и commonSigns
             *  'after-roadmap'        — после roadmap, перед whyTrust */
            position: z.enum(['before-common-signs', 'after-roadmap']),
          })
        )
        .optional(),

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
              .max(4),
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
        })
        .optional(),

      // ===== Before / After Gallery (emsculpt) =====
      beforeAfter: z
        .object({
          title: z.string().optional(),
          items: z
            .array(
              z.object({
                beforeImage: z.string(),
                afterImage: z.string(),
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

      // ===== Gold Banner (hormone): full-width цитата на gold-фоне =====
      goldBanner: z.string().optional(),

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

      // ===== Layout / Meta =====
      /** Если true — страница исключена из getStaticPaths и не генерируется. */
      draft: z.boolean().default(false),

      /** Какая категория услуги — для sub-nav. Wellness | Aesthetic.
       *  Emsculpt Neo дублирована, поэтому массив. */
      category: z.array(z.enum(['wellness', 'aesthetic'])).min(1),
    }),
});

export const collections = { services };
