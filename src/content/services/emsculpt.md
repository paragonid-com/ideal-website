---
seoTitle: "EMSCULPT NEO® in Aventura, FL | Ideal Medical & Wellness"
seoDescription: "Get the body you want with EMSCULPT NEO® — non-invasive body shaping at Ideal Medical & Wellness in Aventura. Burn fat and build muscle in just 30 minutes."

heroTitle: "GET THE BODY\nYOU WANT\nEMSCULPT NEO™"
heroLead: "Non-invasive body shaping treatment that combines radiofrequency and high-intensity focused electromagnetic technology to simultaneously burn fat and build muscle."
heroImage: "/assets/images/services/emsculpt/hero.webp"
heroImageAlt: "Patient wearing Emsculpt Neo applicator — body shaping treatment"

# 4 кнопки BOOK APPOINTMENT в Figma стоят straddle-пилюлями ровно на швах секций
# (узлы 1:5564 Hero/WhatIs y≈814; 1:5567 WhatIs/Grid1 y≈1815; 1:5570 ExtendedDesc/
# Grid2 y≈4445; 1:5573 BeforeAfter/FAQ y≈6154) — как на weight-loss/hormone.
overlapCtas: true

# === "What is X?" с ЛЕВЫМ фото — узел Figma 1:5512 (заголовок) + 1:5533 (body),
#     фото слева — узел 1:5473/1:5477 «Emsculpt-outer-thighs», слот 923×766.
#     Секция «EMSCULPT NEO» y 814→1913 = 1099px при ширине 1920 → aspect-[1920/1099].
#     Фото-колонка ~48% (923/1920) держит near-square пропорцию 923/766 и центрируется
#     по высоте (items-center) → cream-поля сверху/снизу как в Figma. vw-clamp шрифты.
whatIsTitle: "EMSCULPT\nNEO™"
whatIsImage: "/assets/images/services/emsculpt/what-is.webp"
whatIsImageAlt: "Practitioner performing an Emsculpt Neo body shaping treatment with the large applicator"
whatIsHeight: "lg:aspect-[1920/1099]"
whatIsGridCols: "lg:grid-cols-[48fr_52fr]"
whatIsAlign: "items-center"
whatIsImageSide: "right"
whatIsImageAspect: "lg:aspect-[923/766]"
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: "Emsculpt Neo is the first and only non-invasive body shaping treatment that combines radiofrequency and high-intensity focused electromagnetic (HIFEM) technology to simultaneously burn fat and build muscle in just 30 minutes."

# === Две Categories Grid:
#   1) "WHAT EMSCULPT NEO IS FOR" (узел 1:5542) — gold backdrop (1:5484 GOLD BACK),
#      3 категории, фото сверху, только заголовки под ними (без body в Figma).
#   2) "CUSTOMIZE YOUR TREATMENT" (1:5543) — gold backdrop (1:5489), 3 категории,
#      фото + заголовок + body-описание.
categoriesGrids:
  - title: "WHAT EMSCULPT NEO™ IS FOR"
    background: "gold"
    items:
      - title: "BODY SCULPTING"
        image: "/assets/images/services/emsculpt/category-body-sculpting.webp"
        imageAlt: "Body sculpting treatment area"
      - title: "FUNCTIONAL WELLNESS"
        image: "/assets/images/services/emsculpt/category-functional-wellness.webp"
        imageAlt: "Functional wellness treatment area"
      - title: "CORE TO FLOOR"
        image: "/assets/images/services/emsculpt/category-core-to-floor.webp"
        imageAlt: "Core to floor treatment area"
  - title: "CUSTOMIZE YOUR TREATMENT"
    background: "gold"
    items:
      - title: "LARGE APPLICATOR"
        body: "Targets large body areas such as abdomen, buttock, thighs and back."
        image: "/assets/images/services/emsculpt/applicator-large.webp"
        imageAlt: "Large Emsculpt Neo applicator"
      - title: "EDGE APPLICATOR"
        body: "Treats four fat spots and oblique muscles in 30 minutes."
        image: "/assets/images/services/emsculpt/applicator-edge.webp"
        imageAlt: "Edge Emsculpt Neo applicator"
      - title: "SMALL APPLICATOR"
        body: "Designed to treat smaller and curved areas such as arms and legs."
        image: "/assets/images/services/emsculpt/applicator-small.webp"
        imageAlt: "Small Emsculpt Neo applicator"

# === YouTube видео — узел Figma 1:5511 (постер). URL клиента (live idealmedical.com/emsculpt-neo).
# flush: убираем вертикальный padding секции → края iframe совпадают с началом/концом секции (Figma).
videoEmbed:
  url: "https://youtu.be/emRdWYIOuYc"
  posterImage: "/assets/images/services/emsculpt/video-poster.webp"
  posterAlt: "Emsculpt Neo treatment video"
  flush: true

# === Extended Description — узлы Figma 1:5451, 1:5454.
extendedDescription:
  title: "EMSCULPT NEO™\nMORE FOR LESS IN BODY SHAPING"
  body: |
    Emsculpt Neo delivers powerful energy that heats fat cells to encourage permanent elimination while contracting muscles at a level impossible to achieve with exercise alone.

    Whether you're looking to sculpt your abs, lift and tone your buttocks, define your arms, or strengthen your thighs, Emsculpt Neo provides noticeable results with no downtime, surgery, or needles. Clinical studies show an average of 30% fat reduction and 25% muscle growth, making it one of the most effective body contouring treatments available today.

    Perfect for men and women of all fitness levels, Emsculpt Neo helps you achieve a stronger, leaner, and more confident body—quickly, safely, and effectively.

# === Before / After — карусель (Figma 1:5559 + стрелки 1:5505/1:5506).
# Источник: live idealmedical.com/emsculpt-neo, секция «Real Patients Real Results» —
# официальные BTL composite-карточки (BEFORE | AFTER + caption впечатаны в картинку),
# поэтому режим `image`. Горизонтальный scroll-snap + gold-стрелки (carousel: true).
beforeAfter:
  title: "REAL PATIENTS, REAL RESULTS"
  carousel: true
  items:
    - image: "/assets/images/services/emsculpt/ba-female-abdomen.webp"
      alt: "Female abdomen before and after Emsculpt Neo — courtesy of Barry DiBernardo, M.D."
    - image: "/assets/images/services/emsculpt/ba-male-abdomen.webp"
      alt: "Male abdomen before and after Emsculpt Neo — courtesy of David Kent, M.D."
    - image: "/assets/images/services/emsculpt/ba-female-buttock.webp"
      alt: "Female buttock before and after Emsculpt Neo — courtesy of Bruce E. Katz, M.D."
    - image: "/assets/images/services/emsculpt/ba-male-buttock.webp"
      alt: "Male buttock before and after Emsculpt Neo — courtesy of JD McCoy, N.M.D."
    - image: "/assets/images/services/emsculpt/ba-female-arms.webp"
      alt: "Female arms before and after Emsculpt Neo — courtesy of Robert Weiss, M.D."
    - image: "/assets/images/services/emsculpt/ba-female-thighs.webp"
      alt: "Female outer thighs before and after Emsculpt Neo"

# === FAQ — Lorem ipsum placeholder в Figma (узлы 1:5493-1:5497)
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

# CTA после before/after, перед FAQ (Figma 1:5573)
ctaBeforeFaq: true

draft: false
category:
  - wellness
  - aesthetic
---
