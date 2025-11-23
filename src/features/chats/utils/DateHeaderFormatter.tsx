export const DateHeaderFormatter = (date: number | string) => {
  const todayDate = new Date();
  const givenDate = new Date(date);
  const yesterdayDate = new Date();
  yesterdayDate.setDate(todayDate.getDate() - 1);
  if (givenDate.toDateString() === todayDate.toDateString()) {
    return "today";
  }
  if (givenDate.toDateString() === yesterdayDate.toDateString()) {
    return "Yesterday";
  }
  return new Date(date).toLocaleDateString();
};
