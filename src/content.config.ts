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
      /** Мобайл-hero: фото баннером сверху + текст снизу (вместо оверлея). */
      heroMobileStacked: z.boolean().optional(),
      /** object-position фото в мобильном hero-баннере (напр. `object-[52%_center]`). */
      heroMobileImagePosition: z.string().optional(),
      /** Opt-in CTA-кнопка внутри Hero (Figma peptide узел 1:3906 «BOOK NOW»).
       *  Задаётся текстом; если не задано — кнопка не рендерится (страницы со
       *  straddle-CTA не затронуты). */
      heroCtaLabel: z.string().optional(),
      /** Ссылка hero-кнопки. Если не задана — bookingCta.href (Boulevard). */
      heroCtaHref: z.string().optional(),
      /** Скрыть in-hero CTA на мобайле (< lg) — когда сразу после hero идёт
       *  straddle BOOK APPOINTMENT и на стопке кнопки дублируются (emsella). */
      heroCtaHideOnMobile: z.boolean().optional(),
      /** Тема hero-фото: 'light' (default — светлое фото, тёмный текст, cream-скрим)
       *  или 'dark' (тёмное фото, напр. regenerative — светлый lead + тёмный скрим). */
      heroTheme: z.enum(['light', 'dark']).optional(),

      // ===== "What is X?" (Weight Loss формат) =====
      whatIsTitle: z.string().optional(),
      whatIsImage: z.string().optional(),
      whatIsImageAlt: z.string().optional(),
      /** Длинный текстовый блок справа. Многоабзацный (\n\n). */
      whatIsBody: z.string().optional(),
      /** Класс высоты/пропорции секции What-Is на lg (напр. `lg:aspect-[1920/1083]`
       *  для hormone — высота пропорциональна ширине как в Figma). Если не задан —
       *  ServiceWhatIs использует `lg:min-h-[940px]` (другие страницы не затронуты). */
      whatIsHeight: z.string().optional(),
      /** Класс раскладки колонок What-Is на lg (напр. `lg:grid-cols-[44fr_56fr]`,
       *  чтобы сузить фото). Default в компоненте — `lg:grid-cols-2`. */
      whatIsGridCols: z.string().optional(),
      /** Выравнивание колонок What-Is (напр. `items-stretch` для hormone —
       *  текст сверху как в Figma). Default в компоненте — `items-center`. */
      whatIsAlign: z.string().optional(),
      /** Класс размера заголовка What-Is (напр. vw-масштабируемый
       *  `text-[clamp(28px,3.23vw,62px)]` для hormone). Default — `text-h1`. */
      whatIsHeadingClass: z.string().optional(),
      /** Класс размера body-текста What-Is (vw-масштабируемый для hormone).
       *  Default — `text-body-lg`. */
      whatIsBodyClass: z.string().optional(),
      /** На мобайле What-Is: текст сверху, фото снизу. */
      whatIsMobileTextFirst: z.boolean().optional(),
      /** Сторона фото What-Is на десктопе: 'left'|'right'. */
      whatIsImageSide: z.enum(['left','right']).optional(),
      /** What-Is: фото целиком с cream-полем (зум аут). */
      whatIsImageZoomOut: z.boolean().optional(),
      /** Если задан (напр. `lg:aspect-[923/939]`) — фото держит пропорцию на lg
       *  вместо растягивания; с align=items-center даёт cream-поля сверху/снизу. */
      whatIsImageAspect: z.string().optional(),
      /** На lg фото-колонка получает левый отступ 7.55% (как у текста), т.е. фото
       *  не встык к краю, а внутри контент-поля (emsella, Figma 1:5401 x=147).
       *  На мобайле без эффекта (фото остаётся как было). Default false. */
      whatIsImagePadded: z.boolean().optional(),
      /** На lg у фото скруглённые углы (emsella — rounded-rectangle 1:5401).
       *  На мобайле без эффекта. Default false. */
      whatIsImageRounded: z.boolean().optional(),

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
      /** Разбить карточки на два центрированных ряда: первые N сверху, остальные
       *  снизу. Эталон Weight Loss в Figma — «2 сверху / 3 снизу» (benefitsTopRowCount: 2).
       *  Не задано → прежнее поведение (один flex-wrap ряд). */
      benefitsTopRowCount: z.number().int().positive().optional(),
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
      /** Класс высоты/пропорции секции на lg. Default — прежнее поведение
       *  (lg:min-h-[1000px]). weight-loss передаёт '' — высоту секции задаёт
       *  фото-колонка через whoForImageAspect (надёжно на любой ширине). */
      whoForHeight: z.string().optional(),
      /** Раскладка колонок на lg. Default `lg:grid-cols-2`. weight-loss —
       *  `lg:grid-cols-[48fr_52fr]` (фото справа 996/1920 ≈ 52%). */
      whoForGridCols: z.string().optional(),
      /** Вертикальное выравнивание колонок. Default `items-center`.
       *  weight-loss — `items-center` (текст центрируется по высоте фото). */
      whoForAlign: z.string().optional(),
      /** Класс размера заголовка. Default `text-h1 leading-tight`.
       *  weight-loss — vw-clamp `text-[clamp(28px,3.23vw,62px)] leading-[1.05]`. */
      whoForHeadingClass: z.string().optional(),
      /** Класс размера lead/буллетов. Default `text-body-lg leading-relaxed`.
       *  weight-loss — vw-clamp `text-[clamp(16px,1.09vw,21px)] leading-[1.5]`. */
      whoForBodyClass: z.string().optional(),
      /** Класс min-h фото-колонки. Default `lg:min-h-[700px]`. При aspect-режиме
       *  передаётся '' (пусто), чтобы фото следовало пропорции блока. */
      whoForImageMinH: z.string().optional(),
      /** Если задан (напр. `lg:aspect-[996/993]`) — фото-колонка держит пропорцию
       *  на lg и сама задаёт высоту секции (object-cover кропит исходник). */
      whoForImageAspect: z.string().optional(),

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
            /** Класс высоты/пропорции секции (напр. `lg:aspect-[2/1]` — фото квадрат). */
            sectionHeight: z.string().optional(),
            /** Выравнивание колонок (`items-stretch` для квадрат-фото). */
            align: z.string().optional(),
            /** Класс размера заголовка (+leading), vw-адаптивный для hormone. */
            headingClass: z.string().optional(),
            /** Класс размера body (+leading), vw-адаптивный для hormone. */
            bodyClass: z.string().optional(),
            /** Фото целиком с cream-полем (зум аут). */
            imageZoomOut: z.boolean().optional(),
            /** Квадратный блок фото с cream-паддингом, flush к внешнему краю
             *  (exomind How Works / Why Choose, Figma 1:3198 / 1:3209). */
            imagePadded: z.boolean().optional(),
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
            /** Класс размера общего заголовка (напр. меньше text-h1 — emsella
             *  «EMSELLA FOR SEXUAL WELLNESS» ~36px, Figma 1:5162). Default в
             *  компоненте — text-h1 (другие страницы не затронуты). */
            headingClass: z.string().optional(),
            background: z.enum(['cream', 'gold']).default('cream'),
            position: z.enum(['after-whatis', 'after-categories-grid']),
            left: z.object({
              title: z.string(),
              body: z.string().optional(),
              bullets: z.array(z.string()).optional(),
              /** Стиль буллетов: 'dash' (— маркер, default) или 'plain'
               *  (без маркера, лейбл до «:» жирным — emsella What to Expect,
               *  Figma 1:5102). */
              bulletStyle: z.enum(['dash', 'plain']).optional(),
              tail: z.string().optional(),
              /** Опц. фото над колонкой (emsella Sexual Wellness) */
              image: z.string().optional(),
              imageAlt: z.string().optional(),
            }),
            right: z.object({
              title: z.string(),
              body: z.string().optional(),
              bullets: z.array(z.string()).optional(),
              bulletStyle: z.enum(['dash', 'plain']).optional(),
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
          /** Опц. подпись под списком (мелкая, по центру — compliance). */
          caption: z.string().optional(),
        })
        .optional(),

      /** Standalone CTA-баннеры «BOOK APPOINTMENT» в позициях, которые не
       *  покрыты дефолтным шаблоном. Оба default false → другие страницы не
       *  затрагиваются. Сейчас используются на exomind, где в Figma (1:3218)
       *  есть CTA, которых не расставлял общий шаблон:
       *    - ctaBeforeConditionsList — Figma 1:2907 (перед «What can ExoMind improve?»)
       *    - ctaAfterVideo2          — Figma 1:2913 (после видео #2, перед gold-banner #2) */
      /** Если true — подавляет 3 дефолтных CTA-band (после Hero / WhatIs /
       *  Benefits). Для страниц, чьи Figma-фреймы не содержат mid-CTA
       *  (peptide/ivtherapy/bloodwork/regenerative/sexualhealth). Default false. */
      suppressDefaultCtas: z.boolean().default(false),
      /** Если true — скрывает блок Patient Notice & Disclaimer на этой странице
       *  услуги. Default false → блок рендерится на ВСЕХ страницах услуг
       *  (LegitScript-комплаенс). Аналогично suppressDefaultCtas. */
      suppressPatientNotice: z.boolean().default(false),
      ctaBeforeConditionsList: z.boolean().default(false),
      ctaAfterVideo2: z.boolean().default(false),
      /** CTA «BOOK APPOINTMENT» прямо перед FAQ. Figma-макеты emsculpt (1:5573,
       *  после before/after) и emface (1:6327, после видео #2) ставят здесь band,
       *  которого не было в общем шаблоне. Default false → остальные не затронуты. */
      ctaBeforeFaq: z.boolean().default(false),
      /** CTA «BOOK APPOINTMENT» между gold-pull-quote и Experience (hormone,
       *  Figma 1:3467→Experience: band на y6891). Default false. */
      ctaAfterGoldBanner: z.boolean().default(false),
      /** Если true — ВСЕ CTA-band на странице рендерятся в «straddle»-варианте:
       *  пилюля #dbba5f / текст #8d7431, нулевая собственная высота, центр
       *  ровно на шве между секциями (половина в каждой), как в Figma hormone.
       *  Default false → прежний центрированный band (другие страницы не тронуты). */
      overlapCtas: z.boolean().default(false),
      /** CTA «BOOK APPOINTMENT» сразу после Hero как opt-in (не зависит от
       *  suppressDefaultCtas). Нужен hormone: suppressDefaultCtas=true глушит
       *  дефолтные after-hero/after-whatis, а этот возвращает только шов Hero/WhatIs.
       *  Default false. */
      ctaAfterHero: z.boolean().default(false),
      /** CTA «BOOK APPOINTMENT» между блоками before-common-signs (Reclaiming)
       *  и секцией Common Signs (hormone, Figma шов y≈2799). Default false. */
      ctaBeforeCommonSigns: z.boolean().default(false),

      // ===== Categories Grid (emsculpt): 3-колонная сетка фото+заголовок+опционально-текст =====
      // Используется дважды на странице emsculpt — поэтому в frontmatter массив таких блоков.
      categoriesGrids: z
        .array(
          z.object({
            /** Опциональный заголовок над сеткой ("WHAT EMSCULPT NEO IS FOR" / "CUSTOMIZE YOUR TREATMENT") */
            title: z.string().optional(),
            /** Класс заголовка сетки (размер+выравнивание). Default в компоненте —
             *  `text-h1 leading-tight text-center` (emsculpt). emsella передаёт
             *  меньший + text-left (Figma 1:5161 ~36px слева). */
            titleClass: z.string().optional(),
            /** Фон: cream (default) или gold */
            background: z.enum(['cream', 'gold']).default('cream'),
            /** Класс пропорции фото-плашек. Default в компоненте — `aspect-[409/216]`
             *  (emsculpt landscape). emsella передаёт `aspect-square` (Figma 488×488). */
            imageAspectClass: z.string().optional(),
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
          /** Убрать вертикальный padding секции (py-12) → края iframe совпадают
           *  с началом/концом секции (emsculpt, Figma 1:5511). Default false —
           *  прочие страницы (emsella/exomind/emface) сохраняют py-12. */
          flush: z.boolean().default(false),
          /** Видео край-в-край по всей ширине вьюпорта на ВСЕХ размерах (без
           *  боковых полей и скругления, и на десктопе тоже) — emsella Figma
           *  1:5400 (x=0, w=1921). Default false → прежнее поведение (контент-
           *  ширина с полями на десктопе). */
          fullBleed: z.boolean().default(false),
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
          /** Те же опции, что у videoEmbed (exomind video #2 — full-bleed). */
          flush: z.boolean().default(false),
          fullBleed: z.boolean().default(false),
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
          /** Горизонтальная карусель (scroll-snap + стрелки) вместо вертикального
           *  стека. emsculpt: набор live BTL BEFORE|AFTER композит-карточек. */
          carousel: z.boolean().optional(),
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
