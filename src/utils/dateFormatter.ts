export const DateFormatter = (value: number): string | undefined => {
  const date: string = new Date(value * 1000).toLocaleDateString("en-gb", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const time = new Date(value * 1000).toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const differenceInTime: number =
    new Date().getTime() - new Date(value * 1000).getTime();
  if (differenceInTime > 86400000) {
    return date;
  } else {
    return time;
  }
};
