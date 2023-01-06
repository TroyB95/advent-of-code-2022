var fs = require("fs");

const typeIsNumber = (value: any): value is number => {
  return typeof value === "number";
};

const typeIsObject = (value: any): value is object => {
  return typeof value === "object";
};

type FileSystem = {
  [key: string]: FileSystem | number | string;
  total: number;
};

export const getInstructionList = (): string[] => {
  const data = fs.readFileSync("src/day7/input.txt").toString().split("\n");
  return data;
};

export const createFileStructure = (commands: string[]) => {
  const fileSystem: FileSystem = { total: 0 };
  let currentAndParentDirectories: string[] = [];
  let currentLocation: FileSystem = fileSystem;

  commands.forEach((commandOrOutput) => {
    if (commandOrOutput.match("cd ")) {
      const navigateCommandDirectory = commandOrOutput.split(" ")[2];
      if (navigateCommandDirectory === "/") {
        // Reset history to root
        currentAndParentDirectories = ["/"];
        currentLocation = fileSystem;
      } else if (navigateCommandDirectory === "..") {
        // Remove most recent off the history
        currentAndParentDirectories.pop();
        currentLocation = fileSystem;

        // set currentLocation to most recent place in history
        currentAndParentDirectories.forEach((directory: string) => {
          let childDirectory = currentLocation[directory];

          if (directory === "/") {
            return;
          }

          if (!childDirectory) {
            childDirectory = { total: 0 };
          }

          if (typeIsObject(childDirectory)) {
            currentLocation = childDirectory;
          }
        });
      } else {
        // Add new location to history, set currentLocation to it
        currentAndParentDirectories.push(navigateCommandDirectory);
        let childNode = currentLocation[navigateCommandDirectory];

        if (!childNode) {
          childNode = { total: 0 };
        }

        if (typeIsObject(childNode)) {
          currentLocation = childNode;
        }
      }
    }

    if (commandOrOutput.match("dir ")) {
      const directoryName = commandOrOutput.split(" ")[1];
      currentLocation[directoryName] = { total: 0 };
    }

    if (commandOrOutput.match(/\d+/)) {
      const [fileSize, fileName] = commandOrOutput.split(" ");
      currentLocation[fileName] = fileSize;

      // Update the totals in all parent directories
      currentAndParentDirectories.forEach((directory) => {
        let childNode = currentLocation[directory];

        if (directory === "/") {
          currentLocation = fileSystem;
        } else {
          if (typeIsObject(childNode)) {
            currentLocation = childNode;
          }
        }
        currentLocation.total += parseInt(fileSize);
      });
    }
  });
  return fileSystem;
};

export const iterateFileSystemGetTotalSum = (obj: FileSystem) => {
  let totalSize = 0;

  Object.keys(obj).forEach((key) => {
    const childNode = obj[key];
    if (typeIsNumber(childNode) && childNode <= 100000) {
      totalSize += childNode;
    }

    if (typeIsObject(childNode) && childNode !== null) {
      totalSize += iterateFileSystemGetTotalSum(childNode);
    }
  });

  return totalSize;
};

export const spaceNeededForUpdate = (totalFileSystemSize: number) => {
  return 70000000 - totalFileSystemSize;
};

export const iterateFileSystemFindClosestFileSize = (
  obj: FileSystem,
  size: number
) => {
  let totalSize = 0;
  Object.keys(obj).forEach((key) => {
    const childNode = obj[key];

    if (typeIsNumber(childNode) && childNode >= size) {
      // Find size difference, if its smaller than previous set this to current total size
      const difference = childNode - size;
      const previousDifference = totalSize === 0 ? size - 1 : totalSize - size;

      if (difference < previousDifference) {
        totalSize = childNode;
      }
    }

    if (typeIsObject(childNode) && childNode !== null) {
      // If another child directory recurse into it
      const recursiveOutput = iterateFileSystemFindClosestFileSize(
        childNode,
        size
      );
      if (recursiveOutput === 0) {
        return;
      } else {
        totalSize = recursiveOutput;
      }
    }
  });

  return totalSize;
};

export const findSmallestFolderSizeToDelete = (
  obj: FileSystem,
  sizeOfUpdate: number
) => {
  const totalDirectorySize = obj.total;
  const spaceNeeded = sizeOfUpdate - spaceNeededForUpdate(totalDirectorySize);

  return iterateFileSystemFindClosestFileSize(obj, spaceNeeded);
};
