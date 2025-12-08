import { Loader } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="size-4 animate-spin" />
      Wait a moment...
    </div>
  );
};

export default PageLoader;
