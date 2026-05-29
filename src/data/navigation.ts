/**
 * Структура навигации сайта.
 * Единый источник правды для Header и для генерации списка страниц в sitemap.
 *
 * См. также docs/site-navigation.md для контекста и открытых вопросов.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  /** Если есть items — рендерится как раскрывающаяся группа.
   *  Если нет — как одиночная ссылка с использованием href. */
  href?: string;
  items?: NavItem[];
};

export const mainNav: NavGroup[] = [
  {
    label: 'Wellness Services',
    items: [
      { label: 'Medical Weight Loss', href: '/services/weight-loss' },
      { label: 'Hormone Optimization', href: '/services/hormone' },
      { label: 'Peptide Therapy', href: '/services/peptide' },
      { label: 'Emsella', href: '/services/emsella' },
      { label: 'Emsculpt Neo', href: '/services/emsculpt' },
      { label: 'Exomind', href: '/services/exomind' },
      { label: 'IV Therapy', href: '/services/ivtherapy' },
      { label: 'Blood Work', href: '/services/bloodwork' },
      { label: 'PRP & Allograft', href: '/services/regenerative' },
      { label: 'Sexual Health', href: '/services/sexualhealth' },
    ],
  },
  {
    label: 'Aesthetic Services',
    items: [
      // Emsculpt Neo сознательно дублируется тут и в Wellness Services
      // (одна страница, два пути в меню — по решению заказчика).
      { label: 'Emsculpt Neo', href: '/services/emsculpt' },
      { label: 'Emface', href: '/services/emface' },
    ],
  },
  {
    label: 'About Us',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/** CTA в шапке/меню/везде.
 *  href ведёт на виджет записи Boulevard (JoinBlvd) клиники.
 *  Открывается в новой вкладке (target="_blank") — внешняя booking-система. */
export const bookingCta = {
  label: 'BOOK APPOINTMENT',
  href: 'https://www.joinblvd.com/b/ideal-medical-and-wellness/widget#/visit-type',
};

/** Известные страницы, которые есть в Figma, но НЕ выведены в меню.
 *  Не используются в Header, но перечислены для sitemap / справки. */
/** Известные страницы из Figma, не выведенные в меню.
 *  Сейчас пусто: Sexual Health (1:7461) выведена в Wellness Services. */
export const orphanPages: NavItem[] = [];
