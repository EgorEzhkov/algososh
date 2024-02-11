export const stringRevers = (arr) => {
  let mid = Math.ceil(arr.length / 2);
  let end = arr.length - 1;
  for (let i = 0; i < mid; i++) {
    let j = end - i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.split('');
};
