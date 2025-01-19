import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  linear,
  waitUntil,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";

/*
   anarchism definition: rejection of legal authoritarianism
   + legal authoritarianism definition comes out

   legal authoritarianism is the thesis that the law comes
   from some authority, or in other words that actions are
   justified on the grounds that the preferred authority
   says they are
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const anarchismFull = createRef<Txt>();
  const anarchismPart = createRef<Txt>();

  view.add(
    <Txt ref={anarchismFull} fontSize={60} fill={colors.zinc50}>
      <Txt ref={anarchismPart}>Anarchism: the rejection of</Txt> legal
      authoritarianism.
    </Txt>,
  );

  yield* popin(anarchismFull);
  yield* waitUntil("breaking it down");

  yield* all(
    anarchismPart().fill(colors.zinc700, 1),
    anarchismFull().position([0, -150], 1),
  );

  const reasons = {
    txt: createRefArray<Txt>(),
    ray: createRefArray<Ray>(),
  };

  view.add(
    <Rect layout direction="column" gap={42} position={[0, 100]}>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          The thesis that the law comes from some <Txt.i>authority</Txt.i>.
        </Txt>
      </Rect>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          Actions are justified on the grounds that the{"\n"}preferred authority
          says they are.
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* waitUntil("first reason");

  yield* all(
    reasons.ray[0].end(1, 0.5),
    chain(waitFor(0.2), reasons.txt[0].opacity(1, 1)),
  );

  yield* waitUntil("second reason");

  yield* all(
    reasons.ray[1].end(1, 0.5),
    chain(waitFor(0.2), reasons.txt[1].opacity(1, 1)),
  );

  yield* waitUntil("end");

  yield* all(
    popout(anarchismFull),
    ...[0, 0].map((_, i) =>
      chain(
        waitFor((i + 1) * 0.2),
        all(reasons.ray[i].start(1, 0.5), reasons.txt[i].opacity(0, 1)),
      ),
    ),
  );
});
