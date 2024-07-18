import { isAfter, isToday, parseISO } from "date-fns";

export const filterDates = (dates) => {
  const today = new Date();

  return dates.filter((date) => {
    const parsedDate = parseISO(date);
    return (
      isToday(parsedDate) || isAfter(parsedDate, today)
    );
  });
};
