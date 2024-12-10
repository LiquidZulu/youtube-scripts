import { makeProject } from "@motion-canvas/core";
import audio from "./audio.mp3";

import rocket from "./scenes/rocket?scene";
import secretDevice from "./scenes/secret-device?scene";
import iphoneFactors from "./scenes/iphone-factors?scene";
import a18Pro from "./scenes/a18-pro?scene";
import indirectExchange from "./scenes/indirect-exchange?scene";
import entrepreneurship from "./scenes/entrepreneurship?scene";

export default makeProject({
  scenes: [
    rocket,
    secretDevice,
    iphoneFactors,
    a18Pro,
    indirectExchange,
    entrepreneurship,
  ],
  audio: audio,
});
