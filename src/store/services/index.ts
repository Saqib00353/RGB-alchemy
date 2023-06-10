import { createAsyncThunk } from "@reduxjs/toolkit";
import { calculateColorDifference } from "../utilities/calculateColorDifference";
import { RGB } from "../../interfaces/type";
import uniqid from "uniqid";

const getData = createAsyncThunk("boxes", async (url: string) => {
  try {
    // const response = await axios.get(url);
    const response = {
      data: {
        height: 10,
        width: 10,
        target: [255, 78, 190] as RGB,
        maxMoves: 10,
      },
    };

    const { data } = response;

    data.height += 2;
    data.width += 2;

    const twoDimensionalArray = Array(data.height)
      .fill(null)
      .map((_) =>
        Array(data.width)
          .fill(null)
          .map((_) => ({
            id: uniqid(),
            bgColor: "rgb(0,0,0)",
            difference: 100,
            redOutline: false,
          }))
      );

    return {
      data,
      twoDimensionalArray,
      difference: calculateColorDifference({ target: data.target, squareColor: "rgb(0,0,0)" }),
      movesLeft: data.maxMoves,
      closestColor: "rgb(0,0,0)",
    };
  } catch (error) {
    console.error(error);
  }
});

export { getData };
