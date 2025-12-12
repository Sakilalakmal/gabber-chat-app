import express from "express";
import translationController from "../controllers/translation-controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const translationRouter = express.Router();

// All translation routes require authentication
translationRouter.use(isAuthenticated);

// Translate text
translationRouter.post("/", translationController.translate);

// Detect language
translationRouter.post("/detect", translationController.detectLanguage);

// Get supported languages
translationRouter.get(
  "/languages",
  translationController.getSupportedLanguages
);

// Get cache statistics
translationRouter.get("/cache-stats", translationController.getCacheStats);

// Clear cache (you might want to add admin middleware here)
translationRouter.delete("/cache", translationController.clearCache);

export default translationRouter;
