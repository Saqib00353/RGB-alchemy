type square = {
  id: string;
  bgColor: string;
  difference: number;
  redOutline: boolean;
};

type RGB = [number, number, number];

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

type SquareBoxProps = {
  rowNumber: number;
  item: square;
  columnNumber: number;
};
export type { square, RGB, InitialState, Payload, SquareBoxProps };
