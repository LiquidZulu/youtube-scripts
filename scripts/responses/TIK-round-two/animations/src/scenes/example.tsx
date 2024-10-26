import { Circle, makeScene2D, Shape } from "@motion-canvas/2d";
import {
  all,
  createRef,
  sequence,
  SmoothSpring,
  spring,
  waitFor,
} from "@motion-canvas/core";
import { testPopin } from "./test";
import { popin, popinSize, slide } from "mcas/lib/animations/popin";

export default makeScene2D(function* (view) {
  // Create your animations here

  const circle = createRef<Circle>();

  view.add(<Circle ref={circle} size={320} fill={"lightseagreen"} />);

  const pop = popin(circle);
  //yield* popin(circle);
  //yield* testPopin(circle);
  //yield* pop;

  yield* popin(circle);
});
