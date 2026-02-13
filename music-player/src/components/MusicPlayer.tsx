import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";

import {
  togglePlay,
  nextSong,
  prevSong,
  setCurrentTime,
  setDuration,
} from "../features/playerSlice";

export default function MusicPlayer() {
  const { songs, currentIndex, isPlaying, currentTime, duration } =
    useSelector((state: RootState) => state.player);

  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const currentSong = songs[currentIndex];

  
  useEffect(() => {
    if (!currentSong) return;

    const audio = audioRef.current;

    audio.src = currentSong.url;
    audio.load();

    audio.play().catch(() => {}); 
  }, [currentIndex]);

  
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  
  useEffect(() => {
    const audio = audioRef.current;

    audio.onloadedmetadata = () => {
      dispatch(setDuration(audio.duration));
    };

    audio.ontimeupdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };

    audio.onended = () => {
      dispatch(nextSong());
    };
  }, []);

  if (!currentSong) return null;

  return (
   
  <div
    style={{
     
  position: "fixed",
  bottom: "30px",   
  left: "50%",
  transform: "translateX(-50%)",
  width: "420px",
  background: "#111",
  color: "#fff",
  padding: "12px",
  borderRadius: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
  zIndex: 1000,
  fontSize: "14px",
}}
>
    
    <div style={{ display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
      <img
        src={currentSong.image}
        alt={currentSong.title}
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div>
        <div style={{ fontWeight: "bold" }}>{currentSong.title}</div>
        <div style={{ fontSize: "12px", color: "#aaa" }}>
          {currentSong.artist}
        </div>
      </div>
    </div>

    
    <input
      type="range"
      min={0}
      max={duration || 0}
      value={currentTime}
      onChange={(e) => {
        audioRef.current.currentTime = Number(e.target.value);
      }}
      style={{ width: "100%", marginTop: "8px" }}
    />

    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "8px",
      }}
    >
        
      <button onClick={() => dispatch(prevSong())}>⏮</button>
      <button onClick={() => dispatch(togglePlay())}>
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button onClick={() => dispatch(nextSong())}>⏭</button> 
      
    </div>
    
  
  </div>
   
);

  
}
