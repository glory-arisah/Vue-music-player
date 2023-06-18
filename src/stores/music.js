import { defineStore } from "pinia";

const formatDuration = (duration, progressBar = false) => {
  const minuteVal = Math.floor(duration / 60);
  const secondVal = Math.floor(duration - minuteVal * 60);
  let checkSeconds = null;
  if (progressBar) {
    checkSeconds =
      secondVal.toString().length === 1
        ? `0${String(secondVal)}`
        : String(secondVal);
  } else {
    checkSeconds =
      secondVal.toString().length === 1
        ? `${String(secondVal)}0`
        : String(secondVal);
  }
  const finalTime = `${minuteVal.toString()}:${checkSeconds}`;
  return finalTime;
};

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    audio: new Audio(),
    index: 0,
    isPlaying: false,
    songList: [
      {
        artist: "Led zeppelin",
        songName: "All of my love",
        file: require("@/assets/songs/all-of-my-love.mp3"),
        photo: require("@/assets/song-thumbnails/led-zeppelin.jpg"),
      },
      {
        artist: "Queen",
        songName: "Don't stop me now",
        file: require("@/assets/songs/dont-stop-me-now.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        artist: "Queen",
        songName: "Hammer to fall",
        file: require("@/assets/songs/hammer-to-fall.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        artist: "Led zeppelin",
        songName: "Immigrant Song",
        file: require("@/assets/songs/immigrant-song.mp3"),
        photo: require("@/assets/song-thumbnails/led-zeppelin.jpg"),
      },
      {
        artist: "David Bowie",
        songName: "Lady Stardust",
        file: require("@/assets/songs/lady-stardust.mp3"),
        photo: require("@/assets/song-thumbnails/david-bowie.jpg"),
      },
      {
        artist: "David Bowie",
        songName: "Moonage Daydream",
        file: require("@/assets/songs/moonage-daydream.mp3"),
        photo: require("@/assets/song-thumbnails/david-bowie.jpg"),
      },
      {
        artist: "Queen",
        songName: "Seven Seas of Rhye",
        file: require("@/assets/songs/seven-seas-of-rhye.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        artist: "David Bowie",
        songName: "Starman",
        file: require("@/assets/songs/starman.mp3"),
        photo: require("@/assets/song-thumbnails/david-bowie.jpg"),
      },
      {
        artist: "Queen",
        songName: "Under pressure",
        file: require("@/assets/songs/under-pressure.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        artist: "Queen",
        songName: "We will rock you",
        file: require("@/assets/songs/we-will-rock-you.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
    ],
    currentSong: {},
    progressBarValue: 0,
    // currentTime: null,
  }),
  actions: {
    initialSong() {
      this.currentSong = this.songList[this.index];
      this.audio.src = this.currentSong.file;
      this.audio.onloadedmetadata = () => {
        const duration = this.audio.duration;
        const finalTime = formatDuration(duration);

        localStorage.setItem(
          "currentSongObj",
          JSON.stringify({ ...this.currentSong, duration: finalTime })
        );
      };
      localStorage.setItem("songStatus", JSON.stringify("paused"));
    },
    async play() {
      await this.audio.play();
      localStorage.setItem("songStatus", JSON.stringify("playing"));
      this.isPlaying = true;
    },
    pause() {
      this.audio.pause();
      localStorage.setItem("songStatus", JSON.stringify("paused"));
      this.isPlaying = false;
    },
    playPause() {
      this.audio.paused ? this.play() : this.pause();
    },
    backwardForwardUtil() {
      this.currentSong = this.songList[this.index];
      // update the current song value in localStorage
      localStorage.setItem(
        "currentSongObj",
        JSON.stringify(this.songList[this.index])
      );
      this.audio.src = this.currentSong.file;
      this.play();
    },
    backward() {
      // if (this.audio.currentTime > 20) {
      this.index = this.index === 0 ? this.songList.length - 1 : this.index - 1;
      // }
      this.backwardForwardUtil();
    },
    forward() {
      const lastIndex = this.songList.length - 1;
      this.index = this.index === lastIndex ? 0 : this.index + 1;
      this.backwardForwardUtil();
    },
    // get song durations
    getSongDurations() {
      this.songList.map((songObj) => {
        let [myAudio, duration] = [new Audio(songObj.file), ""];
        // set value of song duration after meta data loads
        myAudio.onloadedmetadata = () => {
          duration = myAudio.duration;
          const finalTime = formatDuration(duration);
          songObj.duration = finalTime;
        };
      });

      // console.log(Durations);
    },
    playSelectedSong(event) {
      let selectedSongName = "";
      // read the tag's innerText for the song name
      if (event.target.tagName.toLowerCase() === "article") {
        selectedSongName = event.target.children[0].innerText;
      } else if (event.target.tagName.toLowerCase() === "p") {
        selectedSongName = event.target.innerText;
      }
      // set current song to the song that matched the song name in the song list array
      this.currentSong = this.songList.find((songObj, index) => {
        this.index = index;
        return songObj.songName === selectedSongName;
      });
      this.audio.src = this.currentSong.file;
      localStorage.setItem("currentSongObj", JSON.stringify(this.currentSong));
      this.play();
    },
    progressBarUpdate() {
      this.audio.ontimeupdate = () => {
        // fetch currentTime and duration props form the audio object, use it calculate the progress bar
        const { currentTime, duration } = this.audio;
        this.progressBarValue = Math.floor((currentTime / duration) * 100);
        this.currentTime = formatDuration(currentTime, true);
      };
    },
    hasSongEnded() {
      this.audio.onended = () => {
        this.forward();
      };
    },
    seekPlayer(event) {
      const rect = event.currentTarget.getBoundingClientRect().width;
      const clickXPos = event.offsetX;
      const duration = this.audio.duration;
      this.audio.currentTime = Math.floor((clickXPos / rect) * duration);
    },
  },
  getters: {},
});
