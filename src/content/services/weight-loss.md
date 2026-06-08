---
seoTitle: "Medical Weight Loss in Aventura, FL | Ideal Medical & Wellness"
seoDescription: "Physician-supervised medical weight loss in Aventura, FL — personalized, monitored programs with realistic, individualized goals. Book a consultation; individual results vary."

heroTitle: |
  Medical
  Weight Loss
heroLead: >-
  If losing weight has been difficult, a medically supervised program may help
  you reach a healthier weight and maintain it. Medical weight loss is an
  increasingly popular, personalized approach — built around your body, your
  history, and your goals. Individual results vary.
heroImage: "/assets/images/services/weight-loss/hero.webp"
heroImageAlt: "Cropped slim female torso illustrating healthy body composition"
# Мобайл: фото баннером сверху, текст снизу на cream (у этого фото левая часть —
# пустая стена, при оверлее текст лёг бы поверх торса справа → плохо читается).
heroMobileStacked: true
heroMobileImagePosition: "object-[60%_center]"

# CTA-баны Weight Loss идут straddle-пилюлями ровно на швах секций (Figma узлы
# 1:1685 / 1:1688 / 1:1691 — центр на y≈814 / 1913 / 3404), как на hormone.
overlapCtas: true

whatIsTitle: |
  What is Medical
  Weight Loss?
whatIsImage: "/assets/images/services/weight-loss/what-is.webp"
whatIsImageAlt: "Close-up of a person self-administering a weight loss injection"
# Пропорция блока = Figma-секция (y 814→1913 = 1099 при ширине 1920). Фото слева
# ~48% (узел 1:1545 = 923/1920). В Figma фото НЕ на всю высоту: clip 923×939 при
# y=895..1834 → ~80px cream сверху и снизу. Поэтому items-center + whatIsImageAspect
# lg:aspect-[923/939]: фото держит near-square пропорцию и центрируется по высоте
# блока, давая поля сверху/снизу как в Figma. vw-clamp шрифты масштабируются с блоком.
whatIsHeight: "lg:aspect-[1920/1099]"
whatIsGridCols: "lg:grid-cols-[48fr_52fr]"
whatIsAlign: "items-center"
whatIsImageSide: "left"
whatIsImageAspect: "lg:aspect-[923/939]"
whatIsHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whatIsBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whatIsBody: |
  Medical weight loss uses medically supervised interventions — alongside improvements to nutrition and activity — to help you lose weight and support your physical, mental, and emotional wellbeing for a more balanced lifestyle.

  At Ideal Medical & Wellness, we look closely at each individual and how they respond, then build a plan tailored to you. Our programs may include prescription medications such as semaglutide, tirzepatide, and tesamorelin, prescribed when medically appropriate. We're a concierge program and aim for the lowest effective dose for each person, which can help limit side effects.

  Programs are designed and supervised by our clinical team, with regular check-ins to support you along the way. Medical weight loss is best suited to those who are ready to commit to a tailored, sustainable plan.

benefitsTitle: |
  What Are the Benefits of
  Medical Weight Loss?
# Figma раскладка карточек — 2 сверху / 3 снизу (узлы 1:1600/1:1609 верх; 1:1603/
# 1:1612/1:1606 низ). topRowCount: 2 → два центрированных ряда.
benefitsTopRowCount: 2
benefitsIntro: >-
  The main benefit of medical weight loss is weight loss, especially if getting
  to your ideal weight has been challenging. However, medical weight loss
  programs offer a multitude of health and confidence-boosting benefits to
  patients, including:
benefits:
  - title: "A Tailored Treatment"
    description: >-
      Each plan addresses the factors contributing to weight gain, with a
      customized approach and support for healthier eating and activity.
    icon: "../../assets/services/weight-loss/icon-tailored.png"
    iconAlt: "Tailored treatment icon"
  - title: "Physician-Supervised"
    description: >-
      The medications we may use (such as semaglutide, tirzepatide, and
      tesamorelin) are well studied, prescribed only when appropriate, and
      monitored by our team throughout your program.
    icon: "../../assets/services/weight-loss/icon-safe.png"
    iconAlt: "Safe and effective icon"
  - title: "A Complete Wellness Program"
    description: >-
      Weight loss is just one part. We evaluate your overall health with lab
      tests, medical evaluations, and ongoing support.
    icon: "../../assets/services/weight-loss/icon-complete.png"
    iconAlt: "Complete wellness program icon"
  - title: "Support for Overall Wellbeing"
    description: >-
      Many people report better energy, sleep, and day-to-day comfort as they
      reach a healthier weight; individual results vary.
    icon: "../../assets/services/weight-loss/icon-health.png"
    iconAlt: "Improved overall health icon"
  - title: "Long-Term Health Goals"
    description: >-
      Reaching and maintaining a healthier weight is broadly associated with
      better overall health. Your provider will discuss what's realistic for
      you.
    icon: "../../assets/services/weight-loss/icon-quality.png"
    iconAlt: "Improved quality of life icon"

whoForTitle: |
  Who is Medical
  Weight Loss For?
whoForImage: "/assets/images/services/weight-loss/who-is-for.webp"
whoForImageAlt: "Person consulting with medical professional about weight loss program"
# Пропорция блока = Figma-секция (y 3404→4397 = 993 при ширине 1920, aspect ≈1.93).
# Высоту задаёт ФОТО: whoForImageAspect lg:aspect-[996/993] (узел 1:1647 = 996×993,
# near-square) — object-cover кропит портрет в квадрат, и это надёжно держит
# пропорцию на любой ширине (текст короче фото). items-center центрирует текст
# по высоте фото; vw-clamp шрифты. whoForHeight '' — без min-h/aspect на гриде.
whoForHeight: ""
whoForGridCols: "lg:grid-cols-[48fr_52fr]"
whoForAlign: "items-center"
whoForHeadingClass: "text-[clamp(28px,3.23vw,62px)] leading-[1.05]"
whoForBodyClass: "text-[clamp(16px,1.09vw,21px)] leading-[1.5]"
whoForImageMinH: ""
whoForImageAspect: "lg:aspect-[996/993]"
whoForLead: |
  Medical weight loss is best for people who are serious about losing weight and getting healthier. A licensed provider determines whether the program is appropriate for you.

  It may be right for you if:
whoForBullets:
  - "Your body mass index (BMI) is 30 or higher — or 27+ with conditions such as high blood pressure, diabetes, or high cholesterol"
  - "You've tried to lose weight on your own, only to regain it"
  - "You have more than ~20 pounds to lose"
  - "You're ready to commit to lasting, healthier habits"

resultsTitle: "THE RESULTS"
resultsBody: |
  Everyone is different, and results with medical weight loss vary by person, starting point, and commitment. Rather than promising a set rate of loss, your provider sets realistic, individualized goals with you and monitors your progress.

  We focus on steady, sustainable change and adjust your plan based on how your body responds, not on a fixed weekly number.

  You'll have regular check-ins for support throughout the program. Individual results vary and are not guaranteed.

faq:
  - question: "How Much Does Medical Weight Loss Cost?"
    answer: "Cost depends on your specific program and medication, which we'll review transparently during your consultation. Flexible monthly financing is available through Cherry."
  - question: "Why is it important that my medical weight loss program be tailored for me?"
    answer: "Because people respond differently, an individualized plan — including the medication, dose, and support that fit you — improves both safety and results. We adjust as we learn how your body responds."
  - question: "Once I lose the weight, how can I keep it off?"
    answer: "Lasting results come from sustainable habits, not just medication. We build nutrition, activity, and a maintenance plan into your program, with ongoing support. Individual results vary."
  - question: "How can I choose between the different medical weight loss options available?"
    answer: "You don't choose alone — your provider recommends an approach based on your health history, goals, and how you tolerate treatment. Not every option is right for every person."
  - question: "What side effects can I experience with medical weight loss?"
    answer: "Weight-loss medications can have side effects, most commonly gastrointestinal symptoms such as nausea. We use the lowest effective dose and monitor you throughout, and your provider will review the risks with you. Contact us about any side effects that concern you."

draft: false
category:
  - wellness
---
