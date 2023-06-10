import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calculateColorDifference } from "../utilities/calculateColorDifference";
import { getIndex } from "../utilities";
import { bottomRightFormula, getBgColor, mixColor, topLeftFormula } from "../utilities/bgColor";
import { getClosestColorSquare } from "../utilities";
import { InitialState, Payload, RGB } from "../../interfaces/types";
import uniqid from "uniqid";
// import axios from "axios";

export const getData = createAsyncThunk("boxes", async (url: string) => {
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

const initialState: InitialState = {
  data: {
    userId: "",
    width: 0,
    height: 0,
    maxMoves: 0,
    target: [0, 0, 0] as RGB,
  },
  twoDimensionalArray: [],
  difference: 0,
  movesLeft: -1,
  closestColor: "",
};

const boxesSlice = createSlice({
  name: "boxes",
  initialState,
  reducers: {
    spreadColorFromTop: (state, action: PayloadAction<Payload>) => {
      const { payload } = action;
      state.movesLeft--;
      const targetIndex = getIndex({ arr: state.twoDimensionalArray, targetColorId: payload.item.id });
      const targetSqaures = state.twoDimensionalArray.flatMap((item, idx) => (idx !== state.twoDimensionalArray.length - 1 ? item[targetIndex] : []));

      targetSqaures.forEach((square, idx) => {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === square.id) {
              const bgColor = mixColor({
                bgColor: getBgColor({ color: payload.color ?? "", movesleft: state.movesLeft, maxMoves: state.data.maxMoves }),
                height: state.data.height,
                distance: idx,
                previousColor: e.bgColor,
                formula: topLeftFormula,
              });

              return {
                ...e,
                bgColor,
                difference: calculateColorDifference({ target: state.data.target, squareColor: e.bgColor }),
              };
            }
            return { ...e, difference: calculateColorDifference({ target: state.data.target, squareColor: e.bgColor }) };
          })
        );
      });

      boxesSlice.caseReducers.updateDifference(state);
    },

    spreadColorFromLeft: (state, action: PayloadAction<Payload>) => {
      const { payload } = action;
      state.movesLeft--;
      const targetSqaures = state.twoDimensionalArray[payload.rowNumber - 1].slice(0, state.twoDimensionalArray.length - 1);

      targetSqaures.forEach((square, idx) => {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === square.id) {
              const bgColor = mixColor({
                bgColor: getBgColor({ color: payload.color ?? "", movesleft: state.movesLeft, maxMoves: state.data.maxMoves }),
                height: state.data.width,
                distance: idx,
                previousColor: e.bgColor,
                formula: topLeftFormula,
              });

              return {
                ...e,
                bgColor,
                difference: calculateColorDifference({ target: state.data.target, squareColor: bgColor }),
              };
            }
            return { ...e, difference: calculateColorDifference({ target: state.data.target, squareColor: e.bgColor }) };
          })
        );
      });

      boxesSlice.caseReducers.updateDifference(state);
    },

    spreadColorFromBottom: (state, action: PayloadAction<Payload>) => {
      const { payload } = action;
      state.movesLeft--;
      const targetIndex = getIndex({ arr: state.twoDimensionalArray, targetColorId: payload.item.id });
      const targetSqaures = state.twoDimensionalArray.map((item) => item[targetIndex]).slice(1);

      targetSqaures.forEach((square, idx) => {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === square.id) {
              const bgColor = mixColor({
                bgColor: getBgColor({ color: payload.color ?? "", movesleft: state.movesLeft, maxMoves: state.data.maxMoves }),
                height: state.data.height,
                distance: targetSqaures.length - idx,
                previousColor: e.bgColor,
                formula: topLeftFormula,
              });

              return {
                ...e,
                bgColor,
                difference: calculateColorDifference({ target: state.data.target, squareColor: e.bgColor }),
              };
            }
            return { ...e, difference: calculateColorDifference({ target: state.data.target, squareColor: e.bgColor }) };
          })
        );
      });

      boxesSlice.caseReducers.updateDifference(state);
    },

    spreadColorFromRight: (state, action: PayloadAction<Payload>) => {
      const { payload } = action;
      state.movesLeft--;
      const targetSqaures = state.twoDimensionalArray[payload.rowNumber - 1].slice(1);

      targetSqaures.forEach((square, idx) => {
        state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
          arr.map((e) => {
            if (e.id === square.id) {
              const bgColor = mixColor({
                bgColor: getBgColor({ color: payload.color ?? "", movesleft: state.movesLeft, maxMoves: state.data.maxMoves }),
                height: state.data.width,
                distance: idx,
                previousColor: e.bgColor,
                formula: bottomRightFormula,
              });

              return {
                ...e,
                bgColor,
                difference: calculateColorDifference({ target: state.data.target, squareColor: bgColor }),
              };
            }
            return { ...e, difference: calculateColorDifference({ target: state.data.target, squareColor: e.bgColor }) };
          })
        );
      });

      boxesSlice.caseReducers.updateDifference(state);
    },

    updateDifference(state) {
      const { closestColor, minDifference } = getClosestColorSquare(state.twoDimensionalArray);
      state.twoDimensionalArray = state.twoDimensionalArray.map((arr) =>
        arr.map((item) => (item.difference === minDifference ? { ...item, redOutline: true } : { ...item, redOutline: false }))
      );
      state.difference = minDifference;
      state.closestColor = closestColor;
    },
  },
  extraReducers: {
    [getData.pending.toString()]: (state, { payload }) => {},
    [getData.fulfilled.toString()]: (state, { payload }: PayloadAction<InitialState>) => {
      state.data = payload.data;
      state.twoDimensionalArray = payload.twoDimensionalArray;
      state.difference = payload.difference;
      state.movesLeft = payload.movesLeft;
      state.closestColor = payload.closestColor;
    },
    [getData.rejected.toString()]: (state, { payload }) => {},
  },
});

export const { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight } = boxesSlice.actions;

export default boxesSlice.reducer;
