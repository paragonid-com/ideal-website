---
seoTitle: "Peptide Therapy in Aventura, FL | Ideal Medical & Wellness"
seoDescription: "Physician-supervised peptide therapy in Aventura, FL — individualized, medically supervised wellness protocols, prescribed only when appropriate. Individual results vary."

heroTitle: "PEPTIDE\nTHERAPY"
# Лид — финальный compliance-текст (client-доку peptide rewrite).
heroLead: "Peptides are short chains of amino acids that act as signaling molecules in the body. At Ideal Medical & Wellness in Aventura, peptide therapy is a physician-supervised, individualized wellness option — prescribed only when medically appropriate, after evaluation. Individual results vary."
heroImage: "/assets/images/services/peptide/hero.webp"
heroImageAlt: "Two IDEAL peptide injector pens — Ideal Medical & Wellness, Aventura"
# hero.webp = готовая композиция (золотой градиент + две ручки справа, 1920×814).
# Desktop: full-bleed object-right + лёгкий cream-скрим слева под текст. Mobile:
# фото баннером сверху (фокус на ручках справа), текст ниже на cream.
heroMobileStacked: true
heroMobileImagePosition: "object-[78%_center]"
# В Figma (узел 1:3906) внутри hero есть кнопка BOOK NOW; mid-section straddle-CTA
# у peptide подавлены (suppressDefaultCtas), поэтому это основной above-fold CTA.
heroCtaLabel: "BOOK NOW"

# === "What is Medical Peptide Therapy?" — узлы Figma 1:3833 + 1:3842 + 1:3870 (фото)
# Заголовок реальный; body Lorem (data-todo="copy"), ждём от клиента.
whatIsTitle: "WHAT IS MEDICAL\nPEPTIDE THERAPY?"
whatIsImage: "/assets/images/services/peptide/what-is.webp"
whatIsImageAlt: "Patient receiving peptide therapy injection — Ideal Medical clinic"
# Геометрия Figma: секция y 814→1913 = 1099. Фото слева (узел 1:3870 = 923×939
# при y=895..1834 → cream-поля ~80px сверху/снизу, left-bleed). vw-clamp шрифты.
whatIsHeight: "lg:aspect-[1920/1099]"
whatIsGridCols: "lg:grid-cols-[48fr_52fr]"
whatIsAlign: "items-center"
whatIsImageSide: "left"
whatIsImageAspect: "lg:aspect-[923/939]"
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: |
  Peptides are naturally occurring signaling molecules. In a medical setting, specific peptides may be used within a supervised wellness protocol to support goals such as recovery, energy, or body composition — always individualized to the person.

  Our approach starts with an evaluation and appropriate lab work, then a plan tailored to you, using the lowest effective, individualized dosing and ongoing clinical monitoring. Importantly, many peptides are not FDA-approved; we use them only under the supervision of a licensed provider, and only when appropriate for you.

  We don't sell prescriptions directly — we provide medically supervised programs. Your provider will discuss what peptide therapy can and can't do, so your expectations are realistic from the start.

# === Benefits — узлы Figma 1:3875 (заголовок) + 1:3944-3977 (9 icon+title).
# Peptide-режим: icon + title БЕЗ description, сетка 3x3 (benefitsIconOnly).
# Заголовки benefit'ов РЕАЛЬНЫЕ (из Figma). Интро — Lorem (data-todo="copy").
benefitsTitle: "What Are the Benefits of\nPEPTIDE THERAPY?"
benefitsIntro: "Patients consider peptide therapy as part of a broader, provider-guided wellness plan. Our program offers:"
benefitsIconOnly: true
benefits:
  # Лейблы — peptide-appropriate, non-disease-claim (client-доку). Иконки
  # переназначены по смыслу из общего placeholder-набора. ⚠️ Арт
  # icon-decreased-pain (сустав) и icon-scalp-hair (волосы) — PRP-тематика,
  # требуют замены на нейтральные иконки — арт от дизайнера.
  - title: "Individualized, physician-supervised protocols"
    icon: "../../assets/services/peptide/icon-minimally-invasive.png"
    iconAlt: "Physician-supervised icon"
  - title: "Treatment guided by evaluation and lab work"
    icon: "../../assets/services/peptide/icon-healing-response.png"
    iconAlt: "Evaluation and lab work icon"
  - title: "The lowest effective, personalized dosing"
    icon: "../../assets/services/peptide/icon-customizable.png"
    iconAlt: "Personalized dosing icon"
  - title: "Ongoing clinical monitoring and support"
    icon: "../../assets/services/peptide/icon-long-lasting.png"
    iconAlt: "Ongoing monitoring icon"
  - title: "A complement to your hormone, weight-loss, or recovery goals"
    icon: "../../assets/services/peptide/icon-self-confidence.png"
    iconAlt: "Complement to wellness goals icon"
  - title: "Minimally invasive administration"
    icon: "../../assets/services/peptide/icon-low-risk.png"
    iconAlt: "Minimally invasive administration icon"
  - title: "Care from licensed providers"
    icon: "../../assets/services/peptide/icon-accelerated.png"
    iconAlt: "Licensed provider care icon"
  - title: "A plan tailored to your goals"
    icon: "../../assets/services/peptide/icon-decreased-pain.png"
    iconAlt: "Tailored plan icon"
  - title: "Honest guidance on what peptides can — and can't — do"
    icon: "../../assets/services/peptide/icon-scalp-hair.png"
    iconAlt: "Honest guidance icon"

# === Who is Peptide Therapy For? — узлы Figma 1:3884 + 1:3887 + 1:3901 (фото).
# Заголовок реальный; lead Lorem (data-todo="copy"). Буллетов в Figma нет —
# текст идёт сплошными абзацами, поэтому даём 2 Lorem-буллета-плейсхолдера
# (минимум схемы = 2), data-todo="copy".
whoForTitle: "Who is PEPTIDE\nTHERAPY For?"
whoForImage: "/assets/images/services/peptide/who-for.webp"
whoForImageAlt: "Patient considering peptide therapy — Ideal Medical, Aventura"
# Геометрия Figma: секция y 3404→4397 = 993. Фото справа (узел 1:3901 = 996×993,
# near-square, right-bleed, на всю высоту секции). Высоту задаёт ФОТО через
# whoForImageAspect; текст слева центрируется. vw-clamp шрифты.
whoForHeight: ""
whoForGridCols: "lg:grid-cols-[48fr_52fr]"
whoForAlign: "items-center"
whoForHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whoForBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whoForImageMinH: ""
whoForImageAspect: "lg:aspect-[996/993]"
# В Figma (узлы 1:3887) текст идёт сплошными абзацами БЕЗ буллет-списка —
# whoForBullets не задаём (буллеты опциональны).
whoForLead: |
  Peptide therapy may suit adults pursuing wellness, recovery, or body-composition goals as part of a medically supervised plan. It isn't right for everyone, and it isn't a substitute for treating a diagnosed medical condition.

  Candidacy is determined by a provider after an evaluation. Some people — for example, those who are pregnant or have certain medical conditions — aren't candidates. We'll be straightforward about whether peptide therapy fits your goals and your health history.

# === The Results — узлы Figma 1:3914 + 1:3915. Body Lorem (data-todo="copy").
resultsTitle: "THE RESULTS"
resultsBody: |
  Results vary from person to person, and nothing is guaranteed. Rather than promising a timeline, your provider sets realistic expectations and a plan suited to you.

  We monitor your response over time and adjust as needed, with peptide therapy used as one part of a broader wellness program — not a stand-alone fix.

  Individual results vary and are not guaranteed. These statements have not been evaluated by the FDA.

# === FAQ — узлы Figma 1:3927-3932 (5 Lorem-вопросов). data-todo="copy" — ждём от клиента.
faq:
  - question: "What is peptide therapy, and are peptides FDA-approved?"
    answer: "Peptide therapy uses specific peptides within a supervised wellness protocol. Some peptides are FDA-approved for particular medical uses; many others are not. We use peptides only under the supervision of a licensed provider and only when appropriate for you."
  - question: "Is peptide therapy safe? What about side effects?"
    answer: "Your provider screens you first and monitors you throughout. As with any medical treatment, side effects are possible, which your provider will review with you. Treatment is individualized to help manage risk."
  - question: "How are peptides administered?"
    answer: "Most peptides are given by small subcutaneous injection, following a provider-guided protocol. We use the lowest effective, individualized dose."
  - question: "Who isn't a candidate for peptide therapy?"
    answer: "It isn't right for everyone — for example, pregnancy or certain medical conditions may make it inappropriate. Your provider determines candidacy after an evaluation."
  - question: 'Is this different from buying "research" peptides online?'
    answer: 'Yes — significantly. Peptides sold online "for research" are unregulated, unverified, and can be unsafe. We provide medically supervised care: evaluation, appropriate sourcing, individualized dosing, and monitoring.'

# === Star-sign ornaments (Figma узлы 1:3864 hero, 1:3865 whatIs, 1:3878 benefits,
#     1:3900 whoFor, 1:3925 results)
stars:
  hero: true
  whatIs: true
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
