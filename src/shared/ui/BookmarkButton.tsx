import { Bookmark } from "lucide-react";

type Props = {
  mode?: "link" | "toggle";
  active?: boolean;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

export function BookmarkButton({
  mode = "toggle",
  active = false,
  ariaLabel,
  onClick,
  className,
  disabled = false,
}: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={mode === "toggle" ? active : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`bg-white border rounded-full h-11 w-11 shrink-0 inline-flex items-center justify-center transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-100"
      } ${className ?? ""}`}
    >
      <Bookmark
        className={`h-5 w-5 ${active ? "fill-current" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
