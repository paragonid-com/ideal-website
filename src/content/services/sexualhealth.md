---
seoTitle: "Sexual Health Therapy in Aventura, FL | Ideal Medical & Wellness"
seoDescription: "Discreet, provider-supervised sexual wellness care in Aventura, FL — individualized options to support intimate wellbeing and confidence. Book a confidential consultation."

# === Hero — узел Figma 1:7094 (H1) + 1:7100 (lead Lorem, data-todo="copy")
heroTitle: "SEXUAL\nHEALTH"
heroLead: "Sexual wellness is part of overall health — and it deserves a discreet, judgment-free conversation. At Ideal Medical & Wellness in Aventura, we offer provider-supervised options that may support intimate wellbeing and confidence, tailored to you after a private consultation. Individual results vary."
heroImage: "/assets/images/services/sexualhealth/hero.webp"
heroImageAlt: "Sexual health therapy at Ideal Medical & Wellness, Aventura"
# hero.webp = full-bleed istock 1266272168 (мужчина справа, светлый нейтральный фон слева).
# Светлая тема (default): object-right + cream-скрим. Mobile: фото баннером сверху, текст на cream.
heroMobileStacked: true
heroMobileImagePosition: "object-[78%_center]"
# Figma (узел 1:7170) внутри hero содержит кнопку BOOK NOW; mid-CTA подавлены.
heroCtaLabel: "BOOK NOW"
# Book Now в hero дублирует straddle "Book Appointment" сразу под hero →
# скрываем кнопку hero на мобиле (max-lg:hidden), на десктопе остаётся.
heroCtaHideOnMobile: true

# === "What is Sexual Health Therapy?" — узлы Figma 1:7097 (заголовок) + 1:7106 (body) + 1:7138 (фото слева).
# Фото заменено на лицензированный iStock-2154853911 (пара, объятие), кроп 1000×1208.
# Заголовок реальный; body Lorem (data-todo="copy"), ждём текст от клиента.
whatIsTitle: "WHAT IS SEXUAL\nHEALTH THERAPY?"
whatIsImage: "/assets/images/services/sexualhealth/what-is.webp"
whatIsImageAlt: "Happy couple embracing — sexual health therapy at Ideal Medical & Wellness"
# Геометрия Figma: секция y 814→1913 = 1099. Фото слева (узел 1:7134 = слот 923×939,
# left-bleed, cream-поля). object-cover кропит исходник. vw-clamp.
whatIsHeight: "lg:aspect-[1920/1099]"
whatIsGridCols: "lg:grid-cols-[48fr_52fr]"
whatIsAlign: "items-center"
whatIsImageSide: "left"
whatIsImageAspect: "lg:aspect-[923/939]"
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: |
  Our sexual health care is a confidential, provider-led approach to intimate wellness for both men and women. Depending on your needs, options may include PRP-based treatments, pelvic-floor strengthening with Emsella, and hormone or wellness optimization where appropriate.

  Changes in sexual wellness can have many underlying causes — hormonal, vascular, medication-related, or stress — so we begin with an evaluation rather than a one-size-fits-all treatment. Some causes call for a medical work-up. Many of the options in this area are not FDA-approved for sexual dysfunction, and we'll explain what is and isn't established.

  Care is discreet, individualized, and provider-supervised. It isn't a guaranteed fix, and it isn't a substitute for medical evaluation; together we'll decide what's appropriate for you.

# === Benefits — узлы Figma 1:7139 (заголовок) + 1:7143 (интро Lorem) + 1:7208-7232 (9 icon+title).
# Режим icon + title без description, сетка 3x3 (benefitsIconOnly). Заголовки benefit'ов
# реальные из Figma (идентичны peptide/regenerative). Иконки — общий набор (копия из peptide).
benefitsTitle: "WHAT ARE THE BENEFITS OF\nSEXUAL HEALTH THERAPY?"
benefitsIntro: "Patients come to us for discreet, individualized care. Depending on the approach chosen, our options may offer:"
benefitsIconOnly: true
benefits:
  # Лейблы — sexual-wellness-appropriate (client-доку). Иконки переназначены
  # по смыслу из общего placeholder-набора. ⚠️ Арт icon-decreased-pain (сустав)
  # и icon-scalp-hair (волосы) — PRP-тематика, требуют замены на нейтральные
  # иконки — арт от дизайнера. Emsella — текстом (компонент не рендерит ссылки).
  - title: "A discreet, judgment-free, provider-led experience"
    icon: "../../assets/services/sexualhealth/icon-accelerated.png"
    iconAlt: "Discreet provider-led care icon"
  - title: "Individualized treatment options for men and women"
    icon: "../../assets/services/sexualhealth/icon-customizable.png"
    iconAlt: "Individualized options icon"
  - title: "Minimally invasive approaches"
    icon: "../../assets/services/sexualhealth/icon-minimally-invasive.png"
    iconAlt: "Minimally invasive icon"
  - title: "Options that use your own PRP (low allergy risk)"
    icon: "../../assets/services/sexualhealth/icon-low-risk.png"
    iconAlt: "Low allergy risk icon"
  - title: "Support for intimate confidence and wellbeing"
    icon: "../../assets/services/sexualhealth/icon-self-confidence.png"
    iconAlt: "Confidence and wellbeing icon"
  - title: "Coordination with hormone and pelvic-floor (Emsella) options"
    icon: "../../assets/services/sexualhealth/icon-healing-response.png"
    iconAlt: "Coordinated care icon"
  - title: "A plan tailored to your goals"
    icon: "../../assets/services/sexualhealth/icon-long-lasting.png"
    iconAlt: "Tailored plan icon"
  - title: "Honest guidance on what's realistic"
    icon: "../../assets/services/sexualhealth/icon-decreased-pain.png"
    iconAlt: "Honest guidance icon"
  - title: "Ongoing provider support"
    icon: "../../assets/services/sexualhealth/icon-scalp-hair.png"
    iconAlt: "Ongoing support icon"

# === Who is Sexual Health Therapy For? — узлы Figma 1:7148 + 1:7151 + 1:7169 (фото справа).
# Фото заменено на лицензированный iStock-1158333669 (пара), кроп 1000×1208.
# Заголовок реальный; lead Lorem (data-todo="copy"). Буллетов в Figma нет — текст сплошными
# абзацами, поэтому 2 Lorem-буллета-плейсхолдера (минимум схемы = 2), как на peptide/regenerative.
whoForTitle: "WHO IS SEXUAL\nHEALTH THERAPY FOR?"
whoForImage: "/assets/images/services/sexualhealth/who-for.webp"
whoForImageAlt: "Affectionate couple — sexual health therapy at Ideal Medical & Wellness, Aventura"
# Геометрия Figma: секция y 3404→4397 = 993. Фото справа (узел 1:7165 = слот 996×993,
# near-square, right-bleed). object-cover кропит portrait-исходник. В Figma буллетов нет. vw-clamp.
whoForHeight: ""
whoForGridCols: "lg:grid-cols-[48fr_52fr]"
whoForAlign: "items-center"
whoForHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whoForBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whoForImageMinH: ""
whoForImageAspect: "lg:aspect-[996/993]"
whoForLead: |
  Our care is for adults — men and women — who want to address intimate-wellness concerns or simply feel more confident, whether related to age, hormones, or other changes. We keep the experience private and respectful at every step.

  It isn't right for everyone, and it isn't a replacement for medical evaluation. If you have new or sudden symptoms, a work-up matters — for example, erectile changes can sometimes be an early sign of other health conditions. Your provider will determine what's appropriate after a confidential consultation.

# === The Results — узлы Figma 1:7178 + 1:7179. Body Lorem (data-todo="copy").
resultsTitle: "THE RESULTS"
resultsBody: |
  Results vary from person to person. Some patients report improvements in confidence and intimate wellbeing, but outcomes are individual and not guaranteed.

  Many of these options are not FDA-approved for sexual dysfunction, and the evidence varies by approach, so we focus on setting realistic expectations from the start.

  Your provider monitors your response and tailors the plan to you. Individual results vary, and these statements have not been evaluated by the FDA.

# === FAQ — 5 compliant Q&A (client-доку sexualhealth rewrite). ⚠️ Тема high-risk:
#     перед публикацией — юридическая/медицинская проверка (PRP-for-sexual-wellness
#     под активным фокусом FDA/FTC).
faq:
  - question: "What does sexual health care at Ideal Medical involve?"
    answer: "It starts with a confidential consultation. From there, options may include PRP-based treatments, pelvic-floor strengthening with Emsella, and hormone or wellness optimization where appropriate — chosen with a provider based on your goals and health history."
  - question: "Is this FDA-approved? Will it cure erectile dysfunction or sexual dysfunction?"
    answer: "Many sexual-wellness options are not FDA-approved for sexual dysfunction, and they aren't a guaranteed cure. Because sexual changes can have underlying medical causes, we begin with an evaluation and will be honest about what's realistic."
  - question: "Is the experience discreet and confidential?"
    answer: "Yes. Consultations are private, and your information is handled in accordance with our Privacy Policy. Discretion is central to how we provide this care."
  - question: "Does treatment hurt, and is there downtime?"
    answer: "That depends on the specific option. Most approaches are minimally invasive; your provider will explain exactly what to expect, including any sensation and recovery considerations, before you begin."
  - question: "Who isn't a candidate?"
    answer: "Certain conditions may make a given option inappropriate, and new or sudden symptoms should be evaluated medically first. Your provider will screen you and recommend the right path during your consultation."

# === Star-sign ornaments (Figma 1:7128 hero, 1:7129 whatIs, 1:7142 benefits,
#     1:7164 whoFor, 1:7189 results)
stars:
  hero: true
  whatIs: true
  benefits: true
  whoFor: true
  results: true

# CTA: Figma-фрейм не содержит mid-section CTA (только hero+footer) —
# подавляем 3 дефолтных band'а шаблона (как peptide/ivtherapy/bloodwork/regenerative).
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
