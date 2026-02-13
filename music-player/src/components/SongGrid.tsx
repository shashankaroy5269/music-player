import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { playSong } from "../features/playerSlice";

export default function SongGrid() {
  const { songs, currentIndex } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: "12px",
        padding: "20px",
      }}
    >
      {songs.map((song, index) => {
        const isActive = index === currentIndex;

        return (
          <div
            key={song.id}
            style={{
              background: "#111",
              color: "#fff",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "14px",
              border: isActive ? "2px solid #1db954" : "1px solid #333",
              cursor: "pointer",
            }}
            onClick={() => dispatch(playSong(index))}
          >
            <img
              src={song.image}
              alt={song.title}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />
            <div style={{ fontWeight: "bold" }}>{song.title}</div>
            <div style={{ color: "#aaa", fontSize: "12px" }}>
              {song.artist}
            </div>
          </div>
        );
      })}
    </div>
  );
}
