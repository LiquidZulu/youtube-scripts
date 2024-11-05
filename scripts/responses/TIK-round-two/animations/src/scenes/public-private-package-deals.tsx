import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";
import { fadein, fadeout } from "mcas/lib";

// + [ ] private and public as package deals (have the words "private" and "public" on screen and then the package terms come out of them to beneath)
//   + private: small, individual, collective
//   + public: large, collective

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const full = createRef<Rect>();
  const priv = createRefArray<Txt>();
  const pub = createRefArray<Txt>();

  view.add(
    <Rect layout gap={20} ref={full}>
      <Rect direction="column" alignItems="end">
        <Txt fill={colors.zinc50} fontSize={65}>
          Private
        </Txt>
        <Txt ref={priv} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          small
        </Txt>
        <Txt ref={priv} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          individual
        </Txt>
        <Txt ref={priv} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          collective
        </Txt>
      </Rect>
      <Txt fill={colors.zinc50} fontSize={65}>
        vs
      </Txt>
      <Rect direction="column">
        <Txt fill={colors.zinc50} fontSize={65}>
          Public
        </Txt>
        <Txt ref={pub} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          large
        </Txt>
        <Txt ref={pub} fill={colors.zinc600} fontSize={35} fontFamily="cubano">
          collective
        </Txt>
      </Rect>
    </Rect>,
  );

  for (let x of priv) {
    x.margin([-42, 0, 0, 0]);
    x.opacity(0);
  }

  for (let x of pub) {
    x.margin([-42, 0, 0, 0]);
    x.opacity(0);
  }

  yield* fadein(full);

  yield* all(
    ...priv.map((x, i) =>
      chain(
        waitFor(i * 0.1),
        all(x.margin([0, 0, 0, 0], 1), chain(waitFor(0.3), x.opacity(1, 1))),
      ),
    ),
  );

  yield* waitFor(2);

  yield* all(
    ...pub.map((x, i) =>
      chain(
        waitFor(i * 0.1),
        all(x.margin([0, 0, 0, 0], 1), chain(waitFor(0.3), x.opacity(1, 1))),
      ),
    ),
  );

  yield* waitFor(2);

  yield* fadeout(full);
});
