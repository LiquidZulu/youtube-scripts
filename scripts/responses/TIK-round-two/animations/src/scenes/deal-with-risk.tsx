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
import { flashAround } from "mcas/lib";

/*
   + [ ] The threat of aggression is a risk, there are two ways to deal with risk on the market:
   1. through your own privately controlled means;
   2. through the use of an insurance agency
   + underline this; "so we must analyse whether defense is an insurable good"
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const items = createRefArray<Rect>();
  const itemTxts = createRefArray<Rect>();

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Txt ref={title} fontSize={60} fill={colors.zinc50}>
        How to deal with risk on the market:
      </Txt>
      <Rect direction="column">
        {[
          "through your own privately controlled means;",
          "through the use of an insurance agency.",
        ].map((x, i) => (
          <Rect opacity={0} ref={items} gap={16}>
            <Txt fill={colors.zinc500}>{`${i + 1}.`}</Txt>
            <Txt opacity={0} ref={itemTxts} fill={colors.zinc50}>
              {x}
            </Txt>
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  yield* all(
    fadein(title),
    all(
      ...items.map((item, i) =>
        chain(waitFor((i + 1) * 0.1), item.opacity(1, 1)),
      ),
    ),
  );

  yield* waitFor(1);
  yield* itemTxts[0].opacity(1, 1);

  yield* waitFor(1);
  yield* itemTxts[1].opacity(1, 1);

  yield* waitFor(3);
  yield* all(
    flashAround(() => items[1]),
    items[0].opacity(0.2, 1),
  );

  yield* waitFor(1);
  yield* all(
    fadeout(title),
    all(
      ...items.map((item, i) =>
        chain(waitFor((i + 1) * 0.1), item.opacity(0, 1)),
      ),
    ),
  );
});
