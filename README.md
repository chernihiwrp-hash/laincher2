# ZYNX KEYS — сервер лицензий + панель (Vercel)

## Структура (файлы в КОРНЕ репозитория!)
```
index.html        → панель открывается по /  (и по /admin.html)
admin.html        → копия панели
api/license.ts    → проверка ключа клиентом   (/api/license)
api/admin-keys.ts → управление ключами        (/api/admin-keys)
package.json
docs/             → SQL, генератор, инструкции
```
БЕЗ vercel.json — Vercel сам раздаёт статику из корня и поднимает функции из api/.

## Деплой
1. **Supabase** → SQL Editor → выполни `docs/keys_schema.sql`.
   Скопируй Project URL и service_role secret.
2. Залей репо на **Vercel** (Framework Preset = **Other**, build не нужен).
3. **Settings → Environment Variables**:
   ```
   SUPABASE_URL              = https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY = <service_role secret>
   ADMIN_TOKEN               = <пароль панели>
   ```
   → **Redeploy**.
4. Открой:
   - `https://твой-проект.vercel.app/`            → панель
   - `https://твой-проект.vercel.app/api/admin-keys` → должно вернуть
     `{"ok":false,"reason":"unauthorized"}` (это норма = маршрут найден)

## Если ВСЁ ещё 404
- Проверь, что файлы лежат в КОРНЕ репо, а не внутри лишней папки
  (на GitHub в корне сразу видно `index.html`, `api/`, `package.json`).
- Открывай именно `/` или `/admin.html`, а не случайный путь.
- `/api/license` и `/api/admin-keys` — это POST-функции; в браузере (GET)
  они вернут 401/405, но НЕ 404. Если 404 — функции не задеплоились
  (значит папка `api/` лежит не в корне).

## Клиент
В `license_gate.py`:  `LICENSE_API = "https://твой-проект.vercel.app/api/license"`
