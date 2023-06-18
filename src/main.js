import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
  faSpinner,
  faRepeat,
  faShuffle,
  faVolumeUp,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { createPinia } from "pinia";

// add icons to library
library.add(
  faPlay,
  faPause,
  faBackwardStep,
  faForwardStep,
  faSpinner,
  faRepeat,
  faShuffle,
  faVolumeUp,
  faVolumeDown
);

const pinia = createPinia();
createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .mount("#app");
