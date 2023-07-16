import { useMusicState } from "../state/musicState";
import { SongProps } from "../state/musicState";
import { formatDuration } from "../music";

const randomNumberGen = (songListLength: number) => {
  return Math.floor(Math.random() * songListLength);
};

export const appendZero = (value: number, position: string) => {
  if (position === "prefix") {
    return `0${String(value)}`;
  } else if (position === "suffix") {
    return `${String(value)}0`;
  }
};

interface PlayerProps {
  play(): Promise<any>;
  pause(): void;
  playPause(): void;
  playSelectedSong(songObj: SongProps): void;
  progressBarUpdate(): void;
  hasSongEnded(): void;
  seekPlayer(value: number): void;
  setRepeat(): void;
  repeatSong(): void;
  setShuffle(): void;
  shuffleSongs(): void;
  volumeChange(value: number): void;
  resetSong(): void;
  backwardForwardUtil(navType: string): void;
  backward(): void;
  forward(): void;
}

export function PlayerActions(): PlayerProps {
  const musicState = useMusicState();

  return {
    // plays current audio file
    async play() {
      const play = (await musicState.audio.play()) as any;
      if (play !== undefined) {
        play.catch(() => musicState.audio.play());
      }
      musicState.isPlaying = true;
    },
    // pauses current audio file
    pause() {
      musicState.audio.pause();
      musicState.isPlaying = false;
    },
    async playPause() {
      musicState.audio.paused ? await this.play() : this.pause();
    },
    // play audio on the playlist that is clicked on
    async playSelectedSong(songObj) {
      this.resetSong();
      musicState.currentSong = songObj;
      musicState.audio.src = musicState.currentSong.file;
      // localStorage.setItem("currSongId", JSON.stringify(musicState.index));
      await this.play().catch(() => this.play());
    },
    // update progressBar value with audio's currentTime attribute
    progressBarUpdate() {
      musicState.audio.ontimeupdate = () => {
        // fetch currentTime and duration props form the audio object, use it to calculate the range value
        const { currentTime, duration } = musicState.audio;
        musicState.progressValue = (currentTime / duration) * 100;
        musicState.currentTime = formatDuration(currentTime, true);
      };
    },
    // eventlistener when audio finishes playing
    hasSongEnded() {
      musicState.audio.onended = () => {
        if (musicState.repeat) this.repeatSong();
        else if (musicState.shuffle) this.shuffleSongs();
        else this.forward();
      };
    },
    // progress-bar: clicking updates audio's currentTime attribute
    seekPlayer(value) {
      const duration = musicState.audio.duration;
      musicState.audio.currentTime = (value * duration) / 100;
      musicState.currentTime = formatDuration(
        musicState.audio.currentTime,
        true
      );
    },
    // song repeat feature
    setRepeat() {
      musicState.repeat = !musicState.repeat;
    },
    // repeat song feature
    repeatSong() {
      musicState.audio.currentTime = 0;
      this.play().catch(() => this.play());
    },
    // song shuffle feature
    setShuffle() {
      musicState.shuffle = !musicState.shuffle;
    },
    // generate a random index for the song list different from the previous index
    async shuffleSongs() {
      const songListLength = musicState.songList.length;
      let randomIndex = randomNumberGen(songListLength);
      while (musicState.index === randomIndex) {
        randomIndex = randomNumberGen(songListLength);
      }
      musicState.index = randomIndex;
      const currentSong = musicState.songList[randomIndex];
      musicState.currentSong = currentSong;
      // localStorage.setItem("currSongId", JSON.stringify(musicState.index));
      musicState.audio.src = currentSong.file;
      await this.play();
    },
    // update audio volume
    volumeChange(value) {
      const volume = value;
      musicState.audio.volume = volume / 100;
      musicState.volume = volume;
    },
    // utility methods
    resetSong() {
      musicState.audio.currentTime = 0;
      musicState.progressValue = 0;
    },
    // utility method for refactoring forward() and backward() methods
    backwardForwardUtil(navType) {
      this.resetSong();
      // check if shuffle is on
      if (musicState.shuffle) {
        this.shuffleSongs();
      } else {
        const lastIndex = musicState.songList.length - 1;
        if (navType === "backward")
          musicState.index =
            musicState.index === 0 ? lastIndex : musicState.index - 1;
        else if (navType === "forward")
          musicState.index =
            musicState.index === lastIndex ? 0 : musicState.index + 1;

        const currentSong = musicState.songList[musicState.index];
        musicState.currentSong = currentSong;
        // update the current song value in localStorage
        // localStorage.setItem("currSongId", JSON.stringify({ id: this.index }));
        musicState.audio.src = currentSong.file;
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
  };
}
