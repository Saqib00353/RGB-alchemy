import { square } from "../type";

type handleDropProps = {
  colorSpreader: Function;
  rowNumber: number;
  item: square;
  dispatch: Function;
};

type sourceThemeProps = {
  item: square;
  isMoves: boolean;
};

type tilesThemeProps = {
  item: square;
  maxMoves: number;
  movesLeft: number;
};

type handleClickProps = {
  colorSpreader: Function;
  rowNumber: number;
  item: square;
  dispatch: Function;
  isMoves: boolean;
};

export type { handleDropProps, sourceThemeProps, tilesThemeProps, handleClickProps };
