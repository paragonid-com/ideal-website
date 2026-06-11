/**
 * site.ts — единый источник данных о клинике (NAP, гео, часы, соцсети).
 *
 * Используется и в structured data (JSON-LD), и в футере, чтобы адрес/телефон
 * не расходились между schema и видимой разметкой (важно для локального SEO:
 * NAP-консистентность — фактор доверия для Google).
 *
 * ⚠️ geo-координаты — ЗАГЛУШКА-ориентир под адрес 2999 NE 191st St; перед продом
 *    сверить с Google Business Profile клиники.
 *    Часы и соцсети — реальные (подтверждены клиентом).
 */

export const SITE = {
  name: 'Ideal Medical & Wellness',
  legalName: 'Ideal Medical and Wellness',
  // Каноничный production-домен (подтверждён клиентом 06/2026).
  url: 'https://idealmedical.com',
  description:
    'Physician-supervised medical and wellness clinic in Aventura, Florida — hormone optimization (BHRT), medical weight loss, peptide therapy, IV therapy, and advanced aesthetic treatments.',
  // Дефолтная OG-картинка для шеринга (1200×630). Заменить на брендовую.
  ogImage: '/assets/images/og-default.jpg',
  telephone: '+1-305-650-1884',
  // Для tel:-ссылок и человекочитаемого вывода
  phoneDisplay: '(305) 650-1884',
  // Канонический href для всех tel:-ссылок (E.164). Единый источник —
  // используется в футере, форме, LocationBlock, ContactHero (NAP-консистентность).
  telHref: 'tel:+13056501884',
  email: '',
  address: {
    street: '2999 NE 191st Street',
    suite: 'Suite 345',
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
  // Часы работы (подтверждены клиентом). Sat — только по записи, Sun — выходной.
  hours: [
    { day: 'Monday', short: 'Mon', opens: '10:00', closes: '18:00' },
    { day: 'Tuesday', short: 'Tue', opens: '10:00', closes: '18:00' },
    { day: 'Wednesday', short: 'Wed', opens: '10:00', closes: '18:00' },
    { day: 'Thursday', short: 'Thu', opens: '10:00', closes: '18:00' },
    { day: 'Friday', short: 'Fri', opens: '10:00', closes: '18:00' },
    { day: 'Saturday', short: 'Sat', byAppointment: true },
    { day: 'Sunday', short: 'Sun', closed: true },
  ],
  priceRange: '$$$',
  socials: {
    facebook: 'https://www.facebook.com/p/Ideal-Medical-Wellness-61558520374910/',
    instagram: 'https://www.instagram.com/idealmedwellness',
    youtube: 'https://www.youtube.com/@IdealMedWell/shorts',
  },
  // Внешнее пациентское финансирование (Cherry).
  financing: {
    label: 'Cherry Financing',
    href: 'https://pay.withcherry.com/ideal-medical-and-wellness',
  },
} as const;

/** Соцсети как массив непустых URL — для schema sameAs и футера. */
export const socialUrls = (): string[] =>
  Object.values(SITE.socials).filter((u): u is string => Boolean(u) && u !== '#');

/** Один день расписания (широкий тип для хелперов). */
export interface HourEntry {
  day: string;
  short: string;
  opens?: string;
  closes?: string;
  byAppointment?: boolean;
  closed?: boolean;
}

/** '10:00' -> '10:00 am', '18:00' -> '06:00 pm' (как на дизайне: 2-значный час, нижний регистр). */
export function formatHour(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${String(hr).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

/** Человекочитаемое значение для дня: диапазон / By Appointment / Closed. */
export function dayValue(h: HourEntry): string {
  if (h.closed) return 'Closed';
  if (h.byAppointment) return 'By Appointment';
  if (h.opens && h.closes) return `${formatHour(h.opens)} – ${formatHour(h.closes)}`;
  return '';
}

/** Статус дня для виджета: open | appt | closed. */
export function dayStatus(h: HourEntry): 'open' | 'appt' | 'closed' {
  if (h.closed) return 'closed';
  if (h.byAppointment) return 'appt';
  return 'open';
}

/** OpeningHoursSpecification для JSON-LD: группирует дни с одинаковыми часами.
 *  By-appointment/closed дни не входят в фиксированные часы и опускаются. */
export function openingHoursSpec(): { days: string[]; opens: string; closes: string }[] {
  const groups = new Map<string, { days: string[]; opens: string; closes: string }>();
  for (const h of SITE.hours as readonly HourEntry[]) {
    if (h.opens && h.closes) {
      const key = `${h.opens}-${h.closes}`;
      const g = groups.get(key) ?? { days: [], opens: h.opens, closes: h.closes };
      g.days.push(h.day);
      groups.set(key, g);
    }
  }
  return [...groups.values()];
}

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
