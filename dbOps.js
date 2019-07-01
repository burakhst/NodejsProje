const sql = require('mssql')
var webconfig = {
    user: 'BURAK',
    password: '124356',
    server: '192.168.2.54',
    database: 'bps'
};


module.exports.anasayfa = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_AnaBlokBasliklar", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('anasayfa', { profil: req.session.adi, veri: verisonucu.recordset })
        });
    });
}

module.exports.anasayfaIcerikGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_AnaBlokBasliklar where Id=" + req.params.id + "select * from bh_BaslikIcerikleri where baslikId=" + req.params.id, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (
                verisonucu.recordsets[0].length == 0
            ) {
                sql.close();
                res.render('anasayfaIcerik', { veri: verisonucu.recordsets, profil: req.session.adi })
            } else {
                sql.close();
                res.render('anasayfaIcerik', { veri: verisonucu.recordsets, profil: req.session.adi })
            }
        });
    });
}

module.exports.profil = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select top(1)* from bh_UyeKayit where kullaniciAdi='" + req.session.adi + "' and sifre='" + req.session.sifre + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adi) {
                sql.close();
                res.render('profil', { veri: verisonucu.recordset, error: '', ad: '' ,profil:req.session.adi});
            } else {
                sql.close();
                res.render('uye_giris', { error: '', bilgi: '', profil: req.session.adi })
            }


        });
    });
};
module.exports.sifremiDegistir = function (req, res) {

    if (req.session.adi) {
        res.render('sifreDegistir', { ad: req.session.adi });
    } else {
        res.redirect('/uyeGiris_Kayit');
    }
}
module.exports.sifremiDegistirPost = function (req, res) {
    sql.close();
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select dbo.fn_SifreDegistirKontrol('" + req.body.sAK + "','" + req.body.sGK + "') as sifreK", function (err, veri) {
            if (err) {
                console.log(err);
            }
            veri.recordset.forEach(function (ara) {
                if (ara.sifreK == 'VAR') {
                    request1.query("update bh_UyeKayit set sifre='" + req.body.syK + "' where kullaniciAdi='" + req.body.sAK + "'", function (err, verisonucu) {
                        if (err) {
                            console.log(err);
                        }
                        sql.close();
                        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                        res.write(`<html>
                        <head>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
                        <meta http-equiv="refresh" content="3;URL=/cikis">
                        </head>
                        <body>
                        <div style="font-size:25px; margin:10px;">Şifre başarıyla değiştirildi lütfen tekrar giriş yapınız!</div>
                        <a href="/cikis"></a>
                        </body>
                        </html>`);
                        res.end();
                    });
                }
                else {
                    sql.close();
                    res.render('sifreDegistir', { error: '', ad: req.session.adi })
                }
            })
        });
    });
};
/*1.dropdowndaki veriler */
module.exports.dgsGecisBolumleri = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_DgsGecisBolumleri;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('dgsGecisBolumleri', { veri: verisonucu.recordset, profil: req.session.adi });
        });
    });

}
module.exports.dgsGecisBolumleriGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_DgsGecisTercihProgramlari where gecisId=" + req.params.id + ";select * from bh_DgsGecisBolumleri where Id=" + req.params.id, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (
                verisonucu.recordsets[0].length == 0
            ) {
                sql.close();
                res.render('dgsGecisTercihProgramlari', { veri: verisonucu.recordsets, profil: req.session.adi });
            } else {
                sql.close();
                res.render('dgsGecisTercihProgramlari', { veri: verisonucu.recordsets, profil: req.session.adi });
            }
        });
    });

}

module.exports.dgsTabanPuanlari = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_DgsBolumler;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('dgsTabanPuanlari', { veri: verisonucu.recordset, profil: req.session.adi });
        });
    });
}
module.exports.dgsTabanPuanlariGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select * from bh_DgsTabanPuanlar where uniId=" + req.params.id + "; select *from bh_DgsBolumler where id=" + req.params.id + ";select * from bh_DgsYorumSatir order by tarih asc", function (err, verisonucu) {
            if (err) {
                console.log(err);
            } if (
                verisonucu.recordsets[0].length == 0
            ) {
                sql.close();
                res.render('dgsTabanPuan', { veri: verisonucu.recordsets, profil: req.session.adi });
            } else {
                sql.close();
                res.render("dgsTabanPuan", { veri: verisonucu.recordsets, profil: req.session.adi });
            }
        });
    });
}

module.exports.dgsKonulari = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_DgsDersler;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('dgsKonulari', { veri: verisonucu.recordset, profil: req.session.adi });
        });
    });
}
module.exports.dgsKonulariGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select* from bh_DgsDersler where Id=" + req.params.id + ";select * from bh_DgsKonular where konuId=" + req.params.id, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (
                verisonucu.recordsets[0].length == 0 ||
                verisonucu.recordsets[1].length == 0
            ) {
                sql.close();
                res.render('dgsKonu', { veri: verisonucu.recordsets, profil: req.session.adi });
            } else {
                sql.close();
                res.render("dgsKonu", { veri: verisonucu.recordsets, profil: req.session.adi });
            }
        });
    });
}
/*1.dropdowndaki veriler bitiş */

/*2.dropdown veriler */
module.exports.dortyilTabanPuan = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select *from bh_dortYillikBolumler", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('dortYilBolumler', { veri: verisonucu.recordset, profil: req.session.adi });
        });
    });
}
module.exports.dortyilTabanPuanGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select * from bh_dortYillikTabanPuanlar where uniId=" + req.params.id + "; select *from bh_dortYillikBolumler where id=" + req.params.id + ";select * from bh_YorumSatir order by tarih asc", function (err, verisonucu) {
            if (err) {
                console.log(err);
            } if (
                verisonucu.recordsets[0].length == 0
            ) {
                sql.close();
                res.render('dortYilTabanPuan', { veri: verisonucu.recordsets, profil: req.session.adi });
            } else {
                sql.close();
                res.render("dortYilTabanPuan", { veri: verisonucu.recordsets, profil: req.session.adi });
            }
        });
    });
}
/*2.dropdown bitiş */

/*3.dropdown veriler */
module.exports.devletUniversiteleri = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select * from bh_DevletUniversiteleri", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('devletUniversiteleri', { veri: verisonucu.recordsets, profil: req.session.adi });
        });
    });
}
module.exports.vakifUniversiteleri = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("select * from bh_vakifUniversiteleri", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('vakifUniversiteleri', { veri: verisonucu.recordsets, profil: req.session.adi });
        });
    });
}



/*3.dropdown bitiş */


/*Üye giriş çıkış kontrol */
module.exports.cikisYap = function (req, res) {
    sql.close();
    //çıkış yaptıktan sonra kayıt yerine atıyor
    if (req.session.adi) {

        delete req.session.adi;
        res.redirect("/uyeGiris_Kayit");
    } else {
        delete req.session.adminAdi;
        res.redirect("/admin");
    }
}
module.exports.uyeGirisKontrolGet = function (req, res) {
    sql.close();
    if (req.session.adi) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(`<html>
        <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
        <meta http-equiv="refresh" content="0;URL=/profil">
        </head>
        <body>
        <a href="./profil"></a>
        </body>
        </html>`);
        res.end();
    } else {
        res.render('uye_giris', { error: '', bilgi: '', profil: req.session.adi })
    }
}
module.exports.uyeGirisKontrolPost = function (req, res) {
    sql.close();
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select dbo.fn_BanKontrol('" + req.body.kGiris + "','BANLI') as BanK", function (err, BanK) {
            if (err) {
                console.log(err);
            }
            request1.query("select dbo.fn_UyeGirisKontrol('" + req.body.kGiris + "','" + req.body.kSifre + "') as UyeK", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                BanK.recordset.forEach(function (ban) {
                    if (ban.BanK == "BANLI") {
                        res.render('uye_giris', { error: 'Hesabınız bloke edilmiştir!', bilgi: '', profil: req.session.adi })
                    } else {
                        sql.close();
                        verisonucu.recordset.forEach(function (kk) {
                            if (kk.UyeK == "VAR") {
                                delete req.session.adminAdi;
                                req.session.adi = req.body.kGiris;
                                req.session.sifre = req.body.kSifre;
                                res.redirect('/anasayfa');

                            } else {
                                res.render('uye_giris', { error: 'Kullanıcı Adı veya Şifre Hatalı!', bilgi: '', profil: req.session.adi });
                            }
                        });
                    }
                });
            });
        });
    });
}

module.exports.uyeKayitOl = function (req, res) {
    sql.close();
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select dbo.fn_UyeKontrol('" + req.body.ukAdi + "') as UyeAdK", function (err, UyeAdK) {
            if (err) {
                console.log(err);
            }
            UyeAdK.recordset.forEach(function (varmi) {
                if (varmi.UyeAdK == 'VAR') {
                    res.render('uye_giris', { error: '', bilgi: 'Kullanıcı Adı Zaten Kullanılıyor', profil: req.session.adi })
                }
                else {
                    request1.query("insert into bh_UyeKayit(adi,soyadi,kullaniciAdi,sifre,mail,guvenlik,durumu) values('" + req.body.uAdi + "','" + req.body.uSoyadi + "','" + req.body.ukAdi + "','" + req.body.uSifre + "','" + req.body.uMail + "','" + req.body.uGuvenlik + "','');", function (err, verisonucu) {
                        if (err) {
                            console.log(err);
                        }
                        sql.close();
                        res.render('uye_giris', { error: '', bilgi: 'Kayıt Başarıyla Oluşturuldu', profil: req.session.adi });
                    });
                }
            });
        });
    });
}
module.exports.sifreYenile = function (req, res) {
    if (req.session.adi) {
        res.redirect('/anasayfa');
    } else {
        res.render('sifreYenile', { error: '',profil:req.session.adi });
    }

}
module.exports.sifreYenilePost = function (req, res) {
    sql.close();
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select dbo.fn_SifreYenilemeKontrol('" + req.body.sAK + "','" + req.body.sGK + "') as sifre", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            verisonucu.recordset.forEach(function (kk) {
                if (kk.sifre == "VAR") {
                    req.session.skullaniciAdi = req.body.sAK;
                    req.session.sguvenlik = req.body.sGK;
                    res.render('yeniSifre',{profil:req.session.adi});

                } else {
                    res.render('sifreYenile', { error: 'Bilgiler Yanlış Lütfen Kontrol Ediniz.' ,profil:req.session.adi});
                }
            });
        });
    });
}
module.exports.sifreYenilendiPost = function (req, res) {
    sql.close();
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_UyeKayit set sifre='" + req.body.sST + "' where guvenlik='" + req.session.sguvenlik + "' and kullaniciAdi='" + req.session.skullaniciAdi + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/uyeGiris_Kayit');
        });
    });
}
/*Üye giriş çıkış kontrol bitiş*/






//post işlemleri başlangıç
module.exports.dgsTabanPuanlariGetirPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("insert into bh_DgsYorumSatir(kullaniciYorum,tarih,kullaniciAdi) values('" + req.body.kYorum + "',GETDATE(),'" + req.session.adi + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/dgsTabanPuanlari');
        });
    });
}
module.exports.dortyilTabanPuanGetirPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);

        var request1 = new sql.Request();
        request1.query("insert into bh_YorumSatir(kullaniciYorum,tarih,kullaniciAdi) values('" + req.body.kYorum + "',GETDATE(),'" + req.session.adi + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/4YilTabanPuan')
        });
    });
}


//post işlemleri bitiş
module.exports.adminGet = function (req, res) {
    if (req.session.adminAdi) {
        res.render('adminPanel')
    } else {
        res.render('admin', { error: '', bilgi: '' })
    }
}
module.exports.adminPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select dbo.fn_AdminGirisKontrol('" + req.body.name + "','" + req.body.password + "') as admin", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            verisonucu.recordset.forEach(function (kk) {
                if (kk.admin == "VAR") {
                    delete req.session.adi;
                    req.session.adminAdi = req.body.name;
                    req.session.adminSifre = req.body.password;
                    res.render('adminPanel');

                } else {
                    res.render('admin', { error: 'Bilgiler yanlış kontrol ediniz.' });
                }
            });
        });
    });
}

module.exports.adminanasayfaGet = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_AnaBlokBasliklar;select * from bh_BaslikIcerikleri;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0) {
                    sql.close();
                    res.render('adminAnasayfa', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('adminAnasayfa', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}
module.exports.adminanaBlokEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_AnaBlokBasliklar(baslikAdi)values('" + req.body.aBlokEkle + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/anasayfa');

        });
    });
}
module.exports.adminanaBlokSilindiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_AnaBlokBasliklar where Id=" + req.body.aBlokSil, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/anasayfa');

        });
    });
}
module.exports.adminanaBlokGuncellendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_AnaBlokBasliklar set baslikAdi='" + req.body.aBlokGaD + "' where Id=" + req.body.aBlokSil, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/anasayfa');

        });
    });
}
/***/
module.exports.adminDgsDersSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsDersler where Id=" + req.body.dersSec, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/DgsKonulari');

        });
    });
}
module.exports.adminDgsKonulariSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsKonular where konuAdi='" + req.body.konuSec + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/DgsKonulari');

        });
    });
}
module.exports.adminDgsKonulariGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_DgsDersler;select * from bh_DgsKonular;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0 || verisonucu.recordsets[1].length == 0) {
                    sql.close();
                    res.render('adminDgsKonulari', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('adminDgsKonulari', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}
module.exports.adminDgsDersEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DgsDersler(dersAdi)values('" + req.body.dAdi + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/DgsKonulari');

        });
    });
}
module.exports.adminDgsKonuEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DgsKonular(konuAdi,konuId)values('" + req.body.kAdi + "'," + req.body.dersSec + ");", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/DgsKonulari');

        });
    });
}
module.exports.adminDgsDersGuncellendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_DgsDersler set dersAdi='" + req.body.g_dAdi + "' where Id=" + req.body.g_dersSec, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/DgsKonulari');

        });
    });
}
module.exports.adminDgsKonuGuncellendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_DgsKonular set konuAdi = '" + req.body.g_kAdi + "',konuId=" + req.body.g_DersSec + "where konuAdi='" + req.body.g_konuSec + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/DgsKonulari');

        });
    });
}
//2.dropdown verileri


module.exports.adminIkiYilBolumlerGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_DgsBolumler;select * from bh_DgsTabanPuanlar;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0 || verisonucu.recordsets[1].length == 0) {
                    sql.close();
                    res.render('adminDgsTabanPuanlar', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('adminDgsTabanPuanlar', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}
module.exports.admindgsBolumEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DgsBolumler(bolumAdi)values('" + req.body.bAdi + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/ikiYilBolumler');

        });
    });
}
module.exports.admindgsPuanlarEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DgsTabanPuanlar(universiteAdi,fakulte,bolumAdi,puanTur,kontenjan,yer,tabanPuan,tavanPuan,uniId)values('"
            + req.body.uniAdi + "','" + req.body.uniF + "','" + req.body.uniB + "','" + req.body.uniP + "'," + req.body.uniK + "," + req.body.uniY + ",'" + req.body.uniTaban + "','" + req.body.uniTavan + "'," + req.body.bolumS + ");", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                res.redirect('/admin/ikiYilBolumler');

            });
    });
}
module.exports.admindgsBolumSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsBolumler where id=" + req.body.bolumSil, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/ikiYilBolumler');

        });
    });
}
module.exports.admindgsPuanlarSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsTabanPuanlar where universiteAdi='" + req.body.bolumSil + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/ikiYilBolumler');

        });
    });
}
/** */
module.exports.admindortYilBolumlerGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_dortYillikBolumler;select * from bh_dortYillikTabanPuanlar;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0 || verisonucu.recordsets[1].length == 0) {
                    sql.close();
                    res.render('admin4YilTabanPuanlar', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('admin4YilTabanPuanlar', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}
module.exports.admin4YilBolumEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_dortYillikBolumler(bolumAdi)values('" + req.body.dbAdi + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dortYilBolumler');

        });
    });
}
module.exports.admin4YilPuanlarEklendiPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_dortYillikTabanPuanlar(universiteAdi,bolumAdi,ogrSekli,puanTur,kontenjan,tabanPuan,basariSiralamasi,uniId)values('"
            + req.body.duniAdi + "','" + req.body.duniB + "','" + req.body.duniS + "','" + req.body.duniP + "'," + req.body.duniK + ",'" + req.body.duniTaban + "','" + req.body.duniSiralama + "'," + req.body.dbolumS + ");", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                res.redirect('/admin/dortYilBolumler');

            });
    });
}
module.exports.admin4YilBolumSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_dortYillikBolumler where id=" + req.body.dbolumSil, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dortYilBolumler');

        });
    });
}
module.exports.admin4YilPuanlarSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_dortYillikTabanPuanlar where universiteAdi='" + req.body.dBolumSil + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dortYilBolumler');

        });
    });
}
module.exports.admin4YilBolumGuncellendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_dortYillikBolumler set bolumAdi = '" + req.body.dbAdi2 + "',puanTur='" + req.body.PtUR + "' where id='" + req.body.dG1 + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dortYilBolumler');

        });
    });
}
module.exports.admin4YilPuanlarGuncellendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_dortYillikTabanPuanlar set universiteAdi = '" + req.body.duniAdi +
            "',bolumAdi='" + req.body.duniB +
            "',ogrSekli='" + req.body.duniS +
            "',puanTur='" + req.body.duniP +
            "',kontenjan=" + req.body.duniK +
            ",tabanPuan='" + req.body.duniTaban +
            "',basariSiralamasi='" + req.body.duniSiralama +
            "' where universiteAdi='" + req.body.dbolumS + "'", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                res.redirect('/admin/dortYilBolumler');

            });
    });
}


module.exports.admindgsGecisBolumleriGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_DgsGecisBolumleri;select * from bh_DgsGecisTercihProgramlari;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0) {
                    sql.close();
                    res.render('adminDgsGecisBolumleri', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('adminDgsGecisBolumleri', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}


module.exports.admindgsGecisBolumEklendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DgsGecisBolumleri(alanKodu,gBolumAdi)values(" + req.body.gAKodu + ",'" + req.body.gbAdi + "')", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dgsGecisBolumleri');

        });
    });
}

module.exports.admindgsGecisBolumTercihEklendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DgsGecisTercihProgramlari(tercihAdi,lisansKodu,gecisId)values('" + req.body.pAdi + "','" + req.body.lKodu + "'," + req.body.tercihEt + ")", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dgsGecisBolumleri');

        });
    });
}
module.exports.admindgsGecisBolumSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsGecisBolumleri where Id=" + req.body.gBolumSil, function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dgsGecisBolumleri');

        });
    });
}
module.exports.admindgsGecisBolumTercihSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsGecisTercihProgramlari where tercihAdi='" + req.body.tercihPSil + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/dgsGecisBolumleri');

        });
    });
}

module.exports.admindevletUniversiteleriGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_DevletUniversiteleri", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0) {
                    sql.close();
                    res.render('adminDevletUniversiteleri', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('adminDevletUniversiteleri', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}

module.exports.admindevletUniversitesiEklendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_DevletUniversiteleri(universiteAdi) values('" + req.body.dUniEkle + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/devletUniversiteleri');

        });
    });
}
module.exports.admindevletUniversitesiSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DevletUniversiteleri where universiteAdi='" + req.body.dUniSil + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/devletUniversiteleri');

        });
    });
}

module.exports.adminvakifUniversiteleriGetir = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_VakifUniversiteleri", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length == 0) {
                    sql.close();
                    res.render('/admin/VakifUniversiteleri', { veri: verisonucu.recordsets });
                } else {
                    sql.close();
                    res.render('adminVakifUniversiteleri', { veri: verisonucu.recordsets });
                }
            } else {
                sql.close();
                res.redirect('/admin');
            }
        });
    });
}

module.exports.adminvakifUniversitesiEklendi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("insert into bh_VakifUniversiteleri(universiteAdi) values('" + req.body.dUniEkle + "');", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/vakiftUniversiteleri');

        });
    });
}
module.exports.adminvakifUniversitesiSilindi = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_VakifUniversiteleri where universiteAdi='" + req.body.dUniSil + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/vakifUniversiteleri');

        });
    });
}
module.exports.adminIslemler = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("SELECT * FROM bh_DgsYorumSatir UNION SELECT * FROM bh_YorumSatir order by tarih asc", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                sql.close();
                res.render('adminHesapEngelle', { veri: verisonucu.recordset })
            } else {
                res.redirect('/admin');
            }
        });
    });
}
module.exports.adminIslemlerPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("delete from bh_DgsYorumSatir where kullaniciAdi='" + req.body.sy1 + "'and kullaniciYorum='" + req.body.sy2 + "' delete from bh_YorumSatir where kullaniciAdi='" + req.body.sy1 + "'and kullaniciYorum='" + req.body.sy2 + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/tumyorumlar-hesapengelle')

        });
    });
}
module.exports.adminYorumBan = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_UyeKayit set durumu='BANLI' where kullaniciAdi='" + req.body.kimi + "' delete from bh_YorumSatir where kullaniciAdi='" + req.body.kimi + "' delete from bh_DgsYorumSatir where kullaniciAdi='" + req.body.kimi + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.redirect('/admin/tumyorumlar-hesapengelle')

        });
    });
}
module.exports.adminkullaniciEngelle = function (req, res) {
    sql.close();
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_UyeKayit where durumu='';SELECT * FROM bh_UyeKayit where durumu='BANLI';", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            if (req.session.adminAdi) {
                if (verisonucu.recordsets[0].length) {
                    sql.close();
                    res.render('kullaniciBanla', { veri: verisonucu.recordsets })
                } else {
                    sql.close();
                    res.render('kullaniciBanla', { veri: verisonucu.recordsets })
                }
            }
            else {
                res.redirect('/admin');
            }

        });
    });
}
module.exports.adminkullaniciEngellePost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_UyeKayit set durumu='BANLI' where kullaniciAdi='" + req.body.kban + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(`<html>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            <meta http-equiv="refresh" content="3;URL=/admin/kullaniciEngelle">
            <body>
            <div style="font-size:25px; margin:10px;">Seçilen kullanıcının hesabı bloke edildi!</div>
            </body></html>`)
            res.end();
        });
    });
}
module.exports.adminkullaniciEngelKaldirPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("update bh_UyeKayit set durumu='' where kullaniciAdi='" + req.body.kban + "'", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write(`<html>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css">
            <meta http-equiv="refresh" content="3;URL=/admin/kullaniciEngelle">
            <body>
            <div style="font-size:25px; margin:10px;">Seçilen kullanıcının hesabı aktif edildi!</div>
            </body></html>`)
            res.end();

        });
    });
}








module.exports.AramaMotoru = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_DgsGecisTercihProgramlari where tercihAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsKonular where konuAdi like  '%" + req.body.araBtn +
            "%';select * from bh_dortYillikTabanPuanlar where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsBolumler where bolumAdi like '%" + req.body.araBtn +
            "%';select * from bh_AnaBlokBasliklar where baslikAdi like '%" + req.body.araBtn +
            "%';select * from bh_DevletUniversiteleri where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_VakifUniversiteleri where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsTabanPuanlar where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_dortYillikBolumler where bolumAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsDersler where dersAdi like '%" + req.body.araBtn + "%'", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                if (verisonucu.recordsets[0].length) {
                    sql.close();
                    res.render('searchSonuc', { veri: verisonucu.recordsets, profil: req.session.adi });
                } else {

                    sql.close();
                    res.render('searchSonuc', { veri: verisonucu.recordsets, profil: req.session.adi });
                }
            });
    });
}
module.exports.AramaMotoruPost = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from bh_DgsGecisTercihProgramlari where tercihAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsKonular where konuAdi like '%" + req.body.araBtn +
            "%';select * from bh_dortYillikTabanPuanlar where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsBolumler where bolumAdi like '%" + req.body.araBtn +
            "%';select * from bh_AnaBlokBasliklar where baslikAdi like '%" + req.body.araBtn +
            "%';select * from bh_DevletUniversiteleri where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_VakifUniversiteleri where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsTabanPuanlar where universiteAdi like '%" + req.body.araBtn +
            "%';select * from bh_dortYillikBolumler where bolumAdi like '%" + req.body.araBtn +
            "%';select * from bh_DgsDersler where dersAdi like '%" + req.body.araBtn + "%'", function (err, verisonucu) {
                if (err) {
                    console.log(err);
                }
                if (req.body.araBtn == null || req.body.araBtn == "" || req.body.araBtn.length < 3) {
                    sql.close(); res.redirect('/anasayfa')
                }
                else if (verisonucu.recordsets[0].length) {
                    sql.close();
                    res.render('searchSonuc', { veri: verisonucu.recordsets,profil:req.session.adi });
                } else {

                    sql.close();
                    res.render('searchSonuc', { veri: verisonucu.recordsets,profil:req.session.adi });
                }
            });
    });
}

