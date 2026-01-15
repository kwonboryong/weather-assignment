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

      <input
        id="location-search"
        type="search"
        placeholder="장소를 검색하세요"
        value={value}
        className="w-full px-4 text-sm bg-white border outline-none rounded-2xl h-11 focus:ring-1 focus:ring-slate-300"
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete="off"
      />
    </div>
  );
}
