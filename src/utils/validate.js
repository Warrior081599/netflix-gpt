export const validateData = (email, password, fullname) => {
  let validateName;
  if (fullname) {
    validateName = /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/.test(fullname);
  }
  const validateEmail =
    /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
  const validatePassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (validateName) {
    return "Name is Not Valid";
  } else if (!validateEmail) {
    return "Email is Not Valid";
  } else if (!validatePassword) {
    return "Password is Not Valid";
  }

  return null;
};
