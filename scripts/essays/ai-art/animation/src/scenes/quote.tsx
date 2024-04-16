import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Video, Ray, Txt } from "@motion-canvas/2d/lib/components";
import { vectorSum } from "../util";
import { SquigglyBorder } from "../components";
import { all, chain, waitFor } from "@motion-canvas/core/lib/flow";
import { createSignal } from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {
  const squigglyBorder = new SquigglyBorder({
    runtime: createSignal(5),
    rayColor: createSignal({ r: 0xff, g: 0xff, b: 0xff, a: 1 }),
    corners: createSignal({
      bottomLeft: [-760, 340],
      bottomRight: [-248, 340],
      topLeft: [-760, -340],
      topRight: [-248, -340],
    }),
  });

  view.fill();

  for (let ray of squigglyBorder.rays) {
    view.add(
      <Ray
        ref={ray.ref}
        lineWidth={squigglyBorder.rayWidth}
        stroke={squigglyBorder.rayColor}
        from={vectorSum([ray.from, squigglyBorder.offsetsList()[0][ray.id[0]]])}
        to={vectorSum([ray.to, squigglyBorder.offsetsList()[0][ray.id[1]]])}
      />
    );
  }

  yield* all(
    squigglyBorder.animateAll(),
    waitFor(squigglyBorder.duration() * 6)
  );
});
