import { box } from "../../interfaces/types";

type getIndexProps = {
  arr: box[][];
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

export { getIndex };
