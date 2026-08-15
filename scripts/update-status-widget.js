(() => {
  const statusPath = '../data/monthly-update-status.json';
  const tr = (navigator.language || '').toLowerCase().startsWith('tr');
  const labels = tr ? {
    title: 'Veri güncelleme durumu',
    checked: 'Son kontrol', source: 'Kaynak', unavailable: 'Durum bilgisi yüklenemedi.', offline: 'paket içi çevrimdışı kayıt',
  } : {
    title: 'Data update status',
    checked: 'Last checked', source: 'Source', unavailable: 'Update status could not be loaded.', offline: 'bundled offline record',
  };
  const format = value => value ? new Date(value).toLocaleString(tr ? 'tr-TR' : 'en-GB') : '—';
  const el = document.createElement('section');
  el.setAttribute('aria-live', 'polite');
  el.style.cssText = 'max-width:1120px;margin:20px auto;padding:14px 18px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;color:#334155;font:13px system-ui,sans-serif;line-height:1.5';
  el.innerHTML = `<strong>${labels.title}</strong><div id="pratix-update-status-detail">${labels.unavailable}</div>`;
  document.body.appendChild(el);
  const render = (status, suffix = '') => {
    const message = tr ? (status.message_tr || status.message_en) : (status.message_en || status.message_tr);
    const source = (status.sources || []).map(item => `${item.name} (${item.url || '—'})`).join(', ') || '—';
    el.querySelector('#pratix-update-status-detail').textContent = `${status.status || 'unknown'} · ${labels.checked}: ${format(status.checked_at)} · ${labels.source}: ${source} · ${message || ''}${suffix}`;
  };
  fetch(statusPath, { cache: 'no-store' })
    .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })
    .then(status => render(status))
    .catch(() => {
      const embedded = document.getElementById('pratix-update-status-fallback');
      if (!embedded) { el.querySelector('#pratix-update-status-detail').textContent = labels.unavailable; return; }
      try { render(JSON.parse(embedded.textContent), ` · ${labels.offline}`); }
      catch { el.querySelector('#pratix-update-status-detail').textContent = labels.unavailable; }
    });
})();
