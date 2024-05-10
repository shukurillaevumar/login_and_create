const userValidationRegex = {
  isEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  isPhone: /^9989[012345789][0-9]{7}$/,
  isPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};
module.exports = { userValidationRegex };
