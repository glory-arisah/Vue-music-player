<template>
  <section class="playlist--container">
    <article
      v-for="song in songList"
      :data-song-name="song.songName"
      :key="song.songName"
      :class="{
        song__article: true,
        highlighted: currentlyPlayingId === song.index,
      }"
      @click="musicStore.playSelectedSong(song)"
    >
      <p class="song--name">
        <span :data-song-name="song">{{ song.songName }}</span>
        <span :data-song-name="song"> - {{ song.artist }}</span>
      </p>
      <p class="song--duration">
        {{ song.duration }}
      </p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
const musicStore = useMusicStore();
const { songList, currentlyPlayingId } = storeToRefs(musicStore);
</script>

<style lang="scss" scoped></style>
