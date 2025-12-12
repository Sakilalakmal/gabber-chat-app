// Language names with their ISO 639-1 codes for Google Translate
export const LANGUAGE_OPTIONS = [
  { name: "English", code: "en" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Mandarin Chinese", code: "zh" },
  { name: "Japanese", code: "ja" },
  { name: "Korean", code: "ko" },
  { name: "Hindi", code: "hi" },
  { name: "Russian", code: "ru" },
  { name: "Sinhala", code: "si" },
  { name: "Tamil", code: "ta" },
  { name: "Bengali", code: "bn" },
  { name: "Urdu", code: "ur" },
  { name: "Punjabi", code: "pa" },
  { name: "Portuguese", code: "pt" },
  { name: "Arabic", code: "ar" },
  { name: "Italian", code: "it" },
  { name: "Turkish", code: "tr" },
  { name: "Dutch", code: "nl" },
];

// For backward compatibility
export const LANGUAGES = LANGUAGE_OPTIONS.map((lang) => lang.name);
