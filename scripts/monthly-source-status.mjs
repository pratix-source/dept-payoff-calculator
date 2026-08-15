import fs from 'node:fs';

const registry = JSON.parse(fs.readFileSync('data/source-registry.json', 'utf8'));
const destination = 'data/monthly-update-status.json';
const checkedAt = new Date().toISOString();
const next = new Date();
next.setUTCMonth(next.getUTCMonth() + 1);

async function check(source) {
  try {
    const response = await fetch(source.url, { headers: { 'User-Agent': 'PratixMonthlySourceCheck/1.0 (+GitHub Actions)' } });
    return { name: source.name, url: source.url, http_status: response.status, ok: response.ok };
  } catch (error) {
    return { name: source.name, url: source.url, ok: false, error: error.message };
  }
}

const results = await Promise.all((registry.sources || []).map(check));
const failed = results.filter(result => !result.ok);
let status = registry.status_when_checked;
let messageTr = registry.reason_tr;
let messageEn = registry.reason_en;
if (failed.length) {
  status = 'failed';
  messageTr = `Kaynak kontrolü tamamlanamadı: ${failed.map(item => item.name).join(', ')}. Mevcut oranlar değiştirilmedi.`;
  messageEn = `Source check could not be completed: ${failed.map(item => item.name).join(', ')}. Existing rates were not changed.`;
}
const update = {
  application: registry.application,
  status,
  checked_at: checkedAt,
  next_scheduled_check: next.toISOString().slice(0, 10),
  sources: results,
  message_tr: messageTr,
  message_en: messageEn,
  rates_changed: false,
  rates_preserved: true,
};
fs.writeFileSync(destination, `${JSON.stringify(update, null, 2)}\n`);
console.log(JSON.stringify(update));
