import { makeScene2D, Rect, Ray, Img, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";

// venn diagram with anarchism as such
// only telling you what anarchism isn't,
// anarcho-capitalism tells you what it is

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const anarchism = {
    r: createRef<Rect>(),
    t: createRef<Txt>(),
    s: createRef<Txt>(),
  };

  const ancap = {
    r: createRef<Rect>(),
    t: createRef<Txt>(),
    s: createRef<Txt>(),
  };

  view.add(
    <Rect
      end={0}
      ref={anarchism.r}
      stroke={colors.emerald500}
      lineWidth={8}
      width={1000}
      height={800}
      layout
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={100}
    >
      <Rect direction="column" alignItems="center" gap={30}>
        <Txt
          scale={0}
          ref={anarchism.t}
          fill={colors.emerald500}
          fontFamily="Cubano"
        >
          Anarchism
        </Txt>
        <Txt opacity={0} ref={anarchism.s} fill={colors.zinc400}>
          Anarchism <Txt.i>is not</Txt.i> legal authoritarianism.
        </Txt>
      </Rect>
      <Rect
        end={0}
        ref={ancap.r}
        lineWidth={8}
        width={700}
        height={400}
        stroke={colors.amber500}
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={30}
      >
        <Txt scale={0} ref={ancap.t} fill={colors.amber500} fontFamily="Cubano">
          Anarcho-Capitalism
        </Txt>
        <Txt opacity={0} ref={ancap.s} fill={colors.zinc400}>
          Anarchism <Txt.i>is</Txt.i>...
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(anarchism.r().end(1, 1), popin(anarchism.t));
  yield* waitUntil("show anarchism subtitle");
  yield* anarchism.s().opacity(1, 1);
  yield* waitUntil("show ancap");

  yield* all(ancap.r().end(1, 1), popin(ancap.t));
  yield* ancap.s().opacity(1, 1);
  yield* waitUntil("problem of law");

  yield* all(
    ancap.t().margin([-400, 0, 0, 0], 2),
    ancap.r().start(1, 1),
    chain(waitFor(0.1), ancap.s().opacity(0, 1)),
    chain(
      waitFor(0.4),
      all(
        popout(anarchism.t),
        anarchism.r().start(1, 1),
        chain(waitFor(0.1), anarchism.s().opacity(0, 1)),
      ),
    ),
  );

  const full = createRef<Txt>();
  const part = createRef<Txt>();

  view.add(
    <Txt opacity={0} ref={full} fill={colors.zinc50}>
      The fundamental problem of law:{" "}
      <Txt opacity={0} ref={part}>
        scarcity.
      </Txt>
    </Txt>,
  );

  yield* full().opacity(1, 1);
  yield* waitUntil("scarcity");
  yield* part().opacity(1, 1);
  yield* waitUntil("out");
  yield* all(popout(ancap.t), chain(waitFor(0.2), popout(full)));
});
