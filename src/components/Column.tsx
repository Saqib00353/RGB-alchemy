import { useAppSelector, useAppDispatch } from "../store/hooks/useApp";
import { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight } from "../store/features/boxesSlice";
import { getColorValue } from "../store/utilities/colorValue";
import { SquareBoxProps } from "../interfaces/types";

function Column({ rowNumber, item, columnNumber }: SquareBoxProps) {
  const { data, movesLeft } = useAppSelector((state) => state.boxes);
  const dispatch = useAppDispatch();

  const { height, width } = data;
  const [red, green, blue] = getColorValue(item.bgColor);
  const title = `${red.toFixed(0)},${green.toFixed(0)},${blue.toFixed(0)}`;
  const isMoves = data.maxMoves - 3 < movesLeft;

  function allowDrop(event: { preventDefault: () => void }) {
    event.preventDefault();
  }
  function drag(event: { dataTransfer: { setData: (arg0: string, arg1: string) => void } }) {
    event.dataTransfer.setData("color", item.bgColor);
  }
  function handleDrop(colorSpreader: Function) {
    return (event: React.DragEvent<HTMLSpanElement>) => {
      const color = event.dataTransfer.getData("color");
      dispatch(colorSpreader({ color, rowNumber, item }));
    };
  }
  function handleClick(colorSpreader: Function) {
    return () => {
      isMoves && dispatch(colorSpreader({ item, rowNumber }));
    };
  }

  const sourceTheme = {
    backgroundColor: item.bgColor,
    cursor: isMoves ? "pointer" : "default",
  };
  const tilesTheme = {
    backgroundColor: item.bgColor,
    cursor: data.maxMoves - 2 > movesLeft ? "pointer" : "default",
    outline: item.redOutline ? "2.3px solid #f00" : "1.5px solid #aaa",
  };

  return (
    <>
      {rowNumber === 1 && columnNumber === 1 ? (
        <span className="white-box" />
      ) : rowNumber === height && columnNumber === 1 ? (
        <span className="white-box" />
      ) : rowNumber === 1 && columnNumber === width ? (
        <span className="white-box" />
      ) : rowNumber === height && columnNumber === width ? (
        <span className="white-box" />
      ) : rowNumber === 1 ? (
        <span
          onClick={handleClick(spreadColorFromTop)}
          onDrop={handleDrop(spreadColorFromTop)}
          onDragOver={allowDrop}
          className="sources"
          style={sourceTheme}
        />
      ) : columnNumber === 1 ? (
        <span
          onClick={handleClick(spreadColorFromLeft)}
          onDrop={handleDrop(spreadColorFromLeft)}
          onDragOver={allowDrop}
          className="sources"
          style={sourceTheme}
        />
      ) : rowNumber === height ? (
        <span
          onClick={handleClick(spreadColorFromBottom)}
          onDrop={handleDrop(spreadColorFromBottom)}
          onDragOver={allowDrop}
          className="sources"
          style={sourceTheme}
        />
      ) : columnNumber === width ? (
        <span
          onClick={handleClick(spreadColorFromRight)}
          onDrop={handleDrop(spreadColorFromRight)}
          onDragOver={allowDrop}
          className="sources"
          style={sourceTheme}
        />
      ) : (
        <span draggable={!isMoves} onDragStart={drag} title={title} className="tiles" style={tilesTheme} />
      )}
    </>
  );
}

export default Column;
