type square = {
  id: string;
  bgColor: string;
  difference: number;
  redOutline: boolean;
};

type SquareProps = {
  rowNumber: number;
  item: square;
  columnNumber: number;
};

type RGB = [number, number, number];

export type { square, RGB, SquareProps };
