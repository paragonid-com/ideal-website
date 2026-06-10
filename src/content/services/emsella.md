---
seoTitle: "EMSELLA™ in Aventura | Ideal Medical & Wellness"
seoDescription: "EMSELLA™ in Aventura, FL — an FDA-cleared, non-invasive chair treatment using HIFEM energy to strengthen the pelvic floor and improve bladder control. Individual results vary."

heroTitle: "EMSELLA™\nin Aventura"
heroLead: "Emsella is a non-invasive treatment that uses high-intensity focused electromagnetic (HIFEM) energy to strengthen the pelvic floor and improve bladder control — like doing thousands of Kegels while you sit, fully clothed. It's FDA-cleared for the treatment of urinary incontinence in women and men; individual results vary."
heroImage: "/assets/images/services/emsella/hero.webp"
heroImageAlt: "Two clients seated on Emsella treatment chairs"
# Мобайл: фото баннером сверху, текст снизу на cream (фокус на сидящей клиентке справа).
heroMobileStacked: true
heroMobileImagePosition: "object-[70%_center]"
# В hero есть собственная кнопка BOOK NOW (Figma 1:5070, x=144 y=680), отдельно от
# straddle-пилюли на шве hero/whatIs. href наследует централизованный bookingCta.
heroCtaLabel: "BOOK NOW"
# На мобайле скрываем in-hero BOOK NOW — сразу под hero идёт straddle
# BOOK APPOINTMENT, и на стопке две кнопки дублируют друг друга.
heroCtaHideOnMobile: true
# Все CTA-band на странице — overlap/straddle (пилюля #dbba5f / текст #8d7431),
# по центру шва между секциями, как в Figma (узлы 1:5163/5166/5169/5172).
overlapCtas: true

# ---------- What is EMSELLA? (photo left + body + bullets) ----------
# Геометрия Figma (узлы 1:5401 фото 776×1034 портрет @ x=147; заголовок 1:5091
# одной строкой + gold-звезда 1:5065 справа; body 1:5035). Фото — скруглённая
# карточка с отступом слева (как у текста), вверху секции; текст справа vw-адаптивный.
whatIsTitle: "WHAT IS EMSELLA™?"
whatIsImage: "/assets/images/services/emsella/what-is.webp"
whatIsImageAlt: "Clients seated on Emsella chairs"
whatIsGridCols: "lg:grid-cols-[48fr_52fr]"
whatIsAlign: "items-start"
whatIsHeight: "lg:min-h-0"
whatIsImageSide: "left"
whatIsImageAspect: "lg:aspect-[776/1034]"
whatIsImagePadded: true
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: |
  Emsella is an FDA-cleared, non-invasive chair treatment that uses HIFEM energy to stimulate and strengthen the pelvic floor. The manufacturer compares a single 30-minute session to roughly 11,000 Kegels — with no effort on your part.

  Emsella may be a good fit for:

  _ Urinary incontinence — leakage with coughing, laughing, sneezing, or exercise
  _ Pelvic floor weakness after childbirth or with age
  _ Intimate-wellness and quality-of-life goals (a wellness use, not an FDA-cleared indication)
  _ Women and men seeking better pelvic-floor strength and confidence

# ---------- Two-column: What to Expect / Book Your Treatment (after what-is) ----------
twoColumnSections:
  - position: "after-whatis"
    background: "cream"
    left:
      title: "WHAT TO EXPECT\nFROM YOUR\nEMSELLA™ SESSION"
      bulletStyle: "plain"
      bullets:
        - "Non-invasive: You remain fully clothed"
        - "Comfortable: Simply sit back and relax in the Emsella chair"
        - "Quick: About 28 minutes per session"
        - "No downtime: Resume your normal activities right away"
      tail: "Many people notice improvement after a few sessions, with continued progress over the following weeks. Individual results vary."
    right:
      title: "BOOK YOUR\nEMSELLA™\nTREATMENT TODAY"
      body: "Take a step toward better pelvic-floor health and confidence with Emsella in Aventura. Whether you're dealing with urinary incontinence or simply want to improve your quality of life, our team is here to help."
  # ---------- Two-column: Emsella for Sexual Wellness (after the incontinence grid) ----------
  - position: "after-categories-grid"
    background: "cream"
    heading: "EMSELLA™ FOR INTIMATE WELLNESS"
    headingClass: "text-[clamp(24px,1.88vw,36px)] leading-[1.1]"
    # Compliance: над колонками — оговорка (не FDA-cleared, не лечение ED).
    intro: "Beyond bladder control, some people choose Emsella to support intimate wellness by strengthening the pelvic floor. <strong>These uses are not FDA-cleared indications, the evidence is still emerging, and individual results vary. Emsella is not a treatment for erectile dysfunction, sexual dysfunction, or any medical condition.</strong>"
    # Под колонками — ссылка на программу Sexual Health.
    footer: 'Considering this for intimate-wellness goals? See our <a href="/services/sexualhealth">Sexual Health</a> program — our team will discuss what''s realistic for you.'
    left:
      title: "WOMEN"
      image: "/assets/images/services/emsella/sexual-wellness-woman.webp"
      imageAlt: "Woman enjoying improved confidence outdoors"
      body: "By strengthening the pelvic floor and supporting pelvic circulation, some women report:"
      bullets:
        - "Improved pelvic-floor tone"
        - "A greater sense of comfort and intimate confidence"
        - "Support for everyday quality of life"
    right:
      title: "MEN"
      image: "/assets/images/services/emsella/sexual-wellness-man.webp"
      imageAlt: "Man enjoying renewed confidence outdoors"
      body: "By strengthening the pelvic floor, some men report:"
      bullets:
        - "Better pelvic-floor strength and control"
        - "A greater sense of confidence"
        - "Support for overall pelvic health"

# ---------- What EMSELLA Is for? — incontinence types grid (gold, 3 items) ----------
categoriesGrids:
  - title: "WHAT EMSELLA™ IS FOR?"
    titleClass: "text-[clamp(24px,1.88vw,36px)] leading-tight text-left"
    background: "gold"
    imageAspectClass: "aspect-square"
    items:
      - title: "STRESS INCONTINENCE"
        body: "Stress incontinence is the involuntary leakage of urine during physical activities such as coughing, sneezing, laughing, or exercising due to weakened pelvic floor muscles or urethral support."
        image: "/assets/images/services/emsella/incontinence-stress.webp"
        imageAlt: "Stress incontinence"
      - title: "URGE INCONTINENCE"
        body: "Urge incontinence is the sudden, intense need to urinate followed by involuntary bladder leakage, often caused by overactive bladder muscle contractions."
        image: "/assets/images/services/emsella/incontinence-urge.webp"
        imageAlt: "Urge incontinence"
      - title: "MIXED INCONTINENCE"
        body: "Mixed incontinence is the combination of stress and urge incontinence, involving both leakage with physical activity and sudden, strong urges to urinate."
        image: "/assets/images/services/emsella/incontinence-mixed.webp"
        imageAlt: "Mixed incontinence"

# ---------- Video после сетки "What Emsella is for?" (Figma 1:5400 —
# "BTL EMSELLA® - Mechanism of action", YouTube). URL даёт клиент
# (data-todo='video-from-client' проставит компонент при пустом url). ----------
videoEmbed:
  position: "after-first-grid"
  # Подтверждено web-проверкой: официальный ролик BTL «BTL EMSELLA® — Mechanism
  # of action» (канал BTL Aesthetics), узел Figma 1:5400.
  url: "https://www.youtube.com/watch?v=2HLEVkT1LUU"
  posterAlt: "BTL Emsella — Mechanism of action"
  # Figma 1:5400 — видео край-в-край (x=0, w=1921), без боковых полей и без скругления.
  flush: true
  fullBleed: true

# ---------- FAQ — 5 compliant Q&A (client-доку: FDA-cleared vs sexual wellness, противопоказания) ----------
faq:
  - question: "What is Emsella, and is it FDA-cleared?"
    answer: "Emsella is an FDA-cleared, non-invasive chair treatment that uses HIFEM energy to strengthen the pelvic floor and treat urinary incontinence in women and men. You sit fully clothed for about 28 minutes while it delivers Kegel-like contractions."
  - question: "Does Emsella hurt, and is there downtime?"
    answer: "You'll feel a tingling sensation and pelvic-floor muscle contractions — most people compare Emsella to an intense pelvic workout and find it tolerable. There's no downtime."
  - question: "How many Emsella sessions will I need, and when will I notice results?"
    answer: "Emsella is typically done as a short series of sessions over a few weeks. Many people notice improvement after a few sessions, with continued progress afterward. Individual results vary, and your provider will recommend a plan."
  - question: "Can Emsella help with sexual wellness?"
    answer: "Emsella strengthens the pelvic floor, and some people associate that with intimate-wellness benefits. However, these uses are not FDA-cleared, the evidence is still emerging, and Emsella is not a treatment for erectile dysfunction or sexual dysfunction. We're glad to discuss your goals during a consultation."
  - question: "Is Emsella safe, and who isn't a candidate?"
    answer: "Emsella is generally well tolerated, but it isn't for everyone — for example, metal or electronic implants (such as a pacemaker, or certain implants/devices), or pregnancy, may be contraindications. Your provider will screen you before treatment."

stars:
  hero: true
  whatIs: true

draft: false
category:
  - aesthetic
  - wellness
---
