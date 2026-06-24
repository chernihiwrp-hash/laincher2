<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ZYNX — Ключи</title>
<style>
  :root{ --acc:#ff2d78; --bg:#0b0c11; --card:rgba(255,255,255,.04); --line:rgba(255,255,255,.10); --mut:#8a8c98; }
  *{ box-sizing:border-box; font-family:'Segoe UI',system-ui,sans-serif; }
  body{ margin:0; background:radial-gradient(1200px 600px at 70% -10%, #1a0f18, var(--bg)); color:#eef0f6; min-height:100vh; }
  .wrap{ max-width:1040px; margin:0 auto; padding:34px 20px 80px; }
  h1{ font-size:26px; letter-spacing:2px; margin:0 0 4px; }
  .sub{ color:var(--mut); font-size:13px; margin-bottom:26px; }
  .card{ background:var(--card); border:1px solid var(--line); border-radius:16px; padding:20px; margin-bottom:18px; backdrop-filter:blur(8px); }
  label{ display:block; font-size:11px; color:var(--mut); text-transform:uppercase; letter-spacing:1px; margin:10px 0 6px; }
  input,select{ width:100%; background:rgba(255,255,255,.05); border:1px solid var(--line); border-radius:10px; color:#fff; padding:11px 13px; font-size:14px; }
  .row{ display:flex; gap:12px; flex-wrap:wrap; }
  .row>div{ flex:1; min-width:120px; }
  button{ background:var(--acc); color:#fff; border:none; border-radius:11px; padding:12px 20px; font-weight:800; font-size:13px; cursor:pointer; transition:.15s; }
  button:hover{ filter:brightness(1.12); }
  button.ghost{ background:rgba(255,255,255,.06); border:1px solid var(--line); color:#cfd0d8; font-weight:700; }
  button.tiny{ padding:6px 12px; font-size:11px; border-radius:8px; }
  table{ width:100%; border-collapse:collapse; font-size:13px; }
  th{ text-align:left; color:var(--mut); font-weight:600; font-size:11px; text-transform:uppercase; padding:8px 10px; border-bottom:1px solid var(--line); }
  td{ padding:10px; border-bottom:1px solid rgba(255,255,255,.05); vertical-align:middle; }
  .key{ font-family:'Consolas',monospace; font-weight:700; }
  .pill{ display:inline-block; padding:3px 9px; border-radius:20px; font-size:11px; font-weight:700; }
  .ok{ background:rgba(70,210,120,.16); color:#5fd98a; }
  .bad{ background:rgba(240,90,90,.16); color:#f06a6a; }
  .exp{ background:rgba(255,170,40,.16); color:#ffb340; }
  .toast{ position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:#16171f; border:1px solid var(--line); padding:12px 20px; border-radius:12px; opacity:0; transition:.3s; pointer-events:none; }
  .toast.show{ opacity:1; }
  .muted{ color:var(--mut); font-size:12px; }
  a.copy{ color:var(--acc); cursor:pointer; font-size:11px; }
</style>
</head>
<body>
<div class="wrap">
  <h1>ZYNX · КЛЮЧИ</h1>
  <div class="sub">Панель выдачи и управления лицензиями</div>

  <!-- НАСТРОЙКА ДОСТУПА -->
  <div class="card">
    <div class="row">
      <div style="flex:2">
        <label>API адрес (Vercel)</label>
        <input id="api" placeholder="https://ваш-проект.vercel.app" />
      </div>
      <div style="flex:2">
        <label>Admin Token</label>
        <input id="token" type="password" placeholder="секрет из ADMIN_TOKEN" />
      </div>
      <div style="flex:0; display:flex; align-items:flex-end">
        <button onclick="saveCfg(); loadKeys()">Подключиться</button>
      </div>
    </div>
    <div class="muted" style="margin-top:8px">Данные хранятся только в этом браузере (sessionStorage).</div>
  </div>

  <!-- СОЗДАНИЕ КЛЮЧА -->
  <div class="card">
    <div style="font-weight:800; margin-bottom:6px">Создать ключ</div>
    <div class="row">
      <div>
        <label>Срок</label>
        <select id="term">
          <option value="d30">30 дней</option>
          <option value="m1">1 месяц</option>
          <option value="m3">3 месяца</option>
          <option value="m6">6 месяцев</option>
          <option value="m12">1 год</option>
          <option value="forever">Бессрочно</option>
        </select>
      </div>
      <div>
        <label>План</label>
        <select id="plan"><option>standard</option><option>vip</option></select>
      </div>
      <div style="flex:2">
        <label>Заметка (кому)</label>
        <input id="note" placeholder="ник / контакт" />
      </div>
      <div style="flex:0; display:flex; align-items:flex-end">
        <button onclick="createKey()">+ Создать</button>
      </div>
    </div>
  </div>

  <!-- СПИСОК -->
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
      <div style="font-weight:800">Ключи</div>
      <button class="ghost tiny" onclick="loadKeys()">Обновить</button>
    </div>
    <div style="overflow-x:auto">
      <table id="tbl">
        <thead><tr><th>Ключ</th><th>Срок</th><th>ПК</th><th>План</th><th>Заметка</th><th>Статус</th><th></th></tr></thead>
        <tbody id="rows"><tr><td colspan="7" class="muted">Подключись сверху…</td></tr></tbody>
      </table>
    </div>
  </div>
</div>
<div class="toast" id="toast"></div>

<script>
const $ = s => document.querySelector(s);
function toast(t){ const e=$("#toast"); e.textContent=t; e.classList.add("show"); setTimeout(()=>e.classList.remove("show"),1800); }
function api(){ return ($("#api").value||"").replace(/\/$/,""); }
function tok(){ return $("#token").value||""; }
function saveCfg(){ sessionStorage.setItem("zynx_api",api()); sessionStorage.setItem("zynx_tok",tok()); }
function loadCfg(){ $("#api").value=sessionStorage.getItem("zynx_api")||""; $("#token").value=sessionStorage.getItem("zynx_tok")||""; }

async function call(method, body){
  const r = await fetch(api()+"/api/admin-keys", {
    method, headers:{ "Content-Type":"application/json", "x-admin-token":tok() },
    body: body?JSON.stringify(body):undefined
  });
  return r.json();
}
function fmtDate(s){ if(!s) return "бессрочно"; const d=new Date(s); const left=Math.ceil((d-Date.now())/86400000);
  return d.toLocaleDateString("ru-RU") + (left>0?` (${left} дн.)`:" (истёк)"); }
function statusPill(k){
  if(!k.active) return '<span class="pill bad">отключён</span>';
  if(k.expires_at && new Date(k.expires_at)<Date.now()) return '<span class="pill exp">истёк</span>';
  return '<span class="pill ok">активен</span>';
}
async function loadKeys(){
  const res = await call("GET");
  if(!res.ok){ $("#rows").innerHTML=`<tr><td colspan=7 class="bad">${res.reason||"ошибка"}</td></tr>`; return; }
  $("#rows").innerHTML = res.keys.map(k=>`
    <tr>
      <td class="key">${k.key} <a class="copy" onclick="navigator.clipboard.writeText('${k.key}');toast('Скопировано')">копи</a></td>
      <td>${fmtDate(k.expires_at)}</td>
      <td class="muted">${k.hwid?k.hwid.slice(0,8)+"…":"—"}</td>
      <td>${k.plan||""}</td>
      <td class="muted">${k.note||""}</td>
      <td>${statusPill(k)}</td>
      <td style="white-space:nowrap">
        <button class="ghost tiny" onclick="toggle('${k.id}',${!k.active})">${k.active?"откл":"вкл"}</button>
        <button class="ghost tiny" onclick="resetHwid('${k.id}')">сброс ПК</button>
        <button class="ghost tiny" onclick="del('${k.id}')">✕</button>
      </td>
    </tr>`).join("") || `<tr><td colspan=7 class="muted">Ключей нет</td></tr>`;
}
async function createKey(){
  const t=$("#term").value; let body={action:"create",note:$("#note").value,plan:$("#plan").value};
  if(t==="forever") body.forever=true;
  else if(t[0]==="d") body.days=parseInt(t.slice(1));
  else body.months=parseInt(t.slice(1));
  const res=await call("POST",body);
  if(res.ok){ toast("Ключ создан: "+res.key); navigator.clipboard.writeText(res.key); loadKeys(); }
  else toast("Ошибка: "+(res.reason||"")); 
}
async function toggle(id,active){ await call("POST",{action:"toggle",id,active}); loadKeys(); }
async function resetHwid(id){ await call("POST",{action:"reset_hwid",id}); toast("Привязка к ПК сброшена"); loadKeys(); }
async function del(id){ if(!confirm("Удалить ключ?"))return; await call("POST",{action:"delete",id}); loadKeys(); }
loadCfg();
</script>
</body>
</html>
