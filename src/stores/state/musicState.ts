import { defineStore } from "pinia";
export interface SongProps {
  index: number;
  artist: string;
  songName: string;
  file: any;
  duration?: string;
}

interface MusicStateProps {
  audio: HTMLAudioElement;
  index: number;
  isPlaying: boolean;
  songList: SongProps[];
  currentSong: SongProps | null;
  progressValue: number;
  currentTime: null | string;
  repeat: boolean;
  shuffle: boolean;
  volume: number;
}

export const useMusicState = defineStore({
  id: "music.state",
  state: (): MusicStateProps => {
    return {
      audio: new Audio(),
      index: 0,
      isPlaying: false,
      songList: [
        {
          index: 0,
          artist: "markotopa",
          songName: "A call to the soul",
          file: require("@/assets/songs/a-call-to-the-soul.mp3"),
        },
        {
          index: 1,
          artist: "Romarecord1973",
          songName: "A small miracle",
          file: require("@/assets/songs/a-small-miracle.mp3"),
        },
        {
          index: 2,
          artist: "Onoychenkomusic",
          songName: "Awaken",
          file: require("@/assets/songs/awaken.mp3"),
        },
        {
          index: 3,
          artist: "orangery",
          songName: "Coniferous forest",
          file: require("@/assets/songs/coniferous-forest.mp3"),
        },
        {
          index: 4,
          artist: "Lesfm",
          songName: "Easy lifestyle",
          file: require("@/assets/songs/easy-lifestyle.mp3"),
        },
        {
          index: 5,
          artist: "Lexin_Music",
          songName: "Eco technology",
          file: require("@/assets/songs/eco-technology.mp3"),
        },
        {
          index: 6,
          artist: "AlexiAction",
          songName: "Lifelike",
          file: require("@/assets/songs/lifelike.mp3"),
        },
        {
          index: 7,
          artist: "penguinmusic",
          songName: "Modern Vlog",
          file: require("@/assets/songs/modern-vlog.mp3"),
        },
        {
          index: 8,
          artist: "RomanSenykMusic",
          songName: "Waterfall",
          file: require("@/assets/songs/waterfall.mp3"),
        },
      ],
      currentSong: null,
      progressValue: 0,
      currentTime: null,
      repeat: false,
      shuffle: false,
      volume: 40,
    };
  },
});
