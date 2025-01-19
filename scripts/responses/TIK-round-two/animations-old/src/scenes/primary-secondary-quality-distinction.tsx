import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, fadein, fadeout } from "mcas/lib";

import brain from "../assets/brain.png";
import senses from "../assets/senses.png";

// This is compounded further by his
// acceptance of what philosophers
// call the primary/secondary quality
// distinction---that our senses only
// pick up distorted impressions of
// what is "really" out there, such
// that the real world is not remotely
// what it appears to be. In actual fact,
// this position has it, the real world
// is colourless, soundless, temperatureless,
// odourless, etc. All that really
// exists is quantity and motion. So,
// for Hobbes, we know that the senses
// are invalid through a process of thought,
// and that thought is based on the evidence
// of the senses; so thought is supposed to
// invalidate that which it is based upon.
// You can see, I'm sure, how the materialist
// position is leading Hobbes to total epistemic suicide.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const colon = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Txt fontSize={70} ref={title} fill={colors.zinc50}>
      The primary/secondary quality distinction
      <Txt opacity={0} ref={colon}>
        :
      </Txt>
    </Txt>,
  );

  yield* fadein(title);

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt>
        Our senses only pick up distorted impressions of what is "really" out
        there.
      </Txt>
      <Txt>The real world is not remotely what it appears to be.</Txt>
      <Txt>
        the real world is colourless, soundless, temperatureless, odourless,
        etc.
      </Txt>
      <Txt>All that really exists is quantity and motion.</Txt>
    </ArrowList>,
  );

  yield* all(
    colon().opacity(1, 1),
    title().position([0, -300], 1),
    chain(waitFor(0.2), list().next()),
  );
  yield* waitFor(1);
  yield* list().next();
  yield* waitFor(1);
  yield* list().next();
  yield* waitFor(1);
  yield* list().next();
  yield* waitFor(1);

  // for Hobbes, we know that the senses
  // are invalid through a process of thought,
  // and that thought is based on the evidence
  // of the senses; so thought is supposed to
  // invalidate that which it is based upon.
  // You can see, I'm sure, how the materialist
  // position is leading Hobbes to total epistemic suicide.

  yield* all(
    chain(waitFor(0.2 * (list().length + 1)), fadeout(title)),
    ...list()
      .items.reverse()
      .map((item, i) => chain(waitFor(i * 0.2), list().hide(item))),
  );

  const b = createRef<Img>();
  const s = createRef<Img>();
  const rays = createRefArray<Ray>();

  view.add(
    <Rect layout alignItems="center">
      <Img scale={0} ref={b} src={brain} />
      <Rect direction="column" gap={96}>
        <Ray
          end={0}
          ref={rays}
          marginLeft={25}
          toX={250}
          endArrow
          lineWidth={20}
          stroke={colors.red500}
        />
        <Ray
          end={0}
          ref={rays}
          toX={-250}
          endArrow
          lineWidth={20}
          stroke={colors.green500}
        />
      </Rect>
      <Img scale={0} ref={s} src={senses} />
    </Rect>,
  );

  yield* all(popin(b), chain(waitFor(0.1), popin(s)));
  yield* waitFor(1);
  yield* rays[0].end(1, 1);
  yield* waitFor(1);
  yield* rays[1].end(1, 1);
  yield* waitFor(5);

  yield* all(
    popout(b),
    chain(waitFor(0.2), popout(s)),
    ...rays.map((ray, i) => chain(waitFor(0.15 * (i + 1)), ray.start(1, 1))),
  );
});
