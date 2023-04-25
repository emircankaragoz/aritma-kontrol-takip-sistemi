export default function login_validate(values) {
  const errors = {};

  if (!values.employeeId) {
    errors.employeeId = "Bu alan boş bırakılamaz";
  } else if (!/^\d+$/.test(values.employeeId)) {
    errors.employeeId = "Geçersiz ID";
  } else if (values.employeeId.length < 5 || values.employeeId.length > 5) {
    errors.employeeId = "ID 5 basamaklı olmalı";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Bu alan boş bırakılamaz";
  } else if (values.password.includes(" ")) {
    errors.password = "Geçersiz Şifre";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.employeeId) {
    errors.employeeId = "Bu alan boş bırakılamaz";
  } else if (!/^\d+$/.test(values.employeeId)) {
    errors.employeeId = "Geçersiz ID";
  } else if (values.employeeId.length < 5 || values.employeeId.length > 5) {
    errors.employeeId = "ID 5 basamaklı olmalı";
  }

  // validation for role
  if (!values.roleName) {
    errors.roleName = "Gerekli";
  }

  return errors;
}

export function info_validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Bu alan boş bırakılamaz";
  }

  if (!values.email) {
    errors.email = "Bu alan boş bırakılamaz";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Geçersiz Email Adresi";
  }

  return errors;
}

export function password_validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = "Bu alan boş bırakılamaz";
  } else if (values.password.includes(" ")) {
    errors.password = "Geçersiz Şifre";
  }

  if (!values.newpassword) {
    errors.newpassword = "Bu alan boş bırakılamaz";
  } else if (values.password.includes(" ")) {
    errors.newpassword = "Geçersiz Şifre";
  }

  if (!values.cpassword) {
    errors.cpassword = "Bu alan boş bırakılamaz";
  } else if (values.newpassword !== values.cpassword) {
    errors.cpassword = "Şifre eşleşmiyor";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Geçersiz Şifre";
  }

  return errors;
}
export function isletme_validate(values) {
  const errors = {};

  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  }
  if (!values.sertlik) {
    errors.sertlik = "Bu alan boş bırakılamaz";
  }
  if (!values.bikarbonat) {
    errors.bikarbonat = "Bu alan boş bırakılamaz";
  }
  return errors;
}
export function icme_validate(values) {
  const errors = {};

  if (!values.hamsusayac) {
    errors.hamsusayac = "Bu alan boş bırakılamaz";
  }
  if (!values.hamsuTonGun) {
    errors.hamsuTonGun = "Bu alan boş bırakılamaz";
  }
  if (!values.uretilenSuTonGun) {
    errors.uretilenSuTonGun = "Bu alan boş bırakılamaz";
  }
  if (!values.klorCozHazir) {
    errors.klorCozHazir = "Bu alan boş bırakılamaz";
  }
  if (!values.klorAnalizSonucuMgL) {
    errors.klorAnalizSonucuMgL = "Bu alan boş bırakılamaz";
  }
  if (!values.genelTemizlik) {
    errors.genelTemizlik = "Bu alan boş bırakılamaz";
  }
  if (!values.aciklama) {
    errors.aciklama = "Bu alan boş bırakılamaz";
  }
  return errors;
}
export function yemekhane_validate(values) {
  const errors = {};

  if (!values.klorCozeltisiDozaji) {
    errors.klorCozeltisiDozaji = "Bu alan boş bırakılamaz";
  }
  if (!values.klor) {
    errors.klor = "Bu alan boş bırakılamaz";
  }
  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  }
  if (!values.iletkenlik) {
    errors.iletkenlik = "Bu alan boş bırakılamaz";
  }
  if (!values.genelTemizlik) {
    errors.genelTemizlik = "Bu alan boş bırakılamaz";
  }
  if (!values.aciklama) {
    errors.aciklama = "Bu alan boş bırakılamaz";
  }
  return errors;
}
export function renkGidericiTuketimi_validate(values) {
  const errors = {};

  if (!values.renkGidericiDozajiMlDak) {
    errors.renkGidericiDozajiMlDak = "Bu alan boş bırakılamaz";
  }
  if (!values.biyolojikCokHavCikisiKompozitRenk) {
    errors.biyolojikCokHavCikisiKompozitRenk = "Bu alan boş bırakılamaz";
  }
  if (!values.yavasKaristirmaHavCikisi) {
    errors.yavasKaristirmaHavCikisi = "Bu alan boş bırakılamaz";
  }
  if (!values.kimyasalCokHavCikisiRenk) {
    errors.kimyasalCokHavCikisiRenk = "Bu alan boş bırakılamaz";
  }
  if (!values.toplamRenkGidericiKgSaat) {
    errors.toplamRenkGidericiKgSaat = "Bu alan boş bırakılamaz";
  }
  if (!values.toplamRenkGidericiEuroSaat) {
    errors.toplamRenkGidericiEuroSaat = "Bu alan boş bırakılamaz";
  }
  if (!values.atikSu_m3sa) {
    errors.atikSu_m3sa = "Bu alan boş bırakılamaz";
  }
  if (!values.kullanilanKimyasal) {
    errors.kullanilanKimyasal = "Bu alan boş bırakılamaz";
  }
  return errors;
}
export function saatlikVeri_validate(values) {
  const errors = {};

  if (!values.esanjorGirisSicakligi) {
    errors.esanjorGirisSicakligi = "Bu alan boş bırakılamaz";
  }
  if (!values.esanjorCikisSicakligi) {
    errors.esanjorCikisSicakligi = "Bu alan boş bırakılamaz";
  }
  if (!values.oksijen) {
    errors.oksijen = "Bu alan boş bırakılamaz";
  }
  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  }

  return errors;
}
export function cikisAtiksuSayac_validate(values) {
  const errors = {};

  if (!values.atiksuSayac) {
    errors.atiksuSayac = "Bu alan boş bırakılamaz";
  }
  if (!values.atiksuMetrekup) {
    errors.atiksuMetrekup = "Bu alan boş bırakılamaz";
  }

  return errors;
}
export function tdu_validate(values) {
  const errors = {};

  if (!values.geldigiFirma) {
    errors.geldigiFirma = "Bu alan boş bırakılamaz";
  }
  if (!values.tasiyanFirma) {
    errors.tasiyanFirma = "Bu alan boş bırakılamaz";
  }
  if (!values.miktarKg) {
    errors.miktarKg = "Bu alan boş bırakılamaz";
  }
  if (!values.atikCinsi) {
    errors.atikCinsi = "Bu alan boş bırakılamaz";
  }
  if (!values.aciklama) {
    errors.aciklama = "Bu alan boş bırakılamaz";
  }

  return errors;
}

export function tuzSodaSayacToplama_validate(values) {
  const errors = {};

  if (!values.uretilenSu) {
    errors.uretilenSu = "Bu alan boş bırakılamaz";
  }

  if (!values.tasviyedeKullanilanSiviTuzSayac) {
    errors.tasviyedeKullanilanSiviTuzSayac = "Bu alan boş bırakılamaz";
  }

  if (!values.tuzVeSodaTesisiKullanilanSuSayac) {
    errors.tuzVeSodaTesisiKullanilanSuSayac = "Bu alan boş bırakılamaz";
  }

  if (!values.isletmeyeVerilenSiviTuzSayac) {
    errors.isletmeyeVerilenSiviTuzSayac = "Bu alan boş bırakılamaz";
  }
  if (!values.isletmeyeVerilenSiviTuzHazirlananTankSayisi) {
    errors.isletmeyeVerilenSiviTuzHazirlananTankSayisi =
      "Bu alan boş bırakılamaz";
  }

  if (!values.hazirlananSiviSodaSayac) {
    errors.hazirlananSiviSodaSayac = "Bu alan boş bırakılamaz";
  }
  if (!values.siviSodaHattiYikamaSuyuSayac) {
    errors.siviSodaHattiYikamaSuyuSayac = "Bu alan boş bırakılamaz";
  }

  if (!values.katiSodaKg) {
    errors.katiSodaKg = "Bu alan boş bırakılamaz";
  }

  if (!values.aritmaTesisineAtilanAtikSiviTuzuLt) {
    errors.aritmaTesisineAtilanAtikSiviTuzuLt = "Bu alan boş bırakılamaz";
  }

  return errors;
}
//tuz tesisi kontrol cizelgesi
export function tuzTesisiKontrolCizelgesi_validate(values) {
  const errors = {};

  if (!values.cozeltiSertligi) {
    errors.cozeltiSertligi = "Bu alan boş bırakılamaz";
  }

  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  }

  if (!values.yogunluk) {
    errors.yogunluk = "Bu alan boş bırakılamaz";
  }

  if (!values.bikarbonat) {
    errors.bikarbonat = "Bu alan boş bırakılamaz";
  }
  if (!values.kontrolEden) {
    errors.kontrolEden =
      "Bu alan boş bırakılamaz";
  }

  return errors;
}
//soda tesisi kontrol cizelgesi
export function sodaTesisiKontrolFormu_validate(values) {
  const errors = {};

  if (!values.cozeltiYogunlugu) {
    errors.cozeltiYogunlugu = "Bu alan boş bırakılamaz";
  }

  if (!values.kontrolEden) {
    errors.kontrolEden = "Bu alan boş bırakılamaz";
  }
  return errors;
}
//sodyum klorur kontrol form
export function sodyumKlorurKontrolFormu_validate(values) {
  const errors = {};

  if (!values.gorunum) {
    errors.gorunum = "Bu alan boş bırakılamaz";
  }

  if (!values.sertlik) {
    errors.sertlik = "Bu alan boş bırakılamaz";
  }
   if (!values.demir) {
    errors.demir = "Bu alan boş bırakılamaz";
  }

  if (!values.sertlik) {
    errors.sertlik = "Bu alan boş bırakılamaz";
  }
   if (!values.irsaliyeNo) {
    errors.irsaliyeNo = "Bu alan boş bırakılamaz";
  }
  if (!values.miktarKg) {
    errors.miktarKg = "Bu alan boş bırakılamaz";
  }

  if (!values.firma) {
    errors.firma = "Bu alan boş bırakılamaz";
  }
   if (!values.kabul) {
    errors.kabul = "Bu alan boş bırakılamaz";
  }

  if (!values.iade) {
    errors.iade = "Bu alan boş bırakılamaz";
  }
  if (!values.aciklama) {
    errors.aciklama = "Bu alan boş bırakılamaz";
  }
  return errors;
}

