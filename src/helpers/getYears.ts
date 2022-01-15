export const getYears = (): Array<number> => {
  const date = new Date();
  const yearsArr = [];
  for (let i = 1970; i <= date.getFullYear(); i++) {
    yearsArr.push(i);
  }
  return yearsArr;
};
