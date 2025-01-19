import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

// "A rights-protecting violator of rights is simply a contradiction in terms."

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const pos = createRef<Txt>();
  const neg = createRef<Txt>();

  view.add(
    <Txt ref={title} fontSize={60} fill={colors.zinc50}>
      A <Txt ref={pos}>rights-protecting</Txt>{" "}
      <Txt ref={neg}>violator of rights</Txt>.
    </Txt>,
  );

  yield* fadein(title);
  yield* waitUntil("contradiction");
  yield* all(
    title().fill(colors.zinc700, 1),
    pos().fill(colors.green500, 1),
    pos().glow(0).glow(0.4, 1),
    neg().fill(colors.red500, 1),
    neg().glow(0).glow(0.4, 1),
  );
  yield* waitUntil("out");
  yield* fadeout(title);
});
