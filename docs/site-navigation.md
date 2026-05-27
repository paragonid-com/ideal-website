# Site Navigation Map

Структура навигации на основе 4 артбордов меню в Figma (`/menu-1`, `/menu-2`,
`/menu-3`, `/menu-4`). Используется в компоненте `Header` (раскрытое overlay-меню).

## Поведение

- На всех страницах в правом верхнем углу — иконка-burger (узел Figma `Group 6` / `Group 9`)
- Клик по burger → раскрывается полноэкранный overlay (как на скриншотах menu-1..4)
- Overlay имеет:
  - Лого IDEAL слева сверху (узел `Group 321`)
  - Кнопку закрытия (X) справа сверху
  - 3 основных пункта по центру слева (Wellness Services / Aesthetic Services / About Us)
  - Подменю справа от выбранного пункта (раскрывается при наведении)
  - CTA-кнопка BOOK APPOINTMENT под пунктами
  - Полная футер-информация снизу (адрес, Quick Links, Subscribe)

## Структура

```
WELLNESS SERVICES          (наведение → раскрывает 9 пунктов справа)
├── Medical Weight Loss    → /services/weight-loss
├── Hormone Optimization   → /services/hormone
├── Peptide Therapy        → /services/peptide
├── Emsella                → /services/emsella
├── Emsculpt Neo           → /services/emsculpt       ⚠️ дубликат с Aesthetic
├── Exomind                → /services/exomind
├── IV Therapy             → /services/ivtherapy
├── Blood Work             → /services/bloodwork
└── PRP & Allograft        → /services/regenerative

AESTHETIC SERVICES         (наведение → раскрывает 2 пункта справа)
├── Emsculpt Neo           → /services/emsculpt       ⚠️ дубликат с Wellness
└── Emface                 → /services/emface

ABOUT US                   (наведение → раскрывает 2 пункта справа)
├── Blog                   → /blog
└── Contact                → /contact

[CTA] BOOK APPOINTMENT     → /contact (или внешний Calendly/etc.)
```

## ⚠️ Открытые вопросы по навигации

1. **Emsculpt Neo дублируется** в Wellness Services и Aesthetic Services.
   В стандартном меню обычно элемент в одном месте. Спросить заказчика:
   - вести оба пункта на один и тот же URL `/services/emsculpt`?
   - или сделать два разных URL: `/services/emsculpt-wellness` и `/services/emsculpt-aesthetic`?

2. **Sexual Health отсутствует в меню.**
   В Figma есть готовая страница `/sexualhealth` (узел 1:7461), но она нигде
   не указана в меню. Спросить заказчика:
   - добавить в Wellness Services?
   - оставить, но не выводить в меню (приходят только по прямой ссылке/из карточки на главной)?

3. **Categorization вопрос.** Заказчик уверен, что:
   - PRP & Allograft = `/regenerative`?
   - Blood Work = `/bloodwork`?
   Имена в меню и URL немного расходятся, надо подтвердить.

4. **BOOK APPOINTMENT** — куда ведёт?
   - На страницу `/contact`?
   - На якорь формы внизу любой страницы?
   - На внешнюю систему записи (Calendly, NexHealth, Mindbody)?

5. **Мобильное меню** — будет ли такой же overlay на узких экранах,
   или нужен accordeon-вариант? (ждём мобильные макеты от дизайнеров)
