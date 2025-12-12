import React, { useState } from "react";
import { Languages, Check } from "lucide-react";
import { LANGUAGE_OPTIONS } from "../constants/languages";
import { updateLanguagePreferences } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LanguageSelector = ({ currentUser }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    preferredLanguage: currentUser?.preferredLanguage || "en",
    autoTranslate: currentUser?.autoTranslate || false,
  });

  const { mutate: updatePreferences, isPending } = useMutation({
    mutationFn: updateLanguagePreferences,
    onSuccess: () => {
      toast.success("Language preferences updated!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update preferences"
      );
    },
  });

  const handleSave = () => {
    updatePreferences(preferences);
  };

  const selectedLanguage = LANGUAGE_OPTIONS.find(
    (lang) => lang.code === preferences.preferredLanguage
  );

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="size-4" />
        <span className="hidden sm:inline">
          {selectedLanguage?.name || "English"}
        </span>
      </button>

      {isOpen && (
        <div
          tabIndex={0}
          className="dropdown-content z-[1] card card-compact w-80 p-4 shadow-lg bg-base-200 mt-2"
        >
          <div className="card-body">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Languages className="size-5" />
              Translation Settings
            </h3>

            {/* Preferred Language Selector */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  Preferred Language
                </span>
              </label>
              <select
                value={preferences.preferredLanguage}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    preferredLanguage: e.target.value,
                  })
                }
                className="select select-bordered select-sm w-full"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <label className="label">
                <span className="label-text-alt opacity-70">
                  Messages will be translated to this language
                </span>
              </label>
            </div>

            {/* Auto-Translate Toggle */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  checked={preferences.autoTranslate}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      autoTranslate: e.target.checked,
                    })
                  }
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <div className="flex flex-col">
                  <span className="label-text font-medium">Auto-Translate</span>
                  <span className="label-text-alt opacity-70">
                    Automatically translate all incoming messages
                  </span>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-end mt-4 gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm"
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary btn-sm gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="size-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
