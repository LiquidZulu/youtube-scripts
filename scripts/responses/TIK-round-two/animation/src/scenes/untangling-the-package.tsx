import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround } from "mcas/lib";

// Anarchy accordingly does not mean the absence of aggression /and/ the absence of bigness, these are separate concepts that must be analysed separately. The absence of bigness is already captured by the concept of non-society. It is when you don't have a society that you just have lone individuals wandering out and not interacting with others. Thus the proper way to understand anarchy is to throw out the bigness aspect and have anarchy be the absence of aggression. Certainly, if you have no interactions between anyone ever, i.e. non-society, then you will have an absence of aggression. But the alternative to this is not aggression + society. You can have a society without aggression.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const list = createRef<ArrowList>();
  const title = createRef<Txt>();

  view.add(
    <Rect ref={title} layout direction="column" alignItems="center" gap={64}>
      <Txt fill="white" fontFamily="oswald" fontSize={100}>
        Anarchy
      </Txt>
      <ArrowList ref={list}>
        <Txt>
          The absence of{" "}
          <Txt fill={colors.red500} glow>
            aggression
          </Txt>
          .
        </Txt>
        <Txt>
          The absence of{" "}
          <Txt fill={colors.emerald500} glow>
            bigness
          </Txt>
          .
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(
    fadein(title),
    ...list().items.map((item, i) => delay(0.2 * (i + 1), list().show(item))),
  );

  yield* waitUntil("indicate bigness");

  yield* flashAround(() => list().items[1]);

  yield* waitUntil("throw out bigness");

  yield* list().items[1].opacity(0.2, 1);

  yield* waitUntil("indicate aggression");

  yield* flashAround(() => list().items[0]);

  yield* waitUntil("end");

  yield* all(
    fadeout(title),
    ...list().items.map((item, i) => delay(0.2 * (i + 1), list().hide(item))),
  );
});
