/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Бренд (вытащены из Figma по Hero, узлы 1:76, 1:104, 1:209)
        // На остальных секциях возможны новые оттенки — пополним по мере верстки
        gold: {
          DEFAULT: '#8d7431', // основной золотой — текст, акценты
          // светлее / темнее добавим, когда увидим в других секциях
        },
        cream: {
          DEFAULT: '#eae4d2', // кремовый — текст на золотом фоне (BOOK NOW)
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
