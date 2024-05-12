export const validateEmail = (email: string) => {
  if (!email) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least six characters long";
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!confirmPassword) {
    return "Confirm Password is required";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};
