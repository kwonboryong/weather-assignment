import { CommandInput } from "./shadcn/command";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
};

export function SearchInput({ value, onChange, onBlur }: Props) {
  return (
    <div className="w-full">
      <label htmlFor="location-search" className="sr-only">
        날씨 정보를 원하는 장소를 검색하세요.
      </label>

      <CommandInput
        id="location-search"
        value={value}
        onValueChange={onChange}
        placeholder="장소를 검색하세요"
        autoComplete="off"
        className="px-4 text-sm bg-white border outline-none h-11 rounded-2xl focus:border-slate-300"
        onBlur={onBlur}
      />
    </div>
  );
}
