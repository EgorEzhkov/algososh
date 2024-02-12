export const selectionSort = (arr: number[], increasing: boolean) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if (increasing) {
        if (arr[maxInd] > arr[j]) {
          maxInd = j;
        }
      } else {
        if (arr[maxInd] < arr[j]) {
          maxInd = j;
        }
      }
    }
    if (maxInd !== i) {
      let tmp = arr[maxInd];
      arr[maxInd] = arr[i];
      arr[i] = tmp;
    }
  }
  return arr;
};

export const bubbleSort = (arr: number[], increasing: boolean) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (increasing) {
        if (arr[j] < arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      } else {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
    }
  }
  return arr;
};
