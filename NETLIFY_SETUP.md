# Настройка Netlify для todos приложения

## Изменения в коде

Единственное изменение: Airtable токен вынесен в переменную окружения.

**Было:**
```javascript
"Authorization": `Bearer patUICwnkk9q8SnFv...` (хардкод)
```

**Стало:**
```javascript
const AIRTABLE_TOKEN = process.env.REACT_APP_AIRTABLE_TOKEN || '';
"Authorization": `Bearer ${AIRTABLE_TOKEN}`
```

## Что нужно сделать на Netlify

### 1. Добавить переменную окружения

В настройках сайта на Netlify:
- Перейдите в **Site settings** → **Environment variables**
- Добавьте переменную:
  - **Key**: `REACT_APP_AIRTABLE_TOKEN`
  - **Value**: `patUICwnkk9q8SnFv.da5a8cd0d87db095995b1c1b3a14458bf37af437b713777457c78ea771dfd11b`
  - **Scopes**: Все (Production, Deploy previews, Branch deploys)

### 2. Обновить подключение к репозиторию (если нужно)

Если Netlify подключен к старому репозиторию:
- Перейдите в **Site settings** → **Build & deploy** → **Continuous Deployment**
- Обновите подключение на новый репозиторий: `abaevpavel/brcom_form`

### 3. Сделать новый деплой

После добавления переменной окружения:
- Сделайте **Trigger deploy** → **Deploy site**
- Или закоммитьте любой пустой коммит, чтобы триггернуть автодеплой

## Проверка

После деплоя убедитесь, что:
1. ✅ Сайт собирается без ошибок
2. ✅ Формы загружают данные из Airtable
3. ✅ Отправка данных в Integromat работает

## Важно

- Токен должен быть доступен на всех окружениях (Production, Preview, Branch deploys)
- Название переменной **обязательно** должно начинаться с `REACT_APP_` для React приложений





