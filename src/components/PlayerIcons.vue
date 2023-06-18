<template>
  <font-awesome-icon
    :icon="['fa-solid', 'fa-repeat']"
    class="icon smaller"
    :style="{
      color: repeat ? '#a25fcbaa' : '#3a2846',
    }"
    @click="musicStore.setRepeat"
  />
  <font-awesome-icon
    :icon="['fa-solid', 'fa-backward-step']"
    class="icon"
    @click="musicStore.backward"
  />
  <font-awesome-icon
    :icon="['fa-solid', isPlaying ? 'fa-pause' : 'fa-play']"
    class="icon"
    @click="musicStore.playPause"
  />
  <font-awesome-icon
    :icon="['fa-solid', 'fa-forward-step']"
    class="icon"
    @click="musicStore.forward"
  />
  <font-awesome-icon
    :icon="['fa-solid', 'fa-shuffle']"
    class="icon smaller"
    :style="{
      color: shuffle ? '#a25fcbaa' : '#3a2846',
    }"
    @click="musicStore.setShuffle"
  />
</template>

<script setup>
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
const musicStore = useMusicStore();
const { shuffle, repeat, isPlaying } = storeToRefs(musicStore);
</script>
