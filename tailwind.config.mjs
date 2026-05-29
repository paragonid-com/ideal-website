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
        // Заголовки — Optima (self-hosted из /public/fonts/, как в Figma).
        // 5 начертаний: Regular 400, Italic 400, Bold 700, BoldItalic 700,
        // ExtraBlack 900. См. @font-face в src/styles/global.css.
        //
        // ⚠️ Optima — коммерческий шрифт от Linotype/Monotype, лицензирован
        // Apple для macOS. Web-лицензия не куплена; заказчик принял юр.риск
        // использовать его на сайте. См. блокер #13 в docs/TODO-INVENTORY.md.
        //
        // Marcellus и Georgia оставлены как fallback на случай блокировки
        // Optima (например, после смены лицензии или при загрузке woff2 fail).
        heading: ['Optima', 'Marcellus', 'Georgia', 'serif'],
        // Body / UI — Manrope (Google Fonts, бесплатный)
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Размеры из Figma 1:1 (десктоп). Обёрнуты в clamp() для мобильного
        // адаптива: верхняя граница = исходный десктоп-размер (1:1 сохранён),
        // нижняя — безопасная для узких экранов, средний vw-член даёт плавное
        // масштабирование между ними. lineHeight без изменений.
        //   H1   = 62px (1:76)  → clamp(34px … 62px)
        //   Body = 21px (1:104) → clamp(17px … 21px)
        //   Btn  = 22px (1:209) → clamp(16px … 22px)
        'h1': ['clamp(34px, 5vw + 1rem, 62px)', { lineHeight: '1.1' }],
        'body-lg': ['clamp(17px, 1vw + 0.6rem, 21px)', { lineHeight: '1.4' }],
        'btn': ['clamp(16px, 1.2vw + 0.6rem, 22px)', { lineHeight: '1' }],
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
