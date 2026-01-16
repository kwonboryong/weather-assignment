import { format } from "date-fns";
import { ko } from "date-fns/locale";

type TodayLabel = {
  dayOfWeek: string;
  date: string;
};

export function getTodayLabel(): TodayLabel {
  const now = new Date();

  return {
    dayOfWeek: format(now, "EEEE", { locale: ko }),
    date: format(now, "yyyy.MM.dd"),
  };
}
