<template>
  <div class="page--wrapper">
    <nav>MUSIC APP</nav>
    <main class="main">
      <section class="player--container">
        <div class="song__img"></div>
        <div class="song--controls">
          <progress min="0" max="100" value="50"></progress>
          <div class="controls">
            <!-- add shuffle and repeat features later -->
            <p class="control__p">
              <font-awesome-icon :icon="['fa-solid', 'fa-backward-step']" />
              <span class="play-pause"
                ><font-awesome-icon :icon="['fa-solid', 'fa-play']"
              /></span>
              <font-awesome-icon :icon="['fa-solid', 'fa-forward-step']" />
            </p>
          </div>
        </div>
      </section>
      <section class="playlist--container">
        <article class="song">
          <p class="song--name">Sample Name</p>
          <p class="song--duration">04:00</p>
        </article>
        <article class="song">
          <p class="song--name">Sample Name</p>
          <p class="song--duration">04:00</p>
        </article>
        <article class="song">
          <p class="song--name">Sample Name</p>
          <p class="song--duration">04:00</p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
// import { storeToRefs } from "pinia";
// import { useMusicStore } from "./stores/music";
// const musicStore = useMusicStore();
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
.page--wrapper {
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  // navigation
  nav {
    margin-block: 4rem;
  }
  main {
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
      width: 80%;
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
        text-align: center;
        display: flex;
        justify-content: space-around;
        width: 50%;
        margin: 0.5rem auto 0 auto;
        color: #3a2846;
      }
    }
  }
  // playlist container
  .playlist--container {
    display: flex;
    flex-direction: column;
    margin-block: 1.5rem;
    article {
      display: flex;
      justify-content: space-between;
      border-bottom: 1.2px solid #a25fcbaa;
      padding-block: 1.2rem;
      border-radius: 8px;
      &:last-child {
        border-bottom: none;
      }
      p.song--name {
        margin-left: 1rem;
      }
      p.song--duration {
        margin-right: 1rem;
      }
    }
  }
  // responsive -- medium to larger screen widths
  @include responsive($md) {
  }
}
</style>
