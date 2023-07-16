import { defineStore } from "pinia";
import { InitActions } from "./musicInitActions";
import { PlayerActions } from "./musicPlayerActions";

export const useMusicActions = defineStore("music.actions", () => {
  return {
    ...InitActions(),
    ...PlayerActions(),
  };
});
