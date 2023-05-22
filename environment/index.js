const dev = process.env.NODE_ENV !== "production";
export const URL = dev ? "http://localhost:3000" : "";

export const SYSTEM_MESSAGES = {
  // Tuz Soda Sayaç Kayıt Formu
  T1: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Tuz Soda Sayaç Toplama Kayıt Formu",
    code: "T1",
  },
  // Tuz Tesisi Kontrol Çizelgesi
  T2: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Tuz Tesisi Kontrol Çizelgesi Formu",
    code: "T2",
  },
  // Tuz Soda Tesisi Kontrol Formu
  T3: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Tuz Soda Tesisi Kontrol Formu",
    code: "T3",
  },
  // Tuz Sodyum Klorur Kontrol Formu
  T4: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Tuz Sodyum Klorür Kontrol Formu",
    code: "T4",
  },
  // Madde Kullanım Sulfirik Asit Formu
  M1: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma Sülfirik Asit Madde Kullanım Formu",
    code: "M1",
  },
  // Madde Kullanım Demir Üç Klorür Formu
  M2: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma Demir Üç Klorür Madde Kullanım Formu",
    code: "M2",
  },
  // Madde Kullanım Renk Giderici Formu
  M3: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma Renk Giderici Madde Kullanım Formu",
    code: "M3",
  },
  // Su - İşletme Suyu
  S1: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Su - İşletme Suyu Kontrol Formu",
    code: "S1",
  },
  // Su - İçme Suyu Suyu
  S2: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Su - İçme Suyu Kontrol Formu",
    code: "S2",
  },
  // Su - İşletme Suyu Yemekhane
  S3: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Su - Yemekhane Suyu Tesisi Formu",
    code: "S3",
  },
  // Su - İşletme Suyu WC
  S4: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Su - Wc Suyu Tesisi Formu",
    code: "S4",
  },
  //ARITMA - AKM
  A1: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - AKM Analizi Kayıt Formu",
    code: "A1",
  },
  //ARITMA - AEROBİK HAVUZU
  A2: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Aerobik Havuzu Analiz Formu",
    code: "A2",
  },
  //ARITMA - Amonyum Azotu Analiz Biyolojik 
  A3: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Amonyum Azotu Biyolojik Analiz Formu",
    code: "A3",
  },
  //ARITMA - Amonyum Azotu Analiz Cikis
  A4: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Amonyum Azotu Çıkış Analiz Formu",
    code: "A4",
  },
  //ARITMA - Amonyum Azotu Analiz Dengeleme
  A5: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Amonyum Azotu Dengeleme Analiz Formu",
    code: "A5",
  },
  //ARITMA - Anaerobik Havuzu
  A6: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Anaerobik Havuzu Analiz Formu",
    code: "A6",
  },
  //ARITMA - Atıksu Arıtma Giriş Çıkış Kayıt Formu
  A7: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Atıksu Arıtma Giriş Çıkış Kayıt Formu",
    code: "A7",
  },
  //ARITMA - Biyolojik Çökeltim Havuzu Analiz Formu
  A8: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Biyolojik Çökeltim Havuzu Analiz Formu",
    code: "A8",
  },
  //ARITMA - Dengeleme Havuzu Analiz Formu
  A9: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Dengeleme Havuzu Analiz Formu",
    code: "A9",
  },
  //ARITMA - Desarj Analiz Formu
  A10: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Desarj Analiz Formu",
    code: "A10",
  },
  //ARITMA - Filtrepres Analiz Formu
  A11: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Filtrepres Analiz Formu",
    code: "A11",
  },
  //ARITMA - Filtrepres Kimyasal Camur Analiz Formu
  A12: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Filtrepres Kimyasal ve Çamur Performansı Kontrol Formu",
    code: "A12",
  },
  //ARITMA - Geri Devir Haznesi Analiz Formu
  A13: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Geri Devir Haznesi Analiz Formu",
    code: "A13",
  },
  //ARITMA - Isı Geri Kazanım Amper ve Ph Kayıt Formu
  A14: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Isı Geri Kazanım Amper ve Ph Kayıt Formu",
    code: "A14",
  },
  //ARITMA - Renk Giderici Kimyasal Girdi Kontrolu Kontrol Formu
  A15: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Arıtma - Renk Giderici Kimyasal Girdi Kontrolu Kontrol Formu",
    code: "A15",
  },


};
