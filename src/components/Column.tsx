import { useAppSelector, useAppDispatch } from "../store/hooks/useApp";
import { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight } from "../store/features/squareSlice";
import { getColorValue } from "../store/utilities/colorValue";
import { SquareProps } from "../interfaces/type";
import { allowDrop, conditions, drag, handleClick, handleDrop, sourceTheme, tilesTheme } from "../utilities/column";

function Column({ rowNumber, item, columnNumber }: SquareProps) {
  const { data, movesLeft } = useAppSelector((state) => state.square);
  const dispatch = useAppDispatch();

  const { height, width, maxMoves } = data;
  const [red, green, blue] = getColorValue(item.bgColor);
  const title = `${red.toFixed(0)},${green.toFixed(0)},${blue.toFixed(0)}`;
  const isMoves = maxMoves - 3 < movesLeft;

  return (
    <>
      {conditions({ rowNumber, columnNumber, height, width }).some((i) => i) ? (
        <span className="white-box" />
      ) : rowNumber === 1 ? (
        <span
          style={sourceTheme({ item, isMoves })}
          className="sources"
          onClick={handleClick({ colorSpreader: spreadColorFromTop, dispatch, rowNumber, item, isMoves })}
          onDrop={handleDrop({ colorSpreader: spreadColorFromTop, dispatch, rowNumber, item })}
          onDragOver={allowDrop}
        />
      ) : columnNumber === 1 ? (
        <span
          style={sourceTheme({ item, isMoves })}
          className="sources"
          onClick={handleClick({ colorSpreader: spreadColorFromLeft, dispatch, rowNumber, item, isMoves })}
          onDrop={handleDrop({ colorSpreader: spreadColorFromLeft, dispatch, rowNumber, item })}
          onDragOver={allowDrop}
        />
      ) : rowNumber === height ? (
        <span
          style={sourceTheme({ item, isMoves })}
          className="sources"
          onClick={handleClick({ colorSpreader: spreadColorFromBottom, dispatch, rowNumber, item, isMoves })}
          onDrop={handleDrop({ colorSpreader: spreadColorFromBottom, dispatch, rowNumber, item })}
          onDragOver={allowDrop}
        />
      ) : columnNumber === width ? (
        <span
          style={sourceTheme({ item, isMoves })}
          className="sources"
          onClick={handleClick({ colorSpreader: spreadColorFromRight, dispatch, rowNumber, item, isMoves })}
          onDrop={handleDrop({ colorSpreader: spreadColorFromRight, dispatch, rowNumber, item })}
          onDragOver={allowDrop}
        />
      ) : (
        <span
          draggable={!isMoves}
          onDragStart={(e) => drag(e, item.bgColor)}
          title={title}
          className="tiles"
          style={tilesTheme({ item, maxMoves, movesLeft })}
        />
      )}
    </>
  );
}

export default Column;
