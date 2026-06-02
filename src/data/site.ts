/**
 * site.ts — единый источник данных о клинике (NAP, гео, часы, соцсети).
 *
 * Используется и в structured data (JSON-LD), и в футере, чтобы адрес/телефон
 * не расходились между schema и видимой разметкой (важно для локального SEO:
 * NAP-консистентность — фактор доверия для Google).
 *
 * ⚠️ geo-координаты и openingHours — ЗАГЛУШКИ-ориентиры под адрес 2999 NE 191 St.
 *    Перед продом сверить с Google Business Profile клиники.
 * ⚠️ Соцсети — реальные URL вписать, когда клиент даст (сейчас заглушки '#').
 */

export const SITE = {
  name: 'Ideal Medical & Wellness',
  legalName: 'Ideal Medical and Wellness',
  // Каноничный production-домен. ОБНОВИТЬ при переезде с pages.dev на свой домен.
  url: 'https://ideal-website.pages.dev',
  description:
    'Physician-supervised medical and wellness clinic in Aventura, Florida — hormone optimization (BHRT), medical weight loss, peptide therapy, IV therapy, and advanced aesthetic treatments.',
  // Дефолтная OG-картинка для шеринга (1200×630). Заменить на брендовую.
  ogImage: '/assets/images/og-default.jpg',
  telephone: '+1-305-650-1884',
  // Для tel:-ссылок и человекочитаемого вывода
  phoneDisplay: '(305) 650-1884',
  email: '',
  address: {
    street: '2999 NE 191st Street',
    city: 'Aventura',
    region: 'FL',
    postalCode: '33180',
    country: 'US',
  },
  // ⚠️ ориентир под Aventura/2999 NE 191 St — сверить с Google Business Profile
  geo: {
    latitude: 25.9565,
    longitude: -80.1389,
  },
  // ⚠️ ЗАГЛУШКА — подтвердить реальные часы у клиники
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '10:00', closes: '15:00' },
  ],
  priceRange: '$$$',
  // ⚠️ реальные профили вписать, когда клиент предоставит
  socials: {
    facebook: '',
    instagram: '',
    youtube: '',
  },
} as const;

/** Соцсети как массив непустых URL — для schema sameAs и футера. */
export const socialUrls = (): string[] =>
  Object.values(SITE.socials).filter((u): u is string => Boolean(u) && u !== '#');

/**
 * Patient Notice & Disclaimer — единый источник текста дисклеймера, который
 * рендерится по умолчанию на КАЖДОЙ странице услуги (компонент
 * ServicePatientNotice). Закрывает по существу стандарты LegitScript #5/#6/#7/#8
 * (зона обслуживания, приватность, валидный рецепт, прозрачность/без обещаний).
 *
 * ⚠️ serviceArea — ЗАГЛУШКА. Подтвердить/расширить реальные штаты обслуживания
 *    у клиники (LegitScript Standard #5). Сейчас — только Florida.
 */
export const PATIENT_DISCLAIMER = {
  heading: 'Patient Notice & Disclaimer',
  // ⚠️ data-todo: подтвердить/расширить список штатов (LegitScript #5)
  serviceArea: 'the State of Florida',
  privacyHref: '/privacy',
  privacyTail: 'for how your health information is collected and protected.',
} as const;

/** Основной текст дисклеймера (до ссылки на Privacy Policy). */
export const patientDisclaimerBody = (): string =>
  `All treatments, including peptides and metabolic therapies, are administered only after a comprehensive medical consultation and diagnostic testing. ` +
  `Prescriptions are based on medical necessity as determined by our licensed providers. ` +
  `${SITE.name} does not sell prescription medications directly; we provide medically supervised treatment programs. ` +
  `Services are available only to patients located in ${PATIENT_DISCLAIMER.serviceArea}. ` +
  `Individual results vary and are not guaranteed. These statements have not been evaluated by the Food and Drug Administration, ` +
  `and these products and services are not intended to diagnose, treat, cure, or prevent any disease.`;
