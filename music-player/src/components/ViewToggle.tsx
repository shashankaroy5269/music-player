import { useDispatch } from "react-redux";
import { setView } from "../features/playerSlice";

export default function ViewToggle() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(setView("table"))}>
        Table
      </button>
      <button onClick={() => dispatch(setView("grid"))}>
        Grid
      </button>
    </div>
  );
}
