---
seoTitle: "EMSELLA™ in Aventura | Ideal Medical & Wellness"
seoDescription: "EMSELLA™ in Aventura, Florida — an FDA-cleared, non-invasive chair treatment using HIFEM energy to strengthen pelvic floor muscles and improve bladder control and sexual wellness."

heroTitle: "EMSELLA™\nin Aventura"
heroLead: "Emsella is a non-invasive treatment that uses high-intensity focused electromagnetic (HIFEM) technology to strengthen pelvic floor muscles and improve bladder control by simulating kegels. Emsella is now also FDA approved for sexual wellness."
heroImage: "/assets/images/services/emsella/hero.webp"
heroImageAlt: "Two clients seated on Emsella treatment chairs"
# Мобайл: фото баннером сверху, текст снизу на cream (фокус на сидящей клиентке справа).
heroMobileStacked: true
heroMobileImagePosition: "object-[70%_center]"
# В hero есть собственная кнопка BOOK NOW (Figma 1:5070, x=144 y=680), отдельно от
# straddle-пилюли на шве hero/whatIs. href наследует централизованный bookingCta.
heroCtaLabel: "BOOK NOW"

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
whatIsImageRounded: true
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: |
  Emsella is an FDA-cleared, non-invasive chair treatment that uses high-intensity focused electromagnetic (HIFEM) energy to stimulate and strengthen pelvic floor muscles. Each 30-minute session delivers thousands of supramaximal contractions — the equivalent of doing 11,000 Kegels — without any effort on your part.

  Emsella is an excellent solution for:

  _ Urinary incontinence (leakage during coughing, laughing, sneezing, or exercise)
  _ Pelvic floor weakness after childbirth or aging
  _ Sexual health and wellness improvements
  _ Both women and men looking for confidence and freedom

# ---------- Two-column: What to Expect / Book Your Treatment (after what-is) ----------
twoColumnSections:
  - position: "after-whatis"
    background: "cream"
    left:
      title: "WHAT TO EXPECT\nFROM YOUR\nEMSELLA™ SESSION"
      bulletStyle: "plain"
      bullets:
        - "Non-invasive: You remain fully clothed during treatment"
        - "Comfortable: Simply sit back and relax in the Emsella chair"
        - "Quick sessions: Only 30 minutes per session"
        - "No downtime: Resume normal activities immediately"
      tail: "Most clients see noticeable results after just a few sessions, with improvements continuing over the following weeks."
    right:
      title: "BOOK YOUR\nEMSELLA™\nTREATMENT TODAY"
      body: "Take the first step toward freedom, confidence, and better pelvic health with Emsella in Aventura. Whether you're struggling with urinary incontinence or simply want to improve your quality of life, our team is here to help."
  # ---------- Two-column: Emsella for Sexual Wellness (after the incontinence grid) ----------
  - position: "after-categories-grid"
    background: "cream"
    heading: "EMSELLA FOR SEXUAL WELLNESS"
    headingClass: "text-[clamp(24px,1.88vw,36px)] leading-[1.1]"
    left:
      title: "WOMAN"
      image: "/assets/images/services/emsella/sexual-wellness-woman.webp"
      imageAlt: "Woman enjoying improved confidence outdoors"
      body: "Emsella isn't just for bladder control — it also plays a powerful role in women's sexual health and confidence. By strengthening the pelvic floor muscles and improving circulation in the pelvic region, Emsella can:"
      bullets:
        - "Enhance vaginal tightness and muscle tone"
        - "Improve sensitivity and sexual response"
        - "Support stronger, more satisfying orgasms"
        - "Boost confidence and intimacy"
      tail: "This non-invasive treatment helps women regain control of their bodies while also experiencing the benefits of improved sexual wellness and overall quality of life."
    right:
      title: "MAN"
      image: "/assets/images/services/emsella/sexual-wellness-man.webp"
      imageAlt: "Man enjoying renewed confidence outdoors"
      body: "Emsella is not just for women — it also offers significant benefits for men's sexual health. By strengthening the pelvic floor muscles with powerful electromagnetic stimulation, Emsella helps men:"
      bullets:
        - "Improve erectile function and performance"
        - "Increase stamina and sexual confidence"
        - "Enhance circulation for better sensitivity"
        - "Support overall pelvic health and control"
      tail: "This discreet, non-invasive treatment gives men the ability to reclaim confidence, intimacy, and satisfaction."

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

# ---------- FAQ (content pending from client) ----------
faq:
  - question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
    answer: ""
  - question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
    answer: ""
  - question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
    answer: ""
  - question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
    answer: ""
  - question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
    answer: ""

stars:
  hero: true
  whatIs: true

draft: false
category:
  - aesthetic
  - wellness
---
