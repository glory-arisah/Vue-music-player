<template>
  <div class="page--wrapper">
    <TheLoader v-if="loading" />
    <main class="main" v-if="!loading">
      <music-player />
      <song-playlist />
    </main>
  </div>
</template>

<script setup lang="ts">
import TheLoader from "./components/TheLoader.vue";
import SongPlaylist from "./components/SongPlaylist.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import { computed, onMounted, onBeforeMount } from "vue";
import { useMusicStore } from "./stores/music";
import { SongProps } from "./stores/state/musicState";

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

let haveDurationsLoaded = (songList: SongProps[]) => {
  return songList.every((songObj) => songObj.duration);
};

// computed value for loading status
const loading = computed(() => {
  return !haveDurationsLoaded(musicStore.songList);
});
</script>

<style lang="scss" src="./style.scss"></style>
