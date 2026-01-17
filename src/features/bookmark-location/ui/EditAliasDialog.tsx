import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/shadcn/dialog";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";

type Props = {
  open: boolean;
  title?: string;
  description?: string;
  value: string;
  onChange: (next: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function EditAliasDialog({
  open,
  title = "별칭 수정",
  description = "별칭을 입력하세요. 빈칸으로 저장하면 별칭이 삭제됩니다.",
  value,
  onChange,
  onClose,
  onSave,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent
        className="
          w-[calc(100vw-2rem)]
          max-w-[520px]
          rounded-2xl
          px-5 py-6
          sm:px-6 sm:py-7
        "
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg sm:text-xl">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed sm:text-base break-keep">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-3">
          <Input
            value={value}
            placeholder="예: 회사"
            autoFocus
            className="h-11"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
            }}
          />
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 mt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="button"
            className="w-full bg-indigo-500 sm:w-auto"
            onClick={onSave}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
