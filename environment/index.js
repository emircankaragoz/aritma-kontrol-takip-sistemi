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
  // Su - İşletme Suyu
  S3: {
    content: "Günlük veri girişi gerçekleşmedi",
    title: "Su - Yemekhane ve Kullanma Suyu Tesisi Formu",
    code: "S3",
  },
};
