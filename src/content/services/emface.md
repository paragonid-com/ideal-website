---
seoTitle: "EMFACE in Aventura | Ideal Medical & Wellness"
seoDescription: "EMFACE in Aventura, FL — an FDA-cleared, non-invasive treatment to lift, tone, and smooth your face without needles, fillers, or downtime. Individual results vary."

heroTitle: "EMFACE\nin Aventura"
heroLead: "At Ideal Medical & Wellness, we offer Emface — an FDA-cleared, non-invasive facial treatment designed to lift, tone, and smooth your face, without needles, fillers, or downtime.\n\nIf you want a refreshed, natural-looking appearance without invasive procedures, Emface is a modern approach to facial aesthetics. Individual results vary."
heroImage: "/assets/images/services/emface/hero.webp"
heroImageAlt: "Client receiving an EMFACE treatment with facial applicators"
heroMobileStacked: true
heroMobileImagePosition: "object-[82%_center]"
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
whatIsTitle: "WHAT IS EMFACE?"
whatIsImage: "/assets/images/services/emface/what-is.webp"
whatIsImageAlt: "EMFACE treatment device"
whatIsImageContain: true
whatIsImageMobile: "/assets/images/services/emface/what-is-mobile.webp"
whatIsHeight: "lg:min-h-0"   # desktop: image column matches right-side content height (not forced 940px)
whatIsBody: |
  Emface is an advanced facial treatment that combines radiofrequency (RF) with high-intensity facial muscle stimulation (HIFES) to:

  _ Lift and tighten the skin
  _ Soften the look of wrinkles
  _ Improve facial contour
  _ Support a more youthful structure

  Unlike treatments that work on the skin alone, Emface addresses both the skin and the underlying facial muscles.

# ---------- How EMFACE works? / Benefit of EMFACE (two columns) ----------
twoColumnText:
  left:
    title: "HOW EMFACE WORKS?"
    body: |
      Emface uses synchronized technology to deliver two effects at once:

      1. Radiofrequency (RF) — gently heats the deeper layers of skin and supports the body's natural collagen and elastin, helping to smooth fine lines.

      2. HIFES Muscle Stimulation — activates and tones facial muscles, helping to lift the cheeks, jawline, and brow area and support the face's natural structure.
    tail: "The result is a lifted, firmer, more refreshed look — completely needle-free. Individual results vary."
  right:
    title: "BENEFIT OF EMFACE"
    body: "At Ideal Medical & Wellness, our clients love Emface because it delivers:"
    bullets:
      - "Non-invasive facial lifting"
      - "No needles or injections"
      - "No downtime or recovery"
      - "Natural-looking results"
      - "Improved skin texture and elasticity"
      - "Enhanced facial balance"

# ---------- Categories grids: [0]=areas (gold), [1]=treatments (cream) ----------
categoriesGrids:
  - title: "WHAT AREAS CAN YOU TREAT WITH EMFACE?"
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
      - title: "JAW"
        image: "/assets/images/services/emface/area-tmj.webp"
        imageAlt: "EMFACE treatment along the jaw and masseter area"
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
        # Loose skin после GLP-1 похудения — внутренняя перелинковка на Weight Loss.
        href: "/services/weight-loss"

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

# ---------- FAQ — 5 compliant Q&A (client-доку IDEAL-emface-live-structure-rewrite) ----------
faq:
  - question: "What is Emface, and is it FDA-cleared?"
    answer: "Emface is an FDA-cleared, non-invasive facial treatment that combines radiofrequency and HIFES muscle stimulation to lift and tone the face — with no needles and no downtime."
  - question: "Does Emface hurt, and is there any downtime?"
    answer: "Most people find Emface comfortable, describing a warming sensation along with light muscle contractions. There's no downtime, so you can return to your day right away."
  - question: "How many Emface sessions will I need, and when will I see results?"
    answer: "Emface is typically done as a short series of sessions. Many people notice gradual improvement in the weeks following their treatments, with continued change over time. Individual results vary, and your provider will recommend a plan suited to you."
  - question: "Who is a good candidate for Emface?"
    answer: "Emface suits adults looking for a non-invasive way to lift, tone, and refresh the face without surgery or injectables. During a consultation, your provider will confirm whether it's right for your goals and skin."
  - question: "How is Emface different from a facelift or fillers?"
    answer: "Emface is non-surgical and needle-free, and it works on both the skin and the facial muscles. Results tend to be natural and gradual rather than the dramatic change of surgery. It's a different approach, not a replacement for a surgical facelift; individual results vary."

stars:
  hero: true

# CTA после видео #2, перед FAQ (Figma 1:6327)
ctaBeforeFaq: true

draft: false
category:
  - aesthetic
---
