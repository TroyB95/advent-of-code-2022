var fs = require("fs");

const convertDataElvesSchedules = () => {
  const data = fs.readFileSync("src/day4/input.txt");
  return data
    .toString()
    .trim()
    .split(/\n/g)
    .map((item: string) => {
      const [firstPair, secondPair] = item.split(",");
      const [firstPairStart, firstPairEnd] = firstPair.split("-");
      const [secondPairStart, secondPairEnd] = secondPair.split("-");
      return [
        [parseInt(firstPairStart.trim()), parseInt(firstPairEnd.trim())],
        [parseInt(secondPairStart.trim()), parseInt(secondPairEnd.trim())],
      ];
    });
};

export const calculateFullRangePairsPt1 = () => {
  const data = convertDataElvesSchedules();

  return data.reduce((total: number, current: number[][]) => {
    const [
      [firstElvesStart, firstElvesEnd],
      [secondElvesStart, secondElvesEnd],
    ] = current;

    let count = 0;

    if (
      (firstElvesStart <= secondElvesStart &&
        firstElvesEnd >= secondElvesEnd) ||
      (secondElvesStart <= firstElvesStart && secondElvesEnd >= firstElvesEnd)
    ) {
      count++;
    }

    return total + count;
  }, 0);
};

export const calculateFullRangePairsPt2 = () => {
  const data = convertDataElvesSchedules();

  return data.reduce((total: number, current: number[][]) => {
    const [
      [firstElvesStart, firstElvesEnd],
      [secondElvesStart, secondElvesEnd],
    ] = current;

    let count = 0;

    if (
      // Confusing why this is correct over the solution below
      firstElvesStart <= secondElvesEnd &&
      secondElvesStart <= firstElvesEnd

      //   (firstElvesStart >= secondElvesStart &&
      //     firstElvesStart >= secondElvesEnd) ||
      //   (firstElvesEnd >= secondElvesStart && firstElvesEnd <= secondElvesEnd) ||
      //   (secondElvesStart >= firstElvesStart &&
      //     secondElvesStart <= firstElvesEnd) ||
      //   (secondElvesEnd >= firstElvesStart && secondElvesEnd <= firstElvesEnd)
    ) {
      count++;
    }

    return total + count;
  }, 0);
};
