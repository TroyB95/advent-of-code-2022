var fs = require("fs");

const getCrateStack = (): string[][] => {
  const data = fs.readFileSync("src/day5/input.txt").toString().split("\n");
  const stacks: string[][] = [];
  // Create stacks arr.
  data.forEach((line: string, forEachIndex: number) => {
    for (let i = 1; i < data[forEachIndex].length; i += 4) {
      if (line.startsWith("move")) {
        return;
      }

      const stacksIndex = i / 4 - 0.25;

      if (!Array.isArray(stacks[stacksIndex])) {
        stacks.push([line[i]]);
        continue;
      }

      stacks[stacksIndex].unshift(line[i]);
    }
  });

  // Remove empty space + numbers
  return stacks.map((stack: string[]) => {
    return stack.filter((stackItem: string) => {
      return /[A-Z]/.test(stackItem) === true;
    });
  });
};

const getMovesList = (): number[][] =>
  fs
    .readFileSync("src/day5/input.txt")
    .toString()
    .split("\n")
    .filter((line: string) => line.startsWith("move"))
    .map((moveList: string) => {
      return moveList.match(/\d+/g);
    });

export const calculateCrateEndLocationsPt1 = () => {
  const crateStack = getCrateStack();
  const moveList = getMovesList();

  moveList.forEach((setOfMoves: number[]) => {
    const [howMany, locationFrom, locationTo] = setOfMoves;

    for (let i = 0; i < howMany; i++) {
      const itemToMove = crateStack[locationFrom - 1].pop() as string;
      crateStack[locationTo - 1].push(itemToMove);
    }
  });

  return crateStack.flatMap((stack: string[]) => stack.slice(-1)).join("");
};

export const calculateCrateEndLocationsPt2 = () => {
  const crateStack = getCrateStack();
  const moveList = getMovesList();

  moveList.forEach((setOfMoves: number[]) => {
    const [howMany, locationFrom, locationTo] = setOfMoves;

    const stack = crateStack[locationFrom - 1].splice(
      crateStack[locationFrom - 1].length - howMany,
      howMany
    );

    crateStack[locationTo - 1].push(...stack);
  });

  return crateStack.flatMap((stack: string[]) => stack.slice(-1)).join("");
};
