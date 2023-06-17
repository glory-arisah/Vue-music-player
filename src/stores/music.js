import { defineStore } from "pinia";

export const useMusicStore = defineStore({
  id: "music",
  state: () => ({
    index: 0,
    songSources: [
      "../songs/dont-stop-me-now.mp3",
      "../songs/hammer-to-fall.mp3",
      "../songs/heat-waves.mp3",
      "../songs/i-want-to-break-free.mp3",
    ],
    songList: [],
  }),
  actions: {},
  getters: {},
});
