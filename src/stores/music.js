import { defineStore } from "pinia";

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    audio: new Audio(),
    index: 0,
    isPlaying: false,
    songList: [
      {
        artist: "Queen",
        songName: "Don't stop me now",
        file: require("@/assets/songs/dont-stop-me-now.mp3"),
      },
      {
        artist: "Queen",
        songName: "Hammer to fall",
        file: require("@/assets/songs/hammer-to-fall.mp3"),
      },
      {
        artist: "Glass Animals",
        songName: "Heat Waves",
        file: require("@/assets/songs/heat-waves.mp3"),
      },
      {
        artist: "Queen",
        songName: "I want to break free",
        file: require("@/assets/songs/I-want-to-break-free.mp3"),
      },
      {
        artist: "Queen",
        songName: "Killer Queen",
        file: require("@/assets/songs/killer-queen.mp3"),
      },
      {
        artist: "Queen",
        songName: "Seven Seas of Rhye",
        file: require("@/assets/songs/seven-seas-of-rhye.mp3"),
      },
      {
        artist: "Guitar Hero II",
        songName: "Surrender",
        file: require("@/assets/songs/surrender.mp3"),
      },
      {
        artist: "Queen",
        songName: "Under pressure",
        file: require("@/assets/songs/under-pressure.mp3"),
      },
      {
        artist: "Queen",
        songName: "We will rock you",
        file: require("@/assets/songs/we-will-rock-you.mp3"),
      },
    ],
    currentSong: {},
  }),
  actions: {
    initialSong() {
      this.currentSong = this.songList[this.index];
      this.audio.src = this.currentSong.file;
      localStorage.setItem("currentSongObj", JSON.stringify(this.currentSong));
      localStorage.setItem("songStatus", JSON.stringify("paused"));
    },
    play() {
      this.audio.play();
      localStorage.setItem("songStatus", JSON.stringify("playing"));
      this.isPlaying = true;
    },
    pause() {
      this.audio.pause();
      localStorage.setItem("songStatus", JSON.stringify("paused"));
      this.isPlaying = false;
    },
    playPause() {
      if (this.audio.paused) {
        this.play();
      } else {
        this.pause();
      }
    },
    backward() {
      this.index = this.index === 0 ? this.songList.length - 1 : this.index - 1;
      this.currentSong = this.songList[this.index];
      // update the current song value in localStorage
      localStorage.setItem(
        "currentSongObj",
        JSON.stringify(this.songList[this.index])
      );
      this.audio.src = this.currentSong.file;
      this.play();
    },
    forward() {
      const lastIndex = this.songList.length - 1;
      this.index = this.index === lastIndex ? 0 : this.index + 1;
      this.currentSong = this.songList[this.index];
      // update the current song value in localStorage
      localStorage.setItem(
        "currentSongObj",
        JSON.stringify(this.songList[this.index])
      );
      this.audio.src = this.currentSong.file;
      this.play();
    },
    // get song durations
    async getSongDurations() {
      this.songList.map((songObj) => {
        let [myAudio, duration] = [new Audio(songObj.file), ""];
        // set value of song duration after meta data loads
        myAudio.onloadedmetadata = () => {
          duration = myAudio.duration;
          const minuteVal = Math.floor(duration / 60);
          const secondVal = Math.floor(duration - minuteVal * 60);
          const checkSeconds =
            secondVal.toString().length === 1
              ? `${String(secondVal)}0`
              : String(secondVal);
          const finalTime = `${minuteVal.toString()}:${checkSeconds}`;
          // console.log({ duration }, { secondVal }, songObj.songName);
          songObj.duration = finalTime;
        };
      });

      // console.log(Durations);
    },
    hasSongEnded() {
      if (this.audio.ended) {
        this.forward();
      }
    },
  },
  getters: {},
});
