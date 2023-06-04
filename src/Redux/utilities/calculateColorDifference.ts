import { RGB } from "../../interfaces/types";
import { getColorValue } from "./colorValue";

type calculateColorDifferenceProps = {
  target: RGB;
  squareColor: string;
};

const calculateColorDifference = ({ target, squareColor }: calculateColorDifferenceProps) => {
  const obtainedColor = getColorValue(squareColor);
  const red = target[0] - obtainedColor[0];
  const green = target[1] - obtainedColor[1];
  const blue = target[2] - obtainedColor[2];
  const difference = (1 / 255) * ((1 / Math.sqrt(3)) * Math.sqrt(red * red + green * green + blue * blue)) * 100;

  return difference;
};

export { calculateColorDifference };
