import translationService from "../lib/translationService.js";

const translationController = {
  /**
   * POST /api/translate
   * Translate text from source to target language
   */
  async translate(req, res) {
    try {
      const { text, targetLang, sourceLang = "en" } = req.body;

      // Validation
      if (!text || !targetLang) {
        return res.status(400).json({
          error: "Missing required fields: text and targetLang",
        });
      }

      // Translate
      const result = await translationService.translateText(
        text,
        targetLang,
        sourceLang
      );

      return res.status(200).json({
        success: true,
        original: text,
        translated: result.translatedText,
        sourceLang: result.sourceLanguage,
        targetLang: result.targetLanguage,
        fromCache: result.fromCache,
      });
    } catch (error) {
      console.error("Translation controller error:", error);
      return res.status(500).json({
        error: "Translation failed",
        message: error.message,
      });
    }
  },

  /**
   * POST /api/translate/detect
   * Detect language of text
   */
  async detectLanguage(req, res) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          error: "Missing required field: text",
        });
      }

      const result = await translationService.detectLanguage(text);

      return res.status(200).json({
        success: true,
        text,
        detectedLanguage: result.languageCode,
        confidence: result.confidence,
      });
    } catch (error) {
      console.error("Language detection error:", error);
      return res.status(500).json({
        error: "Language detection failed",
        message: error.message,
      });
    }
  },

  /**
   * GET /api/translate/languages
   * Get list of supported languages
   */
  async getSupportedLanguages(req, res) {
    try {
      const languages = await translationService.getSupportedLanguages();

      return res.status(200).json({
        success: true,
        count: languages.length,
        languages,
      });
    } catch (error) {
      console.error("Get languages error:", error);
      return res.status(500).json({
        error: "Failed to get supported languages",
        message: error.message,
      });
    }
  },

  /**
   * GET /api/translate/cache-stats
   * Get cache statistics for monitoring
   */
  getCacheStats(req, res) {
    try {
      const stats = translationService.getCacheStats();

      return res.status(200).json({
        success: true,
        stats,
      });
    } catch (error) {
      console.error("Cache stats error:", error);
      return res.status(500).json({
        error: "Failed to get cache stats",
        message: error.message,
      });
    }
  },

  /**
   * DELETE /api/translate/cache
   * Clear translation cache
   */
  clearCache(req, res) {
    try {
      const result = translationService.clearCache();

      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error("Clear cache error:", error);
      return res.status(500).json({
        error: "Failed to clear cache",
        message: error.message,
      });
    }
  },
};

export default translationController;
