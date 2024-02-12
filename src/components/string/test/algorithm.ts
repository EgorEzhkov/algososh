export const reverseString = (str: string) => {
  let arr = str.split("");
  let mid = Math.ceil(arr.length / 2);
  let end = arr.length - 1;
  for (let i = 0; i < mid; i++) {
    let j = end - i;
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
};
