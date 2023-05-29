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
export function isletme_validate(values, subCategory, su) {
  const errors = {};
  if (subCategory === "Yumuşak Su") {
    if (!values.ph) {
      errors.ph = "Bu alan boş bırakılamaz";
    } else if (values.ph < su.phMin || values.ph > su.phMax) {
      errors.ph = "Lütfen 7-8 Aralığında değer giriniz!";
    }
    if (!values.sertlik) {
      errors.sertlik = "Bu alan boş bırakılamaz";
    } else if (values.sertlik > su.sertlikMax) {
      errors.sertlik = "Maksiumum 1 AS giriniz";
    }
    if (!values.bikarbonat) {
      errors.bikarbonat = "Bu alan boş bırakılamaz";
    } else if (values.bikarbonat > su.bikarbonatMax) {
      errors.bikarbonat = "Maksimum 400ppm giriniz!";
    }
  }
  //SERT SU
  if (subCategory === "Sert Su") {
    if (!values.ph) {
      errors.ph = "Bu alan boş bırakılamaz";
    } else if (values.ph < su.phMin || values.ph > su.phMax) {
      errors.ph = "Lütfen 7-8 Aralığında değer giriniz!";
    }
    if (!values.sertlik) {
      errors.sertlik = "Bu alan boş bırakılamaz";
    } else if (values.sertlik > su.sertlikMax) {
      errors.sertlik = "Maksiumum 20 AS giriniz";
    }
    if (!values.bikarbonat) {
      errors.bikarbonat = "Bu alan boş bırakılamaz";
    } else if (values.bikarbonat > su.bikarbonatMax) {
      errors.bikarbonat = "Maksimum 400ppm giriniz!";
    }
  }
  //SICAK SU
  if (subCategory === "Sıcak Su") {
    if (!values.ph) {
      errors.ph = "Bu alan boş bırakılamaz";
    } else if (values.ph < su.phMin || values.ph > su.phMax) {
      errors.ph = "Lütfen 7-8.5 Aralığında değer giriniz!";
    }
    if (!values.sertlik) {
      errors.sertlik = "Bu alan boş bırakılamaz";
    } else if (values.sertlik > su.sertlikMax) {
      errors.sertlik = "Maksiumum 1 AS giriniz";
    }
    if (!values.bikarbonat) {
      errors.bikarbonat = "Bu alan boş bırakılamaz";
    } else if (values.bikarbonat > su.bikarbonatMax) {
      errors.bikarbonat = "Maksimum 400ppm giriniz!";
    }
  }

  return errors;
}

export function yemekhane_validate(values, su) {
  const errors = {};

  if (!values.klorCozeltisiDozaji) {
    errors.klorCozeltisiDozaji = "Bu alan boş bırakılamaz";
  }
  if (!values.klor) {
    errors.klor = "Bu alan boş bırakılamaz";
  } else if (values.klor < su.klorMin || values.klor > su.klorMax) {
    errors.klor = "0,2 - 0,5mg/l aralığında değer giriniz! ";
  }
  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  } else if (values.ph < su.phMin || values.ph > su.phMax) {
    errors.ph = "6,5 - 9,0 aralığında değer giriniz!";
  }
  if (!values.iletkenlik) {
    errors.iletkenlik = "Bu alan boş bırakılamaz";
  } else if (values.iletkenlik > su.iletkenlikMax) {
    errors.iletkenlik = "Maximum 0,250ms giriniz!";
  }
  if (!values.genelTemizlik) {
    errors.genelTemizlik = "Bu alan boş bırakılamaz";
  }
  if (!values.aciklama) {
    errors.aciklama = "Bu alan boş bırakılamaz";
  }
  return errors;
}
export function wc_validate(values, su) {
  const errors = {};

  if (!values.klorCozeltisiDozaji) {
    errors.klorCozeltisiDozaji = "Bu alan boş bırakılamaz";
  }
  if (!values.klor) {
    errors.klor = "Bu alan boş bırakılamaz";
  } else if (values.klor < su.klorMin || values.klor > su.klorMax) {
    errors.klor = "0,2 - 0,5mg/l aralığında değer giriniz! ";
  }
  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  } else if (values.ph < su.phMin || values.ph > su.phMax) {
    errors.ph = "6,5 - 9,0 aralığında değer giriniz!";
  }
  if (!values.iletkenlik) {
    errors.iletkenlik = "Bu alan boş bırakılamaz";
  } else if (values.iletkenlik > su.iletkenlikMax) {
    errors.iletkenlik = "Maximum 0,250ms giriniz!";
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

//tuz tesisi kontrol cizelgesi
export function tuzTesisiKontrolCizelgesi_validate(values, phMin, phMax, bikarbonatMax, yogunlukMin, yogunlukMax ) {
  const errors = {};

  if (!values.cozeltiSertligi) {
    errors.cozeltiSertligi = "Bu alan boş bırakılamaz";
  }
  if (!values.ph) {
    errors.ph = "Bu alan boş bırakılamaz";
  } else if (values.ph < phMin || values.ph > phMax) {
    errors.ph = `pH ${phMin} - ${phMax} aralığında değer giriniz!`;
  }
  if (!values.yogunluk) {
    errors.yogunluk = "Bu alan boş bırakılamaz";
  } else if (values.yogunluk < yogunlukMin|| values.yogunluk > yogunlukMax) {
    errors.yogunluk = `${yogunlukMin} - ${yogunlukMax} gr/cm3 aralığında değer giriniz!`;
  }
  if (!values.bikarbonat) {
    errors.bikarbonat = "Bu alan boş bırakılamaz";
  } else if (values.bikarbonat > bikarbonatMax) {
    errors.bikarbonat = `Maximum ${bikarbonatMax} ppm değer giriniz!`;
  }
  if (!values.kontrolEden) {
    errors.kontrolEden = "Bu alan boş bırakılamaz";
  }
  return errors;
}
//soda tesisi kontrol cizelgesi
export function sodaTesisiKontrolFormu_validate(values, cozeltiYogunluguMin, cozeltiYogunluguMax) {
  const errors = {};

  if (!values.cozeltiYogunlugu) {
    errors.cozeltiYogunlugu = "Bu alan boş bırakılamaz";
  } else if (
    values.cozeltiYogunlugu < cozeltiYogunluguMin ||
    values.cozeltiYogunlugu > cozeltiYogunluguMax
  ) {
    errors.cozeltiYogunlugu = `${cozeltiYogunluguMin} - ${cozeltiYogunluguMax} gr/cm3 aralığında değer giriniz!`;
  }
  if (!values.kontrolEden) {
    errors.kontrolEden = "Bu alan boş bırakılamaz";
  }
  return errors;
}
//sodyum klorur kontrol form
export function sodyumKlorurKontrolFormu_validate(values, demirMin, demirMax, sertlikMin, sertlikMax) {
  const errors = {};

  if (!values.gorunum) {
    errors.gorunum = "Bu alan boş bırakılamaz";
  }

  if (!values.sertlik) {
    errors.sertlik = "Bu alan boş bırakılamaz";
  }
  if (!values.demir) {
    errors.demir = "Bu alan boş bırakılamaz";
  } else if (values.demir > demirMax) {
    errors.demir = `Maximum ${demirMax}ppm giriniz!`;
  }

  if (!values.sertlik) {
    errors.sertlik = "Bu alan boş bırakılamaz";
  }
  //Max 40AS
  else if (values.sertlik > sertlikMax) {
    errors.sertlik = `Maximum ${sertlikMax}AS giriniz!`;
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
