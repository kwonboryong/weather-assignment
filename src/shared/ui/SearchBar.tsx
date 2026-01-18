import {
  LocationDropdown,
  type LocationItem,
} from "@/shared/ui/LocationDropdown";

type Props = {
  value: string;
  items: LocationItem[];
  open: boolean;
  onChange: (v: string) => void;
  onSelect: (item: LocationItem) => void;
  onClose: () => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
};

export function SearchBar({
  value,
  items,
  open,
  onChange,
  onSelect,
  onClose,
  hasMore,
  onLoadMore,
}: Props) {
  return (
    <LocationDropdown
      open={open}
      items={items}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      onClose={onClose}
      hasMore={hasMore}
      onLoadMore={onLoadMore}
    />
  );
}
