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
import { ArrowList } from "mcas/lib";

// the instant a man tries to defend his
// conduct by asserting that conflicts should
// not be avoided and that rights are illusory
// he necessarily asserts that conflicts should
// be avoided (when initiated against him) and
// that rights are real (when the thief is facing
// a counter-attack).

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const list = createRef<ArrowList>();
  const txts = createRefArray<Txt>();

  view.add(
    <ArrowList ref={list}>
      <Txt ref={txts}>Conflicts should not be avoided!</Txt>
      <Txt ref={txts}>Rights are illusory!</Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* waitFor(1);
  yield* list().next();
  yield* waitFor(1);
  yield* txts[0].text(
    "Conflicts should be avoided (when initiated against me)!",
    1,
  );
  yield* txts[1].text(
    "Rights are real (when the thief is facing a counter-attack)!",
    1,
  );
  yield* waitFor(1);
  yield* all(
    ...list().items.map((item, i) =>
      chain(waitFor(i * 0.2), list().hide(item)),
    ),
  );
});
