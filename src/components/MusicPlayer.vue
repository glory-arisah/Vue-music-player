<template>
  <section class="player--container">
    <div class="song__img">
      <!-- music icon -->
      <font-awesome-icon
        :icon="['fa-solid', 'fa-music']"
        class="music--icon"
        :beat="isPlaying"
      />
    </div>
    <div class="song--controls">
      <!-- artist and song name -->
      <span class="current-song"
        >{{ currentSong.artist }} - {{ currentSong.songName }}</span
      >
      <!-- seeker -->
      <input
        type="range"
        min="0"
        max="100"
        :value="progressValue"
        @input="musicStore.seekPlayer($event.target.value)"
        class="progress"
      />
      <!-- container for the song's currentTime and duration -->
      <p class="song--timer">
        <!-- show currentTime after it is loaded -->
        <span v-if="currentTime">{{ currentTime }}</span>
        <span v-else>0:00</span>
        <!-- end -->
        <span>{{ currentSong.duration }}</span>
      </p>
      <div class="controls">
        <!-- icons for repeat, play, prev, next and shuffle -->
        <p class="control__p">
          <player-icons />
        </p>
        <!-- volume container -->
        <p class="volume">
          <input
            type="range"
            value="40"
            @input="musicStore.volumeChange($event.target.value)"
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
const { currentTime, currentSong, progressValue, volume, isPlaying } =
  storeToRefs(musicStore);
</script>

<style lang="scss" scoped>
.song__img {
  display: flex;
  justify-content: center;
  align-items: center;
  .music--icon {
    font-size: 3rem;
    color: #3a2846;
  }
}
</style>
