import { SearchInput } from "./SearchInput";
import { LocationDropdown, type LocationItem } from "./LocationDropdown";

type Props = {
  value: string;
  items: LocationItem[];
  open: boolean;
  onChange: (v: string) => void;
  onSelect: (item: LocationItem) => void;
  onClose: () => void;
};

export function SearchBar({
  value,
  items,
  open,
  onChange,
  onSelect,
  onClose,
}: Props) {
  return (
    <LocationDropdown open={open} items={items} onSelect={onSelect}>
      <div className="w-full">
        <SearchInput
          value={value}
          onChange={onChange}
          onBlur={() => {
            window.setTimeout(() => onClose(), 0);
          }}
        />
      </div>
    </LocationDropdown>
  );
}
