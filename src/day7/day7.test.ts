import {
  createFileStructure,
  iterateFileSystemGetTotalSum,
  iterateFileSystemFindClosestFileSize,
} from "./day7";

describe("createFileStructure", () => {
  it("should return correct file structure", () => {
    const input = [
      "$ cd /",
      "$ ls",
      "dir csjncqmr",
      "dir fnfjhvsp",
      "dir mhfrct",
      "dir pgmgbfcl",
      "dir qcf",
      "dir wrsjr",
      "$ cd csjncqmr",
      "$ ls",
      "1000 vdrdm.pfj]",
      "$ cd ..",
      "$ cd fnfjhvsp",
      "$ ls",
      "dir csjncqmr",
      "dir czpmg",
      "2000 dcgph",
      "3000 hff.cdt",
      "$ cd csjncqmr",
      "$ ls",
      "4000 gzjdsn.wlc",
      "dir ljq",
    ];

    expect(createFileStructure(input)).toEqual({
      csjncqmr: {
        "vdrdm.pfj]": "1000",
        total: 1000,
      },
      fnfjhvsp: {
        csjncqmr: {
          "gzjdsn.wlc": "4000",
          total: 4000,
          ljq: { total: 0 },
        },
        czpmg: { total: 0 },
        dcgph: "2000",
        "hff.cdt": "3000",
        total: 9000,
      },
      mhfrct: { total: 0 },
      pgmgbfcl: { total: 0 },
      qcf: { total: 0 },
      wrsjr: { total: 0 },
      total: 10000,
    });
  });
});
describe("iterateFileSystemGetTotalSum", () => {
  it("should return correct total amount", () => {
    const mockData = {
      total: 101018,
      a: "1",
      b: {
        total: 18,
        c: "2",
        d: {
          total: 17,
          e: "7",
          f: {
            total: 10,
            g: {
              total: 10,
              h: "10",
            },
          },
        },
      },
      i: "101000",
    };
    expect(iterateFileSystemGetTotalSum(mockData)).toEqual(55);
  });
});

describe("iterateFileSystemFindClosestFileSize", () => {
  it("should return correct total amount", () => {
    const mockData = {
      a: "1",
      b: {
        c: "2",
        total: 301,
        d: {
          e: "4",
          total: 299,
          f: {
            total: 295,
            g: {
              h: "295",
              total: 295,
            },
          },
        },
      },
      i: "101000",
      total: 101302,
    };
    expect(iterateFileSystemFindClosestFileSize(mockData, 300)).toEqual(301);
  });
});
