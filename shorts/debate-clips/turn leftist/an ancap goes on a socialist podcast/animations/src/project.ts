import { makeProject } from "@motion-canvas/core";

import example from "./scenes/example?scene";
import audio from "./assets/video.wav";
import ecp from "./scenes/ecp?scene";
import dialectics from "./scenes/dialectics?scene";
import theoryPractice from "./scenes/theory-practice?scene";
import capitalismInReality from "./scenes/capitalism-in-reality?scene";
import fangedNoumena from "./scenes/fanged-noumena?scene";
import notMainstream from "./scenes/not-mainstream?scene";

export default makeProject({
  scenes: [
    notMainstream,
    //fangedNoumena,
    //capitalismInReality,
    //theoryPractice,
    //dialectics,
    //ecp,
    //example,
  ],
  audio,
});
