type Props = {
  label: string;
  valueC: number;
  size?: "compact" | "default";
};

export function TempMetricBlock({ label, valueC, size = "default" }: Props) {
  const isCompact = size === "compact";

  return (
    <div
      role="group"
      aria-label={`${label} ${Math.round(valueC)}도`}
      className={`flex flex-col items-center justify-center 
        bg-indigo-500 text-white rounded-xl
        ${
          isCompact
            ? "px-4 py-2 sm:min-w-[80px]"
            : "px-4 py-2.5 sm:px-6 sm:py-4 sm:min-w-[110px]"
        }
        ${
          isCompact
            ? "max-sm:px-3 max-sm:py-1.5 max-sm:rounded-lg"
            : "max-sm:px-3 max-sm:py-2 max-sm:rounded-lg"
        }
      `}
    >
      <span
        className={`font-medium mb-0.5 max-sm:text-[9px]
          ${isCompact ? "text-[10px] sm:text-[10px]" : "text-[11px] sm:text-xs"}
        `}
      >
        {label}
      </span>

      <span
        className={`font-bold
          ${isCompact ? "text-base sm:text-base" : "text-lg sm:text-2xl"}
          ${isCompact ? "max-sm:text-sm" : "max-sm:text-base"}
        `}
      >
        {Math.round(valueC)}°C
      </span>
    </div>
  );
}
