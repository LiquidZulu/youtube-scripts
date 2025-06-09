import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import audio from "./an ancap goes on a socialist podcast-shorts.wav";
import ecp from "./scenes/ecp?scene";

export default makeProject({
  scenes: [
    ecp,
    //example
  ],
  audio,
});
