import { getColorValue } from "./colorValue";
import { RGB } from "../../interfaces/types";

type backgroudColor = {
  bgColor: string;
  height: number;
  distance: number;
  previousColor: string;
  formula: Function;
};

type getBgColorProps = {
  color: string;
  movesleft: number;
  maxMoves: number;
};

type formulaProps = {
  height: number;
  distance: number;
  currentColor: RGB;
  lastColor: RGB;
};

const mixColor = ({ bgColor, height, distance, previousColor, formula }: backgroudColor) => {
  if (!bgColor) return "rgb(0,0,0)";
  const currentColor = getColorValue(bgColor);
  const lastColor = getColorValue(previousColor);
  const mixedColor = formula({ height, distance, currentColor, lastColor });
  const normalizationFactor = 255 / Math.max(...mixedColor, 255);
  const color = `rgb(${mixedColor[0] * normalizationFactor},${mixedColor[1] * normalizationFactor},${mixedColor[2] * normalizationFactor})`;

  return color;
};

function getBgColor({ color, movesleft, maxMoves }: getBgColorProps) {
  return movesleft === maxMoves - 1
    ? "rgb(255,0,0)"
    : movesleft === maxMoves - 2
    ? "rgb(0,255,0)"
    : movesleft === maxMoves - 3
    ? "rgb(0,0,255)"
    : color;
}

function topLeftFormula({ height, distance, currentColor, lastColor }: formulaProps) {
  const [currRed, currGreen, currBlue] = currentColor;
  const [prevRed, prevGreen, prevBlue] = lastColor;

  const mixedRedColor = ((height + 1 - distance) * currRed) / (height + 1) + prevRed;
  const mixedGreenColor = ((height + 1 - distance) * currGreen) / (height + 1) + prevGreen;
  const mixedBlueColor = ((height + 1 - distance) * currBlue) / (height + 1) + prevBlue;

  return [mixedRedColor, mixedGreenColor, mixedBlueColor];
}

function bottomRightFormula({ height, distance, currentColor, lastColor }: formulaProps) {
  const [currRed, currGreen, currBlue] = currentColor;
  const [prevRed, prevGreen, prevBlue] = lastColor;

  const mixedRedColor = (currRed * (height - (height - distance - 2))) / (height + 1) + prevRed;
  const mixedGreenColor = (currGreen * (height - (height - distance - 2))) / (height + 1) + prevGreen;
  const mixedBlueColor = (currBlue * (height - (height - distance - 2))) / (height + 1) + prevBlue;

  return [mixedRedColor, mixedGreenColor, mixedBlueColor];
}

export { mixColor, getBgColor, topLeftFormula, bottomRightFormula };
