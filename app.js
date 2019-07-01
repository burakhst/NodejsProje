var express = require('express');
var app = express();
var port = 3000;
app.use(express.static("public"));
app.set('view engine', 'ejs')
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const getir = require("./dbOps");
const session = require('express-session');
const path = require('path');
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(session({
    secret: 'benimprojem',
    resave: false,
    saveUninitialized: true
}));
/*
var multer  = require('multer')
var yukle = multer({ dest: 'uploads/' })*/


app.get('/', function (req, res) {
  res.redirect('/anasayfa');
});
/*
app.get('/deneme', getir.denemeGet);
app.post('/deneme',yukle.any(),getir.denemePost);*/

app.get('/anasayfa',getir.anasayfa);
app.get('/anasayfa/:id',getir.anasayfaIcerikGetir);

app.get('/dgsKonulari',getir.dgsKonulari);
app.get('/dgsKonu/:id',getir.dgsKonulariGetir);
app.get('/dgsTabanPuanlari',getir.dgsTabanPuanlari);
app.get('/dgsTabanPuanlari/:id',getir.dgsTabanPuanlariGetir);
app.post('/dgsTabanPuanlari',getir.dgsTabanPuanlariGetirPost);
app.get('/dgsGecisBolumleri',getir.dgsGecisBolumleri);
app.get('/dgsGecisBolumleri/:id',getir.dgsGecisBolumleriGetir);

app.get('/4YilTabanPuan',getir.dortyilTabanPuan);
app.get('/4YilTabanPuan/:id',getir.dortyilTabanPuanGetir);
app.post('/4YilTabanPuan',getir.dortyilTabanPuanGetirPost);

app.get('/devletUniversiteleri',getir.devletUniversiteleri);
app.get('/vakifUniversiteleri',getir.vakifUniversiteleri);

app.get('/uyeGiris_Kayit',getir.uyeGirisKontrolGet);
app.post('/uyeGiris_Kayit', getir.uyeGirisKontrolPost);
app.post('/uyeGirisKayit', getir.uyeKayitOl);
app.get('/sifreYenile', getir.sifreYenile);
app.post('/sifreYenile', getir.sifreYenilePost);
app.post('/sifreYenilendi', getir.sifreYenilendiPost);


app.get('/admin',getir.adminGet);
app.post('/admin',getir.adminPost);
app.get('/admin/anasayfa',getir.adminanasayfaGet);
app.post('/admin/anaBlokEklendi',getir.adminanaBlokEklendiPost);
app.post('/admin/anaBlokSilindi',getir.adminanaBlokSilindiPost);
app.post('/admin/anaBlokGuncellendi',getir.adminanaBlokGuncellendi);

app.get('/admin/dgsKonulari',getir.adminDgsKonulariGetir);
app.post('/admin/dgsDersSilindi',getir.adminDgsDersSilindi);
app.post('/admin/dgsKonularSilindi',getir.adminDgsKonulariSilindi);
app.post('/admin/dgsDersEklendi',getir.adminDgsDersEklendiPost);
app.post('/admin/dgsKonuEklendi',getir.adminDgsKonuEklendiPost);
app.post('/admin/dgsDersGuncellendi',getir.adminDgsDersGuncellendiPost);
app.post('/admin/dgsKonuGuncellendi',getir.adminDgsKonuGuncellendiPost);

app.get('/admin/ikiYilBolumler',getir.adminIkiYilBolumlerGetir);
app.post('/admin/dgsBolumEklendi',getir.admindgsBolumEklendiPost);
app.post('/admin/dgsPuanlarEklendi',getir.admindgsPuanlarEklendiPost);
app.post('/admin/dgsBolumSilindi',getir.admindgsBolumSilindi);
app.post('/admin/dgsPuanlarSilindi',getir.admindgsPuanlarSilindi);

app.get('/admin/dortYilBolumler',getir.admindortYilBolumlerGetir);
app.post('/admin/4YilBolumEklendi',getir.admin4YilBolumEklendiPost);
app.post('/admin/4YilPuanlarEklendi',getir.admin4YilPuanlarEklendiPost);
app.post('/admin/4YilBolumSilindi',getir.admin4YilBolumSilindi);
app.post('/admin/4YilPuanlarSilindi',getir.admin4YilPuanlarSilindi);
app.post('/admin/4YilBolumGuncellendi',getir.admin4YilBolumGuncellendi);
app.post('/admin/4YilPuanlarGuncellendi',getir.admin4YilPuanlarGuncellendi);

app.get('/admin/dgsGecisBolumleri',getir.admindgsGecisBolumleriGetir);
app.post('/admin/dgsGecisBolumEklendi',getir.admindgsGecisBolumEklendi);
app.post('/admin/dgsGecisBolumTercihEklendi',getir.admindgsGecisBolumTercihEklendi);
app.post('/admin/dgsGecisBolumSilindi',getir.admindgsGecisBolumSilindi);
app.post('/admin/dgsGecisBolumTercihSilindi',getir.admindgsGecisBolumTercihSilindi);

app.get('/admin/devletUniversiteleri',getir.admindevletUniversiteleriGetir);
app.post('/admin/devletUniversitesiEklendi',getir.admindevletUniversitesiEklendi);
app.post('/admin/devletUniversitesiSilindi',getir.admindevletUniversitesiSilindi);
app.get('/admin/vakifUniversiteleri',getir.adminvakifUniversiteleriGetir);
app.post('/admin/vakifUniversitesiEklendi',getir.adminvakifUniversitesiEklendi);
app.post('/admin/vakifUniversitesiSilindi',getir.adminvakifUniversitesiSilindi);

app.get('/ara',getir.AramaMotoru);
app.post('/ara',getir.AramaMotoruPost);

app.get('/profil',getir.profil);
app.get('/sifremiDegistir',getir.sifremiDegistir);
app.post('/sifremiDegistir',getir.sifremiDegistirPost);
app.get('/cikis', getir.cikisYap);

app.get('/admin/tumyorumlar-hesapengelle',getir.adminIslemler);
app.post('/admin/tumyorumlar-hesapengelle',getir.adminIslemlerPost);
app.post('/admin/hesapengelle',getir.adminYorumBan);
app.get('/admin/kullaniciEngelle',getir.adminkullaniciEngelle);
app.post('/admin/kullaniciEngelle',getir.adminkullaniciEngellePost);
app.post('/admin/kullaniciEngelKaldir',getir.adminkullaniciEngelKaldirPost);

app.listen(port, () => console.log(`Sunucu çalıştırıldı. ${port}!`))