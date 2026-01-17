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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <Input
            value={value}
            placeholder="예: 회사"
            autoFocus
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
            }}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            취소
          </Button>
          <Button type="button" onClick={onSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
