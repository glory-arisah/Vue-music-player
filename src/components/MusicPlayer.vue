<template>
  <section class="player--container">
    <img
      class="song__img"
      :src="currentSong && currentSong.photo"
      :alt="currentSong.artist"
    />
    <div class="song--controls">
      <span class="current-song"
        >{{ currentSong.artist }} - {{ currentSong.songName }}</span
      >
      <input
        type="range"
        min="1"
        max="100"
        :value="progressValue"
        @click="musicStore.seekPlayer($event)"
        class="progress"
      />
      <p class="song--timer">
        <!-- show currentTime after it is loaded -->
        <span v-if="currentTime">{{ currentTime }}</span>
        <span v-else>0:00</span>
        <!-- end -->
        <span>{{ currentSong.duration }}</span>
      </p>
      <div class="controls">
        <!-- add shuffle and repeat features later -->
        <p class="control__p">
          <player-icons />
        </p>
        <p class="volume">
          <input
            type="range"
            value="40"
            @input="musicStore.volumeChange($event)"
          />
          <font-awesome-icon
            v-show="volume >= 35"
            :icon="['fas', 'fa-volume-up']"
            class="volume-icon"
          />
          <font-awesome-icon
            v-show="volume < 35"
            :icon="['fas', 'fa-volume-down']"
            class="volume-icon"
          />
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import PlayerIcons from "./PlayerIcons.vue";
import { useMusicStore } from "@/stores/music";
import { storeToRefs } from "pinia";
const musicStore = useMusicStore();
const { currentTime, currentSong, progressValue, volume } =
  storeToRefs(musicStore);
</script>

<style lang="scss" scoped></style>
