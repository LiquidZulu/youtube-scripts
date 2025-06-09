import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import scarcity from "./scenes/scarcity?scene";
import audio from "./debating on a socialist podcast w⧸ praxben-shorts.wav";
import waterRigths from "./scenes/water-rigths?scene";

export default makeProject({
  scenes: [
    waterRigths,
    //scarcity,
    //example
  ],
  audio,
});
