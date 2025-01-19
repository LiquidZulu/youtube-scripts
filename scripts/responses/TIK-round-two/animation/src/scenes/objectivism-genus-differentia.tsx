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
import { ArrowList } from "mcas/lib";

/*
   + [ ] Objectivism is the philosophy of the primacy of existence with annotated genus and differentia
   + highlight the genus and differentia different colours or something
 */

// So, for my definition, that Objectivism is the philosophy
// of the primacy of existence, the /genus/--the common
// denominator--is philosophy. Objectivism is a philosophy,
// like everything else which is a philosophy. What makes
// Objectivism different to all other philosophies--the
// /differentia/--is that Objectivism explicitly identifies
// and applies the primacy of existence to every philosophical
// issue.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const genus = createRef<Txt>();
  const differentia = createRef<Txt>();
  const list = createRef<ArrowList>();
  const g = colors.emerald500;
  const d = colors.sky500;

  view.add(
    <Txt ref={title} fontSize={60} fill={colors.zinc50}>
      Objectivism is <Txt ref={genus}>the philosophy</Txt> of{" "}
      <Txt ref={differentia}>the primacy of existence</Txt>.
    </Txt>,
  );

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt>
        <Txt fill={g}>Genus</Txt>: philosophy.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        <Txt fill={d}>Differentia</Txt>: that it explicitly identifies and
        applies the primacy of existence to every philosophical issue.
      </Txt>
    </ArrowList>,
  );

  yield* fadein(title);
  yield* waitUntil("genus");
  yield* all(
    title().position([0, -130], 1),
    genus().fill(g, 1),
    chain(waitFor(0.5), list().next()),
  );

  yield* waitUntil("differentia");
  yield* all(differentia().fill(d, 1), list().next());

  yield* waitUntil("end");

  yield* all(
    fadeout(title),
    ...list().items.map((item, i) =>
      chain(waitFor((i + 1) * 0.2), list().hide(item)),
    ),
  );
});
