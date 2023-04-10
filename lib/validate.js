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
