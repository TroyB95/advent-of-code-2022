var fs = require("fs");

const convertDataDoubleBackpack = (): string[][] => {
  const data = fs.readFileSync("src/day3/input.txt");
  return data
    .toString()
    .trim()
    .split("\n")
    .map((backpack: string) => [
      backpack.slice(0, backpack.length / 3),
      backpack.slice(backpack.length / 3),
    ]);
};

const convertDataPt2 = (): string[][] => {
  const data = fs
    .readFileSync("src/day3/input.txt")
    .toString()
    .trim()
    .split("\n");

  const finalDataArray: string[][] = [];

  data.forEach((backpack: string, i: number) => {
    if ((i + 1) % 3 === 0) {
      finalDataArray.push([data[i - 2], data[i - 1], data[i]]);
    }
  });

  return finalDataArray;
};
const numberPerItem = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const calculatePriorityItems = () => {
  const data = convertDataDoubleBackpack();

  return data.reduce((total: number, current: string[]) => {
    let totalOfMatchingItems = 0;

    const itemsToCheck = current[0].split("");
    const secondCompartment = current[1];
    const previouslyMatchedItems: string[] = [];

    itemsToCheck.forEach((item: string) => {
      if (
        secondCompartment.includes(item) &&
        !previouslyMatchedItems.includes(item)
      ) {
        previouslyMatchedItems.push(item);
        totalOfMatchingItems += numberPerItem.indexOf(item) + 1;
      }
    });
    return total + totalOfMatchingItems;
  }, 0);
};

export const calculateBadgePriotityItems = () => {
  const data = convertDataPt2();

  return data.reduce((total: number, current: string[]) => {
    let badgeTotal = 0;
    const previouslyMatchedItems: string[] = [];

    current[0].split("").forEach((item) => {
      if (
        current[1].includes(item) &&
        current[2].includes(item) &&
        !previouslyMatchedItems.includes(item)
      ) {
        previouslyMatchedItems.push(item);
        badgeTotal += numberPerItem.indexOf(item) + 1;
      }
    });
    return total + badgeTotal;
  }, 0);
};
