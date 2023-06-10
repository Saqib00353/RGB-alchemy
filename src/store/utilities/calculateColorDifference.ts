import { RGB } from "../../interfaces/type";
import { getColorValue } from "./colorValue";

type calculateColorDifferenceProps = {
  target: RGB;
  squareColor: string;
};

const calculateColorDifference = ({ target, squareColor }: calculateColorDifferenceProps) => {
  const [obtainedRed, obtainedBlue, obtainedGreen] = getColorValue(squareColor);
  const [targetRed, targetBlue, targetGreen] = target;

  const red = targetRed - obtainedRed;
  const green = targetBlue - obtainedBlue;
  const blue = targetGreen - obtainedGreen;

  const difference = (1 / 255) * ((1 / Math.sqrt(3)) * Math.sqrt(red * red + green * green + blue * blue)) * 100;
  return difference;
};

export { calculateColorDifference };
