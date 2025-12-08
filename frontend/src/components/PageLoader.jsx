import { Loader } from "lucide-react";
import React from "react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      data-theme={theme}
    >
      <Loader className="size-20 animate-spin mr-4" />
      Wait a moment...
    </div>
  );
};

export default PageLoader;
