import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import ViewToggle from "./components/ViewToggle";
import SongTable from "./components/SongTable";
import SongGrid from "./components/SongGrid";
import MusicPlayer from "./components/MusicPlayer";
import AudioUpload from "./components/Audioupload";

function App() {
  const view = useSelector((state: RootState) => state.player.view);

  return (
    <div>
      <h1>Music Player</h1>
      <ViewToggle />
      <AudioUpload />

      {view === "table" ? <SongTable /> : <SongGrid />}
      <MusicPlayer />
      
    </div>
  );
}

export default App;
