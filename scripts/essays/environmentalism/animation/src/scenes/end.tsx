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
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill("010000");

  const border = createRef<Rect>();

  view.add(
    <Rect
      end={0}
      ref={border}
      lineWidth={16}
      stroke={colors.orange500}
      shadowBlur={50}
      shadowColor={colors.orange500}
      width={920}
      height={530}
      position={[0, -12]}
      radius={30}
    />,
  );

  yield* all(view.fill(colors.bgorange, 2), delay(0.4, border().end(1, 1)));
  yield* waitFor(20);
});
