export const TimeFormatter = (seconds: number): string => {
  return new Date(seconds * 1000).toLocaleTimeString("en-us", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
