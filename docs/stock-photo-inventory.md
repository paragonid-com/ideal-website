# Stock Photo & Image License Inventory

Список изображений в макете, требующих проверки прав / лицензирования.

## Легенда
- 🟡 **placeholder** — обнаружен в макете, лицензия не куплена/не проверена
- 🟢 **licensed** — лицензия куплена, в проекте лежит финальная версия
- 🔴 **trademark/legal** — требует юридического согласования
- ⚪ **not-stock** — оказалось не стоковым (фото клиники, команды, здания)
- 🟠 **third-party** — фото взято со стороннего сайта, точно нелицензированное

## ⚠️ Trademark concerns

На сайте используются зарегистрированные товарные знаки:

| Знак | Правообладатель | Где |
|---|---|---|
| Ozempic® | Novo Nordisk | BrandStrip (логотип) |
| Mounjaro® | Eli Lilly | BrandStrip (логотип) |
| EMFACE® | BTL Industries | Advanced Treatments + страница услуги |
| EMSCULPT NEO® | BTL Industries | Advanced Treatments + страница услуги |
| EMSELLA® | BTL Industries | Advanced Treatments + страница услуги |
| EXOMIND | BTL Industries | Advanced Treatments + New in 2026 + страница услуги |

**Юридические вопросы к клиенту:**
- Письменное разрешение от Novo Nordisk и Eli Lilly на использование логотипов?
- Авторизованное партнёрство с BTL Industries для использования brand assets?

Все места помечены `data-trademark` / `data-todo="trademark-review"`.

---

## Главная (`/` — Figma 1:1476) — пройдена полностью ✅

### Hero
| Файл | Имя в Figma | Источник | Статус |
|---|---|---|---|
| `hero-dna.png` | `premium_photo-1676418571848-e09bc69c405d` | Unsplash+ id=1676418571848 | 🟡 placeholder, водяной знак |

### Discover
| Файл | Имя в Figma | Реальный контент | Статус |
|---|---|---|---|
| `team-reception.png` | `istockphoto-1319189368` | Реальное фото команды у ресепшн | ⚪ имя плейсхолдера, факт — оригинал |

### BrandStrip (бренды препаратов)
| Файл | Содержимое | Статус |
|---|---|---|
| `brand-tesamorelin.png` | Текст "Tesamorelin" | ⚪ generic |
| `brand-ozempic.png` | Логотип **Ozempic®** | 🔴 trademark |
| `brand-nad.png` | Текст "NAD+" | ⚪ generic |
| `brand-mounjaro.png` | Логотип **Mounjaro®** | 🔴 trademark |

### Signature Services (5 карточек)
| Файл | Содержимое | Статус |
|---|---|---|
| `service-weight-loss.png` | Фотомодель | 🟡 placeholder |
| `service-hormone.png` | Золотая абстрактная текстура | 🟡 placeholder, ждём финальное |
| `service-peptide.png` | Золотая абстрактная текстура | 🟡 placeholder, ждём финальное |
| `service-sexual-health.png` | Лицо мужчины | 🟡 placeholder |
| `service-iv-therapy.png` | Золотая абстрактная текстура | 🟡 placeholder, ждём финальное |

### Who We Are (команда)
| Файл | Содержимое | Статус |
|---|---|---|
| `team-ksenia.png` | Dr. Ksenia P. — портрет | ⚪ оригинал |
| `team-kenneth.png` | Kenneth P. — портрет | ⚪ оригинал |
| `team-laudin.png` | Laudin P. — портрет | ⚪ оригинал |

### Advanced Treatments (4 BTL устройства)
| Файл | Содержимое | Источник | Статус |
|---|---|---|---|
| `treatment-emface.png` | EMFACE — устройство на лице | `Binsina-Skin-Laser-Clinic-Why-EMFACE` | 🟠 third-party (имя файла — другой клиники!) |
| `treatment-emsculpt.png` | EMSCULPT NEO — устройство на бедре | BTL marketing | 🔴 trademark BTL |
| `treatment-exomind.png` | EXOMIND — устройство и человек | BTL marketing | 🔴 trademark BTL |
| `treatment-emsella.png` | EMSELLA — кресло | BTL marketing | 🔴 trademark BTL |

### Testimonials (бейджи)
| Файл | Содержимое | Статус |
|---|---|---|
| `badge-google-5star.png` | Google logo + 5 stars | 🔴 trademark Google (можно использовать как customer testimonial если рейтинг реален) |
| `badge-best-of-2025.png` | "Best of 2025 BusinessRate" | 🟡 проверить подлинность награды |

### New in 2026
| Файл | Содержимое | Статус |
|---|---|---|
| `new2026-bg.png` | Тёмно-синий с золотом фон | 🟡 декоративный, источник неизвестен |
| `new2026-brain.png` | Полупрозрачное изображение мозга/головы | 🟡 декоративный, источник неизвестен |

### Start Your Transformation
| Файл | Содержимое | Статус |
|---|---|---|
| `building-clinic.png` | Здание клиники | ⚪ оригинал, реальное здание |

---

## Остальные страницы — не пройдены

- [ ] `/services/weight-loss` (1:1919) — частично инвентаризировано, 2 iStock id найдено
- [ ] `/services/regenerative` (1:2444)
- [ ] `/services/bloodwork` (1:2829)
- [ ] `/services/exomind` (1:3218)
- [ ] `/services/hormone` (1:3708)
- [ ] `/services/peptide` (1:5026)
- [ ] `/services/emsella` (1:5436)
- [ ] `/services/emsculpt` (1:5795)
- [ ] `/services/ivtherapy` (1:6189)
- [ ] `/services/emface` (1:6536)
- [ ] `/services/sexualhealth` (1:7461)
- [ ] `/blog` (1:6840)
- [ ] `/aboutus` (1:7077)
- [ ] `/contact` (1:7682)

---

## Что делать перед продакшеном (универсально)

1. Открыть исходный сервис (iStock/Unsplash/Shutterstock) по найденному ID
2. Проверить лицензию (Standard / Extended) и стоимость
3. Купить → заменить файл в проекте на финальную версию
4. Документ-лицензию положить в облако клиента
5. Для trademark — получить письменное разрешение или заменить логотип
