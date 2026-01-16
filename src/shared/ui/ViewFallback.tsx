import { AlertCircle, Loader2 } from "lucide-react";
import type { ViewState } from "@/shared/lib/getViewState";

type Props = {
  state: Exclude<ViewState, { type: "ready" }>;
};

export function ViewFallback({ state }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm mt-9">
      {state.type === "loading" ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
          <span className="text-gray-600">{state.message}</span>
        </>
      ) : (
        <>
          <AlertCircle className="w-4 h-4" aria-hidden />
          <span className="text-red-600">{state.message}</span>
        </>
      )}
    </div>
  );
}
