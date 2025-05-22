import crypto from 'crypto';

// Generate a random token for password reset
export const createResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validatePadiCertification = (padiCert) => {
  // Must start with a letter, allow alphanumeric and dashes, minimum 6 characters
  const padiRegex = /^[A-Za-z][A-Za-z0-9-]{5,}$/;
  return padiRegex.test(padiCert);
};
