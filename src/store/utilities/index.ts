import { square } from "../../interfaces/types";

type getIndexProps = {
  arr: square[][];
  targetColorId: string;
};

function getIndex({ arr, targetColorId }: getIndexProps) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j].id === targetColorId) {
        return j;
      }
    }
  }

  return -1;
}

const getClosestColorSquare = (arr: square[][]) => {
  const differences = [] as number[];
  let closestColor = "";

  const newArr = arr.slice(1, arr.length - 1).map((i) => i.slice(1, i.length - 1));
  newArr.forEach((x) => x.forEach((y) => differences.push(y.difference)));
  const minDifference = Math.min(...differences);
  newArr.forEach((x) => x.forEach((y) => y.difference === minDifference && (closestColor = y.bgColor)));

  return { closestColor, minDifference };
};

export { getIndex, getClosestColorSquare };
