# ensylmz · Sekizinci sürüm

Enes Yılmaz için yerel portföy. Varsayılan koyu tema, açık tema düğmesi, mobil menü, hareketli yörünge görseli ve ayrı proje sayfaları.

## Kalıcı panel ve GitHub yayını

BASLAT çalışırken http://127.0.0.1:4173/panel/ adresini açın. Referans formundaki marka, başlık, URL adı, amaç, kapsam, çalışma satırları, kapak/logo ve isteğe bağlı galeri ile mevcut projelerle aynı tasarımda bağımsız sayfa oluşturulur. Logo formu logoyu Çalışmalar listesine ekler. Kayıtlar src/data/panel-content.json ve src/media içinde kalır; tarayıcı kapansa da korunur. Bu sürüm yeni kayıt ekler; mevcut kayıt düzenleme/silme ekranı henüz yoktur. Eski tarayıcı taslakları kendiliğinden aktarılmaz.

Panelde GitHub’a gönder düğmesi yalnız bu site klasöründeki kaynakları ensyilmz/ensylmz-site deposuna gönderir. Şifre veya token panelde tutulmaz; bilgisayardaki Git kimlik yöneticisi kullanılır. Gönderim başarısız olsa da kayıtlar korunur. Zorla gönderim yapılmaz.

İlk yayında GitHub deposu Settings > Pages > Source alanında GitHub Actions seçilmelidir. .github/workflows/pages.yml her main gönderiminde siteyi oluşturur ve yayımlar. Beklenen adres https://ensyilmz.github.io/ensylmz-site/ olur; workflow başarıyla bitmeden yayında olduğu varsayılmaz.

Canlı site statiktir. İçerik yönetimi bilgisayarınızdaki BASLAT panelinden yapılır; herkese açık sitedeki panel dosya yazamaz. ZIP yedeğini saklayın. En güncel kayıtları içeren klasörü kullanın; eski paket farklı kayıtlar içerir.

Doğrulama: 9 panel kontrolü; örnek referans kalıcı kayda yazıldı, ayrı proje sayfası oluşturuldu ve referans listesinde görüldü. Deneme içeriği kaldırıldı. Başka siteden gelen kayıt isteği reddedildi.
## Sekizinci sürüm

Proje görselleri artık dönen küpün altı yüzünü tamamen kaplar; küçük bağımsız ekran kaldırıldı. Astronotun oturma, inceleme ve bakış pozlarında kolları gövdenin önünden uzaklaştırıldı. Kaydırma, mobil dokunma ve hareket azaltma dahil 15 kontrol geçti.

## Yedinci sürüm · Dijital çekirdek

- Çalışmalardan önce beş açılı, kaydırmayla ilerleyen dijital çekirdek sahnesi: tasarım, görünürlük ve operasyon. Üç yörünge ve metalik merkez; gerçek proje detayları anlatıma eşlik eder. Sonunda nesne küçülür ve normal sayfa akışı devam eder. Çalışmalara geç bağlantısı sahneyi atlar.
- Proje görselleri başlıklı turuncu kapaklarla başlar. Üzerine gelince yıldız izleriyle açılır, ayrılınca kapanır. Telefonda görsele dokunmak kapağı açar; Projeyi incele bağlantısı proje sayfasına gider.
- Hareket azaltma tercihinde sabit, kısa çekirdek sahnesi ve hızlı kapak açılışı kullanılır.
- Koyu/açık tema, astronot sahneleri, ses ve yalnız Biraz daha yakından bağlantısındaki fişekli geçiş korunur.
- Doğrulama: 15 yeni sürüm kontrolü, 51 genel tarayıcı kontrolü; son çalıştırmalarda sıfır tarayıcı hatası. Masaüstü, dokunmatik mobil ve 320 px hareket azaltma görünümü kontrol edildi.
## Altıncı sürüm

- Ana sayfada dört seçili proje, birleşik çalışma dosyaları olarak yeniden tasarlandı: görsel, küçük detay ekranı, birinci tekil şahıs katkı anlatımı, kapsam etiketleri, üç çalışma başlığı ve kaynak/dönemi belirtilen iki rapor değeri.
- Rokka: görsel dünya/alışveriş arayüzü/beden bulucu; Mersan: katalog, SEO ve ürün ekosistemi; Demirsan: arama ve sosyal iletişim; Giyimyol: Trendyol operasyonu ve logo.
- Büyük boşluklar, dev proje numaraları ve genel sloganlar kaldırıldı. Masaüstünde görsel kısa süre sabit kalır; telefonda bütün içerik doğal dikey akışla gösterilir. Demirsan sahnesinin yönü değişir. Gri görseller hover/klavye odağında orijinal renklerine döner.
- Astronot başlığı kapatmak yerine görselin detay kenarında durur. Bölüm girişleri/ses ve diğer sahneler korunur.
- Fişekli geçiş yalnız ENES bölümündeki Biraz daha yakından bağlantısında. Diğer ana sayfa düğme/bağlantıları doğrudan çalışır; yeni sekme ve klavye davranışları korunur.
- Tema geçişinin tarayıcı tarafından iptal edilmesi güvenli biçimde karşılanır.
- 438 iç bağlantı/varlık, 23 proje düzeni kontrolü ve 51 mevcut tarayıcı kontrolü. Yeni görüntüler qa/v6. Önceki kaynaklar ensylmz-v05-source, sayfa üreticisi ensylmz-v05-build.mjs ve V5 ZIP korunur.

## Beşinci sürüm

- Yaklaşık 4,75 saniyelik uzay açılışı: yıldızların belirmesi, derinlikli yaklaşma, turuncu yörünge/portal, hızlanan yıldız izleri ve aynı orbital canvasın hero’ya yerleşmesi.
- Fare hareketine hafif yıldız parallax; mobilde azaltılmış parçacık sayısı. Yeni dış kaynak veya ağ bağımlılığı yok.
- Girişi geç düğmesi ve Escape; aynı sekmede bir kez oynar. Yeniden görmek için yeni sekme açın. Azaltılmış harekette doğrudan ana sayfa açılır.
- Giriş sırasında arka sayfanın kontrolleri klavye ile etkinleştirilemez; bitince önceki erişim durumu geri gelir.
- Header’ın tıklamalı yürüyüş/silah şakası kaldırıldı; oturma ve bacak sallama korunur. Diğer bölüm sahneleri korunur.
- Yeni kaynak src/scripts/arrival.js. V4 kaynak yedeği ensylmz-v04-source klasöründe; V4 ZIP korunur.
- Kontrol: 434 iç bağlantı/varlık, 12 yeni giriş kontrolü ve 51 mevcut tarayıcı kontrolü. Ekran görüntüleri qa/v5.

## Dördüncü sürüm

- Referans ve ENES sahnelerine yarılan zemin, toprak parçaları ve toz ile giriş.
- ENES başlığının gerçek harf kutularını takip eden bağımsız yürüyüş, denge kaybı/toparlanma ve bağlantı yanına yerleşme. Kaydırma yalnız giriş tetikleyicisidir.
- Header astronotuna ilk tıklama/dokunma: kalkma, baş sallama, öteye yürüme ve oturma. İkinci: uzay tabancası, tek enerji izi, silahı atma/zeminde kaybolması ve eski yere dönüş. Oynarken tekrar tıklamalar sahneyi üst üste bindirmez. İşaret efektleri etkileşimleri engellemez ve kendiliğinden temizlenir.
- Dört hizmet başlığını 550 ms aralıklarla getiren dört ayrı yardımcı; zaman tabanlı itiş, yönlü baş/gövde/kol ve ayak pozları. Yerleşen başlıklar kalır; klavye odağında başlık doğrudan görünür. Azaltılmış harekette bütün başlıklar görünür.
- Ses düğmesi yalnız referans alanında ışık/yörünge girişiyle görünür; çıkışta kaybolur. Sesin fade, otomatik hazırlık ve sessize alma davranışları korunur.
- Çıkış son karesinde görünmez sahneye dönerken oluşan anlık yeniden görünme düzeltildi.
- Yeni kaynak: src/scripts/character-scenes.js; V3 kaynak yedeği ve ZIP korunur.
- 434 bağlantı/varlık, 20 yeni ve 51 mevcut tarayıcı kontrolü geçti. Yeni görüntüler qa/v4 klasöründe; JS çalışma hatası yok.

## Üçüncü sürümdeki deneyim

- Astronot header alt çizgisinde oturur ve bacaklarını sallar; vizör gözleri, baş tepkileri ve selam hareketleri vardır.
- Çalışmalara geçerken roketle sağ kenardan çıkar; çatlak, halka ve parçacık efektleriyle geri girer. İlk çalışma kartlarına bağlanır, kartlarla kayar; çalışmaların ortasında sol kenardan çıkar.
- Hakkımda bağlantısının yanında giriş, yazıya bakıp ziyaretçiye dönme ve vizör parlaması.
- Logo çizgileri üzerinde Rokka’dan Rekor’a üç düşük yerçekimi sıçrayışı; mobilde gerçek grid yerleşimini izler. Sonra roketle çıkar.
- Hizmet başlıkları kaydırıldıkça sağdan/soldan ilerler, ayrı yardımcı astronotlar başlıkları iter.
- Footer astronotu erişilebilir yukarı çık düğmesidir: roket kalkışı, yukarı kaydırma, tavana çarpma, düşme, toparlanma, ayağa kalkma ve ilk oturma döngüsüne dönüş.
- Ana sayfanın aynı sekmede açılan iç bağlantılarında 420 ms fitil/kıvılcım geçişi. Diğer kontroller kısa görsel tepki verir; yeni sekme ve dış uygulama bağlantıları normal çalışır.
- Özgün elektronik ritim yalnız çalışmalar alanında yaklaşık 1,25 saniyede yükselir/söner. Alan girişinde otomatik oynatma denenir; tarayıcı engellerse ilk normal tıklama/dokunma/tuş etkileşimi sesi hazırlar. Ayrı ses düğmesine basmak gerekmez; düğme kullanıcı tarafından sessize almayı sağlar. İlk etkileşim öncesinde ses tarayıcı politikasına bağlıdır.
- V2’nin kısa yörünge girişi, gri/renkli parallax referans sahneleri, dairesel tema geçişi ve bölüm göstergesi korunur.
- Azaltılmış hareket tercihinde astronot/efektler kapalı, başlıklar tamamen görünür ve bağlantılar doğrudan çalışır.

Sahne yönetimi: src/scripts/choreography.js. Ortak deneyim: src/scripts/experience.js ve src/styles/experience.css.

## Başlatma

Node.js kurulu bilgisayarda bu klasörde:

```text
npm run build
npm run check
npm start
```

Tarayıcı: http://127.0.0.1:4173

Alternatif: `BASLAT.cmd` dosyasına çift tıklayın. Açılan sunucu penceresi çalışırken siteye erişebilirsiniz. Durdurmak için Ctrl+C.

## Dosya yapısı

```text
ensylmz/
├── BASLAT.cmd
├── package.json
├── README.md
├── src/
│   ├── data/content.mjs      # Profil, hizmet, referans, logo ve kariyer içerikleri
│   ├── media/                # Sitede kullanılan 33 orijinal görsel
│   ├── styles/main.css      # Tema, hareket ve mobil tasarım
│   └── scripts/app.js       # Tema, menü, filtre, form, yörünge ve yerel panel
├── scripts/
│   ├── build.mjs            # Statik sayfalar ve varlıkları üretir
│   ├── serve.mjs            # Yalnızca 127.0.0.1 üzerinde yerel sunucu
│   └── check.mjs            # Dosya ve iç bağlantı kontrolü
└── dist/                   # Oluşturulan güncel sürüm
    ├── index.html
    ├── hakkimda/index.html
    ├── hizmetler/index.html
    ├── iletisim/index.html
    ├── referanslar/index.html
    ├── calismalar/index.html
    ├── gizlilik/index.html
    ├── panel/index.html
    ├── projeler/<is-kapsami>/index.html
    └── assets/{styles,scripts,media}/
```

`dist` dosyalarını elle değiştirmeyin; kaynakları düzenleyip yeniden oluşturun. Sitede kullanılan orijinal medya `src/media/` klasöründe korunur. Proje klasörü tek başına taşınabilir. Hazır `dist` bağımsız bir statik sunucuda kök dizinden sunulabilir.

## İlk sürümde çalışanlar

- Koyu/açık tema ve cihazda hatırlanan tercih.
- Mobil menü, proje filtreleri, logo renk etkileşimi ve görsel büyütme.
- Yedi ayrı referans sayfası; firma adından bağımsız URL adları.
- E-posta veya WhatsApp’ta mesaj hazırlayan kompakt form. Gönderim kullanıcı tarafından uygulamada tamamlanır.
- `/panel/` üzerinden yerel referans/logo taslağı, görsel yükleme, tarayıcı önizlemesi, JSON yedekleme ve içe aktarma.
- Klavye odağı, içerik atlama bağlantısı ve azaltılmış hareket tercihi desteği.

## Sınırlar / sonraki aşama

- Bu sürüm yayımlanmadı. `ensylmz.com` alan adına veya GitHub hesabına bağlantı yok.
- Panel bir CMS veya güvenli yönetici alanı değildir. Giriş, e-posta kodu, kalıcı sunucu depolaması ve GitHub push sonraki geliştirmelerdir. Yerel taslaklar aynı tarayıcı ve adresle sınırlıdır; JSON yedeği alın.
- LinkedIn/GitHub URL’leri doğrulanmadığı için eklenmedi.
- Orijinal logolar CSS ile tek renk görünümüne getirilir; bazı zeminli sunumlarda zemin de görünür. Üzerine gelme, klavye odağı veya dokunmada orijinal dosya gösterilir. Özel temizlenmiş logo dosyaları ileride hazırlanabilir.
- Video örnekleri bekleniyor; boş video düğmesi eklenmedi.
- Google Fonts bağlantısı isteğe bağlıdır; çevrimdışı durumda sistem yazı tipleri kullanılır. Fotoğraf ve proje görselleri yereldir.
- Ölçümler paylaşılan rapor dönemleriyle etiketlidir. Farklı kanallar toplanmaz; net satış kâr olarak sunulmaz. AI/insan katkıları mevcut beyanlarla sınırlıdır.

İlk sürüm tarihi: 6 Ekim 2026.

## Kontrol sonucu

17 HTML sayfası ve 400 iç bağlantı/varlık kontrolü geçti. Masaüstü ile 390 ve 320 piksel mobil genişliklerde 51 tarayıcı kontrolü tamamlandı; JavaScript çalışma hatası bulunmadı. Tema ve kalıcılık, mobil menü, filtreler, görsel modalı, WhatsApp mesaj hazırlama, yerel referans/logo taslağı, JSON dışa/içe aktarma ve animasyon kontrol edildi. Görüntüler ve kontrol raporu `qa/` klasöründe. Testler mesaj göndermedi ve test taslakları gerçek tarayıcı profiline eklenmedi.

İkinci sürüm: 434 iç bağlantı/varlık; önceki 51 tarayıcı kontrolüne ek olarak giriş, astronot, ses alanı, renklenme, ışık geçişi ve mobil hareket davranışlarını kapsayan 26 kontrol geçti. Görüntüler `qa/v2/` klasöründe. Birinci sürüm ZIP’i ve kaynak yedeği proje klasörünün yanında korunur.

Üçüncü sürüm: 434 iç bağlantı/varlık kontrolü, 51 mevcut tarayıcı kontrolü ve 25 yeni sahne kontrolü geçti. Yeni görüntüler ve rapor qa/v3/ klasöründe. V2 ZIP’i ve ensylmz-v02-source kaynak yedeği korunur.




