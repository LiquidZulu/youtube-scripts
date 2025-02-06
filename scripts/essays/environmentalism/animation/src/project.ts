import { makeProject } from "@motion-canvas/core";
import audio from "./audio.wav";

import example from "./scenes/example?scene";
import brickWall from "./scenes/brick-wall?scene";

export default makeProject({
  scenes: [brickWall],
  plugins: [],
  audio,
});
