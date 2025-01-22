import { Circle, makeScene2D } from "@motion-canvas/2d";
import { createRef, easeInOutBack, easeInOutBounce } from "@motion-canvas/core";
import { localGradient, mkGradient } from "mcas/lib";

export default makeScene2D(function* (view) {
  // Create your animations here

  view.fill(mkGradient("right", "yellow", "red"));

  const circle = createRef<Circle>();

  view.add(<Circle ref={circle} size={320} />);

  circle().fill(localGradient(circle)("right", "yellow", "red"));

  yield* circle().scale(2, 2).to(1, 2);
  yield* circle()
    .position([300, 200], 1, easeInOutBack)
    .to([-50, -400], 1, easeInOutBack);
  yield* circle().rotation(360, 1);
});
