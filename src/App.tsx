import { box } from "./interfaces/types";
import UserDetails from "./components/UserDetails";
import Row from "./components/Row";
import useFetch from "./store/hooks/useFetch";

function App() {
  const { data, twoDimensionalArray } = useFetch();
  let rowCounter = 0;

  return (
    <div className="container">
      <UserDetails />
      <div style={{ display: "grid" }}>
        {data &&
          twoDimensionalArray.map((arr: box[]) => {
            rowCounter++;
            return <Row key={rowCounter} rowNumber={rowCounter} arr={arr} />;
          })}
      </div>
    </div>
  );
}

export default App;
