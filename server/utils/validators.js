// All neccessary validations for signup

module.exports.validateRegisterInput = (
  email,
  password,
  confirmPassword
) => {
  // create an object to store all the errors that might appear
  const errors = {};
  // if the email is left empty then populate the errors object with the neccessary error message
  if (email.trim() === "") {
    errors.username = "Email is required";
    // if the email is populated then check to see if the email is in correct format
  } else {
    // regEx to check if the email is in correct format
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    // if the email does not match the regEx format the populate the error object with the neccessary error message
    if (!email.match(regEx)) {
      errors.email = "Email is not valid";
    }
  }

  // if the password is left empty then populate the errors object with the neccessary error message
  if (password === "") {
    errors.password = "Password is required";
    // if the password is populated then check if the password is the same as the confirmPassword
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }
  // return all the errors from the error object and a valid component that will only display true if the length of the objects keys are less than 1
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username is required";
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}