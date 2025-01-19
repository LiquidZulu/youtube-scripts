import { makeScene2D, Rect, Ray, Img, Node } from "@motion-canvas/2d";
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

// This position is called sensualism---that all cognitive elements are sense perceptions. That the only cognitive faculty possessed by man is that of sensation.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const sensualism = createRef<Txt>();
  const colon = createRef<Txt>();
  view.add(
    <Txt fontFamily="Oswald" fill="white" ref={sensualism} fontSize={80}>
      SENSUALISM
      <Txt ref={colon} opacity={0}>
        :
      </Txt>
    </Txt>,
  );

  yield* fadein(sensualism);

  yield* waitUntil("show list");

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList position={[0, 100]} ref={list}>
      <Txt textWrap maxWidth={600}>
        All cognitive elements are sense perceptions.
      </Txt>
      <Txt textWrap maxWidth={600}>
        The only cognitive faculty possessed by man is that of sensation.
      </Txt>
    </ArrowList>,
  );

  yield* all(
    sensualism().position([0, -200], 1),
    colon().opacity(1, 1),
    delay(0.4, list().next()),
  );

  yield* waitUntil("second point");

  yield* list().next();

  yield* waitUntil("end");

  yield* all(
    fadeout(sensualism),
    delay(
      0.2,
      all(...list().items.map((item, i) => delay(0.2 * i, list().hide(item)))),
    ),
  );

  yield* waitUntil("blank");
});
