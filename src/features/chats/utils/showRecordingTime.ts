export function ShowRecordingTime(seconds: string): string {
  const convertedSeconds = parseInt(seconds);
  return (
    Math.floor(convertedSeconds / 60)
      .toString()
      .padStart(1, "0") +
    ":" +
    (convertedSeconds % 60).toString().padStart(2, "0")
  );
}

export function showCurrentRecordingTime(seconds: string) {
  const convertedSeconds = parseInt(seconds);
  return (
    Math.floor(convertedSeconds / 60)
      .toString()
      .padStart(1, "0") +
    ":" +
    (convertedSeconds % 60).toString().padStart(2, "0")
  );
}
