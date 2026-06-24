// =============================================================================
//  /api/admin-keys  —  управление ключами из веб-панели
//  Защищён ADMIN_TOKEN (заголовок x-admin-token). Без него — 401.
//
//  ENV (Vercel):
//    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//    ADMIN_TOKEN = придумай длинный секрет (это пароль от панели)
// =============================================================================
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

function genKey(): string {
  const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part = () => Array.from({ length: 4 }, () => a[Math.floor(Math.random() * a.length)]).join("");
  return `${part()}-${part()}-${part()}-${part()}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-admin-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  // авторизация
  if (req.headers["x-admin-token"] !== process.env.ADMIN_TOKEN)
    return res.status(401).json({ ok: false, reason: "unauthorized" });

  // СПИСОК ключей
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("license_keys")
      .select("id, key, plan, expires_at, hwid, active, note, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) return res.status(500).json({ ok: false, reason: error.message });
    return res.status(200).json({ ok: true, keys: data });
  }

  if (req.method === "POST") {
    const { action } = (req.body || {}) as any;

    // СОЗДАТЬ ключ
    if (action === "create") {
      const { days = 0, months = 0, forever = false, note = "", plan = "standard" } = req.body;
      let expires_at: string | null = null;
      if (!forever) {
        const d = Number(days) + Number(months) * 30;
        if (d <= 0) return res.status(400).json({ ok: false, reason: "no_term" });
        expires_at = new Date(Date.now() + d * 86400000).toISOString();
      }
      const key = genKey();
      const { error } = await supabase.from("license_keys").insert({ key, plan, expires_at, note, active: true });
      if (error) return res.status(500).json({ ok: false, reason: error.message });
      return res.status(200).json({ ok: true, key, expires_at });
    }

    // ОТКЛЮЧИТЬ / ВКЛЮЧИТЬ
    if (action === "toggle") {
      const { id, active } = req.body;
      const { error } = await supabase.from("license_keys").update({ active }).eq("id", id);
      if (error) return res.status(500).json({ ok: false, reason: error.message });
      return res.status(200).json({ ok: true });
    }

    // СБРОСИТЬ привязку к ПК
    if (action === "reset_hwid") {
      const { id } = req.body;
      const { error } = await supabase.from("license_keys").update({ hwid: null }).eq("id", id);
      if (error) return res.status(500).json({ ok: false, reason: error.message });
      return res.status(200).json({ ok: true });
    }

    // УДАЛИТЬ
    if (action === "delete") {
      const { id } = req.body;
      const { error } = await supabase.from("license_keys").delete().eq("id", id);
      if (error) return res.status(500).json({ ok: false, reason: error.message });
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ ok: false, reason: "bad_action" });
  }

  return res.status(405).json({ ok: false, reason: "method" });
}
