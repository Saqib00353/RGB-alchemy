import { RGB, square } from "../type";

type conditionsProps = {
  rowNumber: number;
  columnNumber: number;
  height: number;
  width: number;
};

type backgroudColor = {
  bgColor: string;
  height: number;
  distance: number;
  previousColor: string;
  formula: Function;
};

type getBgColorProps = {
  color: string;
  movesleft: number;
  maxMoves: number;
};

type formulaProps = {
  height: number;
  distance: number;
  currentColor: RGB;
  lastColor: RGB;
};

type getIndexProps = {
  arr: square[][];
  targetColorId: string;
};

export type { conditionsProps, backgroudColor, getBgColorProps, formulaProps, getIndexProps };
