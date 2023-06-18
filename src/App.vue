<template>
  <div class="page--wrapper">
    <TheLoader v-if="loading" />
    <main class="main" v-if="!loading">
      <music-player />
      <song-playlist />
    </main>
  </div>
</template>

<script setup>
import TheLoader from "./components/TheLoader.vue";
import SongPlaylist from "./components/SongPlaylist.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import { computed, onMounted } from "vue";
import { useMusicStore } from "./stores/music";

// music store
const musicStore = useMusicStore();
// populate song list with their respective durations
// load first song on create
musicStore.getSongDurations();
musicStore.initialSong();

// mount function to get current song, update song process bar,and forward song if previous song finishes
onMounted(() => {
  musicStore.progressBarUpdate();
  musicStore.hasSongEnded();
});

// computed value for loading status
const loading = computed(() => {
  return musicStore.songList && !musicStore.songList[0].photo;
});
</script>

<style lang="scss" src="./style.scss"></style>
