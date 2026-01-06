import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, after } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const border = createRef<Rect>();

  view.add(
    <Rect
      end={0}
      ref={border}
      lineWidth={16}
      stroke={"red"}
      shadowBlur={50}
      shadowColor={"red"}
      width={920}
      height={530}
      position={[0, -12]}
      radius={30}
    />,
  );

  yield* after("end screen in", border().end(1, 1), waitFor(20));
});
