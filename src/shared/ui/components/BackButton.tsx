import { ChevronLeft } from "lucide-react";

type Props = {
  ariaLabel: string;
  onClick: () => void;
  className?: string;
};

export function BackButton({ ariaLabel, onClick, className }: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`bg-white border rounded-full h-11 w-11 shrink-0 inline-flex items-center justify-center transition-colors hover:bg-indigo-100
      } ${className ?? ""}`}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}
