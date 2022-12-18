var fs = require("fs");

const convertData = () => {
  const data = fs.readFileSync("src/day2/input.txt");
  return data
    .toString()
    .trim()
    .split("\n")
    .map((moves: string) => moves.split(" "));
};

export const calculateRpsScore = () => {
  const convertedData = convertData();

  const pointsForMove = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const wins = {
    X: "C",
    Y: "A",
    Z: "B",
  };

  const draws = {
    X: "A",
    Y: "B",
    Z: "C",
  };

  return convertedData.reduce(
    (total: number, currentGame: Array<keyof typeof pointsForMove>) => {
      const opponentsMove = currentGame[0];
      const myMove = currentGame[1];

      const myMoveScore = pointsForMove[currentGame[1]];
      const gameScore =
        wins[myMove] === opponentsMove
          ? 6
          : draws[myMove] === opponentsMove
          ? 3
          : 0;

      const myScore = myMoveScore + gameScore;

      return total + myScore;
    },
    0
  );
};

export const calulpateRpsScorePt2 = () => {
  const convertedData = convertData();

  const gameOutcomes = {
    X: "lose",
    Y: "draw",
    Z: "win",
  } as Record<string, "lose" | "draw" | "win">;

  const gameScores = {
    win: {
      A: "paper",
      B: "scissors",
      C: "rock",
    },
    lose: {
      A: "scissors",
      B: "rock",
      C: "paper",
    },
    draw: {
      A: "rock",
      B: "paper",
      C: "scissors",
    },
  } as Record<string, Record<string, "rock" | "paper" | "scissors">>;

  const pointsForMove = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  const pointsForOutcomes = {
    win: 6,
    draw: 3,
    lose: 0,
  };

  return convertedData.reduce(
    (total: number, currentTurn: Array<"A" | "B" | "C">) => {
      const gameOutcome =
        gameOutcomes[currentTurn[1] as keyof typeof gameOutcomes];
      const outcomeScore = pointsForOutcomes[gameOutcome];
      const moveScore = pointsForMove[gameScores[gameOutcome][currentTurn[0]]];

      return total + outcomeScore + moveScore;
    },
    0
  );
};
