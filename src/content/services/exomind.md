---
seoTitle: "ExoMind in Aventura — Non-Invasive Neurostimulation | Ideal Medical & Wellness"
seoDescription: "ExoMind at Ideal Medical & Wellness in Aventura — a non-invasive, medication-free neurostimulation wellness session, provider-supervised. Book a consultation."

heroTitle: "ExoMind\nin Aventura"
heroLead: "At Ideal Medical & Wellness, ExoMind is a non-invasive, medication-free neurostimulation session designed to support mental clarity and a calm, focused state of mind. It's a comfortable, in-office wellness experience with no downtime."
heroImage: "/assets/images/services/exomind/hero.webp"
heroImageAlt: "Client seated in the ExoMind treatment chair during a session"
heroStrongScrim: true   # busy/light hero photo — stronger desktop cream scrim for readable overlay text
heroMobileStacked: true
# In-hero BOOK NOW (Figma 1:2867). На мобайле скрываем — сразу под hero идёт
# straddle BOOK APPOINTMENT, и на стопке кнопки дублируются.
heroCtaLabel: "BOOK NOW"
heroCtaHideOnMobile: true

# Все CTA-band на странице — overlap/straddle (пилюля #dbba5f / текст #8d7431),
# по центру шва между секциями, как в Figma (узлы 1:2904/3161/2907/2910).
overlapCtas: true

# ---------- "What is" + "Who is a good candidate" two-column block ----------
twoColumnText:
  alignBodies: true
  left:
    title: "What is\nExoMind?"
    body: |
      ExoMind uses ExoTMS — a form of transcranial magnetic stimulation — to deliver gentle magnetic pulses to the dorsolateral prefrontal cortex, a region of the brain involved in focus and mood. It's built on TMS, a non-invasive technology studied in medicine for decades.

      We offer ExoMind as a wellness service to support everyday mental clarity and stress resilience — without medication or downtime. It is not a treatment for any diagnosed condition; individual results vary.
  right:
    title: "Who is a Good\nCandidate for\nExoMind?"
    body: "ExoMind may be a good fit if you:"
    bullets:
      - 'Feel persistently stressed or "switched on" and want to support a calmer state of mind'
      - "Want to support everyday focus and mental clarity"
      - "Are optimizing your overall wellness as part of a broader plan"
      - "Prefer a non-invasive, medication-free option"
      - "Would like a provider to assess whether it's suitable for you"
    tail: "Whether you're a busy professional, an entrepreneur, or simply investing in your wellbeing, our team can tell you honestly whether ExoMind fits. If you're seeking care for a diagnosed condition such as depression or anxiety, that calls for evaluation by a qualified professional — we're glad to help point you to the right care."

# ---------- Video #1 ----------
videoEmbed:
  url: "https://www.youtube.com/watch?v=k4lEDTVCb0U"   # клиент: BTL «What is #EXOMIND?» explainer
  posterImage: "/assets/images/services/exomind/video-1-poster.webp"
  posterAlt: "ExoMind explainer video poster — silhouette with brain visualization"
  # Figma 1:3142 — видео край-в-край (x=0, w=1921), как на emsella.
  flush: true
  fullBleed: true

# ---------- Gold Banner #1 (cream-вариант: золотой заголовок на cream) ----------
midGoldBanner1:
  text: "ADVANCED BRAIN WELLNESS\n& MENTAL PERFORMANCE OPTIMIZATION"
  # CTA — отдельный #dbba5f straddle ServiceCTABand после баннера (Figma 1:3161).

# ---------- Full-width image: TMS device close-up ----------
fullWidthImages:
  - image: "/assets/images/services/exomind/device-showcase.webp"
    imageAlt: "Close-up of the ExoMind TMS device with illuminated coil"
    todo: "trademark-authorization-from-btl"
    position: "after-gold-banner-1"

# ---------- HOW EXOMIND WORKS + WHY CHOOSE IDEAL (text+photo) ----------
textWithPhotoBlocks:
  - title: "How ExoMind\nWorks?"
    body: "ExoMind sessions are comfortable and quick, typically about 20–30 minutes. During a session:"
    bullets:
      - "A specialized device delivers gentle magnetic pulses to targeted brain regions."
      - "The pulses stimulate neural pathways involved in focus and mood."
      - "Over a series of sessions, the experience is designed to support a more balanced, settled state of mind."
    bulletStyle: "number"
    tail: "Experiences vary from person to person, so rather than promising a timeline, your provider will set realistic expectations and check in along the way."
    image: "/assets/images/services/exomind/how-works.webp"
    imageAlt: "Client seated next to the ExoMind device demonstrating treatment positioning"
    imageSide: "left"
    imagePadded: true
    position: "before-conditions"
    star: true

  - title: "Why Choose Ideal\nMedical & Wellness\nfor ExoMind?"
    body: "At Ideal Medical & Wellness, we combine advanced technology with personalized, honest care:"
    bullets:
      - "Customized plans tailored to your goals"
      - "Experienced, supervising wellness professionals"
      - "A comfortable, spa-like environment"
      - "A holistic approach to mind-and-body wellbeing"
    tail: "We'll be straight with you about what ExoMind is and isn't — and how it fits into your broader wellness plan."
    image: "/assets/images/services/exomind/why-choose.webp"
    imageAlt: "Illustration of a human head with the brain highlighted by neural activity"
    imageSide: "right"
    imagePadded: true
    position: "before-conditions"

# ---------- Conditions list → wellness goals (compliance: no disease claims) ----------
conditionsList:
  title: "What can ExoMind improve?"
  titleCentered: true
  items:
    - "MDD"
    - "Anxiety"
    - "Depression"
    - "Compulsive Disorders"
    - "Alcohol & Drug Addiction"
    - "Sleep"
    - "Focus"
    - "Mood and Stability"
    - "Brain Fog"

# ---------- Video #2 ----------
videoEmbed2:
  url: "https://www.youtube.com/watch?v=MDqu9rPsk2o"   # клиент: пациентский отзыв (Emily)
  posterImage: "/assets/images/services/exomind/video-2-poster.webp"
  posterAlt: "ExoMind patient testimonial video poster — Emily from New York City, NY"
  # Figma 1:3143 — видео край-в-край (x=0, w=1921).
  flush: true
  fullBleed: true

# ---------- Gold Banner #2 (cream-вариант) ----------
midGoldBanner2:
  text: "ADVANCED BRAIN WELLNESS\n& MENTAL PERFORMANCE OPTIMIZATION"
  # CTA — отдельный #dbba5f straddle ServiceCTABand после баннера (Figma 1:2910).

# ---------- FAQ (compliant set, заменяет Lorem) ----------
faq:
  - question: "What is ExoMind and how does it work?"
    answer: "ExoMind uses ExoTMS — a form of transcranial magnetic stimulation — to deliver gentle magnetic pulses to a brain region involved in focus and mood. It's non-invasive, medication-free, and done in-office while you sit comfortably."
  - question: "Is ExoMind FDA-cleared?"
    answer: "Yes, ExoMind is an FDA-cleared TMS device. We offer it as a wellness service; it is not a substitute for the medical treatment of depression, anxiety, or any condition. If you're seeking care for a diagnosed condition, we'll help direct you to appropriate medical care."
  - question: "Does ExoMind hurt, and is there downtime?"
    answer: "ExoMind is non-invasive and generally well tolerated — most people describe a light tapping sensation. Sessions take about 20–30 minutes with no downtime."
  - question: "Is ExoMind safe, and who isn't a candidate?"
    answer: "Your provider screens you first. ExoMind uses TMS, which isn't right for everyone — certain implanted metallic or electronic devices, or a history of seizures, may be contraindications. We'll review your history before you begin."
  - question: "How many ExoMind sessions will I need?"
    answer: "ExoMind is typically a series of short sessions. Experiences vary, so your provider will recommend a plan and set realistic expectations rather than promise a specific result. Individual results vary."

# ---------- Standalone CTA-баннеры из Figma 1:3218 ----------
ctaBeforeConditionsList: true   # Figma 1:2907 — перед «What clients come to ExoMind for»
# ctaAfterVideo2 убран по просьбе клиента (дублировал straddle на gold-banner #2).

stars:
  hero: true

draft: false
category:
  - wellness
---
