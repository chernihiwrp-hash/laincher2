-- =============================================================================
--  ZYNX — таблицы лицензий (выполнить в Supabase → SQL Editor)
-- =============================================================================

create table if not exists license_keys (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,
  plan         text default 'standard',          -- standard / vip / ...
  expires_at   timestamptz,                       -- null = бессрочно
  hwid         text,                              -- привязка к ПК (ставится при 1-й активации)
  active       boolean default true,              -- можно отключить ключ вручную
  note         text,                              -- кому выдан и т.п.
  created_at   timestamptz default now(),
  activated_at timestamptz
);

create table if not exists license_checks (
  id      bigserial primary key,
  key_id  uuid references license_keys(id) on delete cascade,
  hwid    text,
  at      timestamptz default now()
);

-- ВАЖНО: доступ к таблицам только через service_role (с сервера).
-- Включаем RLS и НЕ создаём публичных политик — значит, анонимно читать/писать нельзя.
alter table license_keys   enable row level security;
alter table license_checks enable row level security;

-- сброс привязки ключа к ПК (если человек сменил комп) — выполнять вручную:
--   update license_keys set hwid = null where key = 'XXXX-XXXX-XXXX-XXXX';

-- отключить ключ:
--   update license_keys set active = false where key = 'XXXX-XXXX-XXXX-XXXX';
