<template>
  <section class="playlist--container" v-if="songList[0].duration">
    <article
      v-for="song in songList"
      :data-song-name="song.songName"
      :key="song.songName"
      :class="{
        song__article: true,
        highlighted: currentlyPlayingId === song.index,
      }"
      @click="musicStore.playSelectedSong($event)"
    >
      <p class="song--name" :data-song-name="song.songName">
        <span :data-song-name="song.songName">{{ song.songName }}</span>
        <span :data-song-name="song.songName"> - {{ song.artist }}</span>
      </p>
      <p class="song--duration">
        {{ song.duration }}
      </p>
    </article>
  </section>
</template>

<script setup>
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
const musicStore = useMusicStore();
const { songList, currentlyPlayingId } = storeToRefs(musicStore);
</script>

<style lang="scss" scoped></style>
