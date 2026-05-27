/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Бренд (вытащены из Figma по узлам 1:76, 1:104, 1:144, 1:209)
        // gold     — основной "приглушённый" золотой, текст и заливки (#8d7431)
        // gold-bright — более тёплый/яркий золотой, тонкие линии и иконки (#d1a42b)
        // cream    — кремовый, текст на золотых фонах (#eae4d2)
        gold: {
          DEFAULT: '#8d7431',
          bright: '#d1a42b',
        },
        cream: {
          DEFAULT: '#eae4d2',
        },
      },
      fontFamily: {
        // Заголовки — Marcellus (Google Fonts, бесплатный).
        // Оригинал в Figma — Optima (коммерческий Linotype). Заменён по решению
        // заказчика на бесплатный аналог. Marcellus — гуманистический serif
        // с минимальными засечками, близок по характеру к Optima.
        // Если позднее заказчик купит лицензию Optima — заменим первое значение.
        heading: ['Marcellus', 'Optima', 'Georgia', 'serif'],
        // Body / UI — Manrope (Google Fonts, бесплатный)
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Размеры из Figma 1:1
        // H1 = 62px (1:76), Body = 21px (1:104), Button = 22px (1:209)
        'h1': ['62px', { lineHeight: '1.1' }],
        'body-lg': ['21px', { lineHeight: '1.4' }],
        'btn': ['22px', { lineHeight: '1' }],
      },
      maxWidth: {
        // Дизайн нарисован под 1920px; рабочий контент-блок ~1632px (1920 - 144*2)
        'design': '1920px',
        'content': '1632px',
      },
    },
  },
  plugins: [],
};
