import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useApp";
import { getData } from "../services";

const useFetch = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getData("http://localhost:9876/init"));
  }, []);

  const { data, difference, twoDimensionalArray, movesLeft } = useAppSelector((state) => state.square);

  useEffect(() => {
    setTimeout(() => {
      if (difference < 10 && difference !== 0) {
        if (window.confirm("Success!. Do You Want to replay")) {
          return dispatch(getData(`http://localhost:9876/init/user/${data.userId}`));
        }
        return dispatch(getData("http://localhost:9876/init"));
      }

      if (movesLeft === 0) {
        if (window.confirm("Failed!. Do You Want to replay")) {
          return dispatch(getData(`http://localhost:9876/init/user/${data.userId}`));
        }
        return dispatch(getData("http://localhost:9876/init"));
      }
    }, 100);
  }, [difference, movesLeft]);

  return { data, twoDimensionalArray };
};

export default useFetch;
