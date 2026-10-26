export type PasswordCheck = {
  valid: boolean;
  errors: string[];
};

const rules: { test: (p: string) => boolean; message: string }[] = [
  { test: (p) => p.length >= 8, message: "At least 8 characters" },
  { test: (p) => p.length <= 72, message: "At most 72 characters" },
  { test: (p) => /[a-z]/.test(p), message: "One lowercase letter" },
  { test: (p) => /[A-Z]/.test(p), message: "One uppercase letter" },
  { test: (p) => /\d/.test(p), message: "One number" },
  { test: (p) => /[^A-Za-z0-9]/.test(p), message: "One special character" },
];

export function validatePassword(password: string): PasswordCheck {
  const errors = rules.filter((r) => !r.test(password)).map((r) => r.message);
  return { valid: errors.length === 0, errors };
}