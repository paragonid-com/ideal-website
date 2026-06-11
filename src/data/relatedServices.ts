/**
 * Related Services — карта тематической перелинковки страниц услуг (SEO P1).
 *
 * Зачем: до этого сервисные страницы не ссылались друг на друга контекстно
 * (только nav/footer), а body-sculpting / core-to-floor / functional-wellness
 * были «сиротами» (1 входящая ссылка с emsculpt). Карта даёт каждой странице
 * 3 исходящие тематические ссылки и каждой — минимум 2 контекстные входящие.
 *
 * Лейблы — человекочитаемые анкоры (совпадают с nav, для саб-страниц emsculpt —
 * собственные). Карта правится только здесь; рендер — RelatedServices.astro.
 */

export const SERVICE_LABELS: Record<string, string> = {
  'weight-loss': 'Medical Weight Loss',
  hormone: 'Hormone Optimization',
  peptide: 'Peptide Therapy',
  ivtherapy: 'IV Therapy',
  bloodwork: 'Blood Work',
  regenerative: 'Regenerative Medicine',
  sexualhealth: 'Sexual Health',
  emface: 'Emface',
  emsculpt: 'Emsculpt Neo',
  exomind: 'Exomind',
  emsella: 'Emsella',
  'body-sculpting': 'Body Sculpting',
  'core-to-floor': 'Core to Floor',
  'functional-wellness': 'Functional Wellness',
};

export const RELATED_SERVICES: Record<string, string[]> = {
  'weight-loss': ['ivtherapy', 'bloodwork', 'hormone'],
  hormone: ['sexualhealth', 'peptide', 'bloodwork'],
  peptide: ['regenerative', 'hormone', 'ivtherapy'],
  ivtherapy: ['weight-loss', 'peptide', 'functional-wellness'],
  bloodwork: ['hormone', 'weight-loss', 'functional-wellness'],
  sexualhealth: ['hormone', 'emsella', 'regenerative'],
  regenerative: ['peptide', 'sexualhealth', 'emface'],
  emsculpt: ['body-sculpting', 'core-to-floor', 'functional-wellness'],
  'body-sculpting': ['emsculpt', 'core-to-floor', 'weight-loss'],
  'core-to-floor': ['emsculpt', 'emsella', 'body-sculpting'],
  'functional-wellness': ['emsculpt', 'ivtherapy', 'exomind'],
  emsella: ['core-to-floor', 'sexualhealth', 'emface'],
  emface: ['exomind', 'emsculpt', 'regenerative'],
  exomind: ['emface', 'functional-wellness', 'hormone'],
};
