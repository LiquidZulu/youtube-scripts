import { makeScene2D } from "@motion-canvas/2d";
import { waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);
  yield* waitFor(5);
});
