var fs = require("fs");

export const getDataStream = (): string[] => {
  const data = fs.readFileSync("src/day6/input.txt").toString().split("");
  return data;
};

const findUniqueLengthOfChars = (data: string[], length: number) => {
  const setToCheck = new Set();
  const fourUniqueChars: string[] = [];
  let indexForEnd = 0;

  while (setToCheck.size < length) {
    if (fourUniqueChars.length === length) {
      const firstElement = fourUniqueChars.shift() as string;
      if (!fourUniqueChars.includes(firstElement)) {
        setToCheck.delete(firstElement);
      }
    }

    if (!setToCheck.has(data[indexForEnd])) {
      setToCheck.add(data[indexForEnd]);
    }

    fourUniqueChars.push(data[indexForEnd]);
    indexForEnd++;
  }

  return indexForEnd;
};
export const detectSignal = (data: string[]) => {
  return findUniqueLengthOfChars(data, 4);
};

export const detectMessage = (data: string[]) => {
  return findUniqueLengthOfChars(data, 14);
};
