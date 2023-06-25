import { defineStore } from "pinia";

const randomNumberGen = (songListLength) => {
  return Math.floor(Math.random() * songListLength);
};

const appendZero = (value, position) => {
  if (position === "prefix") {
    return `0${String(value)}`;
  } else if (position === "suffix") {
    return `${String(value)}0`;
  }
};

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
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
        file: require("../assets/songs/lifelike.mp3"),
      },
      {
        index: 7,
        artist: "penguinmusic",
        songName: "Modern Vlog",
        file: require("../assets/songs/modern-vlog.mp3"),
      },
      {
        index: 8,
        artist: "RomanSenykMusic",
        songName: "Waterfall",
        file: require("../assets/songs/waterfall.mp3"),
      },
    ],
    currentSong: {},
    progressValue: 0,
    currentTime: null,
    repeat: false,
    shuffle: false,
    volume: 40,
  }),
  actions: {
    // on load methods
    // initialized currentSong object on page load
    initialSong() {
      const currentSong = this.songList[this.index];
      this.currentSong = currentSong;
      this.audio.src = currentSong.file;
      this.audio.onloadedmetadata = () => {
        localStorage.setItem("currSongId", JSON.stringify({ id: this.index }));
      };
    },
    // get song durations
    getSongDurations() {
      this.songList.map((songObj) => {
        let _audio = new Audio(songObj.file);
        // set value of song duration after meta data loads
        _audio.onloadedmetadata = () => {
          songObj.duration = this.formatDuration(_audio.duration);
        };
      });
    },

    // plays current audio file
    async play() {
      const play = await this.audio.play();
      if (play !== undefined) {
        play.catch(() => this.audio.play());
      }
      this.isPlaying = true;
    },

    // pauses current audio file
    pause() {
      this.audio.pause();
      this.isPlaying = false;
    },
    async playPause() {
      this.audio.paused ? await this.play() : this.pause();
    },

    // utility methods
    resetSong() {
      this.audio.currentTime = 0;
      this.progressValue = 0;
    },
    // utility method for refactoring forward() and backward() methods
    backwardForwardUtil(navType) {
      this.resetSong();
      // check if shuffle is on
      if (this.shuffle) {
        this.shuffleSongs();
      } else {
        const lastIndex = this.songList.length - 1;
        if (navType === "backward")
          this.index = this.index === 0 ? lastIndex : this.index - 1;
        else if (navType === "forward")
          this.index = this.index === lastIndex ? 0 : this.index + 1;

        const currentSong = this.songList[this.index];
        this.currentSong = currentSong;
        // update the current song value in localStorage
        localStorage.setItem("currSongId", JSON.stringify({ id: this.index }));
        this.audio.src = currentSong.file;
        this.play().catch(() => this.play());
      }
    },
    // play previous song in playlist
    backward() {
      this.backwardForwardUtil("backward");
    },
    // play next song in playlist
    forward() {
      this.backwardForwardUtil("forward");
    },

    // utility function to convert audio time to music player format
    formatDuration(duration, progressBar = false) {
      const minuteVal = Math.floor(duration / 60);
      const secondVal = Math.floor(duration - minuteVal * 60);
      let checkSeconds = null;
      if (progressBar) {
        checkSeconds =
          String(secondVal).length === 1
            ? appendZero(secondVal, "prefix")
            : String(secondVal);
      } else {
        checkSeconds =
          String(secondVal).length === 1
            ? appendZero(secondVal, "suffix")
            : String(secondVal);
      }
      const finalTime = `${minuteVal.toString()}:${checkSeconds}`;
      return finalTime;
    },

    // play audio on the playlist that is clicked on
    async playSelectedSong(songObj) {
      this.resetSong();
      this.currentSong = songObj;
      this.audio.src = this.currentSong.file;
      localStorage.setItem("currSongId", JSON.stringify({ id: this.index }));
      await this.play().catch(() => this.play());
    },

    // update progressBar value with audio's currentTime attribute
    progressBarUpdate() {
      this.audio.ontimeupdate = () => {
        // fetch currentTime and duration props form the audio object, use it to calculate the range value
        const { currentTime, duration } = this.audio;
        this.progressValue = (currentTime / duration) * 100;
        this.currentTime = this.formatDuration(currentTime, true);
      };
    },

    // eventlistener when audio finishes playing
    hasSongEnded() {
      this.audio.onended = () => {
        if (this.repeat) this.repeatSong();
        else if (this.shuffle) this.shuffleSongs();
        else this.forward();
      };
    },

    // progress-bar: clicking updates audio's currentTime attribute
    seekPlayer(value) {
      const duration = this.audio.duration;
      this.audio.currentTime = (value * duration) / 100;
      this.currentTime = this.formatDuration(this.audio.currentTime, true);
    },

    // song repeat feature
    setRepeat() {
      this.repeat = !this.repeat;
    },
    // repeat song feature
    repeatSong() {
      this.audio.currentTime = 0;
      this.play().catch(() => this.play());
    },

    // song shuffle feature
    setShuffle() {
      this.shuffle = !this.shuffle;
    },
    // generate a random index for the song list different from the previous index
    async shuffleSongs() {
      const songListLength = this.songList.length;
      let randomIndex = randomNumberGen(songListLength);
      while (this.index === randomIndex) {
        randomIndex = randomNumberGen(songListLength);
      }
      this.index = randomIndex;
      const currentSong = this.songList[randomIndex];
      this.currentSong = currentSong;
      localStorage.setItem("currSongId", JSON.stringify({ id: this.index }));
      this.audio.src = currentSong.file;
      await this.play();
    },

    // update audio volume
    volumeChange(value) {
      const volume = value;
      this.audio.volume = volume / 100;
      this.volume = volume;
    },
  },
  getters: {
    currentlyPlayingId(state) {
      return state.currentSong.index;
    },
  },
});
