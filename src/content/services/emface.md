---
seoTitle: "EMFACE™ in Aventura | Ideal Medical & Wellness"
seoDescription: "EMFACE™ in Aventura, Florida — a revolutionary, non-invasive facial treatment to lift, tone, and rejuvenate your face without needles, fillers, or downtime."

heroTitle: "EMFACE™\nin Aventura"
heroLead: "At Ideal Medical & Wellness, we offer Emface, a revolutionary, non-invasive facial treatment designed to lift, tone, and rejuvenate your face—without needles, fillers, or downtime.\n\nIf you're looking for a natural, youthful appearance without invasive procedures, Emface is the future of facial aesthetics."
heroImage: "/assets/images/services/emface/hero.webp"
heroImageAlt: "Client receiving an EMFACE treatment with facial applicators"
# In-hero кнопка BOOK NOW (Figma 1:6208, x=144 y=680). На мобайле скрыта —
# сразу под hero идёт straddle BOOK APPOINTMENT.
heroCtaLabel: "BOOK NOW"
heroCtaHideOnMobile: true

# Все CTA-band — overlap/straddle пилюли (#dbba5f / #8d7431), как в Figma.
# Figma даёт ровно 3 straddle BOOK APPOINTMENT: hero/whatIs (1:6251 y783),
# twoCol/areas (1:6324 y3005), before-FAQ (1:6327 y8136). Глушим дефолтные
# вставки и возвращаем точные швы opt-in флагами.
overlapCtas: true
suppressDefaultCtas: true
ctaAfterHero: true
ctaAfterTwoColumnText: true

# ---------- What is EMFACE? (photo left + body) ----------
whatIsTitle: "WHAT IS EMFACE™?"
whatIsImage: "/assets/images/services/emface/what-is.webp"
whatIsImageAlt: "EMFACE treatment device"
whatIsBody: |
  Emface is an advanced facial treatment that combines radiofrequency (RF) and high-intensity facial muscle stimulation (HIFES) to:

  _ Lift and tighten the skin
  _ Reduce wrinkles
  _ Improve facial contour
  _ Restore youthful structure

  Unlike traditional treatments that only target the skin, Emface works on both skin and muscle, addressing aging at a deeper level.

# ---------- How EMFACE works? / Benefit of EMFACE (two columns) ----------
twoColumnText:
  left:
    title: "HOW EMFACE™ WORKS?"
    body: |
      Emface uses synchronized technology to deliver two powerful effects:

      1. Radiofrequency (RF)
      Heats the dermal layers
      Stimulates collagen and elastin production
      Smooths fine lines and wrinkles

      2. HIFES Muscle Stimulation
      Contracts and strengthens facial muscles
      Lifts areas like cheeks, jawline, and brows
      Restores natural facial support
    tail: "The result is a lifted, firmer, and more youthful appearance—completely needle-free."
  right:
    title: "BENEFIT OF EMFACE™"
    body: "At Ideal Medical & Wellness, our clients love Emface because it delivers:"
    bullets:
      - "Non-invasive facial lifting"
      - "No needles or injections"
      - "No downtime or recovery"
      - "Natural looking results"
      - "Improved skin texture and elasticity"
      - "Enhanced facial symmetry"

# ---------- Categories grids: [0]=areas (gold), [1]=treatments (cream) ----------
categoriesGrids:
  - title: "WHAT AREAS CAN YOU TREAT WITH EMFACE™?"
    background: "gold"
    # Исходники area-*.webp — 409×500 (портрет); дефолтный landscape-aspect
    # обрезал их. Ставим родной портретный aspect (≈Figma near-square).
    imageAspectClass: "aspect-[409/500]"
    items:
      - title: "EYES"
        image: "/assets/images/services/emface/area-eyes.webp"
        imageAlt: "EMFACE treatment around the eyes"
      - title: "FACE"
        image: "/assets/images/services/emface/area-face.webp"
        imageAlt: "EMFACE treatment on the cheeks"
      - title: "FOREHEAD"
        image: "/assets/images/services/emface/area-forehead.webp"
        imageAlt: "EMFACE treatment on the forehead"
      - title: "JAWLINE"
        image: "/assets/images/services/emface/area-jawline.webp"
        imageAlt: "EMFACE treatment along the jawline"
      - title: "SUBMENTAL"
        image: "/assets/images/services/emface/area-submental.webp"
        imageAlt: "EMFACE treatment under the chin"
      - title: "TMJ"
        image: "/assets/images/services/emface/area-tmj.webp"
        imageAlt: "EMFACE treatment near the TMJ"
  - title: "EMFACE TREATMENTS ADDRESS"
    background: "cream"
    # Исходники treat-*.webp — 496×248 (Figma 1:6524-6529). 2:1 landscape.
    imageAspectClass: "aspect-[496/248]"
    items:
      - title: "WRINKLES"
        image: "/assets/images/services/emface/treat-wrinkles.webp"
        imageAlt: "Wrinkle reduction"
      - title: "MUSCLE LOSS"
        image: "/assets/images/services/emface/treat-muscle-loss.webp"
        imageAlt: "Facial muscle loss"
      - title: "COLLAGEN"
        image: "/assets/images/services/emface/treat-collagen.webp"
        imageAlt: "Collagen stimulation"
      - title: "SAGGY SKIN"
        image: "/assets/images/services/emface/treat-saggy-skin.webp"
        imageAlt: "Skin laxity"
      - title: "FAT REDUCTION"
        image: "/assets/images/services/emface/treat-fat-reduction.webp"
        imageAlt: "Facial fat reduction"
      - title: "GLP1 SKIN LAXITY"
        image: "/assets/images/services/emface/treat-glp1-skin-laxity.webp"
        imageAlt: "GLP-1 related skin laxity"

# ---------- Video #1: "EMFACE: Put on Your Game Face" ----------
videoEmbed:
  # «EMFACE: Put on Your Game Face» — взято с idealmedical.com/emface.
  url: "https://www.youtube.com/watch?v=BPYfUe9gYpE"
  posterImage: "/assets/images/services/emface/video-1-poster.webp"
  posterAlt: "EMFACE: Put on Your Game Face — video preview"
  # Figma Image 83 (1921×844) — видео край-в-край на десктопе.
  flush: true
  fullBleed: true

# ---------- Before / After (rendered after video #1, before treatments grid) ----------
beforeAfter:
  position: "after-video-1"
  # Figma node 1:6522 (Image 121) + стрелки Path 18/19 → карусель.
  # Заголовок в Figma продублирован копипастом («What areas…»); исправлен.
  title: "BEFORE & AFTER"
  carousel: true
  caption: "Representative before & after images, courtesy of the providers noted. Individual results vary."
  # Официальные BTL EMFACE before|after композит-карточки (BEFORE | AFTER +
  # caption впечатаны в картинку) — взяты с idealmedical.com/emface, режим image.
  items:
    - image: "/assets/images/services/emface/ba-female-submental.webp"
      alt: "Female submental before and after EMFACE"
    - image: "/assets/images/services/emface/ba-female-jawline.webp"
      alt: "Female jawline before and after EMFACE"
    - image: "/assets/images/services/emface/ba-female-forehead.webp"
      alt: "Female forehead before and after EMFACE"
    - image: "/assets/images/services/emface/ba-female-eyes.webp"
      alt: "Female eye area before and after EMFACE"
    - image: "/assets/images/services/emface/ba-female-face.webp"
      alt: "Female full-face before and after EMFACE"
    - image: "/assets/images/services/emface/ba-male-submental.webp"
      alt: "Male submental before and after EMFACE"
    - image: "/assets/images/services/emface/ba-male-jawline.webp"
      alt: "Male jawline before and after EMFACE"
    - image: "/assets/images/services/emface/ba-male-forehead.webp"
      alt: "Male forehead before and after EMFACE"

# ---------- Video #2: "Emface VIDEO Moa Animation" (after treatments grid) ----------
videoEmbed2:
  position: "after-second-grid"
  # «Emface VIDEO Moa Animation» — взято с idealmedical.com/emface.
  url: "https://www.youtube.com/watch?v=OZYeUAQYogo"
  posterImage: "/assets/images/services/emface/video-2-poster.webp"
  posterAlt: "EMFACE mechanism of action animation — video preview"
  # Figma Image 128 (1921×844) — видео край-в-край на десктопе.
  flush: true
  fullBleed: true

# ---------- FAQ (gold background, content pending from client) ----------
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

# CTA после видео #2, перед FAQ (Figma 1:6327)
ctaBeforeFaq: true

draft: false
category:
  - aesthetic
---
