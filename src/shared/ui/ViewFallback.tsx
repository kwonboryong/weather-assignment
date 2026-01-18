import { AlertCircle, Loader2 } from "lucide-react";
import type { ViewState } from "@/shared/lib/getViewState";

type Props = {
  state: Exclude<ViewState, { type: "ready" }>;
};

export function ViewFallback({ state }: Props) {
  const isLoading = state.type === "loading";

  return (
    <div
      className="flex items-center gap-2 text-sm mt-9"
      role={isLoading ? "status" : "alert"}
      aria-live={isLoading ? "polite" : "assertive"}
      aria-atomic="true"
    >
      {state.type === "loading" ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span className="text-gray-600">{state.message}</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4" aria-hidden="true" />
          <span className="text-red-600">{state.message}</span>
        </>
      )}
    </div>
  );
}
