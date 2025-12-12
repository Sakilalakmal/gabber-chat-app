import { TranslationServiceClient } from "@google-cloud/translate";
import NodeCache from "node-cache";

// Initialize Google Cloud Translation client
// Using API key authentication (simpler for development)
const translationClient = new TranslationServiceClient({
  apiKey: process.env.GOOGLE_TRANSLATION_API_KEY,
});

// Initialize node-cache for cost optimization
// TTL: 30 days (2,592,000 seconds) - translations don't change
const translationCache = new NodeCache({
  stdTTL: 2592000, // 30 days
  checkperiod: 600, // Check for expired keys every 10 minutes
  useClones: false, // Better performance
});

// Google Cloud project configuration
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || "gabber-chat-app";
const location = "global";

/**
 * Translate text from source language to target language
 * Uses cache to avoid redundant API calls and reduce costs
 *
 * @param {string} text - Text to translate
 * @param {string} targetLanguageCode - Target language code (e.g., 'es', 'fr')
 * @param {string} sourceLanguageCode - Source language code (default: 'en')
 * @returns {Promise<Object>} Translation result with cache info
 */
async function translateText(
  text,
  targetLanguageCode,
  sourceLanguageCode = "en"
) {
  try {
    // Create cache key: "text:sourceLang:targetLang"
    const cacheKey = `${text}:${sourceLanguageCode}:${targetLanguageCode}`;

    // Check if translation exists in cache
    const cachedTranslation = translationCache.get(cacheKey);
    if (cachedTranslation) {
      console.log("✅ Cache HIT:", cacheKey);
      return {
        translatedText: cachedTranslation,
        sourceLanguage: sourceLanguageCode,
        targetLanguage: targetLanguageCode,
        fromCache: true,
      };
    }

    console.log("❌ Cache MISS - Calling Google API:", cacheKey);

    // Construct request (following Google's tutorial)
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: sourceLanguageCode,
      targetLanguageCode: targetLanguageCode,
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    // Get translated text
    const translatedText = response.translations[0].translatedText;

    // Store in cache for future use (30 days)
    translationCache.set(cacheKey, translatedText);

    console.log(`Translation: ${text} → ${translatedText}`);

    return {
      translatedText,
      sourceLanguage: sourceLanguageCode,
      targetLanguage: targetLanguageCode,
      fromCache: false,
    };
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error(`Translation failed: ${error.message}`);
  }
}

/**
 * Detect the language of given text
 *
 * @param {string} text - Text to detect language for
 * @returns {Promise<Object>} Detected language with confidence score
 */
async function detectLanguage(text) {
  try {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      content: text,
    };

    const [response] = await translationClient.detectLanguage(request);
    const detectedLanguage = response.languages[0];

    return {
      languageCode: detectedLanguage.languageCode,
      confidence: detectedLanguage.confidence,
    };
  } catch (error) {
    console.error("Language detection error:", error);
    throw new Error(`Language detection failed: ${error.message}`);
  }
}

/**
 * Get list of supported languages
 *
 * @returns {Promise<Array>} List of supported languages with codes and names
 */
async function getSupportedLanguages() {
  try {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      displayLanguageCode: "en", // Display names in English
    };

    const [response] = await translationClient.getSupportedLanguages(request);

    return response.languages.map((lang) => ({
      code: lang.languageCode,
      name: lang.displayName,
    }));
  } catch (error) {
    console.error("Get languages error:", error);
    throw new Error(`Failed to get supported languages: ${error.message}`);
  }
}

/**
 * Get cache statistics for monitoring performance and cost savings
 *
 * @returns {Object} Cache statistics including hit rate
 */
function getCacheStats() {
  const stats = translationCache.getStats();
  const totalRequests = stats.hits + stats.misses;
  const hitRate =
    totalRequests > 0 ? ((stats.hits / totalRequests) * 100).toFixed(2) : 0;

  // Estimate cost savings (Google charges $20 per million characters)
  const avgCharsPerTranslation = 50; // Conservative estimate
  const savedTranslations = stats.hits;
  const savedCharacters = savedTranslations * avgCharsPerTranslation;
  const estimatedSavings = (savedCharacters / 1000000) * 20; // $20 per million chars

  return {
    totalKeys: stats.keys,
    hits: stats.hits,
    misses: stats.misses,
    hitRate: `${hitRate}%`,
    estimatedSavings: `$${estimatedSavings.toFixed(2)}`,
    memoryUsage: {
      keys: stats.ksize,
      values: stats.vsize,
    },
  };
}

/**
 * Clear cache (for testing or maintenance)
 *
 * @returns {Object} Success message
 */
function clearCache() {
  translationCache.flushAll();
  console.log("🗑️ Translation cache cleared");
  return { message: "Cache cleared successfully" };
}

export default {
  translateText,
  detectLanguage,
  getSupportedLanguages,
  getCacheStats,
  clearCache,
};
