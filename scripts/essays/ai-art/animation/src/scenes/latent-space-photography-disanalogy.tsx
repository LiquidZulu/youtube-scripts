import { makeScene2D, Ray } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Create your animations here

  const ray = createRef<Ray>();

  view.add(
    <Ray
      ref={ray}
      stroke="red"
      from={[55.1 + 15, -40]}
      to={[55.1 - 15, 30]}
      lineWidth={8}
    />
  );

  yield* ray().start(1).start(0, 0.5);
  yield* waitFor(10);
});
