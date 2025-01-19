import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

/*
+ [ ] Title: "Objectivism: the philosophy of the primacy of existence."
   + have the stuff after the colon fade in
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const sub = createRef<Txt>();

  view.add(
    <Txt fontSize={60} ref={title} fill={colors.zinc50} position={[586, 0]}>
      Objectivism
      <Txt opacity={0} ref={sub}>
        : the philosophy of the primacy of existence.
      </Txt>
    </Txt>,
  );

  yield* title().opacity(0).opacity(1, 1);
  yield* all(
    title().position([0, 0], 1),
    chain(waitFor(0.4), sub().opacity(1, 1)),
  );
  yield* waitFor(2);
  yield* fadeout(title);
});
