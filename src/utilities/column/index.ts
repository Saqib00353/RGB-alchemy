import { conditionsProps } from "../../interfaces/helpers/type";
import { handleDropProps, sourceThemeProps, tilesThemeProps, handleClickProps } from "../../interfaces/utilities/column";

function allowDrop(event: { preventDefault: () => void }) {
  event.preventDefault();
}

function drag(event: { dataTransfer: { setData: (arg0: string, arg1: string) => void } }, bgColor: string) {
  event.dataTransfer.setData("color", bgColor);
}

function handleDrop({ colorSpreader, rowNumber, item, dispatch }: handleDropProps) {
  return (event: React.DragEvent<HTMLSpanElement>) => {
    const color = event.dataTransfer.getData("color");
    dispatch(colorSpreader({ color, rowNumber, item }));
  };
}

function handleClick({ colorSpreader, rowNumber, item, dispatch, isMoves }: handleClickProps) {
  return () => {
    isMoves && dispatch(colorSpreader({ item, rowNumber }));
  };
}

function conditions({ rowNumber, columnNumber, height, width }: conditionsProps) {
  return [
    rowNumber === 1 && columnNumber === 1,
    rowNumber === height && columnNumber === 1,
    rowNumber === 1 && columnNumber === width,
    rowNumber === height && columnNumber === width,
  ];
}

function sourceTheme({ item, isMoves }: sourceThemeProps) {
  return {
    backgroundColor: item.bgColor,
    cursor: isMoves ? "pointer" : "default",
  };
}

function tilesTheme({ item, maxMoves, movesLeft }: tilesThemeProps) {
  return {
    backgroundColor: item.bgColor,
    cursor: maxMoves - 2 > movesLeft ? "pointer" : "default",
    outline: item.redOutline ? "2.3px solid #f00" : "1.5px solid #aaa",
  };
}

export { allowDrop, drag, handleDrop, handleClick, conditions, sourceTheme, tilesTheme };
