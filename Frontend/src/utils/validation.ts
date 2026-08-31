/**
 * Validation utilities for form fields:
 * - Phone numbers: Only numeric digits allowed, exactly 10 digits.
 * - Email addresses: Valid standard format (name@domain.com).
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_EXACT_10_DIGITS_REGEX = /^[0-9]{10}$/;

/**
 * Filters any input string so only numeric digits (0-9) remain, capped at 10 digits.
 */
export function sanitizeNumeric10Digits(input: string): string {
  return input.replace(/\D/g, '').slice(0, 10);
}

/**
 * Validates whether an email string is valid or empty (if optional).
 */
export function isValidEmail(email: string): boolean {
  if (!email || !email.trim()) return true; // Empty check handled separately by required
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates whether a phone string contains exactly 10 numeric digits.
 */
export function isValid10DigitPhone(phone: string): boolean {
  if (!phone || !phone.trim()) return true; // Empty check handled separately by required
  const digits = phone.trim().replace(/\D/g, '');
  return digits.length === 10;
}
