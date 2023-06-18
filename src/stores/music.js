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

const randomNumberGen = (songListLength) => {
  return Math.floor(Math.random() * songListLength);
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
        artist: "Led zeppelin",
        songName: "All of my love",
        file: require("@/assets/songs/all-of-my-love.mp3"),
        photo: require("@/assets/song-thumbnails/led-zeppelin.jpg"),
      },
      {
        index: 1,
        artist: "Queen",
        songName: "Don't stop me now",
        file: require("@/assets/songs/dont-stop-me-now.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        index: 2,
        artist: "Queen",
        songName: "Hammer to fall",
        file: require("@/assets/songs/hammer-to-fall.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        index: 3,
        artist: "Led zeppelin",
        songName: "Immigrant Song",
        file: require("@/assets/songs/immigrant-song.mp3"),
        photo: require("@/assets/song-thumbnails/led-zeppelin.jpg"),
      },
      {
        index: 4,
        artist: "David Bowie",
        songName: "Lady Stardust",
        file: require("@/assets/songs/lady-stardust.mp3"),
        photo: require("@/assets/song-thumbnails/david-bowie.jpg"),
      },
      {
        index: 5,
        artist: "David Bowie",
        songName: "Moonage Daydream",
        file: require("@/assets/songs/moonage-daydream.mp3"),
        photo: require("@/assets/song-thumbnails/david-bowie.jpg"),
      },
      {
        index: 6,
        artist: "Queen",
        songName: "Seven Seas of Rhye",
        file: require("@/assets/songs/seven-seas-of-rhye.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        index: 7,
        artist: "David Bowie",
        songName: "Starman",
        file: require("@/assets/songs/starman.mp3"),
        photo: require("@/assets/song-thumbnails/david-bowie.jpg"),
      },
      {
        index: 8,
        artist: "Queen",
        songName: "Under pressure",
        file: require("@/assets/songs/under-pressure.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
      },
      {
        index: 9,
        artist: "Queen",
        songName: "We will rock you",
        file: require("@/assets/songs/we-will-rock-you.mp3"),
        photo: require("@/assets/song-thumbnails/queen.jpg"),
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
    // initialized currentSong object on page load
    initialSong() {
      const currentSong = this.songList[this.index];
      this.currentSong = currentSong;
      this.audio.src = currentSong.file;
      this.audio.onloadedmetadata = () => {
        const duration = formatDuration(this.audio.duration);
        localStorage.setItem(
          "currentSongObj",
          JSON.stringify({ ...this.currentSong, duration })
        );
      };
      localStorage.setItem("playStatus", JSON.stringify("paused"));
    },

    // plays current audio file
    async play() {
      await this.audio.play();
      localStorage.setItem("playStatus", JSON.stringify("playing"));
      this.isPlaying = true;
    },

    // pauses current audio file
    pause() {
      this.audio.pause();
      localStorage.setItem("playStatus", JSON.stringify("paused"));
      this.isPlaying = false;
    },
    playPause() {
      this.audio.paused ? this.play() : this.pause();
    },

    // utility method for refactoring forward and backward features
    backwardForwardUtil(navType) {
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
        localStorage.setItem("currentSongObj", JSON.stringify(currentSong));
        this.audio.src = currentSong.file;
        this.play().catch((error) => console.log(error));
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

    // get song durations
    getSongDurations() {
      this.songList.map((songObj) => {
        let myAudio = new Audio(songObj.file);
        // set value of song duration after meta data loads
        myAudio.onloadedmetadata = () => {
          const finalTime = formatDuration(myAudio.duration);
          songObj.duration = finalTime;
        };
      });
    },

    // play audio on the playlist that is clicked on
    playSelectedSong(event) {
      let selectedSongName = "";
      // read the tag's dataset object for the song name
      selectedSongName = event.target.dataset.songName;
      const currentSong = this.songList.find((songObj) => {
        this.index = songObj.index;
        return songObj.songName === selectedSongName;
      });
      // set current song to the song that matched the song name in the song list array
      this.currentSong = currentSong;
      try {
        this.audio.src = currentSong.file;
        localStorage.setItem("currentSongObj", JSON.stringify(currentSong));
        this.play();
      } catch (error) {
        console.log(error);
      }
    },

    // update progressBar value with audio's currentTime attribute
    progressBarUpdate() {
      this.audio.ontimeupdate = () => {
        // fetch currentTime and duration props form the audio object, use it to calculate the range value
        const { currentTime, duration } = this.audio;
        this.progressValue = Math.floor((currentTime / duration) * 100);
        this.currentTime = formatDuration(currentTime, true);
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
    seekPlayer(event) {
      const seekerValue = event.target.value;
      const duration = this.audio.duration;
      this.audio.currentTime = Math.floor((seekerValue / 100) * duration);
    },

    // song repeat feature
    setRepeat() {
      this.repeat = !this.repeat;
    },
    // repeat song feature
    repeatSong() {
      this.audio.currentTime = 0;
      this.play();
    },

    // song shuffle feature
    setShuffle() {
      this.shuffle = !this.shuffle;
    },
    // generate a random index for the song list different from the previous index
    shuffleSongs() {
      const songListLength = this.songList.length;
      let randomIndex = randomNumberGen(songListLength);
      while (this.index === randomIndex) {
        randomIndex = randomNumberGen(songListLength);
      }
      this.index = randomIndex;
      const currentSong = this.songList[randomIndex];
      this.currentSong = currentSong;
      localStorage.setItem("currentSongObj", JSON.stringify(currentSong));
      this.audio.src = currentSong.file;
      this.play();
    },

    // update audio volume
    volumeChange(event) {
      const volume = event.target.value;
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
