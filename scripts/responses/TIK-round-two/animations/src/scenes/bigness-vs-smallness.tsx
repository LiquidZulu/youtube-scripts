import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import { fadein, fadeinup, fadeout, fadeoutup } from "mcas/lib";

// Thus "bigness" vs "smallness" is not
// the key criterion we must work upon here.
// The correct criterion is collective as
// against individual.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const bigsmall = createRef<Txt>();

  view.add(
    <Txt fontSize={55} ref={bigsmall} fill={colors.zinc50}>
      "Bigness" vs "Smallness"
    </Txt>,
  );

  yield* fadein(bigsmall);
  yield* waitFor(2);

  const collin = createRef<Txt>();

  view.add(
    <Txt fontSize={55} ref={collin} fill={colors.zinc50}>
      Collective vs Individual
    </Txt>,
  );

  yield* all(fadeinup(collin), fadeoutup(bigsmall));
  yield* waitFor(3);
  yield* fadeout(collin);
});
