import { square } from "../interfaces/types";
import Column from "./Column";

type RowsProps = {
  rowNumber: number;
  arr: square[];
};

function Row({ arr, rowNumber }: RowsProps) {
  let columnNumber = 0;
  return (
    <span>
      {arr.map((item) => {
        columnNumber++;
        return <Column key={item.id} rowNumber={rowNumber} columnNumber={columnNumber} item={item} />;
      })}
    </span>
  );
}

export default Row;
