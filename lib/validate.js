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
    errors.roleName = "Required";
  }

  return errors;
}
