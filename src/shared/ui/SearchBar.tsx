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
  isLoading?: boolean;
  emptyText?: string;
};

export function SearchBar({
  value,
  items,
  open,
  onChange,
  onSelect,
  onClose,
  isLoading,
  emptyText,
}: Props) {
  return (
    <LocationDropdown
      open={open}
      items={items}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      onClose={onClose}
      isLoading={isLoading}
      emptyText={emptyText}
    />
  );
}
