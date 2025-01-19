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
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import { red500, yellow500 } from "mcas/colors";
import { ArrowList, fadein, fadeinup, fadeout, fadeoutup } from "mcas/lib";

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
  yield* waitUntil("individual vs collective");

  const collin = createRef<Txt>();
  const collective = createRef<Txt>();
  const individual = createRef<Txt>();

  view.add(
    <Txt fontSize={55} ref={collin} fill={colors.zinc50}>
      <Txt ref={collective}>Collective</Txt> vs{" "}
      <Txt ref={individual}>Individual</Txt>
    </Txt>,
  );

  yield* all(fadeinup(collin), fadeoutup(bigsmall));

  yield* waitUntil("actual public entities");

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt>
        <Txt fill={red500} glow>
          Public
        </Txt>{" "}
        entities operate through{" "}
        <Txt fill={red500} glow>
          aggressive
        </Txt>{" "}
        means.
      </Txt>
      <Txt>
        They do not function on the{" "}
        <Txt fill={yellow500} glow>
          trader's principle
        </Txt>
        .
      </Txt>
    </ArrowList>,
  );

  yield* all(
    collective().glow(0).glow(1, 1),
    collective().fill(red500, 1),
    collin().position([0, -100], 1),
    delay(0.2, list().next()),
  );

  yield* waitUntil("traders principle");
  yield* all(
    individual().glow(0).glow(1, 1),
    individual().fill(yellow500, 1),
    list().next(),
  );

  yield* waitUntil("list out");
  yield* all(
    ...list().items.map((item, i) => delay(0.2 * (i + 1), list().hide(item))),
    fadeout(collin),
  );

  yield* waitUntil("blah");
});
