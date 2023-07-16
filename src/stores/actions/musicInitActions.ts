import { useMusicState } from "../state/musicState";
import { SongProps } from "../state/musicState";
import { formatDuration } from "../music";

interface InitProps {
  initialSong(): void;
  getSongDurations(): void;
}

export function InitActions(): InitProps {
  const musicState = useMusicState();

  return {
    // on load methods
    // initialized currentSong object on page load
    initialSong() {
      const currentSong = musicState.songList[musicState.index];
      musicState.currentSong = currentSong;
      musicState.audio.src = currentSong.file;
    },
    // get song durations
    getSongDurations() {
      musicState.songList.map((songObj: SongProps) => {
        const _audio = new Audio(songObj.file);
        // set value of song duration after meta data loads
        _audio.onloadedmetadata = () => {
          songObj.duration = formatDuration(_audio.duration);
        };
      });
    },
  };
}
