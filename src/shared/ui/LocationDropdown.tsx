import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/shared/ui/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/ui/shadcn/command";
import { SearchInput } from "./SearchInput";

export type LocationItem = {
  id: string;
  title: string;
  subtitle?: string;
};

type Props = {
  items: LocationItem[];
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  onSelect: (item: LocationItem) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
};

export function LocationDropdown({
  items,
  open,
  value,
  onChange,
  onClose,
  onSelect,
  hasMore,
  onLoadMore,
}: Props) {
  return (
    <Command className="p-0 bg-transparent border-0 shadow-none">
      <Popover open={open}>
        <PopoverAnchor asChild>
          <div className="w-full">
            <SearchInput
              value={value}
              onChange={onChange}
              onBlur={() => window.setTimeout(() => onClose(), 0)}
            />
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          side="bottom"
          className="w-[--radix-popover-trigger-width] p-0 mt-2"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandList className="max-h-72">
            <CommandEmpty>검색 결과가 없습니다</CommandEmpty>

            {items.length > 0 ? (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm">{item.title}</span>
                      {item.subtitle ? (
                        <span className="text-xs text-slate-500">
                          {item.subtitle}
                        </span>
                      ) : null}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}

            {hasMore ? (
              <div className="p-2 border-t">
                <button
                  type="button"
                  className="w-full h-8 text-sm rounded-md hover:bg-slate-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onLoadMore}
                >
                  더보기
                </button>
              </div>
            ) : null}
          </CommandList>
        </PopoverContent>
      </Popover>
    </Command>
  );
}
