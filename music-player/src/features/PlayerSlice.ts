import { createSlice } from "@reduxjs/toolkit";
import type { Song } from "../types";

interface PlayerState {
  songs: Song[];
  currentIndex: number;
  isPlaying: boolean;
  view: "table" | "grid";
  currentTime: number;
  duration: number;
}


const savedSongs = localStorage.getItem("songs");

const defaultSongs: Song[] = [
  {
    id: 1,
    title: "Tomar Jonno",
    artist: "Arijit Singh",
    url: "/music/song1.mp3",
    image: "/images/song1.jpg",
  },
  {
    id: 2,
    title: "Bojhena Shey Bojhena",
    artist: "Arindom",
    url: "/music/song2.mp3",
    image: "/images/song2.jpg",
  },
  {
    id: 3,
    title: "Mon Majhi Re",
    artist: "Arijit Singh",
    url: "/music/song3.mp3",
    image: "/images/song3.jpg",
  },
  {
    id: 4,
    title: "Ishq Jalakar Dhurandhar ",
    artist: "Arijit Singh",
    url: "/music/song4.mp3",
    image: "/images/song4.jpg",
  },
];

const initialState: PlayerState = {
  songs: savedSongs ? JSON.parse(savedSongs) : defaultSongs,
  currentIndex: 0,
  isPlaying: false,
  view: "table",
  currentTime: 0,
  duration: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentIndex = action.payload;
      state.isPlaying = true;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    nextSong: (state) => {
      state.currentIndex =
        (state.currentIndex + 1) % state.songs.length;
    },

    prevSong: (state) => {
      state.currentIndex =
        (state.currentIndex - 1 + state.songs.length) %
        state.songs.length;
    },

    setView: (state, action) => {
      state.view = action.payload;
    },

    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },

    setDuration: (state, action) => {
      state.duration = action.payload;
    },

    addSong: (state, action) => {
      state.songs.push(action.payload);
      localStorage.setItem("songs", JSON.stringify(state.songs));
    },
    
  },
});

export const {
  playSong,
  togglePlay,
  nextSong,
  prevSong,
  setView,
  setCurrentTime,
  setDuration,
  addSong,
} = playerSlice.actions;

export default playerSlice.reducer;
