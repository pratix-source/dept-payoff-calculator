# Pratix Borç Kapatma Hesaplayıcı

Bu depo, Vercel üzerinde yayınlanmak üzere hazırlanmış statik Pratix uygulamasıdır.

## Vercel yayını

Bu klasörü tek başına bir GitHub deposuna yükleyin. Vercel’de **Import Git Repository** seçeneğiyle depoyu içe aktarın. Build komutu gerekmez; `vercel.json` ana sayfayı `tools/debt-payoff-calculator.html` adresine yönlendirir.

## Aylık veri durumu

Her ayın ilk günü saat 05:20 UTC’de GitHub Actions kaynak/durum kontrolü yapar ve `data/monthly-update-status.json` dosyasını günceller. Uygulama bu dosyadan son kontrol tarihini, kaynakları, güncelleme durumunu ve varsa hata nedenini gösterir.

Bu uygulamada doğrulanmış otomatik oran modeli yoksa iş akışı bunu açıkça `model_suspended` veya `not_required` olarak kaydeder; oranı tahmin ederek değiştirmez.

## Yerel doğrulama

```bash
npm test
```

## Güvenlik ilkesi

Oran güncellemesi yapılamazsa mevcut oran verisi korunur. Kaynak sayfa yapısı değişirse veya doğrulama başarısız olursa iş akışı hata durumunu kaydeder; belirsiz veriyi kullanıcı sonucuna uygulamaz.
