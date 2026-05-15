const CONTROL_CHARS = /[\u0000-\u001f\u007f-\u009f]/g;
const TAGS = /<[^>]*>?/g;
const DANGEROUS_PROTOCOLS = /\b(javascript|data|vbscript):/gi;
const INLINE_EVENT_HINTS = /\bon[a-z]+\s*=/gi;

export function sanitizeTextInput(value: string) {
  return value
    .replace(CONTROL_CHARS, " ")
    .replace(TAGS, " ")
    .replace(DANGEROUS_PROTOCOLS, "")
    .replace(INLINE_EVENT_HINTS, "")
    .replace(/[<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hasUnsafeIntent(value: string) {
  return /<\s*script|javascript:|data:text\/html|onerror\s*=|onload\s*=/i.test(
    value,
  );
}
