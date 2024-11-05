import { makeScene2D, Rect, Ray, Img, JSX } from "@motion-canvas/2d";
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
   1. Men are brutes who must necessarily be at war with each other.
   2. Make one of those men a sovereign.
   3. ???
   4. No more war! :)
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const listItems = createRefArray<Rect>();

  view.add(
    <Txt ref={title} fontSize={60} fill={colors.zinc50} position={[0, -150]}>
      The Myth of Collective Security:
    </Txt>,
  );

  view.add(
    <Rect layout direction="column" position={[0, 100]}>
      {[
        "Men are brutes who must necessarily be at war with each other.",
        "Make one of those men a sovereign.",
        "???",
        "No more war! 😊",
      ].map((x, i) => (
        <Rect opacity={0} ref={listItems} gap={32}>
          <Txt fill={colors.zinc600}>{`${i + 1}.`}</Txt>
          <Txt fill={colors.zinc50}>{x}</Txt>
        </Rect>
      ))}
    </Rect>,
  );

  yield* all(
    fadein(title),
    chain(
      waitFor(0.2),
      all(
        ...listItems.map((item, i) =>
          chain(waitFor((i + 1) * 0.2), item.opacity(1, 1)),
        ),
      ),
    ),
  );

  yield* waitFor(5);

  yield* all(
    fadeout(title),
    ...listItems.map((item, i) =>
      chain(waitFor((i + 1) * 0.2), item.opacity(0, 1)),
    ),
  );
});
