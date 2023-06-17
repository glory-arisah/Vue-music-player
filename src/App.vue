<template>
  <div class="page--wrapper">
    <nav>MUSIC APP</nav>
    <main class="main">
      <section class="player--container">
        <div class="song__img"></div>
        <div class="song--controls">
          <span class="current-song"
            >{{ currentSong.artist }} - {{ currentSong.songName }}</span
          >
          <progress min="0" max="100" value="50"></progress>
          <div class="controls">
            <!-- add shuffle and repeat features later -->
            <p class="control__p">
              <font-awesome-icon
                :icon="['fa-solid', 'fa-backward-step']"
                ref="backward"
                @click="musicStore.backward"
              />
              <span class="play-pause"
                ><font-awesome-icon
                  :icon="['fa-solid', isPlaying ? 'fa-pause' : 'fa-play']"
                  ref="playBtn"
                  @click="musicStore.playPause"
              /></span>
              <font-awesome-icon
                :icon="['fa-solid', 'fa-forward-step']"
                ref="forward"
                @click="musicStore.forward"
              />
            </p>
          </div>
        </div>
      </section>
      <section class="playlist--container" v-if="songList[0].duration">
        <article
          v-for="song in songList"
          :key="song.songName"
          class="song__article"
        >
          <p class="song--name">{{ song.songName }}</p>
          <p class="song--duration">{{ song.duration }}</p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useMusicStore } from "./stores/music";
// music store
const musicStore = useMusicStore();
// loading first song on create
musicStore.initialSong();
// populate song list with weach song's duration
musicStore.getSongDurations();
const { currentSong, isPlaying, songList } = storeToRefs(musicStore);
watch(isPlaying, () => {
  // isPlaying = newVal;
});
// mounted function to get current song
onMounted(() => {});
</script>

<style lang="scss">
$md: 60em;

@mixin responsive($size) {
  @media (min-width: $size) {
    @content;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  min-height: 100vh;
  background-color: #f2d0f5;
}
.page--wrapper {
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  // navigation
  nav {
    margin-block: 3rem;
  }
  main {
    background: linear-gradient(to bottom right, #ffd0f2, #5b45ff);
    width: 70%;
    margin: 0 auto;
    border: {
      right: 1px solid #a25fcbaa;
      left: 1px solid #a25fcbaa;
      bottom: 1px solid #a25fcbaa;
      radius: 50px;
      bottom-left-radius: 20px;
      bottom-right-radius: 20px;
    }
  }
  // player container
  .player--container {
    color: #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-width: 0.7px;
    border: {
      right: 0.7px solid #a25fcbaa;
      top: 0.7px solid #a25fcbaa;
      bottom: 0.7px solid #a25fcbaa;
      radius: 50px;
    }
    // song image div
    .song__img {
      border-radius: 50%;
      border: 0.8px solid #a25fcbaa;
      width: 6rem;
      height: 6rem;
    }
    // controls section
    .song--controls {
      color: #eee;
      width: 80%;
      span.current-song {
        display: block;
        text-align: center;
        margin-bottom: 0.4rem;
        color: #5c0397;
      }
      progress {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        height: 0.7rem;
        width: 90%;
        cursor: pointer;
        border-radius: 10px;
        display: block;
        margin: 0 auto;
      }
      // controls
      .control__p {
        color: #eee;
        text-align: center;
        display: flex;
        justify-content: space-around;
        width: 50%;
        margin: 0.5rem auto 0 auto;
        color: #3a2846;
        font-awesome-icon {
          cursor: pointer;
        }
      }
    }
  }
  // playlist container
  .playlist--container {
    display: flex;
    flex-direction: column;
    color: #000;
    // margin-top: 1.5rem;
    article {
      display: flex;
      color: #000;
      justify-content: space-between;
      border-bottom: 1.2px solid #a25fcbaa;
      padding-block: 1.2rem;
      border-radius: 8px;
      font-weight: 600;
      color: #3a2846;
      cursor: pointer;
      &:hover {
        background-color: #f6ebff87;
      }
      &:last-child {
        border-bottom: none;
      }
      p.song--name {
        // color: #eee;
        margin-left: 1rem;
      }
      p.song--duration {
        // color: #eee;
        margin-right: 1rem;
      }
    }
  }
  // responsive -- medium to larger screen widths
  @include responsive($md) {
  }
}
</style>
