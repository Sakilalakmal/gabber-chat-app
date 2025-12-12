import React, { useState } from "react";
import { Languages, RotateCcw, Loader2 } from "lucide-react";
import { translateMessage } from "../lib/api";
import toast from "react-hot-toast";

const TranslateButton = ({
  messageText,
  sourceLang,
  targetLang,
  onTranslated,
}) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [translatedText, setTranslatedText] = useState(null);

  const handleTranslate = async () => {
    if (translatedText && !showOriginal) {
      // Already translated, just toggle view
      setShowOriginal(false);
      return;
    }

    try {
      setIsTranslating(true);
      const result = await translateMessage(
        messageText,
        targetLang,
        sourceLang
      );

      setTranslatedText(result.translated);
      setShowOriginal(false);

      if (onTranslated) {
        onTranslated(result.translated, result.fromCache);
      }

      if (result.fromCache) {
        toast.success("Translation loaded from cache", { duration: 1500 });
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate message");
    } finally {
      setIsTranslating(false);
    }
  };

  const toggleView = () => {
    setShowOriginal(!showOriginal);
  };

  // If we have a translation, show the toggle button
  if (translatedText) {
    return (
      <div className="mt-2 space-y-2">
        <div className="text-sm">
          {showOriginal ? messageText : translatedText}
        </div>
        <button onClick={toggleView} className="btn btn-xs btn-ghost gap-1">
          <RotateCcw className="size-3" />
          {showOriginal ? "Show Translation" : "View Original"}
        </button>
      </div>
    );
  }

  // Show translate button
  return (
    <button
      onClick={handleTranslate}
      disabled={isTranslating}
      className="btn btn-xs btn-ghost gap-1 mt-1"
    >
      {isTranslating ? (
        <>
          <Loader2 className="size-3 animate-spin" />
          Translating...
        </>
      ) : (
        <>
          <Languages className="size-3" />
          Translate
        </>
      )}
    </button>
  );
};

export default TranslateButton;
