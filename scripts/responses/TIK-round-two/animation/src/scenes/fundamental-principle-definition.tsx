import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

// the fundamental principle underlying definitions is not communication. Words are not mere linguistic playthings that we may select at will and the standard of their truth is not that people use them in that way. Definitions can be objectively correct or incorrect on epistemic grounds---and thus epistemology must be employed when we are choosing which definition to adopt.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[110, 184]}>
      <Txt>
        The fundamental principle underlying definitions is not communication.
      </Txt>
      <Txt>
        The standard of a definitions truth is not that people use the word in
        that way.
      </Txt>
      <Txt>
        Definitions can be objectively correct or incorrect on epistemic
        grounds.
      </Txt>
      <Txt>
        Epistemology must be employed when we are choosing which definition to
        adopt.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();

  yield* waitUntil("standard of definitions");
  yield* all(list().next(), list().position([0, 120], 1));

  yield* waitUntil("objectively correct or incorrect");
  yield* all(list().next(), list().position([0, 60], 1));

  yield* waitUntil("epistemology employed");
  yield* all(list().next(), list().position([0, 0], 1));

  yield* waitUntil("end");

  yield* all(
    ...list().items.map((item, i) => delay(0.1 * i, list().hide(item))),
  );

  yield* waitUntil("blank");
});
