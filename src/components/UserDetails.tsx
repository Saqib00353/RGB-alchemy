import { GiTriangleTarget } from "react-icons/gi";
import { useAppSelector } from "../Redux/hooks/useApp";

function UserDetails() {
  const { data, difference, movesLeft, closestColor } = useAppSelector((state) => state.boxes);
  const red = data.target[0];
  const green = data.target[1];
  const blue = data.target[2];

  return (
    <>
      <h4>RGB Alchemy</h4>
      <div>User ID: {data.userId}</div>
      <div>Moves left: {movesLeft}</div>
      <div className="target-and-closest-color">
        Target Color
        <span className="color" style={{ background: data.target ? `rgb(${red},${green},${blue})` : "black" }} />
      </div>
      <div className="target-and-closest-color">
        Closest Color
        <span className="color" style={{ backgroundColor: closestColor }} />
        <span>
          <GiTriangleTarget /> = {difference.toFixed(2)} %
        </span>
      </div>
    </>
  );
}

export default UserDetails;
