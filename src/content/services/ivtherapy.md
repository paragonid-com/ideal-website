---
seoTitle: "IV Therapy in Aventura, FL | Ideal Medical & Wellness"
seoDescription: "Medical IV therapy in Aventura, FL — hydration and nutrient infusions to support energy, recovery, and overall wellness. Administered by licensed clinicians; individual results vary."

heroTitle: "IV\nTHERAPY"
# Лид — финальный compliance-текст (client-доку ivtherapy rewrite).
heroLead: "IV therapy delivers fluids, vitamins, and nutrients directly into the bloodstream, which can support hydration and replenish nutrients more directly than oral supplements. At Ideal Medical & Wellness in Aventura, infusions are administered by licensed clinicians after a quick screening. Individual results vary."
# ⚠️ Stock: istockphoto-1312587753 (тот же кадр, что Blog Hero) — лицензия требует проверки (блокер #3)
heroImage: "/assets/images/services/ivtherapy/hero.webp"
heroImageAlt: "IV therapy drip bag in a clinical setting — Ideal Medical & Wellness, Aventura"
# hero.webp = full-bleed сток-фото (женщина с капельницей, левая ~40% пустая под текст).
# Desktop: object-right + cream-скрим слева. Mobile: фото баннером сверху, текст ниже на cream.
heroMobileStacked: true
heroMobileImagePosition: "object-[62%_center]"
# Figma (узел 1:5892) внутри hero содержит кнопку BOOK NOW; mid-CTA подавлены.
heroCtaLabel: "BOOK NOW"
# Book Now в hero дублирует straddle "Book Appointment" сразу под hero →
# скрываем кнопку hero на мобиле (max-lg:hidden), на десктопе остаётся.
heroCtaHideOnMobile: true

# === "What is Medical IV Therapy?" — узлы Figma 1:5819 (заголовок) + 1:5828 (body) + 1:5860 (фото слева)
# Заголовок реальный; body Lorem (data-todo="copy"), ждём от клиента.
whatIsTitle: "WHAT IS MEDICAL\nIV THERAPY?"
# ⚠️ Stock: istockphoto-2206913658 — лицензия требует проверки (блокер)
whatIsImage: "/assets/images/services/ivtherapy/what-is.webp"
whatIsImageAlt: "Clinician preparing an IV therapy drip — Ideal Medical & Wellness, Aventura"
# Геометрия Figma: секция y 814→1913 = 1099. Фото слева (узел 1:5856 = 923×939,
# left-bleed, cream-поля ~80px). object-cover кропит landscape-исходник в near-square.
whatIsHeight: "lg:aspect-[1920/1099]"
whatIsGridCols: "lg:grid-cols-[48fr_52fr]"
whatIsAlign: "items-center"
whatIsImageSide: "left"
whatIsImageAspect: "lg:aspect-[923/939]"
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: |
  IV therapy is the delivery of fluids, vitamins, and nutrients through an intravenous drip. Because it bypasses the digestive tract, it can support more direct absorption of certain nutrients compared with oral supplements.

  At Ideal Medical & Wellness, infusions are administered by licensed clinicians after a brief screening, with blends that can be tailored to goals such as hydration, energy, and recovery. IV therapy is a wellness service — it is not a treatment for any medical condition.

  Sessions are comfortable and typically take about 30–60 minutes in-office. Many people report feeling refreshed afterward; individual results vary.

# === Benefits — узлы Figma 1:5861 (заголовок) + 1:5865 (интро) + 1:5930-5963 (9 icon+title).
# Icon-only 3x3 (benefitsIconOnly), идентично peptide. Лейблы РЕАЛЬНЫЕ из Figma.
# Интро — Lorem (data-todo="copy"). Иконки — собственная копия shared-набора.
benefitsTitle: "What Are the Benefits of\nIV THERAPY?"
benefitsIntro: "IV therapy is a convenient way to support hydration and nutrient replenishment as part of your wellness routine:"
benefitsIconOnly: true
benefits:
  # Лейблы — IV-appropriate (client-доку). Иконки переназначены по смыслу из
  # общего placeholder-набора. ⚠️ Арт icon-decreased-pain (сустав) и
  # icon-scalp-hair (волосы) — PRP-тематика, требуют замены на IV-иконки
  # (drip/droplet/vitamin) — арт от дизайнера.
  - title: "Direct hydration and nutrient replenishment"
    icon: "../../assets/services/ivtherapy/icon-accelerated.png"
    iconAlt: "Hydration and nutrients icon"
  - title: "More direct absorption than oral supplements"
    icon: "../../assets/services/ivtherapy/icon-healing-response.png"
    iconAlt: "Nutrient absorption icon"
  - title: "Customizable infusion blends"
    icon: "../../assets/services/ivtherapy/icon-customizable.png"
    iconAlt: "Customizable blends icon"
  - title: "Administered by licensed clinicians"
    icon: "../../assets/services/ivtherapy/icon-low-risk.png"
    iconAlt: "Clinician-administered icon"
  - title: "Quick, comfortable in-office sessions"
    icon: "../../assets/services/ivtherapy/icon-minimally-invasive.png"
    iconAlt: "Quick in-office session icon"
  - title: "A convenient complement to your wellness routine"
    icon: "../../assets/services/ivtherapy/icon-self-confidence.png"
    iconAlt: "Wellness routine icon"
  - title: "Support for everyday energy and recovery goals"
    icon: "../../assets/services/ivtherapy/icon-long-lasting.png"
    iconAlt: "Energy and recovery icon"
  - title: "Screened for safety and suitability"
    icon: "../../assets/services/ivtherapy/icon-decreased-pain.png"
    iconAlt: "Safety screening icon"
  - title: "Tailored to your goals"
    icon: "../../assets/services/ivtherapy/icon-scalp-hair.png"
    iconAlt: "Tailored to goals icon"

# === Who is IV Therapy For? — узлы Figma 1:5870 + 1:5873 (body) + 1:5891 (фото справа).
# Заголовок реальный; lead Lorem (data-todo="copy"). Буллетов в Figma нет —
# 2 Lorem-плейсхолдера (минимум схемы = 2), data-todo="copy".
whoForTitle: "Who is IV\nTHERAPY For?"
# ⚠️ Stock: istockphoto-1270488580 — лицензия требует проверки (блокер)
whoForImage: "/assets/images/services/ivtherapy/who-for.webp"
whoForImageAlt: "Patient receiving IV therapy as a clinician administers the infusion — Ideal Medical, Aventura"
# Геометрия Figma: секция y 3404→4397 = 993. Фото справа (узел 1:5887 = 996×993,
# near-square, right-bleed, на всю высоту). object-cover кропит portrait-исходник.
# Высоту задаёт ФОТО; текст слева центрируется. В Figma (1:5873) буллетов нет.
whoForHeight: ""
whoForGridCols: "lg:grid-cols-[48fr_52fr]"
whoForAlign: "items-center"
whoForHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whoForBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whoForImageMinH: ""
whoForImageAspect: "lg:aspect-[996/993]"
whoForLead: |
  IV therapy may suit people looking to support hydration and nutrient levels — for active lifestyles, recovery, travel, or simply a busy schedule — as a complement to a healthy routine.

  It isn't right for everyone. A clinician screens you first, since certain conditions (for example, kidney or heart conditions, or pregnancy) call for caution. IV therapy is not a substitute for medical care.

# === The Results — узлы Figma 1:5900 + 1:5901. Body Lorem (data-todo="copy").
resultsTitle: "THE RESULTS"
resultsBody: |
  Many people report feeling refreshed or re-energized after a session. Effects vary from person to person and are often short-term, supporting hydration and nutrient levels rather than producing a lasting change on their own.

  IV therapy is not a cure or treatment for any illness; it's a wellness service that supports hydration and nutrition.

  Your clinician can recommend a sensible cadence based on your goals. Individual results vary, and these statements have not been evaluated by the FDA.

# === FAQ — узлы Figma 1:5914-5918 (5 Lorem-вопросов). data-todo="copy" — ждём от клиента.
faq:
  - question: "What is IV therapy, and what's in the infusions?"
    answer: "IV therapy delivers fluids along with vitamins and nutrients through a drip. Blends are customizable and selected with a clinician based on your goals — for example, hydration, energy, or recovery support."
  - question: "Does it hurt, and how long does it take?"
    answer: "It begins with a quick IV placement (a small pinch), and most sessions take about 30–60 minutes while you relax comfortably in-office."
  - question: "Is IV therapy safe, and who isn't a candidate?"
    answer: "Infusions are administered by licensed clinicians after a screening. It isn't right for everyone — conditions such as kidney or heart disease, or pregnancy, may require caution — so your provider will review your history first."
  - question: "How often should I get IV therapy?"
    answer: "That depends on your goals; your clinician will recommend a cadence. IV therapy complements — but doesn't replace — good hydration, nutrition, and overall care."
  - question: 'Can IV therapy cure illness or "boost" my immune system?'
    answer: "IV therapy supports hydration and nutrient replenishment; it is not a treatment or cure for any illness, and we don't make disease-prevention claims. If you're feeling unwell, please see a medical provider."

# === Star-sign ornaments (Figma: 1:5850 hero, 1:5864 benefits, 1:5886 whoFor, 1:5911 results)
# WhatIs звезды нет (1:5851 — угловой декор header-зоны, как Image 81 на других страницах).
stars:
  hero: true
  benefits: true
  whoFor: true
  results: true

# CTA: Figma-фрейм не содержит mid-section CTA (только hero+footer) —
# подавляем 3 дефолтных band'а шаблона.
suppressDefaultCtas: true
# Per client request: add straddle Book Appointment CTAs that were absent in
# Figma — between Hero and the first section (ctaAfterHero) and right before
# the FAQ (ctaBeforeFaq). overlapCtas => mandatory straddle style (#dbba5f).
overlapCtas: true
ctaAfterHero: true
ctaBeforeFaq: true

draft: false
category:
  - wellness
---
