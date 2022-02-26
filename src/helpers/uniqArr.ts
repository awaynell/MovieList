export const uniqArr = (arr: any) => {
  for (let i = 1; i < arr.length; ) {
    if (arr[i - 1]?.id === arr[i]?.id) {
      arr.splice(i, 1);
      console.log("uniqArr", arr);
    } else {
      i++;
    }
  }
  return arr;
};
