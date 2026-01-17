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

export type LocationItem = {
  id: string;
  title: string;
  subtitle?: string;
};

type Props = {
  items: LocationItem[];
  open: boolean;
  onSelect: (item: LocationItem) => void;
  isLoading?: boolean;
  emptyText?: string;
  children: React.ReactNode;
};

export function LocationDropdown({
  items,
  open,
  onSelect,
  isLoading,
  emptyText = "검색 결과가 없습니다",
  children,
}: Props) {
  return (
    <Popover open={open}>
      <PopoverAnchor asChild>{children}</PopoverAnchor>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-[--radix-popover-trigger-width] p-0 mt-2"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList className="max-h-72">
            {isLoading ? (
              <div className="px-4 py-3 text-sm text-slate-500">Loading...</div>
            ) : null}

            {!isLoading && items.length === 0 ? (
              <CommandEmpty>{emptyText}</CommandEmpty>
            ) : null}

            {items.length > 0 ? (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => onSelect(item)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col ">
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
