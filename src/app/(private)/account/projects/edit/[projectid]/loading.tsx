import Spinner from "@/components/ui/spinner";
import React from "react";

function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center mt-40">
      <Spinner />
    </div>
  );
}

export default LoadingIndicator;
