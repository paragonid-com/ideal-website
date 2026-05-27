import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Services collection — содержит контент страниц услуг.
 *
 * Структура frontmatter спроектирована под визуальный шаблон эталонной
 * страницы Weight Loss (узел Figma 1:1919). Все 11 страниц услуг используют
 * один и тот же шаблон `src/pages/services/[slug].astro`, который читает
 * этот collection.
 *
 * Большие текстовые блоки (What is X, Who is For, Results) идут в теле
 * markdown, чтобы их было удобно редактировать. Структурированные данные
 * (benefits, FAQ, hero) — во frontmatter с типизацией.
 *
 * Поле `draft: true` означает: страница перечислена в файле, но не должна
 * генерироваться в build. Используется для 10 страниц-заглушек, контент для
 * которых придёт от клиента позже.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      /** Заголовок страницы в meta */
      seoTitle: z.string(),
      /** Description в meta */
      seoDescription: z.string(),
      /** Заголовок в Hero — может быть многострочным (\n) */
      heroTitle: z.string(),
      /** Подзаголовок-параграф под H1 в Hero */
      heroLead: z.string(),
      /** Путь к hero-фото в /public/ (например, /assets/images/services/weight-loss/hero.jpg) */
      heroImage: z.string(),
      /** Alt для hero image */
      heroImageAlt: z.string(),

      /** Заголовок секции "What is X?" — две строки (\n) */
      whatIsTitle: z.string(),
      /** Фото слева в секции "What is X" — путь в /public/ */
      whatIsImage: z.string(),
      whatIsImageAlt: z.string(),
      /** Длинный текстовый блок справа. Может быть несколько абзацев,
       *  разделённых пустой строкой (\n\n). На странице Weight Loss
       *  это самый большой блок текста. */
      whatIsBody: z.string(),

      /** Заголовок секции Benefits */
      benefitsTitle: z.string(),
      /** Интро-параграф над сеткой карточек */
      benefitsIntro: z.string(),
      /** Карточки преимуществ. На странице Weight Loss их 5,
       *  но компонент принимает 3-6, расположение через grid auto-flow.
       *  Иконка — путь относительно src/assets/, обрабатывается через Astro Image. */
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
        .max(6),

      /** Заголовок секции "Who is X For?" */
      whoForTitle: z.string(),
      /** Путь к фото в /public/ */
      whoForImage: z.string(),
      whoForImageAlt: z.string(),
      /** Лид-текст над списком (2-3 строки прозы перед буллет-списком) */
      whoForLead: z.string(),
      /** Bullet-список критериев */
      whoForBullets: z.array(z.string()).min(2).max(8),

      /** Заголовок секции The Results (обычно "THE RESULTS") */
      resultsTitle: z.string().default('THE RESULTS'),
      /** Тело секции The Results — несколько абзацев, разделённых \n\n */
      resultsBody: z.string(),

      /** FAQ — формат question/answer.
       *  В Figma все вопросы отрисованы свёрнутыми; ответы текстом не указаны.
       *  Аккордеон через <details>/<summary> — нативный HTML без JS. */
      faq: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          })
        )
        .max(8),

      /** Если true — страница исключена из getStaticPaths и не генерируется.
       *  Используется для заглушек 10 страниц-услуг, пока не приехал контент. */
      draft: z.boolean().default(false),

      /** Ярлык для футера/JSON-LD: какая категория услуги.
       *  'wellness' | 'aesthetic' — определяет в каком пункте меню высветить
       *  как "current". Emsculpt дублирована, поэтому может быть массив. */
      category: z.array(z.enum(['wellness', 'aesthetic'])).min(1),
    }),
});

export const collections = { services };
