import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Latex,
  Circle,
  Node,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";

// Furthermore, so long as multiple states,
// $S_1, \cdots, S_n$, exist, just as there
// is supposed to be constant warfare between
// $A$ and $B$ in the state of anarchy, so
// too must there be constant warfare between
// these different states.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const s = createRefArray<Latex | Txt>();
  const states = createRef<Rect>();

  view.add(
    <Rect ref={states} layout gap={12}>
      <Rect>
        <Latex ref={s} fill={colors.zinc50} tex={`S_1`} />
        <Txt ref={s} fill={colors.zinc500}>
          ,
        </Txt>
      </Rect>
      <Rect alignItems="center" gap={12}>
        {a(3).map((_: any) => (
          <Circle ref={s} size={8} fill={colors.zinc500} />
        ))}
        <Txt ref={s} fill={colors.zinc500}>
          ,
        </Txt>
      </Rect>
      <Latex ref={s} fill={colors.zinc50} tex={`S_n`} />
    </Rect>,
  );

  for (let state of s) {
    (state as Node).opacity(0);
  }

  yield* all(
    ...s.map((state, i) =>
      chain(
        waitFor(0.05 * i),
        fadein(() => state),
      ),
    ),
  );

  yield* waitFor(2);

  const ab = createRef<Rect>();
  const abtex = createRefArray<Latex>();
  const abcomma = createRef<Txt>();

  view.add(
    <Rect ref={ab} layout gap={12} position={[0, 50]}>
      <Rect>
        <Latex ref={abtex} tex={`A`} fill={colors.zinc50} />
        <Txt ref={abcomma} fill={colors.zinc500}>
          ,
        </Txt>
      </Rect>
      <Latex ref={abtex} tex="B" fill={colors.zinc50} />
    </Rect>,
  );

  yield* all(states().position([0, -50], 1), chain(waitFor(0.2), fadein(ab)));

  yield* waitFor(1);

  yield* all(
    ...abtex.map((x) => x.fill(colors.red500, 1)),
    abcomma().fill(colors.red950, 1),
  );

  yield* waitFor(1);

  yield* all(
    s[0].fill(colors.red500, 1),
    ...s.slice(1, 6).map((x) => x.fill(colors.red950, 1)),
    s[6].fill(colors.red500, 1),
  );

  yield* waitFor(1);

  yield* all(fadeout(states), chain(waitFor(0.2), fadeout(ab)));
});
