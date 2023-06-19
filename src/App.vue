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
import { computed, onMounted, onBeforeMount } from "vue";
import { useMusicStore } from "./stores/music";

// music store
const musicStore = useMusicStore();
// populate song list with their respective durations and
// load first song on create
musicStore.initialSong();
musicStore.hasSongEnded();

// fetch song durations once
onBeforeMount(() => {
  musicStore.getSongDurations();
});
// mount function to get current song, update song process bar,and forward song if previous song finishes
onMounted(() => {
  musicStore.progressBarUpdate();
});

let haveDurationsLoaded = (songList) => {
  return songList.every((songObj) => songObj.duration);
};

// computed value for loading status
const loading = computed(() => {
  const songList = musicStore.songList;
  return !haveDurationsLoaded(songList);
});
</script>

<style lang="scss" src="./style.scss"></style>
