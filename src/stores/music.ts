import { defineStore } from "pinia";
import { extractStore } from "./extractQuizStore";
import { useMusicState } from "./state/musicState";
import { useMusicActions } from "./actions/useMusicActions";
import { useMusicGetters } from "./getters/musicGetter";
import { appendZero } from "./actions/musicPlayerActions";

// utility function to convert audio time to music player format
export function formatDuration(duration: number, progressBar = false): string {
  const minuteVal = Math.floor(duration / 60);
  const secondVal = Math.floor(duration - minuteVal * 60);
  let checkSeconds = null;
  // append `0` to seconds value when it is a single digit
  checkSeconds =
    secondVal.toString().length === 1
      ? appendZero(secondVal, "prefix")
      : secondVal.toString();
  const finalTime = `${minuteVal.toString()}:${checkSeconds}`;
  return finalTime;
}

export const useMusicStore = defineStore("music", () => {
  return {
    ...extractStore(useMusicState()),
    ...extractStore(useMusicActions()),
    ...extractStore(useMusicGetters()),
  };
});
