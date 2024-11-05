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
   + [ ] the three answers to law:
   1. the law of the jungle---initiate conflicts at your whim;
   2. mixed law---sometimes initiate conflicts, and;
   3. the non-aggression principle---don't initiate conflicts.
   + "first let's consider the law of the jungle---what would a universal acceptance of conflict-engendering norms look like?"
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const ansN = createRefArray<Txt>();
  const ansT = createRefArray<Txt>();
  const ansR = createRefArray<Rect>();

  view.add(
    <Rect layout direction="column" gap={32} alignItems="center">
      <Txt ref={title} fontSize={60} fill={colors.zinc50}>
        Three answers to the question of law:
      </Txt>
      <Rect direction="column">
        {[
          "the law of the jungle—initiate conflicts at your whim;",
          "mixed law—sometimes initiate conflicts, and;",
          "the non-aggression principle—don't initiate conflicts.",
        ].map((x, i) => (
          <Rect ref={ansR} gap={16}>
            <Txt ref={ansN} opacity={0} fill={colors.zinc500}>{`${
              i + 1
            }.`}</Txt>
            <Txt ref={ansT} opacity={0} fill={colors.zinc50}>
              {x}
            </Txt>
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  yield* all(
    fadein(title),
    ...ansN.map((num, i) =>
      chain(
        waitFor((i + 1) * 0.2),
        fadein(() => num),
      ),
    ),
  );
  yield* waitFor(1);

  yield* chain(...ansT.map((txt) => chain(txt.opacity(1, 1), waitFor(1.5))));
  yield* flashAround(() => ansR[0]);
  yield* waitFor(1);

  yield* all(
    fadeout(title),
    ...ansR.map((ans, i) =>
      chain(
        waitFor((i + 1) * 0.2),
        fadeout(() => ans),
      ),
    ),
  );
});
