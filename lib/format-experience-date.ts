const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatExperienceMonth(value: string): string {
  const [year, month] = value.split("-");

  if (!year || !month) {
    return value;
  }

  const monthIndex = Number.parseInt(month, 10) - 1;
  const monthLabel = MONTH_LABELS[monthIndex];

  if (!monthLabel) {
    return value;
  }

  return `${monthLabel} ${year}`;
}

export function formatExperienceEnd(value: string): string {
  if (value.toLowerCase() === "present") {
    return "Present";
  }

  return formatExperienceMonth(value);
}
