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
    // Wellness Services — все «медицинские/велнес» услуги.
    label: 'Wellness Services',
    items: [
      { label: 'Medical Weight Loss', href: '/services/weight-loss' },
      { label: 'Hormone Optimization', href: '/services/hormone' },
      { label: 'Peptide Therapy', href: '/services/peptide' },
      { label: 'IV Therapy', href: '/services/ivtherapy' },
      { label: 'Blood Work', href: '/services/bloodwork' },
      { label: 'Regenerative Medicine', href: '/services/regenerative' },
      { label: 'Sexual Health', href: '/services/sexualhealth' },
    ],
  },
  {
    // Aesthetic Services — линейка BTL-аппаратов (эстетика/устройства).
    // Решение клиента (сессия 16): четыре устройства живут ТОЛЬКО здесь;
    // прежнее дублирование Emsculpt Neo в Wellness Services убрано.
    label: 'Aesthetic Services',
    items: [
      { label: 'Emface', href: '/services/emface' },
      { label: 'Emsculpt Neo', href: '/services/emsculpt' },
      { label: 'Exomind', href: '/services/exomind' },
      { label: 'Emsella', href: '/services/emsella' },
    ],
  },
  {
    label: 'About Us',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Glossary', href: '/glossary' },
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

/** Известные страницы из Figma, не выведенные в меню.
 *  Сейчас пусто: все страницы услуг выведены либо в Wellness, либо в Aesthetic. */
export const orphanPages: NavItem[] = [];
