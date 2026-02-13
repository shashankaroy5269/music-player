import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { playSong } from "../features/playerSlice";

export default function SongTable() {
  const { songs, currentIndex } = useSelector(
    (state: RootState) => state.player
  );
  const dispatch = useDispatch();

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <table
        style={{
          width: "80%",  
          maxWidth: "900px",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead style={{ background: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "left" }}>Cover</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Title</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Artist</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, index) => {
            const isActive = index === currentIndex;

            return (
              <tr
                key={song.id}
                style={{
                  background: isActive ? "#e6f7ff" : "white",
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "10px" }}>
                  <img
                    src={song.image}
                    alt={song.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </td>

                <td style={{ padding: "10px", fontWeight: isActive ? "bold" : "normal" }}>
                  {song.title}
                </td>

                <td style={{ padding: "10px", color: "#666" }}>
                  {song.artist}
                </td>

                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => dispatch(playSong(index))}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      background: isActive ? "green" : "#333",
                      color: "white",
                    }}
                  >
                    {isActive ? "Playing" : "Play"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
