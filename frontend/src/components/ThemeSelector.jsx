import { PaletteIcon, SwitchCamera } from "lucide-react";
import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants/themes";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-1">
          {THEMES.map((themeOptions) => (
            <button
              key={themeOptions.name}
              className={`
              w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
              ${
                theme === themeOptions.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }
              
            `}
              onClick={() => setTheme(themeOptions.name)}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{themeOptions.label}</span>
              {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1">
                {themeOptions.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
