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

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const p = createRef<Txt>();
  const i = createRef<Ray>();
  const c = createRef<Txt>();
  const full = createRef<Rect>();

  view.add(
    <Rect ref={full} layout alignItems="center" gap={32}>
      <Txt opacity={0} ref={p} fill={colors.zinc50} fontSize={60}>
        Men are naturally brutish
      </Txt>
      <Ray
        end={0}
        ref={i}
        toX={150}
        lineWidth={8}
        endArrow
        stroke={colors.zinc50}
        arrowSize={16}
      />
      <Txt opacity={0} ref={c} fill={colors.zinc50} fontSize={60}>
        we need collective security.
      </Txt>
    </Rect>,
  );

  yield* all(
    fadein(p),
    chain(waitFor(0.2), i().end(1, 1)),
    chain(waitFor(0.4), fadein(c)),
  );

  yield* waitFor(1);

  yield* all(i().stroke(colors.red500, 1), c().fill(colors.red500, 1));

  yield* waitFor(1);

  yield* all(
    p().glow(0).glow(0.5, 1),
    i().opacity(0.2, 1),
    c().opacity(0.2, 1),
  );

  yield* waitFor(1);

  yield* fadeout(full);
});
