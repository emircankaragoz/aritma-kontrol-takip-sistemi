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
