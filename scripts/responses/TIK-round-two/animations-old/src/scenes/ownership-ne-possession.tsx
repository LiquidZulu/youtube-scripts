import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  spring,
  SmoothSpring,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, shake } from "mcas";
import * as colors from "mcas/colors";
import stick from "../assets/crusoe/stick.png";

// The issue with this view is that ownership
// --which we can define as the /right/ to
// possess a given scarce good--is necessarily
// distinct from possession. If there is some
// dispute between $A$ and $B$ over who should
// be the one to control a given property, then
// /both/ $A$ and $B$ must pre-suppose this to
// be the case. $A$ is asserting that though $B$
// might be able to actually obtain control, it
// would nevertheless be the case that $A$ /should/
// be the one to control it, and similarly $B$ is
// asserting that though $A$ might be able to actually
// obtain control, it would nevertheless be the case
// that $\textit{\textbf{B}}$ should be the one to
// actually control it.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  view.add(
    <Txt fontSize={70} ref={title} fill={colors.zinc50}>
      Ownership ≠ Possession
    </Txt>,
  );

  yield* fadein(title);
  yield* waitFor(1);

  const A = createRef<Txt>();
  const B = createRef<Txt>();
  const s = createRef<Img>();
  const ca = colors.rose500;
  const cb = colors.indigo500;

  const own = createRefArray<Txt>();
  const AB = createRef<Rect>();

  view.add(
    <Rect
      ref={AB}
      layout
      position={[0, 150]}
      width={1800}
      justifyContent="space-between"
    >
      <Rect direction="column" alignItems="center">
        <Txt ref={own} scale={0} fill={ca} fontSize={90} fontWeight={900}>
          "I own it!"
        </Txt>
        <Txt
          marginTop={-200}
          ref={A}
          scale={0}
          fontSize={1000}
          fontFamily="cubano"
          fill={ca}
        >
          A
        </Txt>
      </Rect>
      <Rect direction="column" alignItems="center">
        <Txt ref={own} scale={0} fill={cb} fontSize={90} fontWeight={900}>
          "I own it!"
        </Txt>
        <Txt
          marginTop={-200}
          ref={B}
          scale={0}
          fontSize={1000}
          fontFamily="cubano"
          fill={cb}
        >
          B
        </Txt>
      </Rect>
    </Rect>,
  );
  view.add(
    <Img
      ref={s}
      scale={0}
      width={1440 / 3}
      height={810 / 3}
      src={stick}
      position={[0, 300]}
    />,
  );

  yield* title().position([0, -400], 1);
  yield* all(popin(A), chain(waitFor(0.4), popin(B)));
  yield* waitFor(1);
  yield* popin(s);
  yield* fadeout(title);

  yield* all(
    ...own.map((t, i) => {
      const rot = i == 0 ? 270 : -270;

      return all(
        popin(() => t),
        spring(SmoothSpring, rot, 0, 0.3, (val) => {
          t.rotation(val);
        }),
        shake((val: number) => {
          AB().position([0, 150 + val]), s().position([0, 300 + val]);
        }, 2),
      );
    }),
  );

  yield* all(...own.map((t) => fadeout(() => t)));

  yield* s().position([364, 250], 1);

  const ray = createRef<Ray>();

  view.add(
    <Ray
      end={0}
      ref={ray}
      position={[0, 200]}
      lineWidth={32}
      endArrow
      arrowSize={42}
      toX={-300}
      fromX={300}
      stroke={ca}
    />,
  );

  yield* waitFor(1);
  yield* ray().end(1, 1);
  yield* waitFor(1);

  yield* all(
    s().position([-400, 150], 1),
    s().rotation(-30, 1),
    ray().to([300, 0], 1),
    ray().from([-300, 0], 1),
    ray().stroke(cb, 1),
  );
  yield* waitFor(3);

  yield* all(
    popout(A),
    popout(s),
    chain(waitFor(0.2), popout(B)),
    ray().start(1, 1),
  );
});
