import { defineStore } from "pinia";
import { useMusicState } from "../state/musicState";
import { computed, ComputedRef } from "vue";

interface MusicGetterProps {
  currentlyPlayingId: ComputedRef<number>;
}

export const useMusicGetters = defineStore(
  "music.getter",
  (): MusicGetterProps => {
    const musicState = useMusicState();

    const currentlyPlayingId = computed((): number => {
      if (musicState.currentSong !== null) return musicState.currentSong.index;
      return 0;
    });

    return {
      currentlyPlayingId,
    };
  }
);
