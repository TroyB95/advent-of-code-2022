const getCountOfCalories = (input: string) => {
  const countOfRations = input.split("\n\n").map((elfsFood: string, i) =>
    elfsFood
      .replaceAll("\n", " ")
      .split(" ")
      .filter((string: string) => string !== "")
      .reduce((prev, current) => {
        return parseInt(current) + prev;
      }, 0)
  );

  return countOfRations;
};

export const calculateTopElvesCalories = (input: string) => {
  const countOfRations = getCountOfCalories(input);

  return countOfRations.reduce((prev, current) => {
    if (current > prev) {
      return current;
    }
    return prev;
  });
};

export const calculateTopThreeAmount = (input: string) => {
  const countOfRations = getCountOfCalories(input);

  const sortedCountOfRations = countOfRations.sort((a, b) => b - a);

  return (
    sortedCountOfRations[0] + sortedCountOfRations[1] + sortedCountOfRations[2]
  );
};
