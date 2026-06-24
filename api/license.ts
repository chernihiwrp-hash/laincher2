// =============================================================================
//  /api/license  —  проверка лицензионного ключа ZYNX
//  Стек: Vercel (Edge/Node) + Supabase. Вся логика на СЕРВЕРЕ — клиент ничего
//  не решает сам, поэтому патчить .exe бессмысленно для обхода срока.
//
//  ENV (Vercel → Settings → Environment Variables):
//    SUPABASE_URL              = https://xxxx.supabase.co
//    SUPABASE_SERVICE_ROLE_KEY = <service_role ключ>  (НИКОГДА не в клиенте!)
// =============================================================================
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS / только POST
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, reason: "method" });

  const { key, hwid } = (req.body || {}) as { key?: string; hwid?: string };
  if (!key || !hwid) return res.status(400).json({ ok: false, reason: "invalid" });

  // ищем ключ
  const { data: row, error } = await supabase
    .from("license_keys")
    .select("id, expires_at, hwid, active")
    .eq("key", key.trim())
    .single();

  if (error || !row) return res.status(200).json({ ok: false, reason: "invalid" });
  if (!row.active) return res.status(200).json({ ok: false, reason: "invalid" });

  const now = Date.now();
  const exp = row.expires_at ? new Date(row.expires_at).getTime() : 0;
  if (exp && now > exp) return res.status(200).json({ ok: false, reason: "expired" });

  // привязка к ПК: первый запуск связывает ключ с hwid, дальше — только этот ПК
  if (!row.hwid) {
    await supabase.from("license_keys").update({ hwid, activated_at: new Date().toISOString() }).eq("id", row.id);
  } else if (row.hwid !== hwid) {
    return res.status(200).json({ ok: false, reason: "hwid_mismatch" });
  }

  // лог проверки (необязательно)
  await supabase.from("license_checks").insert({ key_id: row.id, hwid, at: new Date().toISOString() });

  return res.status(200).json({
    ok: true,
    expires: exp ? Math.floor(exp / 1000) : 0, // unix seconds (0 = бессрочно)
  });
}
