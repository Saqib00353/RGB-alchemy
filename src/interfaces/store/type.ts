import { RGB, square } from "../type";

type Response = {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: RGB;
};

type InitialState = {
  data: Response;
  twoDimensionalArray: square[][];
  difference: number;
  movesLeft: number;
  closestColor: string;
};

type Payload = {
  item: square;
  rowNumber: number;
  color?: string;
};

export type { InitialState, Payload };
