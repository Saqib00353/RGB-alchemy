import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getData } from "../services";
import { calculateColorDifference } from "../utilities/calculateColorDifference";
import { bottomRightFormula, getBgColor, mixColor, topLeftFormula } from "../utilities/bgColor";
import { getIndex, initialState, getClosestColorSquare } from "../utilities";
import { InitialState, Payload } from "../../interfaces/store/type";
// import axios from "axios";

const squareSlice = createSlice({
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

      squareSlice.caseReducers.updateDifference(state);
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

      squareSlice.caseReducers.updateDifference(state);
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

      squareSlice.caseReducers.updateDifference(state);
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

      squareSlice.caseReducers.updateDifference(state);
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
    [getData.fulfilled.toString()]: (state, { payload }: PayloadAction<InitialState>) => {
      state.data = payload.data;
      state.twoDimensionalArray = payload.twoDimensionalArray;
      state.difference = payload.difference;
      state.movesLeft = payload.movesLeft;
      state.closestColor = payload.closestColor;
    },
  },
});

export const { spreadColorFromTop, spreadColorFromBottom, spreadColorFromLeft, spreadColorFromRight } = squareSlice.actions;

export default squareSlice.reducer;
