export function sanitizeText(value = "") {
  return String(value || "").trim();
}

export function buildProfileDraft(profileState = {}) {
  return {
    name: sanitizeText(profileState.name),
    email: sanitizeText(profileState.email),
    phone: sanitizeText(profileState.phone),
    location: sanitizeText(profileState.location),
  };
}

export function isPasswordConfirmationValid(newPassword = "", confirmPassword = "") {
  return String(newPassword) === String(confirmPassword);
}

export function buildLargeAvatarUrl(name = "Accountant User") {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    sanitizeText(name) || "Accountant User",
  )}&background=1f8f8b&color=fff&size=120`;
}
