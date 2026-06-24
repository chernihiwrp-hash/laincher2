#!/usr/bin/env python3
# =============================================================================
#  ZYNX — генератор лицензионных ключей (ТОЛЬКО ДЛЯ ТЕБЯ, не раздавай!)
#  Создаёт ключ с нужным сроком и кладёт его в Supabase.
#
#  Установка:  pip install requests
#  Запуск:     python keygen.py --days 30 --note "ник покупателя"
#              python keygen.py --months 12
#              python keygen.py --forever
# =============================================================================
import argparse, secrets, string, datetime, sys
import requests

# >>> ВПИШИ СВОИ ДАННЫЕ <<<
SUPABASE_URL = "https://ВАШ-ПРОЕКТ.supabase.co"
SERVICE_ROLE_KEY = "ВАШ_SERVICE_ROLE_КЛЮЧ"   # секретный! только локально

def gen_key():
    a = string.ascii_uppercase + string.digits
    return "-".join("".join(secrets.choice(a) for _ in range(4)) for _ in range(4))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=0)
    ap.add_argument("--months", type=int, default=0)
    ap.add_argument("--forever", action="store_true")
    ap.add_argument("--note", default="")
    ap.add_argument("--plan", default="standard")
    a = ap.parse_args()

    if a.forever:
        expires = None
    else:
        days = a.days + a.months * 30
        if days <= 0:
            print("Укажи срок: --days N / --months N / --forever"); sys.exit(1)
        expires = (datetime.datetime.utcnow() + datetime.timedelta(days=days)).isoformat() + "Z"

    key = gen_key()
    r = requests.post(
        f"{SUPABASE_URL}/rest/v1/license_keys",
        headers={"apikey": SERVICE_ROLE_KEY, "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
                 "Content-Type": "application/json", "Prefer": "return=representation"},
        json={"key": key, "plan": a.plan, "expires_at": expires, "note": a.note, "active": True},
        timeout=15,
    )
    if r.status_code in (200, 201):
        print("✅ Ключ создан:")
        print("   ", key)
        print("    срок:", expires or "бессрочно", "| план:", a.plan, "| note:", a.note or "—")
    else:
        print("❌ Ошибка:", r.status_code, r.text)

if __name__ == "__main__":
    main()
