export const isMonthDisabled = (index: number) => {
  const currentDate = new Date();
  return index < currentDate.getMonth();
};
